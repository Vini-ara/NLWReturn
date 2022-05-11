import { Request, Response } from "express";


import { SubmitUserUseCase } from '../use-cases/submit-user-use-case';
import { PrismaUserRepository } from '../repositories/prisma/prisma-users-repository';

export class SubmitUserController {
  async handle(req: Request, res: Response) {
    const prismaUsersRepository = new PrismaUserRepository();

    const submit = new SubmitUserUseCase(prismaUsersRepository);

    try {
      await submit.execute(req.body);

      return res.status(201).send();
    } catch(err: any) {
      return res.status(400).json({
        error: err.message
      })
    }
  }
}
