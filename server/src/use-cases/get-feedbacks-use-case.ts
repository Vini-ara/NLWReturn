import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface GetAllFeedbakcsUseCaseResponse {
  type: string;
  comment: string;
  screenshot?: string | null;
}

export class GetAllFedabcksUseCase {
  constructor (
    private feedbackRepository:  FeedbacksRepository,
  ) {}

  async execute() {
    const feedbacks: GetAllFeedbakcsUseCaseResponse[] = await  this.feedbackRepository.getAllFeedbacks();

    return feedbacks;
  }
}
