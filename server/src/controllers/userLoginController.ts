import { Request, Response } from 'express';

import { UserLoginUseCase } from '../use-cases/user-login-use-case';

import { PrismaUserRepository } from '../repositories/prisma/prisma-users-repository';

export class UserLoginController {
  async handle(req: Request, res: Response) {
    const prismaUsersRepository = new PrismaUserRepository();

    const authenticate = new UserLoginUseCase(prismaUsersRepository);

    const token = await authenticate.execute(req.body);

    return res.status(200).json(token)
  }
}
