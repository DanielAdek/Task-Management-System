import {IsNotEmpty, IsNumber} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class ProjectDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'description is required' })
  readonly description: string;
}


export class GetProjectDTO {
  @IsNumber()
  readonly limit: number;

  @IsNumber()
  readonly page: number;
}