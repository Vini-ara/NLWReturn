import { UsersRepository } from '../repositories/users-repository';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

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

    if(!user) throw new Error("User or password invalid");

    const validPassword = await compare(password, user.password);

    if(!validPassword) throw new Error("User or password invalid");

    const token = sign({
      email: user.email,
    }, '4dd693a45f2fdff00dc174e586a31202', {
      expiresIn: '1d'
    });

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}
