const io = require("socket.io-client");
const socket = io("http://localhost:3000");

////////////////  listen on connection  /////////////////////////
socket.on("connect", () => {
  console.log("Connected to Socket.IO");
});


////////////////  Join Room  /////////////////////////
let data = { room: "1687631416797-240479.68401361819" };
socket.emit("join-room", data);


/////////////////// send  message   /////////////////////
data = {
  room: "1687631416797-240479.68401361819",
  chatId: "6497364ba7c02af5aef2109a",
  sender: "648c8d9ce31d042b0c52b9fa",
  content: "hello this message from test file .js",
};
socket.emit("send-message", data);


////////////////   recieve message  ///////////////////////
socket.on("recieve-message", (data) => {
  console.log("recieved message from test \ndata is : ", data);
  /*
  data clients will recieve will be in this form 
  data is :  {
    room: '1687631416797-240479.68401361819',
    chatId: '6497364ba7c02af5aef2109a',
    sender: '6491d6ddd88e7577d4ab5f6f',
    content: 'hello this message from test file .js',
    time: '2023-06-24T22:05:36.383Z'
  } */
});



////////////////   upload location  ///////////////////////
socket.on("upload-winch-location", () => {
  const data = {
    id: "6491cc7dc2b3e3677686ac21",
    latitude: 3.44444,
    longitude: 3.444444,
  };
  socket.emit("update-winch-location", data);
});

//////////  listen on disconnect ////////////
socket.on("disconnect", () => {
  console.log("Disconnected from Socket.IO");
});

test("test", async () => {

  expect(200).toEqual(200)

})