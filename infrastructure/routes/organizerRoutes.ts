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
import MongoosePaperRepository from '../../infrastructure/database/repositories/mongoosePaperRepository';
import CreatePaperUseCase from '../../domain/usecases/paper/createPaper';
import PaperController from '../../infrastructure/controllers/paperController';
import GetByIdUseCase from '../../domain/usecases/paper/getByConfId';

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

//papers
const userRepository = new MongooseUserRepository();
const paperRepository = new MongoosePaperRepository()
const createPaper = new CreatePaperUseCase(paperRepository)
const getPaperrByConfId = new GetByIdUseCase(paperRepository)
const paperController = new PaperController(createPaper, paperRepository, userRepository,getPaperrByConfId)







// POST /organizers
organizerRouter.post('/signup', organizerController.createOrganizerHandler);
organizerRouter.post('/login', organizerController.loginHandler);
organizerRouter.post('/logout', organizerController.logout);



//conference
organizerRouter.post('/create-conference', conferenceController.CreateConferenceHandler)
organizerRouter.get('/conferences', conferenceController.getConferencesByOrganizerIdHandler);
organizerRouter.get('/conferences/:confId', conferenceController.getConfByIdHandler);
organizerRouter.get('/get-all-conferences', conferenceController.getAllConferenceHandler);
organizerRouter.post('/conference/register/:id', conferenceController.registerConfUserHandler);


//paper
organizerRouter.post('/conference/:confId/paper-submit',paperController.createPaperHandler)
organizerRouter.get('/conference/:confId/getpaper',paperController.getPaperByConfIdHandler)



export default organizerRouter;
