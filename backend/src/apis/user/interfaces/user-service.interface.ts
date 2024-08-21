import { CreateUserInput } from '../dto/create-user.input.dto';
import { UpdatePasswordInput } from '../dto/update-userpassword.input.dto';

export class IUserCreateUser {
  createUserInput: CreateUserInput;
}

export class IUserEmail {
  email: string;
}

export class IUserUpdatePassword {
  updatePasswordInput: UpdatePasswordInput;
}
