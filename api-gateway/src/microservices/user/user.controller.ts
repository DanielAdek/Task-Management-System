import {Controller, Inject, Post, Logger, Body} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";
import {CreateUser} from "../../applications/dtos/create-user";
import {ApiResponseBuilder} from "../../applications/response/api.response";
import {RMQ_EVENT, RMQ_EVENT_TARGET} from "../../applications/interface/event-rmq.interface";
import {IApiResponseBuilder} from "../../applications/interface/api-response.interface";

@Controller('user')
export class UserController {
  private readonly logger = new Logger();
  constructor(@Inject(RMQ_EVENT_TARGET.USER_SERVICE) private readonly userServiceClient: ClientProxy) {
  }

  @Post('/register')
  public async createUser(@Body() payload: CreateUser): Promise<IApiResponseBuilder> {
    try {
      const response: IApiResponseBuilder = await firstValueFrom(
        this.userServiceClient.send<IApiResponseBuilder>(RMQ_EVENT.CREATE_USER, payload)
      );
      return ApiResponseBuilder.default().setData(response).build();
    } catch (err) {
      this.logger.error(err.message);

      return ApiResponseBuilder.setMessage("Error!").setInfo(err.message).setStatusCode(500).build();
    }
  }
}
