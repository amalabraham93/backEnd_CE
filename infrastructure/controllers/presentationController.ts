import { Request, Response } from "express";
import CreatePresentationUseCase from "../../domain/usecases/presentation/createPresentation";
import PresentationRepository from "../../domain/repositories/presentationRepository";
import { Types, ObjectId } from "mongoose";
import GetPresentationsByConferenceIdUseCase from "../../domain/usecases/presentation/getPresentationByConfId";
import GetPresentationsByAuthorIdUseCase from "../../domain/usecases/presentation/getPresentationbyAuthorId";
import GetPresentationByIdUseCase from "../../domain/usecases/presentation/getPresentationById";
import UpdatePresentationUseCase from "../../domain/usecases/presentation/updatePesentation";
import SocketService from "../../infrastructure/services/socketIoService";
import EmailService from "domain/services/EmailService";
import ConferenceRepository from "domain/repositories/conferenceRepository";

class PresentationController {
  private createPresentation: CreatePresentationUseCase;
  private socketService: SocketService;
  private emailService!: EmailService;
  private conferenceRepository!: ConferenceRepository;
  //   private presentationRepository: PresentationRepository;
  //   private getPresentationsByConferenceId: GetPresentationsByConferenceIdUseCase;
  //   private getPresentationsByAuthorId: GetPresentationsByAuthorIdUseCase;
  //   private getPresentationById: GetPresentationByIdUseCase;
  //   private updatePresentation: UpdatePresentationUseCase;

  constructor(
    createPresentation: CreatePresentationUseCase,
    socketService: SocketService
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

  async createPresentationHandler(req: Request, res: Response): Promise<void> {
    try {
      const { stream_key, confId } = req.body;

      const newPresentation = await this.createPresentation.execute(
        stream_key,
        confId
      );
      const conferences = await this.conferenceRepository.getById(confId);

      this.socketService.sendVideoStream(stream_key, confId);
      // const link = `http://localhost:4200/conference/${confId}/presentation`

      // await this.emailService.conferenceStartNotification(, link);

      res.status(201).json(newPresentation);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //   async getPresentationsByConferenceIdHandler(
  //     req: Request,
  //     res: Response
  //   ): Promise<void> {
  //     try {
  //       const conferenceId = new Types.ObjectId(req.params.conferenceId);

  //       const presentations = await this.getPresentationsByConferenceId.execute(
  //         conferenceId
  //       );

  //       res.status(200).json(presentations);
  //     } catch (error) {
  //       res.status(500).json({
  //         message: "Error retrieving presentations by conference ID",
  //       });
  //     }
  //   }

  //   async getPresentationsByAuthorIdHandler(
  //     req: Request,
  //     res: Response
  //   ): Promise<void> {
  //     try {
  //       const authorId = new Types.ObjectId(req.params.authorId);

  //       const presentations = await this.getPresentationsByAuthorId.execute(
  //         authorId
  //       );

  //       res.status(200).json(presentations);
  //     } catch (error) {
  //       res.status(500).json({
  //         message: "Error retrieving presentations by author ID",
  //       });
  //     }
  //   }

  //   async getPresentationByIdHandler(req: Request, res: Response): Promise<void> {
  //     try {
  //       const presentationId = new Types.ObjectId(req.params.presentationId);

  //       const presentation = await this.getPresentationById.execute(
  //         presentationId
  //       );

  //       res.status(200).json(presentation);
  //     } catch (error) {
  //       res.status(500).json({
  //         message: "Error retrieving presentation by ID",
  //       });
  //     }
  //   }

  //   async updatePresentationHandler(req: Request, res: Response): Promise<void> {
  //     try {
  //       const presentationId = new Types.ObjectId(req.params.presentationId);
  //       const { stream_key, start_time, end_time, papers, conference, authors } =
  //         req.body;

  //       const updatedPresentation = await this.updatePresentation.execute(
  //         presentationId,
  //         stream_key,
  //         start_time,
  //         end_time,
  //         papers,
  //         conference,
  //         authors
  //       );

  //       res.status(200).json(updatedPresentation);
  //     } catch (error) {
  //       res.status(500).json({
  //         message: "Error updating presentation",
  //       });
  //     }
  //   }
}

export default PresentationController;
