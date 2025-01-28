const squares = document.querySelectorAll('.square');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const startButton = document.querySelector('#start-btn');
const resetButton = document.querySelector('#reset-btn');

let result = 0;
let hitPosition = null;
let currentTime = 60;
let timerId = null;
let countdownTimerId = null;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    const randomPosition = squares[Math.floor(Math.random() * squares.length)];
    randomPosition.classList.add('mole');
    hitPosition = randomPosition.id;
}

function moveMole() {
    timerId = setInterval(randomSquare, 600);
}

function countdown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerId);
        clearInterval(countdownTimerId);
        alert(`Game over! Your final score is ${result}`);
    }
}

squares.forEach(square => {
    square.addEventListener('click', () => {
        if (square.id === hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    });
});

function startGame() {
    resetGame();
    moveMole();
    countdownTimerId = setInterval(countdown, 1000);
}

function resetGame() {
    clearInterval(timerId);
    clearInterval(countdownTimerId);
    currentTime = 60;
    result = 0;
    hitPosition = null;
    timeLeft.textContent = currentTime;
    score.textContent = result;
    squares.forEach(square => square.classList.remove('mole'));
}

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);