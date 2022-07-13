const socketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('client connect:', socket.id);

    socket.on('disconnect', () => {
      console.log('client disconnect');
    })
  })
 }
 
 module.exports = socketIo