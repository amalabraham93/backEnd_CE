"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class SocketService {
    io;
    constructor(server) {
        this.io = new socket_io_1.Server(server);
        this.initializeSocketEvents();
    }
    initializeSocketEvents() {
        this.io.on('connection', (socket) => {
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
    sendVideoStream(room, videoStream) {
        this.io.to(room).emit('videoStream', videoStream);
    }
}
exports.default = SocketService;
