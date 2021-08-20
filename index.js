const express = require("express");
const path = require("path");

const app = express();

// settings
app.set("port", process.env.PORT || 4000);

// static files
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(app.get("port"), () => {
  console.log(`server listening on port ${app.get("port")}`);
});

const socket = require("socket.io");
const io = socket(server);

// Web sockets
io.on("connection", (socket) => {
  //Cuando alguien se conecte, vamos a empezar a ejecutar esto
  console.log(`${socket.id} has conected`);
  // escuchar por evento chat:message, emite el mensaje que le llega para mostrarselos a todos los usuarios
  socket.on("chat:message", (data) => {
    io.sockets.emit("chat:message", data);
  });

  // Escuchar por el evento chat:typing, emite a todos excepto al que envio el evento
  socket.on("chat:typing", (data) => {
    console.log(data);
    socket.broadcast.emit("chat:typing", data);
  });
});
