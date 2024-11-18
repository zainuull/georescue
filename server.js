const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer();
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  // Emitir data lokasi setiap kali ada update
  socket.on('update-location', (data) => {
    socket.broadcast.emit('location-update', data);
  });
});

server.listen(3001, () => {
  console.log('Socket.io server running on port 3001');
});
