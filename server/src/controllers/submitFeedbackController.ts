import { Request, Response } from 'express';

import { NodemailerMailAdapter } from '../adapters/nodemailer/nodemailer-mail-adapter';
import { SubmitFeedbackUseCase } from '../use-cases/submit-feedback-use-case';

import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';


export class SubmitFeedbackController {
  async handle(req: Request, res: Response) {
    try {

    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submit = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter)

    await submit.execute({
      type,
      comment,
      screenshot
    })

    return res.status(201).send();
    } catch (err) {
      console.log(err) 

      return res.status(500).send(err);
    }
  }
}
