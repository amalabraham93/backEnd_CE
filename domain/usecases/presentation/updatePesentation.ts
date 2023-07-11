import PresentationRepository from '../../repositories/presentationRepository';
import Presentation from '../../entities/presentation';
import { ObjectId } from 'mongoose';

class UpdatePresentationUseCase {
  private presentationRepository: PresentationRepository;

  constructor(presentationRepository: PresentationRepository) {
    this.presentationRepository = presentationRepository;
  }

  async execute(presentationId: ObjectId, updatedPresentations: Presentation): Promise<Presentation | null> {
    // Retrieve the existing presentation from the repository
    const existingPresentation = await this.presentationRepository.getPresentationById(presentationId);

    if (!existingPresentation) {
      // Presentation not found
      return null;
    }

    // Update the properties of the existing presentation
    existingPresentation.stream_key = updatedPresentations.stream_key;
    existingPresentation.start_time = updatedPresentations.start_time;
    existingPresentation.end_time = updatedPresentations.end_time;
    existingPresentation.created_at = updatedPresentations.created_at;
    existingPresentation.papers = updatedPresentations.papers;
    existingPresentation.conference = updatedPresentations.conference;
    existingPresentation.authors = updatedPresentations.authors;

    // Save the updated presentation to the repository
    const updatedPresentation = await this.presentationRepository.updatePresentation(existingPresentation);

    return updatedPresentation;
  }
}

export default UpdatePresentationUseCase;
