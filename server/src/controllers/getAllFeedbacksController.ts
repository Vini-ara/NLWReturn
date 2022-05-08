import { Request, Response } from 'express';

import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';
import { GetAllFedabcksUseCase } from '../use-cases/get-feedbacks-use-case';

export class GetAllFedabcksController {
    async handle(_: Request, res: Response) {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

    const feedback = new GetAllFedabcksUseCase(prismaFeedbacksRepository);

    const allFeedbacks = await feedback.execute();

    res.status(200).json(allFeedbacks);
  }
}
