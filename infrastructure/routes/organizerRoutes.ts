import express from 'express';
import OrganizerController from '../controllers/organizerController';
import LoginOrganizerUseCase from '../../domain/usecases/organizer/loginOrganizer';
import CreateOrganizerUseCase from '../../domain/usecases/organizer/createOrganizer';
import MongooseOrganizerRepository from '../../infrastructure/database/repositories/mongooseOrganizerRepository';
import MongooseConferenceRepository from '../../infrastructure/database/repositories/mongooseConference';
import CreateConferenceUseCase from '../../domain/usecases/conference/createConference';
import ConferenceController from '../../infrastructure/controllers/conferenceController';
import GetAllConfByOrgUseCase from '../../domain/usecases/conference/getConfByOrg';
import GetConfByIdUseCase from '../../domain/usecases/conference/getConfById';
import GetAllConfUseCase from '../../domain/usecases/conference/getAllConferences';
import RegisterConfUserUseCase from '../../domain/usecases/conference/registerConfUser';
import MongooseUserRepository from '../../infrastructure/database/repositories/mongooseUserRepository';

const organizerRouter = express.Router();


const useRepository = new MongooseUserRepository()
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
const getAllConference = new GetAllConfUseCase (conferenceRepository)
const registerConfUse = new RegisterConfUserUseCase(conferenceRepository)

const conferenceController = new ConferenceController(createConference,getConferencesByOrganizerId, getConferenceById,getAllConference,registerConfUse,useRepository)

// POST /organizers
organizerRouter.post('/signup', organizerController.createOrganizerHandler);

organizerRouter.post('/login', organizerController.loginHandler);
organizerRouter.post('/logout', organizerController.logout);



//conference
organizerRouter.post('/create-conference', conferenceController.CreateConferenceHandler)
organizerRouter.get('/conferences', conferenceController.getConferencesByOrganizerIdHandler);
organizerRouter.get('/conferences/:confId', conferenceController.getConfByIdHandler);
organizerRouter.get('/get-all-conferences', conferenceController.getAllConferenceHandler);
organizerRouter.post('/conferece/register/:id', conferenceController.registerConfUserHandler);






export default organizerRouter;
