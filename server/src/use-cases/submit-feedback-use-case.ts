import { FeedbacksRepository } from '../repositories/feedbacks-repository';
import { MailAdapter } from '../adapters/mail-adapter';
import { CustomError } from '../models/custom-error-model';

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string | null;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type) throw new CustomError('Type is required', 400);
    
    if(!comment) throw new CustomError('Comment is required', 400);

    if(screenshot && !screenshot.startsWith('data:image/png;base64')) throw new CustomError('Invalid screenshot format', 400);

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot 
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style"font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentario: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : ``,
        `</div>`
      ].join('\n')
    })
  }
}
