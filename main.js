const addOneMoreInput = document.querySelector('#addOneMoreInput');
const inputsWrapper = document.querySelector('.inputs-wrapper');
const randomizerButton = document.querySelector('#randomizer');
const resultWrapper = document.querySelector('.result');
const teamsNumberInput = document.querySelector('#teamsNumber');
const randomizerForm = document.querySelector('#randomizerForm');
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

function createPlayerWrapper(insertRemover = true) {
    let playerWrapper = document.createElement('div');
    playerWrapper.classList.add('player-wrapper');
    
    playerWrapper.append(createPlayerInput());
    
    if (insertRemover) {
        playerWrapper.classList.add('flex');

        try {
            playerWrapper.append(createPlayerRemover());
        } catch (error) {
            console.error('An error is occured, maybe a loop...');
        }
    }

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

function getRandomInt(max, loopCheck = 0) {
    if (loopCheck > 999) return max;

    let randomInt = Math.floor(Math.random() * max);
    
    if (playerUsedPositions.indexOf(randomInt) > -1) {
      randomInt = getRandomInt(max, loopCheck + 1);
    }
      
    playerUsedPositions.push(randomInt);
    
    return randomInt;
}

function createTeamsWrapper(teamsCount) {
    resultWrapper.innerHTML = '';

    for (let i = 0; i < teamsCount; i++) {
        let teamWrapper = document.createElement('div');
        teamWrapper.classList.add(`team`, `team-${i}`);
        resultWrapper.append(teamWrapper);
    }
}

function putPlayerInItsTeam(playerElem, position, teamsCount) {
    const player = playerElem.cloneNode();
    player.setAttribute('disabled', '');
    const playerTeam = resultWrapper.querySelector(`.team-${position % teamsCount}`);
    playerTeam.append(player);
}

function randomizePlayers() {
    if (!randomizerForm.checkValidity()) return;

    let players = document.querySelectorAll('.players input[name="player"]');
    const teamsCount = Math.abs(parseInt(teamsNumberInput.value));
    createTeamsWrapper(teamsCount);

    for (const player of players) {
        const randomIndex = getRandomInt(players.length);
        putPlayerInItsTeam(player, randomIndex, teamsCount);
    }

    playerUsedPositions = [];
}

if (randomizerButton) {
    randomizerButton.addEventListener('click', randomizePlayers);
}