const socket = io();

// DOM elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

/*
  Cuando toque el boton send, este tomara los datos
  que haya en los campos de texto de username y message
  para emitirlos al servidor por un socket
*/
btn.addEventListener("click", () => {
  actions.innerHTML = "";
  socket.emit("chat:message", {
    message: message.value,
    username: username.value,
  });
  console.log(message.value, username.value);
});

/* 
  Cuando detecte que se esta escribiendo en element
  message, se emitira un socket con el dato de quien
  esta escribiendo 
*/
message.addEventListener("keypress", () => {
  socket.emit("chat:typing", username.value);
});

/*
  escucha por algun evento a recibir con el nobre
  chat:message que envie el servidor, este evento
  va a pintar en el cuadro del output la informacion
  del mensaje y quien lo envia.
*/
socket.on("chat:message", (data) => {
  output.innerHTML += `<p>
    <strong>${data.username}</strong> : ${data.message}
  </p>`;
});

// Escucha por el evento chat:typing

socket.on("chat:typing", (data) => {
  actions.innerHTML = `
    <p><em>${data} is typing...</em></p>
  `;
});
