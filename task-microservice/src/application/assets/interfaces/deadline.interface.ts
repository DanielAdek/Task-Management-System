export interface IDeadLinesHistory {
  taskId: string;
  oldDueDate: Date;
  newDueDate: Date;
  updatedBy: string; // User who made the update
  createdAt: Date; // Timestamp of when the creation was made
  updatedAt: Date; // Timestamp of when the update was made
}

// DueDateHistory ProjectService
export interface IDeadLinesHistoryService {
  getHistoryForTask(taskId: string): IDeadLinesHistory[];
  addDueDateHistory(history: IDeadLinesHistory): void;
}