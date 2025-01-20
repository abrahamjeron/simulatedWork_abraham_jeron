let rockButton = document.getElementById('input-rock');
let paperButton = document.getElementById('input-paper');
let scissorButton = document.getElementById('input-scissor');
let userInput=''
let playButton = document.getElementById('play')
let result = document.getElementById('result')
let choosen = document.getElementById('choosen');

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
 
const decideWinner=()=>{
    if (userInput=='rock' && computerInput=='rock' ||
     userInput=='paper'&& computerInput=='paper' ||
     userInput=='scissor'&& computerInput=='scissor'){
        return 'it s a tie! Computer choosed: '+computerInput;
     }else if (userInput=='rock'&&computerInput=='scissor' || 
     userInput=='paper'&&computerInput=='rock' || 
     userInput=='scissor'&& computerInput=='paper'){
        return 'player wins! Computer choosed: '+computerInput;
     }else{
        return 'computer wins! Computer choosed: '+computerInput;
     }
}
playButton.addEventListener('click',()=>{
    play()
})
