import { Injectable } from '@nestjs/common';
import {ApiResponseBuilder} from "./applications/response/api.response";
import {IApiResponseBuilder} from "./applications/interface/api-response.interface";

@Injectable()
export class AppService {
  getHello(): IApiResponseBuilder {
    return ApiResponseBuilder.default().setMessage("Welcome").build();
  }
}
