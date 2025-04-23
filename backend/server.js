const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.on("join", (username) => {
    socket.username = username;
    console.log(`🟢 ${username} joined (socket.id: ${socket.id})`);
    socket.broadcast.emit("receiveMessage", {
      user: "System",
      message: `${username} has joined the chat.`,
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on("sendMessage", (msgObj) => {
    console.log("📤 Message broadcasted:", msgObj);
    io.emit("receiveMessage", msgObj);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 ${socket.username || "Unknown"} disconnected (id: ${socket.id})`);
    if (socket.username) {
      io.emit("receiveMessage", {
        user: "System",
        message: `${socket.username} has left the chat.`,
        time: new Date().toLocaleTimeString(),
      });
    }
  });
});

const PORT = 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
});
