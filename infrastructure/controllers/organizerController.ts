import { Request, Response } from 'express';
import CreateOrganizer from 'domain/usecases/createOrganizer';

class organizerController {
  private createOrganizer: CreateOrganizer;

  constructor(createOrganizer: CreateOrganizer) {
    this.createOrganizer = createOrganizer;
  }

  async createOrganizerHandler(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      // Validate the input data here if needed

      const organizer = await this.createOrganizer.execute( name, email, password );

      res.status(201).json(organizer);
    } catch (error) {
      console.error('Error creating organizer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default organizerController;
