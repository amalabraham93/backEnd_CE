import Organizer from 'domain/entities/organizer';

interface OrganizerRepository {
  createOrganizer(organizer: Organizer): Promise<Organizer>;
  getOrganizerById(id: string): Promise<Organizer | null>;
  getOrganizerByEmail(email: string): Promise<Organizer | null>;
  // updateOrganizer(organizer: Organizer): Promise<Organizer>;
  deleteOrganizer(id: string): Promise<void>;
}

export default OrganizerRepository;
