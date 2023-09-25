export interface SendEmailTaskPayload {
  title: string;
  assignee: string;
  recipient: string;
  deadline?: Date;
}