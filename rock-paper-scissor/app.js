let rockButton = document.getElementById('input-rock');
let paperButton = document.getElementById('input-paper');
let scissorButton = document.getElementById('input-scissor');
let userInput=''
let playButton = document.getElementById('play');
let resetBtn=document.getElementById('reset-btn');
let result = document.getElementById('result');
let choosen = document.getElementById('choosen');
let playerscore = document.getElementById('score');
let computerscore=document.getElementById('comp-score');

let playerScore=0
let computerScore=0

resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerscore.innerText = playerScore; 
    computerscore.innerText = computerScore; 
    result.innerText = ""; 
    choosen.innerText = ""; 
});


playerscore.innerText=playerScore
computerscore.innerText=computerScore

rockButton.addEventListener('click',()=>{
    userInput='rock';
    choosen.innerText="You've choosen: "+userInput;
})
paperButton.addEventListener('click',()=>{
    userInput='paper';
    choosen.innerText="You've choosen: "+userInput;
})
scissorButton.addEventListener('click',()=>{
    userInput='scissor';
    choosen.innerText="You've choosen: "+userInput;
})
const play =()=>{
    result.innerText="Result: "+decideWinner();
}
const randomOutput=()=>{
    const possibleOutputs = ['rock','paper','scissor'];
    return possibleOutputs[Math.floor(Math.random()*3)]
}
const computerInput=randomOutput();
 
const decideWinner = () => {
    if (userInput == 'rock' && computerInput == 'rock' ||
        userInput == 'paper' && computerInput == 'paper' ||
        userInput == 'scissor' && computerInput == 'scissor') {
        return 'It\'s a tie! Computer chose: ' + computerInput;
    } else if (userInput == 'rock' && computerInput == 'scissor' ||
        userInput == 'paper' && computerInput == 'rock' ||
        userInput == 'scissor' && computerInput == 'paper') {
        playerScore += 1;
        playerscore.innerText = playerScore; // Update player's score
        return 'Player wins! Computer chose: ' + computerInput;
    } else {
        computerScore += 1;
        computerscore.innerText = computerScore; // Update computer's score
        return 'Computer wins! Computer chose: ' + computerInput;
    }
};

playButton.addEventListener('click',()=>{
    play()
})
