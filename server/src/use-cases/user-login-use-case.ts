import { UsersRepository } from '../repositories/users-repository';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import { CustomError } from '../models/custom-error-model';

interface UserLoginUseCaseRequest {
  email: string;
  password: string;
}

export class UserLoginUseCase {
  constructor (
    private UserRepository: UsersRepository,
  ) {}

  async execute(req: UserLoginUseCaseRequest) {
    const { email, password } = req;

    const user = await this.UserRepository.getUserByEmail(email);

    if(!user) throw new CustomError("User or Password invalid", 404);

    const validPassword = await compare(password, user.password);

    if(!validPassword) throw new CustomError("User or password invalid", 404);

    const token = sign({
      email: user.email,
    }, '4dd693a45f2fdff00dc174e586a31202', {
      expiresIn: '1d'
    });

    return token;
  }
}
