const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    appendMessage("You", message, "blue");

    messageInput.value = "";

    const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    });

    const data = await response.json();
    appendMessage("MRC Chatbot", data.response, "green");
}

function appendMessage(sender, text, color) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong style="color:${color}">${sender}:</strong> ${text}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
