import {HttpStatus, Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../domain/user-entity.model";
import {UserDTO} from "./assets/dtos/user";
import {ApiResponseBuilder} from "./assets/response/api.response";
import {LoginUserDto} from "./assets/dtos/login";
import {GetUserDTO} from "./assets/dtos/get-user-dto";
import {IApiResponse} from "./assets/interface/api-response.interface";

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {
  }

  /**
   * @param createUserDto
   * @returns Promise(ApiResponse)
   */
  public async registerUserAsync(createUserDto: UserDTO): Promise<IApiResponse> {
    try {
      const { email, username, password } = createUserDto;

      const found = await this.repository.findOne({ where: { email } });

      if (found)
        return ApiResponseBuilder.setStatus(false)
          .setStatusCode(HttpStatus.CONFLICT)
          .setMessage("CONFLICT")
          .setInfo("Email Taken").build();

      const new_user: User = Object.assign(new User(), { email, username, password });

      const user: User = await this.repository.save(new_user);

      const userDto: UserDTO = UserDTO.composeFromEntity(user);

      return ApiResponseBuilder.default().setData(userDto).setStatusCode(201).build();
    } catch (error) {
      this.logger.error("Error:Register: " + error);
      return ApiResponseBuilder.setInfo(error.message).setStatus(false).setStatusCode(500).build();
    }
  }


  /**
   * @param  {unknown} loginUserDto
   * @returns Promise(ApiResponse)
   */
  public async loginUserAsync(loginPayload: LoginUserDto): Promise<IApiResponse> {
    try {
      const { email, password } = loginPayload;

      const user = await this.repository.findOne({ where: { email } });

      if (!user)
        return ApiResponseBuilder.setInfo("Bad Credential").setStatus(false).setStatusCode(401).build();

      const pass_match = await user.comparePassword(password);

      if (!pass_match)
        return ApiResponseBuilder.setInfo("Bad Credential!").setStatus(false).setStatusCode(401).build();

      // todo call token service
      const token = null;

      const userDto: UserDTO = UserDTO.composeFromEntity(user);

      return ApiResponseBuilder.default().setData({...userDto, token }).build();
    } catch (error) {
      this.logger.error("Error:Login: " + error.message);
      return ApiResponseBuilder.setInfo(error.message).setStatus(false).setStatusCode(500).build();
    }
  }

  /**
   * @param  {unknown} loginUserDto
   * @returns Promise(ApiResponse)
   */
  public async getUserAsync(payload:  GetUserDTO): Promise<IApiResponse> {
    try {
      const { id } = payload;

      const user: User = await this.repository.findOne({ where: { id } });

      if (!user)
        return ApiResponseBuilder.setInfo("User not found!").setStatus(false).setStatusCode(404).build();

      const userDto: UserDTO = UserDTO.composeFromEntity(user);

      return ApiResponseBuilder.default().setData(userDto).build();
    } catch (error) {
      this.logger.error("Error:GetUser: " + error.message);
      return ApiResponseBuilder.setInfo(error.message).setStatus(false).setStatusCode(500).build();
    }
  }

}
