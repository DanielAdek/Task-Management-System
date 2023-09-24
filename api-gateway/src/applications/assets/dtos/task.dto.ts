import {IsNotEmpty, IsDate, IsEnum, IsUUID, IsNumber} from 'class-validator';
import {TASK_PRIORITY} from "../enum/task.enum";
import {ApiProperty} from "@nestjs/swagger";

export class TaskDTO {
  @IsUUID()
  readonly id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'description is required' })
  readonly description: string;

  @ApiProperty()
  @IsDate({ message: "Invalid Date"})
  @IsNotEmpty({ message: 'deadline is required' })
  readonly deadline: Date;

  @ApiProperty()
  @IsEnum(TASK_PRIORITY)
  readonly priority: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'assignee is required' })
  readonly assignee: string

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'project Id is required' })
  readonly projectId: string;
}


export class TaskPaginationDTO {
  @ApiProperty()
  @IsNumber()
  readonly limit: number;

  @ApiProperty()
  @IsNumber()
  readonly page: number;
}