import {Controller, Inject, Post, Logger, Body, Query, DefaultValuePipe, ParseIntPipe, Get} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiTags} from "@nestjs/swagger";
import {firstValueFrom} from "rxjs";
import {IApiResponse} from "../../applications/assets/interface/api-response.interface";
import {RMQ_CLIENT, RMQ_TARGET} from "../../applications/assets/enum/rmq.enum";
import {TaskDTO} from "../../applications/assets/dtos/task.dto";
import {ApiResponseBuilder} from "../../applications/assets/response/api.response";

@ApiTags("Task")
@Controller('task')
export class TaskController {
  private readonly logger = new Logger(TaskController.name);

  constructor(
    @Inject(RMQ_CLIENT.TASK_SERVICE) private readonly taskServiceClient: ClientProxy
  ) {}

  @Post('/create')
  public async create(@Body() payload: TaskDTO): Promise<IApiResponse<TaskDTO>> {
    try {
      const response: IApiResponse<TaskDTO> = await firstValueFrom(
        this.taskServiceClient.send<IApiResponse<TaskDTO>>(RMQ_TARGET.CREATE_TASK, payload)
      );
      return response;
    } catch (err) {
      this.logger.error(err);
      return ApiResponseBuilder.setMessage("Error!").setInfo(err).setStatusCode(500).build();
    }
  }
  @Get('/all')
  public async tasks(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ): Promise<IApiResponse<TaskDTO>> {
    try {
      const response: IApiResponse<TaskDTO> = await firstValueFrom(
        this.taskServiceClient.send<IApiResponse<TaskDTO>>(RMQ_TARGET.GET_TASKS, {page, limit})
      );
      return response;
    } catch (err) {
      this.logger.error(err);
      return ApiResponseBuilder.setMessage("Error!").setInfo(err).setStatusCode(500).build();
    }
  }

}
