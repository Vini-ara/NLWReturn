import { UsersRepository } from '../repositories/users-repository'
import { hash } from 'bcryptjs';

interface SubmitUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export class SubmitUserUseCase {
  constructor (
    private UsersRepository: UsersRepository,
  ) {}

  async execute(data: SubmitUserUseCaseRequest) {
    const { name, email, password, role } = data;

    const passwordHash = await hash(password, 10);

    const userExists = await this.UsersRepository.getUserByEmail(email);

    if(userExists) {
      throw new Error("Email already signed to a account");
    }
    
    await this.UsersRepository.create({
      name, 
      email, 
      password: passwordHash,
      role
    })
  }
}
