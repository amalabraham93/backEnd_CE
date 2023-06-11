import express from 'express';
import OrganizerController from '../controllers/organizerController';
import CreateOrganizerUseCase from '../../domain/usecases/createOrganizer';
import MongooseOrganizerRepository from '../../infrastructure/database/repositories/mongooseOrganizerRepository';

const organizerRouter = express.Router();


const organizerRepository = new MongooseOrganizerRepository()
const createOrganizer = new CreateOrganizerUseCase(organizerRepository);
const organizerController = new OrganizerController(createOrganizer);

// POST /organizers
organizerRouter.post('/', organizerController.createOrganizerHandler);

// GET /organizers/:id
// router.get('/:id', organizerController.getOrganizerHandler);

// PUT /organizers/:id
// router.put('/:id', organizerController.updateOrganizerHandler);

// DELETE /organizers/:id
// router.delete('/:id', organizerController.deleteOrganizerHandler);

export default organizerRouter;
