import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import {Project} from "../../domain/project/proj-entity.model";


@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
