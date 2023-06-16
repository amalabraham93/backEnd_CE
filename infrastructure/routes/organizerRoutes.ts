import express from 'express';
import OrganizerController from '../controllers/organizerController';
import LoginOrganizerUseCase from '../../domain/usecases/loginOrganizer';
import CreateOrganizerUseCase from '../../domain/usecases/createOrganizer';
import MongooseOrganizerRepository from '../../infrastructure/database/repositories/mongooseOrganizerRepository';

const organizerRouter = express.Router();

const organizerRepository = new MongooseOrganizerRepository()
const loginOrganizerUseCase = new LoginOrganizerUseCase(organizerRepository)
const createOrganizer = new CreateOrganizerUseCase(organizerRepository);
const organizerController = new OrganizerController(createOrganizer,loginOrganizerUseCase);

// POST /organizers
organizerRouter.post('/signup', organizerController.createOrganizerHandler);

organizerRouter.post('/login', organizerController.loginHandler);

export default organizerRouter;
