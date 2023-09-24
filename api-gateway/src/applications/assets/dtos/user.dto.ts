import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 255, {
    message: 'Password must be at least 8 characters long',
  })
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 255, {
    message: 'Name must be at least 3 characters long',
  })
  readonly username: string;
}