import {IsNotEmpty, IsUUID} from 'class-validator';

export class GetUserDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}