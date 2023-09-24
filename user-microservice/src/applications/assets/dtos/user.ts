import {IsEmail, IsNotEmpty, IsUUID, Length} from 'class-validator';
import {User} from "../../../domain/user-entity.model";

export class UserDTO {
  @IsUUID()
  id: string;

  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 255, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;

  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 255, {
    message: 'Name must be at least 3 characters long',
  })
  username: string;


  private static userEntity(dto: Partial<UserDTO>) {
    const user_dto = new UserDTO();
    user_dto.id = dto.id;
    user_dto.username = dto.username;
    user_dto.email = dto.email;
    return user_dto;
  }

  public static composeFromEntity(entity: User) {
    return this.userEntity({
      id: entity.id,
      username: entity.username,
      email: entity.email
    });
  }
}