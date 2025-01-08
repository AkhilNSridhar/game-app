const player = document.getElementById('player');
const fallingObject = document.getElementById('falling-object');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');

let score = 0;
let isGameRunning = false;

function startGame() {
    score = 0;
    isGameRunning = true;
    scoreDisplay.textContent = score;
    fallingObject.style.top = '0px';
    fallingObject.style.left = Math.random() * 370 + 'px';
    gameLoop();
}

function gameLoop() {
    if (!isGameRunning) return;

    const playerRect = player.getBoundingClientRect();
    const objectRect = fallingObject.getBoundingClientRect();

    // Check collision
    if (
        objectRect.bottom >= playerRect.top &&
        objectRect.left >= playerRect.left &&
        objectRect.right <= playerRect.right
    ) {
        score++;
        scoreDisplay.textContent = score;
        resetFallingObject();
    }

    // Check if the object reaches the bottom
    if (parseInt(fallingObject.style.top) >= 470) {
        resetFallingObject();
    } else {
        fallingObject.style.top = parseInt(fallingObject.style.top) + 5 + 'px';
    }

    requestAnimationFrame(gameLoop);
}

function resetFallingObject() {
    fallingObject.style.top = '0px';
    fallingObject.style.left = Math.random() * 370 + 'px';
}

function movePlayer(event) {
    const playerRect = player.getBoundingClientRect();
    if (event.key === 'ArrowLeft' && playerRect.left > 10) {
        player.style.left = player.offsetLeft - 20 + 'px';
    } else if (event.key === 'ArrowRight' && playerRect.right < 390) {
        player.style.left = player.offsetLeft + 20 + 'px';
    }
}

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', movePlayer);