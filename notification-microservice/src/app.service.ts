import { Injectable } from '@nestjs/common';
import {ApiResponseBuilder} from "./application/assets/response/api.response";
import {IApiResponse} from "./application/assets/interfaces/api-response.interface";

@Injectable()
export class AppService {
  getHello(): IApiResponse<object> {
    return ApiResponseBuilder.default().setMessage("Notification Service").build();
  }
}
