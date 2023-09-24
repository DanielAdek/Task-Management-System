import {IsNotEmpty, IsNumber} from 'class-validator';

export class ProjectDTO {
  @IsNotEmpty({ message: 'Title is required' })
  readonly title: string;

  @IsNotEmpty({ message: 'description is required' })
  readonly description: string;
}


export class GetProjectDTO {
  @IsNumber()
  readonly limit: number;

  @IsNumber()
  readonly page: number;
}