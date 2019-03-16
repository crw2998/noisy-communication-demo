const socket = io();
console.log(socket);

const textField = document.getElementById("send");
const sendButton = document.getElementById("send-button");
const receivedText = document.getElementById("received-text");
const connectionStatus = document.getElementById("connection-status");

const id = Math.random()

sendButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (!sendButton.classList.contains("active") || textField.value === "") {
    return;
  }
  console.log("things?");
  socket.emit("outgoing message", {"text": textField.value, "id": id});
});

socket.on("incoming message", (data) => {
  if (data["id"] !== id)
    receivedText.innerText = data["text"];
});

socket.on("ready", (data) => {
  console.log(data);
  if (data.ready) {
    sendButton.classList.add("active");
    connectionStatus.classList.add("ready");
  } else {
    sendButton.classList.remove("active");
    connectionStatus.classList.remove("ready");
  }
})