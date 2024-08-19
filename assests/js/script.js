document.addEventListener('DOMContentLoaded', () => {
    const randomNumber = Math.floor(Math.random() * 101);
    let attempts = 5;
    let hintsGiven = 0;


document.getElementById('submit').addEventListener('click', () => {
    const userGuess = 
parseInt(document.getElementById('guess').value);
    const messageElem = 
document.getElementById('message');
    const hintElem = document.getElementById('hints');
    
    if (isNaN(userGuess)  || userGuess < 0 || userGuess > 100) {
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
});

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
}
});