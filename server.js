const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let messages = []; // simpan chat (sementara, untuk offline)

app.use(express.static("public"));

io.on("connection", (socket) => {
  // kirim riwayat chat ke user baru
  socket.emit("history", messages);

  // terima pesan baru
  socket.on("message", (msg) => {
    messages.push(msg);
    io.emit("message", msg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server jalan di port", PORT);
});
