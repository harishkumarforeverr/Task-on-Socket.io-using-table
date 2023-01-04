const app = require("express")();

const port = process.env.PORT || 7077;
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

console.log(`socket service is listening on port: ${port}`);
io.on("connection", (socket) => {
  socket.emit("connected", "Successfully connected to the test_socket");

  socket.on("hello-event", (payload) => {
    console.log("payload", payload);
  });
});

// app.listen(5000, () => console.log("server is active..."));

server.listen(port, () => {
  console.log("Server is listening at 7077...");
});
