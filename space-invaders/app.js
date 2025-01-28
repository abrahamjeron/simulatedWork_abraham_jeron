const grid = document.querySelector('.grid');
const resultsDisplay = document.querySelector('.results');
const startBtn = document.querySelector('.start-btn');
const pauseBtn = document.querySelector('.pause-btn');
const restartBtn = document.querySelector('.restart-btn');
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invaderId;
let goingRight = true;
let aliensRemoved = [];
let isGameRunning = false;

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

const spaceInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

function drawInvader() {
    for (let i = 0; i < spaceInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) 
            squares[spaceInvaders[i]].classList.add('invader');
    }
}

function removeInvader() {
    for (let i = 0; i < spaceInvaders.length; i++) {
        squares[spaceInvaders[i]].classList.remove('invader');
    }
}

function moveShooter(e) {
    if (!isGameRunning) return;
    squares[currentShooterIndex].classList.remove('shooter');
    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
            break;
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
            break;
    }
    squares[currentShooterIndex].classList.add('shooter');
}

function moveInvaders(){
    const leftEdge = spaceInvaders[0] % width === 0
    const rightEdge = spaceInvaders[spaceInvaders.length - 1] % width === width -1
    removeInvader()
    
    if (rightEdge && goingRight) {
        for (let i = 0; i < spaceInvaders.length; i++) {
            spaceInvaders[i] += width + 1
            direction = -1
            goingRight = false
        }
    }

    if (leftEdge && !goingRight){
        for (let i = 0; i < spaceInvaders.length; i++) {
            spaceInvaders[i] += width - 1
            direction = 1
            goingRight = true
        }
    }

    for (let i = 0; i < spaceInvaders.length; i++) {
        spaceInvaders[i] += direction
    }

    drawInvader()

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(invaderId)
    }

    for (let i = 0; i < spaceInvaders.length; i++) {
        if(spaceInvaders[i] > (squares.length - width)) {
            resultsDisplay.innerHTML = 'GAME OVER'
            clearInterval(invaderId)
        }
    }

    if (aliensRemoved.length === spaceInvaders.length) {
        resultsDisplay.innerHTML = 'YOU WIN'
        clearInterval(invaderId)
    }
}

function shoot(e) {
    if (!isGameRunning) return;

    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');

        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.add('boom');

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
            clearInterval(laserId);

            const alienRemoved = spaceInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoved);
            resultsDisplay.innerHTML = aliensRemoved.length;
        }

        if (currentLaserIndex < width) {
            clearInterval(laserId);
            squares[currentLaserIndex].classList.remove('laser');
        }
    }

    if (e.key === 'ArrowUp') {
        laserId = setInterval(moveLaser, 100);
    }
}

document.addEventListener('keydown', moveShooter);
document.addEventListener('keydown', shoot);

startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
restartBtn.addEventListener('click', restartGame);

function startGame() {
    isGameRunning = true;
    resultsDisplay.innerHTML = '0';
    aliensRemoved = [];
    spaceInvaders.forEach(index => squares[index].classList.remove('invader', 'laser', 'boom'));
    currentShooterIndex = 202;
    squares[currentShooterIndex].classList.add('shooter');
    invaderId = setInterval(moveInvaders, 650);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    restartBtn.disabled = false;
}

function pauseGame() {
    isGameRunning = false;
    clearInterval(invaderId);
    pauseBtn.disabled = true;
    startBtn.disabled = false;
}

function restartGame() {
    location.reload();
}