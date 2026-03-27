let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

const moveStrings = {
    rock: '✊',
    paper: '🖐️',
    scissors: '✌️'
};

const autoPlayTimeMS = 750;
let intervalID = undefined;
let isAutoPlaying = false;

function pickMove() {
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1/3) {
        return moveStrings.rock;
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        return moveStrings.paper;
    } else {
        return moveStrings.scissors;
    }
}

function playGame(userMove) {
    let computerMove = '';
    let result = '';

    computerMove = pickMove();

    const winCases = userMove === moveStrings.rock && computerMove === moveStrings.scissors || userMove === moveStrings.paper && computerMove === moveStrings.rock || userMove === moveStrings.scissors && computerMove === moveStrings.paper;
    const tieCase = userMove === computerMove;
    if (tieCase) {
        result = 'Tied';
    } else if (winCases) {
        result = 'Won';
    } else {
        result = 'Lost';
    }

    document.querySelector('.resultDisplay').innerText = `You ${result}`;
    document.querySelector('.movesDisplay').innerHTML = `<b>You: ${userMove}   ${computerMove} :Computer</b>`;
    
    manageScore(result);
}

function autoPlay(event) {
    const autoPlayButton = document.querySelector('.js-autoplay');
    let inputs = event.key === 'a' || event.type === 'click';

    if (inputs && !isAutoPlaying) {
        isAutoPlaying = true;
        autoPlayButton.innerHTML = 'Stop playing'; 

        intervalID = setInterval(() => {
            const userMove = pickMove();
            playGame(userMove);
            isAutoPlaying = true;
        }, autoPlayTimeMS);
    } else if (inputs && isAutoPlaying) {
        isAutoPlaying = false;
        autoPlayButton.innerHTML = 'Auto play';
        
        clearInterval(intervalID);
    }
}

function manageScore(result) {
    if (result === 'Won') {
        score.wins++;
    } else if (result === 'Lost') {
        score.losses += 1;
    } else {
        score.ties += 1;
    }

    updateScoreElement();
    localStorage.setItem('score', JSON.stringify(score));
}

function reset() {
    score.losses = 0;
    score.wins = 0; 
    score.ties = 0;
    document.querySelector('.resultDisplay').innerText = '';
    document.querySelector('.movesDisplay').innerText = '';
    updateScoreElement();
    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-reset-message').innerHTML = '';
}

function resetScore(event)
{
    const inputs = event.key === 'Backspace' || event.type === 'click';
    const invalidReset = score.wins === 0 && score.losses === 0 && score.ties === 0;

    if (inputs && !invalidReset) {
        console.log('faaf');
        const resetMessageElement = document.querySelector('.js-reset-message');
        resetMessageElement.innerHTML = `Are you sure you want to reset the score? <button class="js-reset-yes reset-yes" onclick="reset();">Yes</button> <button class="js-reset-no reset-no" onclick="document.querySelector('.js-reset-message').innerHTML = '';">No</button>`;
    }
}

function updateScoreElement() {
    document.getElementById('scoreDisplay').innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

updateScoreElement();

document.addEventListener('keydown', event => {
    if (event.key === 'r') {
        playGame(moveStrings.rock);
    } else if (event.key === 'p') {
        playGame(moveStrings.paper);
    } else if (event.key === 's') {
        playGame(moveStrings.scissors);
    }
});
document.addEventListener('keydown', event => autoPlay(event));
document.addEventListener('keydown', event => resetScore(event));

document.querySelector('.resetButton').addEventListener('click', event => resetScore(event));
document.querySelector('.js-autoplay').addEventListener('click', event => autoPlay(event));