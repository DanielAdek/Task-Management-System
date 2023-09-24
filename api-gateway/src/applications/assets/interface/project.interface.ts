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