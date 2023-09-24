import {Controller, Inject, Post, Logger, Body, Get, InternalServerErrorException} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";
import {ApiTags} from "@nestjs/swagger";
import {UserDto} from "../../applications/assets/dtos/user.dto";
import {ApiResponseBuilder} from "../../applications/assets/response/api.response";
import {RMQ_CLIENT, RMQ_TARGET} from "../../applications/assets/enum/rmq.enum";
import {IApiResponse} from "../../applications/assets/interface/api-response.interface";

@ApiTags("User")
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    @Inject(RMQ_CLIENT.USER_SERVICE) private readonly userServiceClient: ClientProxy
  ) {}

  @Post('/register')
  public async createUser(@Body() payload: UserDto): Promise<IApiResponse<object>> {
    try {
      const response: IApiResponse<object> = await firstValueFrom(
        this.userServiceClient.send<IApiResponse<object>>(RMQ_TARGET.CREATE_USER, payload)
      );
      return response;
    } catch (err) {
      this.logger.error(err);
      return ApiResponseBuilder.setMessage("Error!").setInfo(err).setStatusCode(500).build();
    }
  }
}
