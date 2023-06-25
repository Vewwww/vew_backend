const io = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to Socket.IO");
});

let data = { room: "1687631416797-240479.68401361819" };
socket.emit("join-room", data);

data = {
  room: "1687631416797-240479.68401361819",
  chatId: "6497364ba7c02af5aef2109a",
  sender: "648c8d9ce31d042b0c52b9fa",
  content: "hello this message from test file .js",
};
socket.emit("send-message", data);

socket.on("recieve-message", (data) => {
  console.log("recieved message from test \ndata is : ", data);
  /*
  recieved message from test 
  data is :  {
    room: '1687631416797-240479.68401361819',
    chatId: '6497364ba7c02af5aef2109a',
    sender: '6491d6ddd88e7577d4ab5f6f',
    content: 'hello this message from test file .js',
    time: '2023-06-24T22:05:36.383Z'
  } */
});

socket.on("upload-winch-location", () => {
  const data = {
    id: "6491cc7dc2b3e3677686ac21",
    latitude: 3.44444,
    longitude: 3.444444,
  };
  socket.emit("update-winch-location", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected from Socket.IO");
});
