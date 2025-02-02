const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20
let timerId
let xDirection = -2
let yDirection = 2
let score = 0

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

//block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
]

//function for adding block
function addBlock() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlock()

//user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//function for drawing User
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//function for drawing ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//function for moving user
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//function for moving ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 20)

// Improved collision detection
function checkForCollisions() {
    // Check for block collisions
    blocks.forEach((block, index) => {
        const blockElement = document.querySelectorAll('.block')[index];
        if (
            (ballCurrentPosition[0] + ballDiameter > block.bottomLeft[0] &&
            ballCurrentPosition[0] < block.bottomRight[0]) &&
            (ballCurrentPosition[1] + ballDiameter > block.bottomLeft[1] &&
            ballCurrentPosition[1] < block.topLeft[1])
        ) {
            blockElement.classList.remove('block'); // Remove block
            blocks.splice(index, 1); // Remove from blocks array
            changeDirection(); // Change ball direction
            score++;
            scoreDisplay.innerHTML = score;

            // Win check
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'YOU WIN!';
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser);
            }
        }
    });

    // Check for wall collisions
    if (ballCurrentPosition[0] <= 0 || ballCurrentPosition[0] >= boardWidth - ballDiameter) {
        xDirection = -xDirection;
    }

    if (ballCurrentPosition[1] >= boardHeight - ballDiameter) {
        yDirection = -yDirection;
    }

    // Check for paddle collisions
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        yDirection = -yDirection; // Bounce the ball back
    }

    // Check for game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = 'You Lose >_<';
        document.removeEventListener('keydown', moveUser);
    }
}


//function for changing ball's direction
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }

    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }

    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }

    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}