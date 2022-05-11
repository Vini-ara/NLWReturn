import { Request, Response } from 'express';

import { NodemailerMailAdapter } from '../adapters/nodemailer/nodemailer-mail-adapter';
import { SubmitFeedbackUseCase } from '../use-cases/submit-feedback-use-case';

import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';


export class SubmitFeedbackController {
  async handle(req: Request, res: Response) {
    const { type, comment, screenshot } = req.body;

    const prismafeedbacksrepository = new PrismaFeedbacksRepository();

    const nodemailermailadapter = new NodemailerMailAdapter();

    const submit = new SubmitFeedbackUseCase(prismafeedbacksrepository, nodemailermailadapter)

    try {
      await submit.execute({
        type,
        comment,
        screenshot
      })

      return res.status(201).send();
    } catch (err: any) {
      return res.status(400).json({
        error: err.message
      })
    }
  }
}
