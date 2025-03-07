const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./db");
const cors = require("cors");

const UserRoute = require("./routes/User.Route");
const ChatRoute = require("./routes/Chat.Route");
const MessageRoute = require("./routes/Message.Route");

const app = express();
const port = 5000;

connectDB();

app.use(express.json());
app.use(cors());

// Create an HTTP server
const server = http.createServer(app);

// Store online users
const onlineUsers = {};

// Initialize socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Socket.io connection event
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // When a user logs in, store their data
  socket.on("loggedInUserData", (userData) => {
    console.log("🔵 New user logged in:", userData);
  
    // Store user in `onlineUsers` object using socket ID
    onlineUsers[socket.id] = userData;

    // Send updated user list to all clients
    io.emit("onlineUsers", Object.values(onlineUsers));
  });

  // Handle sending messages
  socket.on("message", (msg) => {
    console.log("📩 New message:", msg);
    io.emit("message", msg);
  });
 
  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`❌ User Disconnected: ${socket.id}`);

    // Remove user from `onlineUsers`
    delete onlineUsers[socket.id];

    // Broadcast updated user list to all clients
    io.emit("onlineUsers", Object.values(onlineUsers));
  });
});

app.get("/", (req, res) => {
  res.send("Hello, this is Amir's chat app!");
});

app.use("/api/auth", UserRoute);
app.use("/api/chat", ChatRoute);
app.use("/api/message", MessageRoute);

server.listen(port, () => {
  console.log("🚀 Server is running on Port", port);
});
