import express from 'express';
import OrganizerController from '../controllers/organizerController';
import LoginOrganizerUseCase from '../../domain/usecases/loginOrganizer';
import CreateOrganizerUseCase from '../../domain/usecases/createOrganizer';
import MongooseOrganizerRepository from '../../infrastructure/database/repositories/mongooseOrganizerRepository';
import MongooseConferenceRepository from '../../infrastructure/database/repositories/mongooseConference';
import CreateConferenceUseCase from '../../domain/usecases/conference.ts/createConference';
import ConferenceController from '../../infrastructure/controllers/conferenceController';
import GetAllConfByOrgUseCase from '../../domain/usecases/conference.ts/getConfByOrg';
import GetConfByIdUseCase from '../../domain/usecases/conference.ts/getConfById';


const organizerRouter = express.Router();
//Organizer
const organizerRepository = new MongooseOrganizerRepository()
const loginOrganizerUseCase = new LoginOrganizerUseCase(organizerRepository)
const createOrganizer = new CreateOrganizerUseCase(organizerRepository);
const organizerController = new OrganizerController(createOrganizer,loginOrganizerUseCase);

//conference
const conferenceRepository = new MongooseConferenceRepository()
const createConference = new CreateConferenceUseCase(conferenceRepository)
const getConferencesByOrganizerId = new GetAllConfByOrgUseCase(conferenceRepository);
const getConferenceById =  new GetConfByIdUseCase(conferenceRepository)
const conferenceController = new ConferenceController(createConference,getConferencesByOrganizerId, getConferenceById)

// POST /organizers
organizerRouter.post('/signup', organizerController.createOrganizerHandler);

organizerRouter.post('/login', organizerController.loginHandler);

organizerRouter.post('/create-conference', conferenceController.CreateConferenceHandler)
organizerRouter.get('/conferences', conferenceController.getConferencesByOrganizerIdHandler);
organizerRouter.get('/conferences/:confId', conferenceController.getConfByIdHandler);



export default organizerRouter;
