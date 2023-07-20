import { Request, Response } from 'express';
import CreateAdminUseCase from '../../domain/usecases/admin/createAdmin';

class AdminController {
  private createAdmin: CreateAdminUseCase;

  constructor(createAdmin: CreateAdminUseCase) {
    this.createAdmin = createAdmin;
  }

  async createAdminHandler(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password,role } = req.body;

      const admin = await this.createAdmin.execute( name, email, password ,role);

      res.status(201).json(admin);
    } catch (error) {
      console.error('Error creating admin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default AdminController;
