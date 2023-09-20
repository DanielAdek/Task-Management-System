import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://nifgfcyd:XjzIKX8FXA5jWTd3imueuIKXwx_aDYeQ@moose.rmq.cloudamqp.com/nifgfcyd'],
          queue: 'user_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://nifgfcyd:XjzIKX8FXA5jWTd3imueuIKXwx_aDYeQ@moose.rmq.cloudamqp.com/nifgfcyd'],
          queue: 'task_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
