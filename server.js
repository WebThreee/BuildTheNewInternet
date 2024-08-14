const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",  // Adjust this to your client URL if necessary
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join the room
  socket.join('chatRoom');

  // Listen for sendMessage event
  socket.on('sendMessage', (message) => {
    io.to('chatRoom').emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
