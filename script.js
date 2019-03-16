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



// socket.on('new buzzes', (data) => {
//   if (data.length === 0) {
//     buzzed = false;
//     set_buzzer_active();
//   }
//   buzzes = data;
//   const compare = (a,b) => a.date > b.date;
//   buzzes = buzzes.sort(compare);
//   names = '';
//   for (let i = 0; i < buzzes.length; i++) {
//     names += buzzes[i].name + '        ' + buzzes[i].date.substring(6, 10) + '.' + buzzes[i].date.substring(10) + '<br>';
//   }
//   document.getElementById("buzzed-in").innerHTML = names;
// });

// let players = [];
// socket.on('new players', (data) => {
//   document.getElementById("players").innerHTML = data.sort().join(" <br>");
// })

// if (buzzer) {
//   buzzer.addEventListener("click", (event) => {
//     event.preventDefault();
//     if (!buzzer.classList.contains("active")) {
//       return;
//     }

//     let name = document.getElementById("name").value
//     const date = new Date();
//     json = {
//       date: date.getTime().toString(),
//       name: name
//     };

//     socket.emit('buzzer press', json);
//     buzzed = true;
//     set_buzzer_active();
//   });
// }

// if (reset) {
//     reset.addEventListener("click", (event) => {
//     event.preventDefault();
//     socket.emit('reset presses', null);
//   });
// }

// nameField.addEventListener("keyup", (event) => {
//   socket.emit('new name', nameField.value);
//   set_buzzer_active();
// });