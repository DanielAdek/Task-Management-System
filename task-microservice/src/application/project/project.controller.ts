import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {ProjectService} from "./project.service";
import {ProjectDto} from "../assets/dtos/project.dto";
import {RMQ_TARGET} from "../assets/enum/rmq.enum";
import {IApiResponse} from "../assets/interfaces/api-response.interface";
import {Project} from "../../domain/project/proj-entity.model";
import {IProjectParam, IProjects} from "../assets/interfaces/project.interface";
import {Pagination} from "nestjs-typeorm-paginate";

@Controller('project')
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @MessagePattern(RMQ_TARGET.CREATE_PROJECT)
  public async create(@Payload() payload: ProjectDto): Promise<IApiResponse<typeof Project>> {
    return this.service.createProjectAsync(payload)
  }

  @MessagePattern(RMQ_TARGET.GET_PROJECTS)
  public async projects(@Payload() payload: IProjectParam): Promise<IApiResponse<Pagination<IProjects>>> {
    return this.service.getProjectsAsync(payload)
  }
}
