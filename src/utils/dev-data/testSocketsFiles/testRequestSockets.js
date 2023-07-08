const io = require('socket.io-client');
const socket = io('http://localhost:3000');

////////////////  listen on connection  /////////////////////////
socket.on('connect', () => {
  console.log('Connected to Socket.IO');
});

////////////////  Join Room  /////////////////////////
let data = { room: '64a9a2c8f74c145f4fa795dc' };
// room : winch or mechanic id   || stackholder winch, mechanic
socket.emit('join-room', data);

let data = { room: '64a9a2c8f74c145f4fa795dc' };
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



// Steps for driver , lieten on acceptance or rejection
// to update pending list , after create a new request

//1. connect to socket
//2. join room with created request id as room
//3. listen on request-accepted-or-rejected event and do what ever you want


// Steps for mechanic/winch , lieten on new request created
// to know if mechanic/winch have new request

//after login 
//1. connect to socket
//2. join room with mechinc/winch id as room
//3. listen on new-request event , do what ever you want
//4. diconnect

