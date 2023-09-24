import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {Logger} from "@nestjs/common";
import {AppModule} from './app.module';
import {typeormConfigManager} from "./application/assets/config/typeorm.config.manger";
import {envManager} from "./application/assets/config/env.config.manager";

const logger: Logger = new Logger("MAIN:NOTIFICATION");

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [envManager.getEnvValue('RMQ_URL')],
      queue: 'notify_queue',
      queueOptions: {
        durable: false
      },
    },
  })
  await app.listen();
  logger.log("MICROSERVICE LISTENING!");
}
(async function (): Promise<void> {
  await bootstrap();
})();