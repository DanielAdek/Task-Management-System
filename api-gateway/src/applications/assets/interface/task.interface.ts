export interface ITask {
  id: string;
  title: string;
  description: string;
  deadline: Date
  status: string;
  assignee: string;
  creator: string; // id of task creator
  projectId: string; // Added field for project association
}