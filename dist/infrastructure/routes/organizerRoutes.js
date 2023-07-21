"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organizerController_1 = __importDefault(require("../controllers/organizerController"));
const loginOrganizer_1 = __importDefault(require("../../domain/usecases/organizer/loginOrganizer"));
const createOrganizer_1 = __importDefault(require("../../domain/usecases/organizer/createOrganizer"));
const mongooseOrganizerRepository_1 = __importDefault(require("../../infrastructure/database/repositories/mongooseOrganizerRepository"));
const mongooseConference_1 = __importDefault(require("../../infrastructure/database/repositories/mongooseConference"));
const createConference_1 = __importDefault(require("../../domain/usecases/conference/createConference"));
const conferenceController_1 = __importDefault(require("../../infrastructure/controllers/conferenceController"));
const getConfByOrg_1 = __importDefault(require("../../domain/usecases/conference/getConfByOrg"));
const getConfById_1 = __importDefault(require("../../domain/usecases/conference/getConfById"));
const getAllConferences_1 = __importDefault(require("../../domain/usecases/conference/getAllConferences"));
const registerConfUser_1 = __importDefault(require("../../domain/usecases/conference/registerConfUser"));
const mongooseUserRepository_1 = __importDefault(require("../../infrastructure/database/repositories/mongooseUserRepository"));
const mongoosePaperRepository_1 = __importDefault(require("../../infrastructure/database/repositories/mongoosePaperRepository"));
const createPaper_1 = __importDefault(require("../../domain/usecases/paper/createPaper"));
const paperController_1 = __importDefault(require("../../infrastructure/controllers/paperController"));
const getByConfId_1 = __importDefault(require("../../domain/usecases/paper/getByConfId"));
const addReviewer_1 = __importDefault(require("../../domain/usecases/conference/addReviewer"));
const NodeMailerService_1 = __importDefault(require("../../infrastructure/services/NodeMailerService"));
const reviewerLogin_1 = __importDefault(require("../../domain/usecases/conference/reviewerLogin"));
const getByUserId_1 = __importDefault(require("../../domain/usecases/conference/getByUserId"));
const getByUserId_2 = __importDefault(require("../../domain/usecases/paper/getByUserId"));
const getById_1 = __importDefault(require("../../domain/usecases/paper/getById"));
const updateApproved_1 = __importDefault(require("../../domain/usecases/paper/updateApproved"));
const presentationController_1 = __importDefault(require("../../infrastructure/controllers/presentationController"));
const createPresentation_1 = __importDefault(require("../../domain/usecases/presentation/createPresentation"));
const mongoosePresentationRepository_1 = __importDefault(require("../../infrastructure/database/repositories/mongoosePresentationRepository"));
const socketIoService_1 = __importDefault(require("../../infrastructure/services/socketIoService"));
const updateConference_1 = __importDefault(require("../../domain/usecases/conference/updateConference"));
const addSession_1 = __importDefault(require("../../domain/usecases/conference/addSession"));
const getPresentationByConfId_1 = __importDefault(require("../../domain/usecases/presentation/getPresentationByConfId"));
const organizerRouter = express_1.default.Router();
const useRepository = new mongooseUserRepository_1.default();
//Organizer
const organizerRepository = new mongooseOrganizerRepository_1.default();
const loginOrganizerUseCase = new loginOrganizer_1.default(organizerRepository);
const createOrganizer = new createOrganizer_1.default(organizerRepository);
const organizerController = new organizerController_1.default(createOrganizer, loginOrganizerUseCase);
//conference
const conferenceRepository = new mongooseConference_1.default();
const emailService = new NodeMailerService_1.default();
const createConference = new createConference_1.default(conferenceRepository);
const getConferencesByOrganizerId = new getConfByOrg_1.default(conferenceRepository);
const getConferenceById = new getConfById_1.default(conferenceRepository);
const getAllConference = new getAllConferences_1.default(conferenceRepository);
const registerConfUse = new registerConfUser_1.default(conferenceRepository);
const addReviewer = new addReviewer_1.default(conferenceRepository, emailService);
const reviewerLogin = new reviewerLogin_1.default(conferenceRepository);
const getConfByUserId = new getByUserId_1.default(conferenceRepository);
const updateConference = new updateConference_1.default(conferenceRepository);
const addSession = new addSession_1.default({ conferenceRepository });
const conferenceController = new conferenceController_1.default(createConference, getConferencesByOrganizerId, getConferenceById, getAllConference, registerConfUse, useRepository, addReviewer, reviewerLogin, getConfByUserId, updateConference, addSession);
//papers
const userRepository = new mongooseUserRepository_1.default();
const paperRepository = new mongoosePaperRepository_1.default();
const createPaper = new createPaper_1.default(paperRepository);
const getPaperrByConfId = new getByConfId_1.default(paperRepository);
const getPaperByUserId = new getByUserId_2.default(paperRepository);
const getPaperById = new getById_1.default(paperRepository);
const updateAccepted = new updateApproved_1.default(paperRepository);
const paperController = new paperController_1.default(createPaper, paperRepository, userRepository, getPaperrByConfId, getPaperByUserId, getPaperById, updateAccepted);
//presentaion
const presentationRepository = new mongoosePresentationRepository_1.default();
const createPresentation = new createPresentation_1.default(presentationRepository, emailService, conferenceRepository);
const getPresentationByConferenceId = new getPresentationByConfId_1.default(presentationRepository);
const socketIoService = new socketIoService_1.default(presentationRepository);
const presentaionController = new presentationController_1.default(createPresentation, socketIoService, getPresentationByConferenceId);
// POST /organizers
organizerRouter.post('/signup', organizerController.createOrganizerHandler);
organizerRouter.post('/login', organizerController.loginHandler);
organizerRouter.post('/logout', organizerController.logout);
//conference
organizerRouter.post('/create-conference', conferenceController.CreateConferenceHandler);
organizerRouter.get('/conferences', conferenceController.getConferencesByOrganizerIdHandler);
organizerRouter.get('/conferences/:confId', conferenceController.getConfByIdHandler);
organizerRouter.get('/get-all-conferences', conferenceController.getAllConferenceHandler);
organizerRouter.post('/conference/register/:id', conferenceController.registerConfUserHandler);
organizerRouter.post('/conference/add-reviewer', conferenceController.addReviewerHandler);
organizerRouter.post('/conference/reviewer-login', conferenceController.reviewerLoginHandler);
organizerRouter.get('/conference/users-conf', conferenceController.getConferencesByUserIdHandler);
organizerRouter.put('/conference/update-conf/:id', conferenceController.updateConferenceHandler);
organizerRouter.post('/conference/add-session', conferenceController.addSessionHandler);
//paper
organizerRouter.post('/conference/:confId/paper-submit', paperController.createPaperHandler);
organizerRouter.get('/conference/:confId/getpaper', paperController.getPaperByConfIdHandler);
organizerRouter.get('/conference/getpaper-user', paperController.getPaperByUserIdHandler);
organizerRouter.get('/conference/getpaperbyid/:paperId', paperController.getPaperByIdHandler);
organizerRouter.post('/conference/updategetpaperbyid/:paperId', paperController.updateAcceptedHandler);
//presentation
organizerRouter.post('/presentation/start', presentaionController.createPresentationHandler);
organizerRouter.get('/conference/:confId/presentation', presentaionController.getPresentationsByConferenceIdHandler);
exports.default = organizerRouter;
