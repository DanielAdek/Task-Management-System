import 'dotenv/config';
import { Module } from '@nestjs/common';
import {ClientsModule, Transport} from "@nestjs/microservices";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './microservices/user/user.controller';
import {RMQ_CLIENT} from "./applications/assets/enum/rmq.enum";
import {ProjectController} from "./microservices/task/project.controller";
import {TaskController} from "./microservices/task/task.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RMQ_CLIENT.USER_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'user_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: RMQ_CLIENT.TASK_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'task_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [AppController, UserController, ProjectController, TaskController],
  providers: [AppService],
})
export class AppModule {}
