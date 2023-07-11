import PresentationRepository from '../../repositories/presentationRepository';
import Presentation from '../../entities/presentation';
import { ObjectId } from 'mongoose';

class GetPresentationsByAuthorIdUseCase {
  private presentationRepository: PresentationRepository;

  constructor(presentationRepository: PresentationRepository) {
    this.presentationRepository = presentationRepository;
  }

  async execute(authorId: ObjectId): Promise<Presentation[]> {
    // Retrieve presentations by author ID from the repository
    const presentations = await this.presentationRepository.getPresentationsByAuthorId(
      authorId
    );

    return presentations;
  }
}

export default GetPresentationsByAuthorIdUseCase;
