import { Request, Response } from "express";


import { SubmitUserUseCase } from '../use-cases/submit-user-use-case';
import { PrismaUserRepository } from '../repositories/prisma/prisma-users-repository';
import { UserLoginUseCase } from "../use-cases/user-login-use-case";

export class SubmitUserController {
  async handle(req: Request, res: Response) {
    const prismaUsersRepository = new PrismaUserRepository();

    const submit = new SubmitUserUseCase(prismaUsersRepository);

    const login = new UserLoginUseCase(prismaUsersRepository);

    try {
      await submit.execute(req.body);

      const user = await login.execute(req.body);

      return res.status(201).json(user);
    } catch(err: any) {
      return res.status(400).json({
        error: err.message
      })
    }
  }
}
