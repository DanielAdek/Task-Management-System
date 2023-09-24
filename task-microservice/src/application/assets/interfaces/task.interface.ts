import {TASK_PRIORITY} from "../enum/task.enum";

export interface ITask {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  priority: TASK_PRIORITY;
  status: string;
  assignee: string;
  creator: string; // id of task creator
  projectId: string; // Added field for project association
}

export interface ITaskService {
  createTaskAsync(task: ITask): void;
  handleDueTasksAsync(): ITask[];
  assignTaskAsync(id: string): ITask | undefined;
  updateTask(id: string, updates: Partial<ITask>): void;
}