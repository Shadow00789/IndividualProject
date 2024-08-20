document.addEventListener('DOMContentLoaded', () => {
    let randomNumber;
    let attempts;
    let hintsGiven;
    let lastGuess;
    let score = 0;

    function initializeGame() {
        randomNumber = Math.floor(Math.random() * 101);
        attempts = 5;
        hintsGiven = 0;
        lastGuess = null;

        document.getElementById('message').textContent = '';
        document.getElementById('hints').textContent = '';
        document.getElementById('guess').value = '';
        document.getElementById('submit').disabled = false;
        document.getElementById('guess').disabled = false;
        document.getElementById('restart').style.display = 'none';
    }

    function updateScoreboard() {
        document.getElementById('scoreboard').textContent = `Score: ${score}`;
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
            score++;
            updateScoreboard();
            endGame();
        } else {
            messageElem.textContent = `Incorrect guess. You have ${attempts} attempts left.`;

            if (hintsGiven < 3) {
                hintsGiven++;
                const hint = generateHint(randomNumber, userGuess, lastGuess);
                hintElem.textContent += hint + ' ';
            }

            if (attempts === 0) {
                messageElem.textContent = `Game over! The correct number was ${randomNumber}.`;
                endGame();
            }
        }

        lastGuess = userGuess;
    }

    function generateHint(target, guess, lastGuess) {
        let hint = '';

        if (guess < target) {
            hint += `Hint ${hintsGiven}: Try a higher number. `;
        } else {
            hint += `Hint ${hintsGiven}: Try a lower number. `;
        }

        if (hintsGiven === 1) {
            if (target % 2 === 0) {
                hint += 'The number is divisible by 2.';
            } else if (target % 3 === 0) {
                hint += 'The number is divisible by 3.';
            } else if (target % 5 === 0) {
                hint += 'The number is divisible by 5.';
            } else {
                hint += 'The number is a prime number.';
            }
        } else if (hintsGiven === 2) {
            if (target < 25) {
                hint += 'The number is less than 25.';
            } else if (target < 50) {
                hint += 'The number is between 25 and 50.';
            } else if (target < 75) {
                hint += 'The number is between 50 and 75.';
            } else {
                hint += 'The number is greater than 75.';
            }
        } else if (hintsGiven === 3) {
            hint += target % 2 === 0 ? 'The number is even.' : 'The number is odd.';
        }

        return hint;
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
    updateScoreboard(); // Initialize scoreboard on page load
});