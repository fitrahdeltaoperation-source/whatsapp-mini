const socket = io();

let username = "";

function login() {
  const input = document.getElementById("username");
  if (!input.value) {
    alert("Masukkan nama dulu");
    return;
  }

  username = input.value;
  document.getElementById("login").style.display = "none";
  document.getElementById("chat").style.display = "flex";
}

function send() {
  const input = document.getElementById("text");
  if (!input.value) return;

  socket.emit("message", {
    user: username,
    text: input.value
  });

  input.value = "";
}

socket.on("history", msgs => {
  msgs.forEach(addMessage);
});

socket.on("message", msg => {
  addMessage(msg);
});

function addMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");

  if (msg.user === username) {
    div.classList.add("me");
    div.innerText = msg.text;
  } else {
    div.classList.add("other");
    div.innerText = msg.user + ": " + msg.text;
  }

  const messages = document.getElementById("messages");
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
