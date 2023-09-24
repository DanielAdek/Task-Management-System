import {ITask} from "./task.interface";

export interface IProject {
  id: string;
  title: string;
  description: string;
  userId: string
}

export interface IProjects extends IProject {
  tasks: ITask[]
}

// Project ProjectService
export interface IProjectService {
  createProject(project: IProject): void;
  getAllProjects(): IProjects[];
  deleteProject(id: string): void;
}

export interface IProjectParam {
  limit: number;
  page: number;
}