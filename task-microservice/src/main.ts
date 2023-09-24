import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {InternalServerErrorException, Logger} from "@nestjs/common";
import {AppModule} from './app.module';
import {envManager} from "./application/assets/config/env.config.manager";

const logger: Logger = new Logger("MAIN:TASK");

async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [envManager.getEnvValue("RMQ_URL")],
        queue: 'task_queue',
        queueOptions: {
          durable: false
        },
      },
    });
    await app.listen();
    logger.log("MICROSERVICE LISTENING!");
  } catch (error) {
    throw new InternalServerErrorException(error)
  }
}
(async function (): Promise<void>{
  await bootstrap();
})();
