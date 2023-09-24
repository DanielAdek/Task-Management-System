import {IsNotEmpty, IsUUID} from 'class-validator';

export class ProjectDto {
  @IsNotEmpty({ message: 'Title is required' })
  readonly title: string;

  @IsNotEmpty({ message: 'description is required' })
  readonly description: string;

  @IsUUID()
  readonly creator: string
}