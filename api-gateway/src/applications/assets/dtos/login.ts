import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 255, {
    message: 'Password must be at least 8 characters long',
  })
  readonly password: string;
}