import Organizer from 'domain/entities/organizer';
import { ObjectId } from 'mongoose';

interface OrganizerRepository {
  createOrganizer(organizer: Organizer): Promise<Organizer>;
  getOrganizerById(id: ObjectId): Promise<Organizer | null>;
  getOrganizerByEmail(email: string): Promise<Organizer | null>;
  // updateOrganizer(organizer: Organizer): Promise<Organizer>;
  deleteOrganizer(id: ObjectId): Promise<void>;
}

export default OrganizerRepository;
