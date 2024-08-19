document.addEventListener('DOMContentLoaded', () => {
    let randomNumber;
    let attempts;
    let hintsGiven;

    function initializeGame() {
        randomNumber = Math.floor(Math.random() * 101);
        attempts = 5; // Fixed the issue by removing 'let'
        hintsGiven = 0; // Fixed the issue by removing 'let'

        document.getElementById('message').textContent = '';
        document.getElementById('hints').textContent = '';
        document.getElementById('guess').value = '';
        document.getElementById('submit').disabled = false;
        document.getElementById('guess').disabled = false;
        document.getElementById('restart').style.display = 'none';
    }

    function handleGuess() {
        const userGuess = parseInt(document.getElementById('guess').value);
        const messageElem = document.getElementById('message');
        const hintElem = document.getElementById('hints');

        if (isNaN(userGuess) || userGuess < 0 || userGuess > 100) {
            messageElem.textContent = 'Please enter a valid number between 0 and 100.';
            return;
        }

        attempts--;

        if (userGuess === randomNumber) {
            messageElem.textContent = `Congratulations! You guessed the correct number ${randomNumber}!`;
            endGame();
        } else {
            messageElem.textContent = `Incorrect guess. You have ${attempts} attempts left.`;

            if (hintsGiven < 3) {
                hintsGiven++;
                const hint = generateHint(randomNumber, userGuess);
                hintElem.textContent += hint + ' ';
            }

            if (attempts === 0) {
                messageElem.textContent = `Game over! The correct number was ${randomNumber}.`;
                endGame();
            }
        }
    }

    function generateHint(target, guess) {
        if (guess < target) {
            return `Hint ${hintsGiven}: Try a higher number.`;
        } else {
            return `Hint ${hintsGiven}: Try a lower number.`;
        }
    }

    function endGame() {
        document.getElementById('submit').disabled = true;
        document.getElementById('guess').disabled = true;
        document.getElementById('restart').style.display = 'inline-block';
    }

    document.getElementById('submit').addEventListener('click', handleGuess);
    document.getElementById('guess').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleGuess();
        }
    });
    document.getElementById('restart').addEventListener('click', initializeGame);

    initializeGame();
});