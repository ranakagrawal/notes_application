const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const routes = require("./routes");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow frontend origin for development
    methods: ['GET', 'POST'],
  },
});

app.set('io', io);
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a note room
  socket.on('join-note', (noteId) => {
    socket.join(noteId); // Join a room with note ID
    console.log(`User ${socket.id} joined room: ${noteId}`);
  });

  // Leave a note room
  socket.on('leave-note', (noteId) => {
    socket.leave(noteId);
    console.log(`User ${socket.id} left room: ${noteId}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database and server connected!");
    server.listen(port, () => { // Start the HTTP server, not just Express
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
