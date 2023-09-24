import {Controller, Inject, Post, Get, Logger, Body, Query, DefaultValuePipe, ParseIntPipe} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiTags} from "@nestjs/swagger";
import {firstValueFrom} from "rxjs";
import {GetProjectDTO, ProjectDTO} from "../../applications/assets/dtos/project.dto";
import {IApiResponse} from "../../applications/assets/interface/api-response.interface";
import {RMQ_CLIENT, RMQ_TARGET} from "../../applications/assets/enum/rmq.enum";
import {IProjects} from "../../applications/assets/interface/project.interface";
import {ApiResponseBuilder} from "../../applications/assets/response/api.response";

@ApiTags("Project")
@Controller('project')
export class ProjectController {
  private readonly logger = new Logger();
  constructor(@Inject(RMQ_CLIENT.TASK_SERVICE) private readonly taskServiceClient: ClientProxy) {
  }

  @Post('/create')
  public async create(@Body() payload: ProjectDTO): Promise<IApiResponse<ProjectDTO>> {
    try {
      return await firstValueFrom(
        this.taskServiceClient.send<IApiResponse<ProjectDTO>>(RMQ_TARGET.CREATE_PROJECT, payload)
      );
    } catch (err) {
      this.logger.error(err);
      return ApiResponseBuilder.setMessage("Error!").setInfo(err).setStatusCode(500).build();
    }
  }

  @Get('/all')
  public async projects(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ): Promise<IApiResponse<IProjects>> {
    try {
      return await firstValueFrom(
        this.taskServiceClient.send<IApiResponse<IProjects>>(RMQ_TARGET.GET_PROJECTS, { page, limit})
      );
    } catch (err) {
      this.logger.error(err);
      return ApiResponseBuilder.setMessage("Error!").setInfo(err).setStatusCode(500).build();
    }
  }

}
