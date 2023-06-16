import mongoose from 'mongoose';
import Organizer from 'domain/entities/organizer';
import OrganizerRepository from 'domain/repositories/organizerRepository';

const OrganizerSchema = new mongoose.Schema({
  organizername: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const OrganizerModel = mongoose.model('organization', OrganizerSchema);

class MongooseOrganizerRepository implements OrganizerRepository {

  async createOrganizer(organizer: Organizer): Promise<Organizer> {
    const createdOrganizer = await OrganizerModel.create(organizer);
    return createdOrganizer.toObject();
  }

  async getOrganizerById(id: string): Promise<Organizer | null> {
    const foundOrganizer = await OrganizerModel.findById(id).exec();
    return foundOrganizer ? foundOrganizer.toObject() : null;
  }

  async getOrganizerByEmail(email: string): Promise<Organizer | null> {
    const foundOrganizer = await OrganizerModel.findOne({ email }).exec();
    return foundOrganizer ? foundOrganizer.toObject() : null;
  }

  // async updateOrganizer(organizer: Organizer): Promise<Organizer> {
  //   const updatedOrganizer = await OrganizerModel.findByIdAndUpdate(
  //     organizer.id,
  //     organizer,
  //     { new: true }
  //   ).exec();
  //   return updatedOrganizer ? updatedOrganizer.toObject() : null;
  // }

  async deleteOrganizer(id: string): Promise<void> {
    await OrganizerModel.findByIdAndDelete(id).exec();
  }
}

export default MongooseOrganizerRepository;
