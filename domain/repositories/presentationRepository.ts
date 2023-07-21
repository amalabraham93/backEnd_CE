import Presentation from '../entities/presentation';
import { ObjectId ,Types} from 'mongoose';

interface PresentationRepository {
  createPresentation(presentation: Presentation): Promise<Presentation>;
  // getPresentationById(_id: ObjectId): Promise<Presentation | null>;
  // updatePresentation(presentation: Presentation): Promise<Presentation>;
  // deletePresentation(_id: ObjectId): Promise<void>;
  // getAllPresentations(): Promise<Presentation[]>;
  getPresentationsByConferenceId(conferenceId: Types.ObjectId): Promise<Presentation[]>;
  // getPresentationsByAuthorId(authorId: ObjectId): Promise<Presentation[]>;
}

export default PresentationRepository;