import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import { UserController } from './microservices/user/user.controller';
import {RMQ_EVENT_TARGET} from "./applications/interface/event-rmq.interface";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RMQ_EVENT_TARGET.USER_SERVICE,
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
        name: RMQ_EVENT_TARGET.TASK_SERVICE,
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
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
