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
import AddReviewerUseCase from '../../domain/usecases/conference/addReviewer';
import NodeMailerService from '../../infrastructure/services/NodeMailerService';
import ReviewerLoginUseCase from '../../domain/usecases/conference/reviewerLogin';
import GetConfByUserUseCase from '../../domain/usecases/conference/getByUserId';
import GetByUserIdUseCase from '../../domain/usecases/paper/getByUserId';
import GetPaperByIdUseCase from '../../domain/usecases/paper/getById';
import UpdateAproovedUseCase from '../../domain/usecases/paper/updateApproved';
import PresentationController from '../../infrastructure/controllers/presentationController';
import CreatePresentationUseCase from '../../domain/usecases/presentation/createPresentation';
import MongoosePresentationRepository from '../../infrastructure/database/repositories/mongoosePresentationRepository';
import SocketService from '../../infrastructure/services/socketIoService';
import UpdateConferenceUseCase from '../../domain/usecases/conference/updateConference';

const organizerRouter = express.Router();


const useRepository = new MongooseUserRepository()
//Organizer
const organizerRepository = new MongooseOrganizerRepository()
const loginOrganizerUseCase = new LoginOrganizerUseCase(organizerRepository)
const createOrganizer = new CreateOrganizerUseCase(organizerRepository);
const organizerController = new OrganizerController(createOrganizer,loginOrganizerUseCase);

//conference
const conferenceRepository = new MongooseConferenceRepository()
const emailService =  new NodeMailerService()
const createConference = new CreateConferenceUseCase(conferenceRepository)
const getConferencesByOrganizerId = new GetAllConfByOrgUseCase(conferenceRepository);
const getConferenceById =  new GetConfByIdUseCase(conferenceRepository)
const getAllConference = new GetAllConfUseCase (conferenceRepository)
const registerConfUse = new RegisterConfUserUseCase(conferenceRepository)
const addReviewer = new AddReviewerUseCase(conferenceRepository,emailService)
const reviewerLogin = new ReviewerLoginUseCase(conferenceRepository)
const getConfByUserId = new GetConfByUserUseCase(conferenceRepository)
const updateConference =new UpdateConferenceUseCase(conferenceRepository)
const conferenceController = new ConferenceController(createConference,getConferencesByOrganizerId, getConferenceById,getAllConference,registerConfUse,useRepository,addReviewer,reviewerLogin,getConfByUserId,updateConference)

//papers
const userRepository = new MongooseUserRepository();
const paperRepository = new MongoosePaperRepository()
const createPaper = new CreatePaperUseCase(paperRepository)
const getPaperrByConfId = new GetByIdUseCase(paperRepository)
const getPaperByUserId = new GetByUserIdUseCase(paperRepository)
const getPaperById = new GetPaperByIdUseCase(paperRepository)
const updateAccepted = new UpdateAproovedUseCase (paperRepository)
const paperController = new PaperController(createPaper, paperRepository, userRepository,getPaperrByConfId,getPaperByUserId,getPaperById,updateAccepted)

//presentaion
const presentationRepository = new MongoosePresentationRepository()
const createPresentation = new CreatePresentationUseCase(presentationRepository,emailService,conferenceRepository)
const socketIoService = new SocketService(presentationRepository)
const presentaionController = new PresentationController(createPresentation,socketIoService)




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
organizerRouter.post('/conference/add-reviewer', conferenceController.addReviewerHandler);
organizerRouter.post('/conference/reviewer-login', conferenceController.reviewerLoginHandler);
organizerRouter.get('/conference/users-conf', conferenceController.getConferencesByUserIdHandler);
organizerRouter.put('/conference/update-conf/:id', conferenceController.updateConferenceHandler);


//paper
organizerRouter.post('/conference/:confId/paper-submit',paperController.createPaperHandler)
organizerRouter.get('/conference/:confId/getpaper',paperController.getPaperByConfIdHandler)
organizerRouter.get('/conference/getpaper-user',paperController.getPaperByUserIdHandler)
organizerRouter.get('/conference/getpaperbyid/:paperId',paperController.getPaperByIdHandler)
organizerRouter.post('/conference/updategetpaperbyid/:paperId',paperController.updateAcceptedHandler)

//presentation
 organizerRouter.post('/presentation/start', presentaionController.createPresentationHandler);


export default organizerRouter;
