const io = require('socket.io-client');
// // // import * as io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to Socket.IO');
});

let data={room:"1687631416797-240479.68401361819"}
socket.emit("join-room", data);



data = {
  room:"1687631416797-240479.68401361819",
  chatId:"6497364ba7c02af5aef2109a",
  sender:"6491d6ddd88e7577d4ab5f6f",
  content:"hello this message from test file .js"
}

socket.emit("send-message",data);

socket.on("recieve-message", (data)=>{
  console.log("recieved message from test \ndata is : ",data)
});

socket.on('message', (data) => {
  console.log('Received message:', data);
});

socket.on("upload-winch-location", (msg) => {
  console.log("entered this event listener");
    const data = {
        id:"6491cc7dc2b3e3677686ac21",
        latitude:3.66666,
        longitude:3.66666,
    }
  socket.emit("update-winch-location",data);
});
socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO');
});







