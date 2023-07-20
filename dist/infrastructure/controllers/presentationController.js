"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PresentationController {
    createPresentation;
    socketService;
    emailService;
    conferenceRepository;
    //   private presentationRepository: PresentationRepository;
    //   private getPresentationsByConferenceId: GetPresentationsByConferenceIdUseCase;
    //   private getPresentationsByAuthorId: GetPresentationsByAuthorIdUseCase;
    //   private getPresentationById: GetPresentationByIdUseCase;
    //   private updatePresentation: UpdatePresentationUseCase;
    constructor(createPresentation, socketService
    // presentationRepository: PresentationRepository,
    // getPresentationsByConferenceId: GetPresentationsByConferenceIdUseCase,
    // getPresentationsByAuthorId: GetPresentationsByAuthorIdUseCase,
    // getPresentationById: GetPresentationByIdUseCase,
    // updatePresentation: UpdatePresentationUseCase
    ) {
        this.createPresentation = createPresentation;
        this.socketService = socketService;
        // this.presentationRepository = presentationRepository;
        // this.getPresentationsByConferenceId = getPresentationsByConferenceId;
        // this.getPresentationsByAuthorId = getPresentationsByAuthorId;
        // this.getPresentationById = getPresentationById;
        // this.updatePresentation = updatePresentation;
        this.createPresentationHandler = this.createPresentationHandler.bind(this);
        // this.getPresentationsByConferenceIdHandler =
        //   this.getPresentationsByConferenceIdHandler.bind(this);
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
}
exports.default = PresentationController;
