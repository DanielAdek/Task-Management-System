import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {IPaginationOptions, Pagination} from "nestjs-typeorm-paginate";
import {TaskService} from "./task.service";
import {TaskDTO} from "../assets/dtos/task.dto";
import {RMQ_TARGET} from "../assets/enum/rmq.enum";
import {IApiResponse} from "../assets/interfaces/api-response.interface";
import {Task} from "../../domain/task/task-entity.model";

@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @MessagePattern(RMQ_TARGET.CREATE_TASK)
  public async create(@Payload() payload: TaskDTO): Promise<IApiResponse<typeof Task>> {
    return this.service.createTaskAsync(payload)
  }

  @MessagePattern(RMQ_TARGET.GET_TASKS)
  public async tasks(@Payload() payload: IPaginationOptions): Promise<IApiResponse<Pagination<typeof Task>>> {
    return this.service.getTasksAsync(payload)
  }

  @MessagePattern(RMQ_TARGET.UPDATE_TASK)
  public async update(@Payload() payload: TaskDTO): Promise<IApiResponse<typeof Task>> {
    return this.service.updateTaskAsync(payload)
  }
}
