import { Injectable } from '@nestjs/common';
import {ApiResponseBuilder} from "./applications/assets/response/api.response";
import {IApiResponseBuilder} from "./applications/assets/interface/api-response.interface";

@Injectable()
export class AppService {
  getHello(): IApiResponseBuilder {
    return ApiResponseBuilder.default().setMessage("Welcome").build();
  }
}
