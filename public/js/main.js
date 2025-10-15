// const chatForm = document.getElementById("chat-form");
// const chatMessage = document.querySelector(".chat-messages");
// const socket = io();
// //messsage from server
// socket.on("message", (message) => {
//   console.log(message);
//   outputMessage(message);

//   //automatic scroll down
//   chatMessage.scrollTop = chatMessage.scrollHeight;
// });

// // //Message submit
// // chatForm.addEventListener("submit", (e) => {
// //   e.preventDefault();
// //   //get msg text
// //   const msg = e.target.elements.msg.value;
// //   //emit msg to server
// //   console.log(msg);
// // });

// // Output message to the DOM
// function outputMessage(message) {
//   const div = document.createElement("div");
//   div.classList.add("message");
//   div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
//                    <p class="text">${message}</p>`;

//   // Append to chat-messages container
//   chatMessage.appendChild(div);
// }

// // Form submit handler
// chatForm.addEventListener("submit", (e) => {
//   e.preventDefault(); // Prevent form from submitting and refreshing the page

//   const msgInput = document.getElementById("msg");
//   const msg = msgInput.value.trim(); // Get message value and trim excess spaces

//   if (msg) {
//     outputMessage(msg); // Pass the message to outputMessage function
//     console.log(msg);
//     msgInput.value = ""; // Clear the input field after sending the message
//   }
// });
// const chatForm = document.getElementById("chat-form");
// const chatMessage = document.querySelector(".chat-messages");
// const socket = io();

// // Message from server
// socket.on("message", (message) => {
//   console.log("Message received:", message);
//   outputMessage(message);

//   // Automatic scroll down after the message is appended
//   scrollToBottom();
// });

// // Output message to the DOM
// function outputMessage(message) {
//   const div = document.createElement("div");
//   div.classList.add("message");
//   div.innerHTML = `<p class="meta">${message.username} <span>${messasge.time}</span></p>
//                    <p class="text">${message.text}</p>`;

//   // Append to chat-messages container
//   chatMessage.appendChild(div);
// }

// // Scroll to the bottom of the chat messages container
// function scrollToBottom() {
//   // Force layout recalculation to make sure the message is rendered
//   chatMessage.style.height; // Forces a reflow to ensure layout update

//   // Now set scrollTop to scroll to the bottom of the container
//   chatMessage.scrollTop = chatMessage.scrollHeight;

//   // Log scroll values for debugging
//   console.log("scrollTop after:", chatMessage.scrollTop);
//   console.log("scrollHeight after:", chatMessage.scrollHeight);
// }

// // Form submit handler
// chatForm.addEventListener("submit", (e) => {
//   e.preventDefault(); // Prevent form from submitting and refreshing the page

//   const msgInput = document.getElementById("msg");
//   const msg = msgInput.value.trim(); // Get message value and trim excess spaces

//   if (msg) {
//     outputMessage(msg); // Pass the message to outputMessage function
//     console.log("Message sent:", msg);
//     msgInput.value = ""; // Clear the input field after sending the message
//     scrollToBottom(); // Ensure scroll happens after user message
//   }
// });

// const chatForm = document.getElementById("chat-form");
// const chatMessage = document.querySelector(".chat-messages");
// const socket = io();

// const { username, room } = Qs.parse(location.search, {
//   ignoreQueryPrefix: true,
// });
// socket.on("message", (message) => {
//   console.log("Message received:", message);
//   outputMessage(message);
//   scrollToBottom();
// });

// socket.emit("joinroom", { username, room });

// function outputMessage(message) {
//   const div = document.createElement("div");
//   div.classList.add("message");
//   div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
//                    <p class="text">${message.text}</p>`;

//   chatMessage.appendChild(div);
// }

// function scrollToBottom() {
//   chatMessage.style.height;
//   chatMessage.scrollTop = chatMessage.scrollHeight;
//   console.log("scrollTop after:", chatMessage.scrollTop);
//   console.log("scrollHeight after:", chatMessage.scrollHeight);
// }

// chatForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const msgInput = document.getElementById("msg");
//   const msg = msgInput.value.trim();

//   if (msg) {
//     outputMessage({
//       username: "You",
//       text: msg,
//       time: new Date().toLocaleTimeString(),
//     });
//     console.log("Message sent:", msg);
//     msgInput.value = "";
//     scrollToBottom();
//   }
// });

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on("message", (message) => {
  outputMessage(message); // Add the message to the window

  // Scroll down to the bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    window.location = "../index.html";
  } else {
  }
});
