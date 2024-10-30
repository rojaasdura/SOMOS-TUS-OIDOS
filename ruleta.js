const canvas = document.getElementById('roulette-wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const messageDisplay = document.getElementById('message-display');

// Datos para la ruleta
const segments = [
    "¡Hoy será un gran día!",
    "Confía en ti mismo.",
    "Eres capaz de lograrlo.",
    "Cada paso cuenta.",
    "Hoy elige ser feliz.",
    "Cree en tus sueños."
];
const colors = ['#87CEEB', '#87CEEB', '#4169E1', '#00008B', '#003366', '#006064'];
const numSegments = segments.length;
const anglePerSegment = 360 / numSegments;
let currentAngle = 0;
let isSpinning = false;

// Dibujar la ruleta
function drawWheel() {
    currentAngle = 0; // Reinicia el ángulo en cada dibujado
    for (let i = 0; i < numSegments; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, (Math.PI / 180) * currentAngle, (Math.PI / 180) * (currentAngle + anglePerSegment));
        ctx.lineTo(250, 250);
        ctx.fill();
        ctx.closePath();

        // Dibujar texto en cada segmento
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate((Math.PI / 180) * (currentAngle + anglePerSegment / 2));
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText(segments[i], 120, 10);
        ctx.restore();

        currentAngle += anglePerSegment;
    }
}

// Función para animar el giro de la ruleta
function spinWheel() {
    if (isSpinning) return; // Evitar giros múltiples a la vez
    isSpinning = true;
    const randomAngle = Math.floor(Math.random() * 360) + 360 * 5; // Giros completos
    let currentRotation = 0;
    const spinSpeed = 15; // Ajusta la velocidad del giro

    function animateSpin() {
        currentRotation += spinSpeed;

        // Detener el giro cuando alcance el ángulo objetivo
        if (currentRotation >= randomAngle) {
            isSpinning = false;
            displayResult(currentRotation);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate((Math.PI / 180) * currentRotation);
        ctx.translate(-250, -250);
        drawWheel();
        ctx.restore();

        requestAnimationFrame(animateSpin);
    }

    animateSpin();
}

// Función para mostrar el resultado después del giro
function displayResult(rotationAngle) {
    const normalizedAngle = (rotationAngle % 360);
    const segmentIndex = Math.floor(normalizedAngle / anglePerSegment) % numSegments;
    const resultMessage = segments[segmentIndex];
    messageDisplay.innerText = `Resultado: ${resultMessage}`;
}

// Inicializar la ruleta
drawWheel();
spinButton.addEventListener('click', spinWheel);
