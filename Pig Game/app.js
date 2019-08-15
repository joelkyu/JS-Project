var scores, roundScore, lastRoll, activePlayer, gamePlaying;

// Initialize
init();

// Functions
function switchPlayer() {
    // switches to the other player
    document.getElementById('current-' + activePlayer).textContent = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    // resets the scores and counters
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastRoll = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function diceRoll() {
    if (gamePlaying) {
        // dice roll and change dice image
        //var dice = Math.floor(Math.random() * 6) + 1;
        var dice = 6;
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (lastRoll == 6 && dice == 6) {
            // lose all scores
            scores[activePlayer] = 0
            document.getElementById('score-' + activePlayer).textContent = 0;
            switchPlayer();

        } else if (dice !== 1) {
            roundScore += dice;
            lastRoll = dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;

        } else {
            switchPlayer();
        }
    }
}

function holdBtn() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Gagner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            switchPlayer();
        }
    }
}

function init() {
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('#name-0').textContent = 'Player 1';

    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.querySelector('.player-1-panel').classList.remove('active'),
        document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#name-1').textContent = 'Player 2';

    scores = [0, 0];
    roundScore = 0;
    lastRoll = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';

    gamePlaying = true;
}

// Button Event Listeners 
document.querySelector('.btn-roll').addEventListener('click', diceRoll);
document.querySelector('.btn-hold').addEventListener('click', holdBtn);
document.querySelector('.btn-new').addEventListener('click', init);
