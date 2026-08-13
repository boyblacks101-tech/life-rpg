const input =
document.getElementById("messageInput");

const send =
document.getElementById("sendButton");

const messages =
document.getElementById("messages");

const file =
document.getElementById("file");

function sendMessage() {

const text =
input.value.trim();

if (!text) return;

const welcome =
document.querySelector(".welcome");

if (welcome)
welcome.remove();

addMessage(text, "user");

input.value = "";

setTimeout(() => {

addMessage(
"Hey. I'm NCR. I'm here.",
"ncr"
);

}, 500);

}

function addMessage(text, type) {

const message =
document.createElement("div");

message.className =
`message ${type}`;

message.textContent = text;

messages.appendChild(message);

messages.scrollTop =
messages.scrollHeight;

}

send.onclick =
sendMessage;

input.addEventListener(
"keydown",
event => {

if (event.key === "Enter") {
sendMessage();
}

});

file.addEventListener(
"change",
() => {

if (!file.files.length)
return;

const name =
file.files[0].name;

addMessage(
`Attached: ${name}`,
"user"
);

file.value = "";

});
