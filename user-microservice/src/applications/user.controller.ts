import {Body, Controller} from '@nestjs/common';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import { UserService } from './user.service';
import {UserDTO} from "./assets/dtos/user";
import {LoginUserDto} from "./assets/dtos/login";
import {RMQ_TARGET} from "./assets/enums/rmq.enum";
import {IApiResponse} from "./assets/interface/api-response.interface";
import {GetUserDTO} from "./assets/dtos/get-user-dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern(RMQ_TARGET.CREATE_USER)
  public async create(@Payload() payload: UserDTO): Promise<IApiResponse> {
    return this.userService.registerUserAsync(payload)
  }


  @EventPattern(RMQ_TARGET.LOGIN_USER)
  public async login(@Body() payload: LoginUserDto): Promise<IApiResponse> {
    return this.userService.loginUserAsync(payload)
  }

  @MessagePattern(RMQ_TARGET.GET_USER)
  public async getUser(@Body() payload: GetUserDTO): Promise<IApiResponse> {
    return this.userService.getUserAsync(payload)
  }
}
