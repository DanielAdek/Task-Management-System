import {IsNotEmpty, IsDate, IsEnum, IsUUID, IsBoolean} from 'class-validator';
import {TASK_PRIORITY} from "../enum/task.enum";

export class TaskDTO {
  @IsUUID()
  readonly id: string;

  @IsNotEmpty({ message: 'Title is required' })
  readonly title: string;

  @IsNotEmpty({ message: 'description is required' })
  readonly description: string;

  @IsDate({ message: "Invalid Date"})
  @IsNotEmpty({ message: 'deadline is required' })
  readonly deadline: Date;

  @IsEnum(TASK_PRIORITY)
  readonly priority: string;

  @IsUUID()
  @IsNotEmpty({ message: 'assignee id is required' })
  readonly assignee: string

  @IsUUID()
  @IsNotEmpty({ message: 'creator Id is required' })
  readonly creator: string;

  @IsUUID()
  @IsNotEmpty({ message: 'project Id is required' })
  readonly projectId: string;

  @IsBoolean()
  readonly onDueNotify: boolean;
}