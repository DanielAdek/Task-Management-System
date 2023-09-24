import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import {ApiResponseBuilder} from "../applications/assets/response/api.response";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus ? exception.getStatus() : 500;

    const buildResponse = ApiResponseBuilder.setInfo("Internal Error").setMessage("Error").setStatusCode(500).build();

    response.status(status).json(buildResponse);
  }
}
