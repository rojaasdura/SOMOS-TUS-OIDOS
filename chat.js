const responses = [
    "Hola, ¿cómo estás?",
    "Entiendo que puedas sentirte así. Estoy aquí para escucharte, ¿qué más quisieras compartir?",
    "Es normal sentir lo que estás sintiendo. ¿Qué crees que podría ayudarte en este momento?",
    "A veces hablar ayuda mucho, ¿te gustaría contarme más sobre lo que te preocupa?",
    "Estoy aquí para ti. Si lo deseas, podemos hablar sobre lo que te está afectando.",
    "Puedo notar que estás pasando por un momento difícil. ¿Qué te gustaría explorar juntos?",
    "Cuéntame más sobre eso, me interesa saber cómo te sientes.",
    "Estar aquí y compartir tus pensamientos puede ser un gran primer paso.",
    "¿Hay algo específico que te esté preocupando estos días?",
    "A veces, expresar lo que sientes es un buen alivio. Estoy aquí para escucharte."
];

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message) {
        displayMessage(message, 'user');
        messageInput.value = '';
        setTimeout(() => {
            const response = getRandomResponse();
            displayMessage(response, 'bot');
        }, 1000); // Simula el retraso de 1 segundo
    }
}

function getRandomResponse() {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

function displayMessage(message, sender) {
    const messagesDiv = document.getElementById('messages');
    const msgElement = document.createElement('div');
    msgElement.textContent = message;
    msgElement.className = sender;
    messagesDiv.appendChild(msgElement);

    // Desplazar hacia abajo para mostrar el último mensaje
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
