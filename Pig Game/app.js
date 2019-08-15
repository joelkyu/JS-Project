var scores, roundScore, lastRoll1, lastRoll2, activePlayer, gamePlaying, winningScore;

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
    lastRoll1 = 0;
    lastRoll2 = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function diceRoll() {
    if (gamePlaying) {
        // rolls the dice 
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // shows the result
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';

        // execute the game feautures
        if ((lastRoll1 == 6 && dice1 == 6) || (lastRoll2 == 6 && dice2 == 6)) {
            // lose all scores
            scores[activePlayer] = 0
            document.getElementById('score-' + activePlayer).textContent = 0;
            switchPlayer();

        } else if (dice1 == 1 && dice2 == 1) {
            switchPlayer();

        } else {
            roundScore += dice1 + dice2;
            lastRoll1 = dice1;
            lastRoll2 = dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
    }
}

function holdBtn() {
    if (gamePlaying) {
        //checks the winning score
        var winningScore = document.querySelector('.winning-score').value

        // use coercion to check if value is valid
        if (!winningScore || winningScore < 1) {
            winningScore = 100;
        }

        // adds current score to total score
        scores[activePlayer] += roundScore
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        
        
        // shows the player winning 
        if (scores[activePlayer] >= winningScore) {
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
    // resets Player 1 Display
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('#name-0').textContent = 'Player 1';

    // resets Player 2 Display
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.querySelector('.player-1-panel').classList.remove('active'),
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#name-1').textContent = 'Player 2';

    // resets internal score and variables
    scores = [0, 0];
    roundScore = 0;
    lastRoll1 = 0;
    lastRoll2 = 0;
    activePlayer = 0;
    winningScore = '';
    document.querySelector('.winning-score').placeholder = 'Set Winning Score'

    // hides the dice
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // resets the state of the game
    gamePlaying = true;
}

// Button Event Listeners 
document.querySelector('.btn-roll').addEventListener('click', diceRoll);
document.querySelector('.btn-hold').addEventListener('click', holdBtn);
document.querySelector('.btn-new').addEventListener('click', init);
