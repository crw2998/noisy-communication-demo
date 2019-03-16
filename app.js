// const functions = require('firebase-functions');
const http = require('http');
const fs = require('fs');
const io_ = require('socket.io');

const hostname = 'localhost';
const port = 80;

let socket_ids = [];
let current_ready = false;

const transformation = str => str.split("").reverse().join("");

const server = http.createServer((req, res) => {
  if (req.method == "GET") {
    let url = req.url == "/" ? "index.html" : req.url.substring(1);
    fs.readFile(url, "utf8", function(err, data) {
      if (err) {
        console.log("problem reading file: ", url)
        res.statusCode = 404;
        res.end();
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/' + url.split(".").slice(-1)[0]);
        console.log('text/' + url.split(".").slice(-1)[0]);
        res.end(data);
      }
    });
  }
});

const io = io_(server);
io.on('connection', (socket) => {
  socket.socket_id = Math.random();
  socket_ids.push(socket.socket_id);

  const update_ready = () => {
    if (socket_ids.length > 1 !== current_ready) {
      io.emit("ready", {"ready": !current_ready});
      current_ready = !current_ready;
    }
  }

  socket.on("outgoing message", (data) => {
    io.emit("incoming message", {"text": transformation(data["text"]), "id": data["id"]});
  });
  socket.on('disconnect', (data) => {
    let idx = socket_ids.indexOf(socket.socket_id);
    if (idx !== -1)
      socket_ids.splice(idx, 1);
    update_ready();
  });
  update_ready();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});