const addOneMoreInput = document.querySelector('#addOneMoreInput');
const inputsWrapper = document.querySelector('.inputs-wrapper');
const randomizerButton = document.querySelector('#randomizer');
let playerCount = inputsWrapper.querySelectorAll('input[type="text"]').length;
let removePlayerButtons = inputsWrapper.querySelectorAll('.btn-remove');
let playerUsedPositions = [];

function removePlayer(event) {
    const playerWrapper = event.currentTarget.closest('.player-wrapper');
    playerWrapper.remove();
    playerCount--;
}

function createPlayerRemover() {
    let playerRemover = document.createElement('button');
    playerRemover.classList.add('btn-remove');
    playerRemover.setAttribute('aria-label', `Remove Player ${playerCount + 1}`);
    playerRemover.addEventListener('click', removePlayer);
    return playerRemover;
}

function createPlayerWrapper() {
    let playerWrapper = document.createElement('div');
    playerWrapper.classList.add('player-wrapper');
    
    let newInput = createPlayerInput();
    let removeBtn = createPlayerRemover();

    playerWrapper.append(newInput);
    playerWrapper.append(removeBtn);

    return playerWrapper;
}

function createPlayerInput() {
    let newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'player';
    newInput.classList.add('input--primary');
    newInput.placeholder = `Player ${playerCount + 1}`;
    return newInput;
}

if (addOneMoreInput) {
    addOneMoreInput.addEventListener('click', event => {
        let playerWrapper = createPlayerWrapper();
        inputsWrapper.append(playerWrapper);
        playerCount++;
    });
}

for (const removeBtn of removePlayerButtons) {
    removeBtn.addEventListener('click', removePlayer);
}

// Randomizing

function getRandomInt(max) {
    let randomInt = Math.floor(Math.random() * max);
    
    if (playerUsedPositions.indexOf(randomInt) > -1) {
      randomInt = getRandomInt(max);
    }
      
    playerUsedPositions.push(randomInt);
    
    return randomInt;
  }

function randomizePlayers() {
    let players = document.querySelectorAll('input[name="player"]');

    for (const player of players) {
        const randomIndex = getRandomInt(players.length);
        console.log(randomIndex);
        players[randomIndex].classList.add(`pos-${randomIndex}`);
    }

    playerUsedPositions = [];
}

if (randomizerButton) {
    randomizerButton.addEventListener('click', randomizePlayers);
}