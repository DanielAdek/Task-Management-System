import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import {Logger} from "@nestjs/common";
import { AppModule } from './app.module';
import {envManager} from "./applications/assets/config/env.config.manager";

const logger: Logger = new Logger("MAIN:USER");

async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [envManager.getEnvValue('RMQ_URL')],
        queue: 'user_queue',
        queueOptions: {
          durable: false
        },
      },
    })
    await app.listen();
    logger.log("MICROSERVICE LISTENING!");
  } catch (error) {
    logger.log(error.message);
  }
}
(async function (): Promise<void> {
  await bootstrap();
})();
