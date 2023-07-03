const { updateWinchLocation } = require('../components/winch/winch.services');
const { addSeenMessage, addUnSeenMessage } = require('../components/chat/chat.services');

let io;
exports.socketConnection = (server, cors) => {
  io = require('socket.io')(server, {
    cors: {
      origin: `*`,
    },
  });
  io.on('connection', (socket) => {
    console.log(`Client connected [id=${socket.id}]`);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    //////  chat ///////
    socket.on('join-room', (data) => {
      socket.join(data.room);
    });

    socket.on('send-message', async (data) => {
      if (io.sockets.adapter.rooms.get(data.room).size > 1) {
        await addSeenMessage(data);
      } else {
        await addUnSeenMessage(data);
      }
      data.time = new Date();
      io.to(data.room).emit('recieve-message', data);
    });

    //////  winch ///////
    socket.on('emit-upload-locations', () => {
      io.sockets.emit('upload-winch-location');
    });

    socket.on('update-winch-location', async (data) => {
      await updateWinchLocation(data);
    });

    //////// Request  ///////
    socket.on('emit-request-accepted-or-rejected', (data) => {
      io.to(data.room).emit('request-accepted-or-rejected');
    });
    socket.on('emit-request-created', (data) => {
      io.to(data.room).emit('new-request');
    });
  });
};
