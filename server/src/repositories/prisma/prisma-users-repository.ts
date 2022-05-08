import { UserCreateData, UsersRepository, GetUser } from '../users-repository';
import { prisma } from '../../prisma';

export class PrismaUserRepository implements UsersRepository {
  async create (data: UserCreateData) {
    const { name, email, role, password } = data;
     
    await prisma.user.create({
      data: {
        name,
        email,
        role,
        password
      }
    })
  };

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }, 
      select: {
        name: true,
        email: true,
        role: true,
        password: true
      }
    })

    return user
  };
}
