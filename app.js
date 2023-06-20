const express = require("express");
const { dbConnection } = require("./src/database/dbConnection");
require("dotenv").config({ path: "./config/.env" });
const path = require('path');
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const AppErr = require("./src/utils/AppError");
const globalMiddlewareErr = require("./src/utils/globalMiddlewareErr");
const { allRequires } = require("./src/utils");
const server = require("http").createServer(app);
const { Server } = require("socket.io");
app.use(cors());
const port = process.env.PORT || 5000;
const io = new Server(server, {
  cors: {
    origin: `*`
  },
});



app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));
if(process.env.MODE_ENV=="developmet"){
  app.use(morgan("dev"));
}

allRequires(app);

app.all("/*", (req, res, next) => {
  next(new AppErr(`can't find this route: ${req.originalUrl} on server`, 404));
});
app.use(globalMiddlewareErr);
dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));



const connectedUsers = {};

io.on("connection", (socket) => {
  console.log("connected to socket io")
  
  socket.on("disconnect", (userId) => {
    io.sockets.connected[connectedUsers[userId]].disconnect();
    delete connectedUsers[userId];
  });

  socket.on("join-room", (data) => {
    connectedUsers[data.userId] = socket.id;
    socket.join(data.room);
  });

  socket.on("send-message", (data) => {
    const socketId = connectedUsers[data.toUserId];
    if (socketId) {
      io.to(data.room).emit("recieve-message", data.message);
    }
  });
});


