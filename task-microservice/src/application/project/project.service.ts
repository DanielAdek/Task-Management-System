import {Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { Project } from "../../domain/project/proj-entity.model";
import { ApiResponseBuilder } from "../assets/response/api.response";
import {ProjectDto} from "../assets/dtos/project.dto";
import {IApiResponse} from "../assets/interfaces/api-response.interface";
import {Task} from "../../domain/task/task-entity.model";
import {IProjectParam, IProjects} from "../assets/interfaces/project.interface";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class ProjectService {
  private logger: Logger = new Logger("ProjectService");

  constructor(
    @InjectRepository(Project)
    private readonly repository: Repository<Project>
  ) {
  }

  /**
   * @param createUserDto
   * @returns Promise(ApiResponseBuilder)
   */
  public async createProjectAsync(payload: ProjectDto): Promise<IApiResponse<typeof Project>> {
    try {
      const { title, description, creator } = payload;

      const proj_request: ProjectDto = Object.assign(new Project(), { title, description, creator });

      const project: Project = await this.repository.save(proj_request);

      return ApiResponseBuilder.default().setData(project).setStatusCode(201).build();
    } catch (error) {
      this.logger.error("Error:Register: " + error.message);
      return ApiResponseBuilder.setInfo(error.message).setStatus(false).setStatusCode(500).build();
    }
  }

  /**
   * @param IProjectParam
   * @returns Promise(ApiResponseBuilder)
   */
  public async getProjectsAsync(payload: IProjectParam): Promise<IApiResponse<Pagination<IProjects>>> {
    try {
      const searchOptions = { loadRelationIds: false, relations: ["tasks"]};

      const projects: Pagination<Project> = await paginate<Project>(this.repository, payload, searchOptions);

      return ApiResponseBuilder.default().setData(projects).build();
    } catch (error) {
      this.logger.error("Error:Get:Projects: " + error.message);
      return ApiResponseBuilder.setInfo(error.message).setStatus(false).setStatusCode(500).build();
    }
  }
}
