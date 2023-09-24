import {HttpStatus} from "@nestjs/common";
import {ResponseStatus} from "../enum/response.enum";

export class ApiResponse {
  private readonly data;

  constructor() {
    this.data = new Map();
  }

  public setData(value: object): ApiResponse {
    this.data.set("data", value);
    return this;
  }

  public setMessage(value: string): ApiResponse {
    this.data.set("message", value);
    return this;
  }

  public setStatus(value: boolean): ApiResponse {
    this.data.set("status", value);
    return this;
  }

  public setStatusCode(value: HttpStatus): ApiResponse {
    this.data.set("statusCode", value);
    return this;
  }

  public setInfo(value: string): ApiResponse {
    this.data.set("info", value);
    return this;
  }

  public default(): ApiResponse {
    this.setMessage(ResponseStatus.SUCCESS).setStatus(true).setStatusCode(HttpStatus.OK);
    return this;
  }

  public build() {
    return Object.fromEntries(this.data);
  }
}

export const ApiResponseBuilder = new ApiResponse();