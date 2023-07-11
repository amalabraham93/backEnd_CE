import PresentationRepository from '../../repositories/presentationRepository';
import Presentation from '../../entities/presentation';
import { ObjectId } from 'mongoose';

class CreatePresentationUseCase {
  private presentationRepository: PresentationRepository;

  constructor(presentationRepository: PresentationRepository) {
    this.presentationRepository = presentationRepository;
  }

  async execute(
    stream_key: string,
    end_time: Date,
    papers: ObjectId[],
    conference: ObjectId,
    authors: ObjectId[]
  ): Promise<Presentation> {
    // Create a new presentation entity
    const newPresentation = new Presentation(
      stream_key,
      end_time,
      papers,
      conference,
      authors
    );

    // Save the presentation to the database
    const createdPresentation = await this.presentationRepository.createPresentation(
      newPresentation
    );

    return createdPresentation;
  }
}

export default CreatePresentationUseCase;