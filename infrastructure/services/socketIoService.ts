import { Server, Socket } from 'socket.io';

class SocketService {
  private io: Server;

  constructor(server: any) {
    this.io = new Server(server);
    this.initializeSocketEvents();
  }

  private initializeSocketEvents() {
    this.io.on('connection', (socket: Socket) => {
      console.log('A user connected');

      // Handle custom events
      socket.on('joinConference', (data) => {
        // Handle joining conference room logic
      });

      socket.on('videoStream', (videoStream) => {
        // Handle broadcasting video stream logic
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  }

  // Add methods for emitting events or broadcasting messages if needed

  // For example:
  public sendVideoStream(room: string, videoStream: any) {
    this.io.to(room).emit('videoStream', videoStream);
  }
}

export default SocketService;