import PresentationRepository from '../../repositories/presentationRepository';
import Presentation from '../../entities/presentation';
import { Types,ObjectId } from 'mongoose';

class GetPresentationsByConferenceIdUseCase {
  private presentationRepository: PresentationRepository;

  constructor(presentationRepository: PresentationRepository) {
    this.presentationRepository = presentationRepository;
  }

  async execute(conferenceId: Types.ObjectId): Promise<Presentation[]> {
    // Retrieve presentations by conference ID from the repository
    const presentations = await this.presentationRepository.getPresentationsByConferenceId(
      conferenceId
    );

    return presentations;
  }
}

export default GetPresentationsByConferenceIdUseCase;