import PresentationRepository from '../../repositories/presentationRepository';
import Presentation from '../../entities/presentation';
import { ObjectId } from 'mongoose';

class GetPresentationByIdUseCase {
  private presentationRepository: PresentationRepository;

  constructor(presentationRepository: PresentationRepository) {
    this.presentationRepository = presentationRepository;
  }

  // async execute(presentationId: ObjectId): Promise<Presentation | null> {
  //   // Retrieve the presentation by its ID from the repository
  //   const presentation = await this.presentationRepository.getPresentationById(
  //     presentationId
  //   );

  //   return presentation;
  // }
}

export default GetPresentationByIdUseCase;
