import {Inject, Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {LessThanOrEqual, Repository} from "typeorm";
import {Cron, CronExpression} from "@nestjs/schedule";
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';
import {ClientProxy} from "@nestjs/microservices";
import {Task} from "../../domain/task/task-entity.model";
import {ApiResponseBuilder} from "../assets/response/api.response";
import {firstValueFrom} from "rxjs";
import {TaskDTO} from "../assets/dtos/task.dto";
import {RMQ_CLIENT, RMQ_TARGET} from "../assets/enum/rmq.enum";
import {IApiResponse} from "../assets/interfaces/api-response.interface";
import {TASK_STATUS} from "../assets/enum/task.enum";
import {Project} from "../../domain/project/proj-entity.model";
import {IUser} from "../assets/interfaces/user.interface";

@Injectable()
export class TaskService {
  private readonly logger: Logger = new Logger("TaskService");

  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @Inject(RMQ_CLIENT.NOTIFICATION_SERVICE) private readonly notifyServiceClient: ClientProxy,
    @Inject(RMQ_CLIENT.USER_SERVICE) private readonly userServiceClient: ClientProxy
  ) {}

  /**
   * @param createTaskDto
   * @returns Promise(ApiResponseBuilder)
   */
  public async createTaskAsync(payload: TaskDTO): Promise<IApiResponse<typeof Task>> {
    try {
      const {
        title, description, deadline,
        priority, projectId, assignee,
        creator
      } = payload;


      const user_response: IApiResponse<IUser> = await firstValueFrom(
        this.userServiceClient.send<IApiResponse<IUser>>(RMQ_TARGET.GET_USER, { id: assignee })
      );

      if (!user_response.status) {
        const { info, statusCode, status } = user_response;
        return ApiResponseBuilder.setInfo(info).setStatus(status).setStatusCode(statusCode).build()
      }

      // todo redis cache here
      const project: Project = await this.projectRepository.findOne({ where: { id: projectId }});

      if (!project)
        return ApiResponseBuilder.setStatus(false).setInfo("project not found").setStatusCode(404).build();

      const task_request: Task = Object.assign(new Task(), {
        title, description, deadline: new Date(deadline),
        priority, projectId, assignee, creator,
        status: TASK_STATUS.BACKLOG
      });

      const task: Task = await this.repository.save(task_request);

      const notify_payload = {
        title, description, deadline: new Date(deadline),
        assignee: user_response.data.username, project: project.title,
        recipient: user_response.data.email
      }

      const response: IApiResponse<object> = await firstValueFrom(
        this.notifyServiceClient.send<IApiResponse<object>>(RMQ_TARGET.SEND_EMAIL_TASK_CREATE, notify_payload)
      );

      this.logger.log("Response<NOTIFICATION>: ", response);
      return ApiResponseBuilder.default().setData(task).setStatusCode(201).build();
    } catch (error) {
      this.logger.error("Error:Task:Create: " + error.message);
      return ApiResponseBuilder.setInfo(error.message).setStatus(false).setStatusCode(500).build();
    }
  }


  /**
   * @param IProjectParam
   * @returns Promise(ApiResponseBuilder)
   */
  public async getTasksAsync(payload: IPaginationOptions): Promise<IApiResponse<Pagination<typeof Task>>> {
    try {
      const searchOptions = { loadRelationIds: true, relations: ["project"]};

      const tasks: Pagination<Task> = await paginate<Task>(this.repository, payload, searchOptions);

      return ApiResponseBuilder.default().setData(tasks).build();
    } catch (error) {
      this.logger.error("Error:Get:Tasks: " + error.message);
      return ApiResponseBuilder.setInfo(error.message).setStatus(false).setStatusCode(500).build();
    }
  }


  /**
   * @param updateTaskStatusDto
   * @returns Promise(ApiResponseBuilder)
   */
  public async updateTaskAsync(payload): Promise<IApiResponse<typeof Task>> {
    try {
      const {taskId, status} = payload;
      return ApiResponseBuilder.default().build();
    } catch (error) {
      this.logger.error("Error:Register: " + error.message);
      throw new InternalServerErrorException(error.message);
    }
  }


  /**
   * @param __
   * @returns Promise(ApiResponseBuilder)
   */
  @Cron(CronExpression.EVERY_6_HOURS)
  public async handleDueTaskAsync(): Promise<void> {
    try {
      const query = { deadline: LessThanOrEqual(new Date()), onDueNotify: false };

      const dueTasks: Task[] = await this.repository.find({ where: query, loadRelationIds: false, relations: ["Project"] });

      await Promise.all([
        dueTasks.map(({id }) => {
          this.repository.update(id, { onDueNotify: true });
        })
      ]);

      await firstValueFrom(
        this.notifyServiceClient.send(RMQ_TARGET.SEND_NOTIFY_TASK_DUE, dueTasks)
      );

      this.logger.log("SEND_DUE_TASKS:Event:Triggered");
    } catch (error) {
      this.logger.error("Error:DueTask: " + error);
    }
  }
}
