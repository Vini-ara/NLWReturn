import { NextFunction, Request, Response } from 'express';

import { PrismaUserRepository } from '../repositories/prisma/prisma-users-repository';

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const prismaUserRepository = new PrismaUserRepository();
   
  const { user_email } = req;

  const user_info = await prismaUserRepository.getUserByEmail(user_email);

  if(user_info && user_info.role === 'admin') {
    return next();
  }

  return res.status(401).send();
}
