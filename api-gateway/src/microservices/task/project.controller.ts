import {Controller, Inject, Post, Logger, Body} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";
import {CreateProjectDto} from "../../applications/dtos/create-project";
import {ApiResponseBuilder} from "../../applications/response/api.response";
import {IApiResponseBuilder} from "../../applications/interface/api-response.interface";
import {RMQ_CLIENT, RMQ_TARGET} from "../../applications/enum/rmq.enum";

@Controller('user')
export class UserController {
  private readonly logger = new Logger();
  constructor(@Inject(RMQ_CLIENT.TASK_SERVICE) private readonly taskServiceClient: ClientProxy) {
  }

  @Post('/register')
  public async createUser(@Body() payload: CreateProjectDto): Promise<IApiResponseBuilder> {
    try {
      const response: IApiResponseBuilder = await firstValueFrom(
        this.taskServiceClient.send<IApiResponseBuilder>(RMQ_TARGET.CREATE_PROJECT, payload)
      );
      return ApiResponseBuilder.default().setData(response).build();
    } catch (err) {
      this.logger.error(err.message);

      return ApiResponseBuilder.setMessage("Error!").setInfo(err.message).setStatusCode(500).build();
    }
  }
}
