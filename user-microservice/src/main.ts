import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {Logger} from "@nestjs/common";

const logger: Logger = new Logger();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://nifgfcyd:XjzIKX8FXA5jWTd3imueuIKXwx_aDYeQ@moose.rmq.cloudamqp.com/nifgfcyd'],
      queue: 'user_queue',
      queueOptions: {
        durable: false
      },
    },
  })
  await app.listen();
  logger.log("USER MICROSERVICE LISTENING!");
}
(async function (): Promise<void> {
  await bootstrap();
})();
