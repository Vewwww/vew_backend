const express = require("express");
const { dbConnection } = require("./src/database/dbConnection");
require("dotenv").config({ path: "./config/.env" });
const app = express();
const port = process.env.PORT || 5000;
const morgan = require("morgan");
const cors = require("cors");
const AppErr = require("./src/utils/AppError");
const globalMiddlewareErr = require("./src/utils/globalMiddlewareErr");
const { allRequires } = require("./src/utils");
const server = require("http").createServer(app);
const { Server } = require("socket.io");
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: `*`,
    methods: ["GET", "POST"],
  },
});

const connectedUsers = {};

io.on("connection", (socket) => {
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

app.use(express.json());
app.use(morgan("dev"));
allRequires(app);

app.all("/*", (req, res, next) => {
  next(new AppErr(`can't find this route: ${req.originalUrl} on server`, 404));
});
app.use(globalMiddlewareErr);
dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
