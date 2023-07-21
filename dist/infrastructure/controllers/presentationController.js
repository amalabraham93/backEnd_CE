"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class PresentationController {
    createPresentation;
    socketService;
    emailService;
    conferenceRepository;
    //   private presentationRepository: PresentationRepository;
    getPresentationsByConferenceId;
    //   private getPresentationsByAuthorId: GetPresentationsByAuthorIdUseCase;
    //   private getPresentationById: GetPresentationByIdUseCase;
    //   private updatePresentation: UpdatePresentationUseCase;
    constructor(createPresentation, socketService, 
    // presentationRepository: PresentationRepository,
    getPresentationsByConferenceId) {
        this.createPresentation = createPresentation;
        this.socketService = socketService;
        // this.presentationRepository = presentationRepository;
        this.getPresentationsByConferenceId = getPresentationsByConferenceId;
        // this.getPresentationsByAuthorId = getPresentationsByAuthorId;
        // this.getPresentationById = getPresentationById;
        // this.updatePresentation = updatePresentation;
        this.createPresentationHandler = this.createPresentationHandler.bind(this);
        this.getPresentationsByConferenceIdHandler = this.getPresentationsByConferenceIdHandler.bind(this);
        // this.getPresentationsByAuthorIdHandler =this.getPresentationsByAuthorIdHandler.bind(this);
        // this.getPresentationByIdHandler =
        //   this.getPresentationByIdHandler.bind(this);
        // this.updatePresentationHandler = this.updatePresentationHandler.bind(this);
    }
    async createPresentationHandler(req, res) {
        try {
            const { stream_key, confId } = req.body;
            const newPresentation = await this.createPresentation.execute(stream_key, confId);
            const conferences = await this.conferenceRepository.getById(confId);
            this.socketService.sendVideoStream(stream_key, confId);
            // const link = `http://localhost:4200/conference/${confId}/presentation`
            // await this.emailService.conferenceStartNotification(, link);
            res.status(201).json(newPresentation);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    async getPresentationsByConferenceIdHandler(req, res) {
        try {
            const conferenceId = new mongoose_1.Types.ObjectId(req.params.confId);
            const presentations = await this.getPresentationsByConferenceId.execute(conferenceId);
            console.log(presentations);
            res.status(200).json(presentations);
        }
        catch (error) {
            res.status(500).json({
                message: "Error retrieving presentations by conference ID",
            });
        }
    }
}
exports.default = PresentationController;
