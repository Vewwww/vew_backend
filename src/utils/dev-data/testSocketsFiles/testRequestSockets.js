const io = require('socket.io-client');
const socket = io('http://localhost:3000');

////////////////  listen on connection  /////////////////////////
socket.on('connect', () => {
  console.log('Connected to Socket.IO');
});

////////////////  Join Room  /////////////////////////
let data = { room: '649de92f3fb88062d0aeb3ac' };
// room : winch or mechanic id   || stackholder winch, mechanic
socket.emit('join-room', data);

data = { room: '64a2db8781795582b325a41f' };
// room: request id              || stackholder driver, winch, mechanic
socket.emit('join-room', data);

////////////////   new-request  ///////////////////////
socket.on('new-request', () => {
  console.log('new request created');
});

////////////////   request-accepted-or-rejected  ///////////////////////
socket.on('request-accepted-or-rejected', () => {
  console.log('request-accepted-or-rejected');
});

//////////  listen on disconnect ////////////
socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO');
});
