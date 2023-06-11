import express from 'express';
import AdminController from '../controllers/adminController';
import MongooseAdminRepository from '../../infrastructure/database/repositories/mongooseAdminRepository';
import CreateAdminUseCase from '../../domain/usecases/createAdmin';

const adminRouter = express.Router();
const adminRepository = new MongooseAdminRepository()
const createAdmin = new CreateAdminUseCase(adminRepository)
const adminController = new AdminController(createAdmin);

// POST /admins
adminRouter.post('/', adminController.createAdminHandler);

// GET /admins/:id
// router.get('/:id', adminController.getAdminHandler);

// PUT /admins/:id
// router.put('/:id', adminController.updateAdminHandler);

// DELETE /admins/:id
// router.delete('/:id', adminController.deleteAdminHandler);

export default adminRouter;