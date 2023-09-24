import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {TaskService} from './task.service';
import {TaskController} from './task.controller';
import {Task} from "../../domain/task/task-entity.model";
import {RMQ_CLIENT} from "../assets/enum/rmq.enum";
import {Project} from "../../domain/project/proj-entity.model";


@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Project]),
    ClientsModule.register([
      {
        name: RMQ_CLIENT.NOTIFICATION_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'notify_queue',
          queueOptions: {
            durable: false
          },
        }
      },
      {
        name: RMQ_CLIENT.USER_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'user_queue',
          queueOptions: {
            durable: false
          },
        }
      },
    ])
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
