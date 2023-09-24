import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScheduleModule} from "@nestjs/schedule";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './application/project/project.module';
import {typeormConfigManager} from "./application/assets/config/typeorm.config.manger";
import {TaskModule} from "./application/task/task.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeormConfigManager.getTypeOrmConfig()
    }),
    ScheduleModule.forRoot(),
    ProjectModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
