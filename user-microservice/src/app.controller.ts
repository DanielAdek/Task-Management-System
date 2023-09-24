import {Controller, Get} from '@nestjs/common';
import {AppService} from "./app.service";
import {MessagePattern} from "@nestjs/microservices";

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {
  }
  @MessagePattern("#test-user-micro")
  getHello(): string {
    return this.appService.getHello();
  }
}
