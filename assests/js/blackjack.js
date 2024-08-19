const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = [
    "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"
];

let deck = [];
let playerHand = [];
let dealerHand = [];

const status = document.getElementById('status');
const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');

dealButton.addEventListener('click', () => {
    startGame();
});

hitButton.addEventListener('click', () => {
    playerHit();
});

standButton.addEventListener('click', () => {
    dealerPlays();
});

function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            let card = { suit, value };
            deck.push(card);
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function startGame() {
    createDeck();
    shuffleDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    updateGame();
    enableButtons();
    status.textContent = "Game started!";
}

function updateGame() {
    updateHands();
    checkScores();
}

function updateHands() {
    document.getElementById('player-cards').innerHTML = playerHand.map(card => cardHTML(card)).join('');
    document.getElementById('dealer-cards').innerHTML = dealerHand.map(card => cardHTML(card)).join('');
    document.getElementById('player-score').innerText = `Score: ${calculateScore(playerHand)}`;
    document.getElementById('dealer-score').innerText = `Score: ${calculateScore(dealerHand)}`;
}

function cardHTML(card) {
    return `<div class='card'>${card.value} of ${card.suit}</div>`;
}

function calculateScore(hand) {
    let score = 0;
    let hasAce = false;
    for (let card of hand) {
        if (card.value === "Ace") {
            hasAce = true;
            score += 11;
        } else if (["King", "Queen", "Jack"].includes(card.value)) {
            score += 10;
        } else {
            score += parseInt(card.value, 10);
        }
    }
    if (hasAce && score > 21) {
        score -= 10;
    }
    return score;
}

function playerHit() {
    playerHand.push(deck.pop());
    updateGame();
    if (calculateScore(playerHand) > 21) {
        endGame('Player busts! Dealer Wins!');
    }
}

function dealerPlays() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    updateGame();
    determineWinner();
}

function determineWinner() {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    if (dealerScore > 21 || playerScore > dealerScore) {
        endGame('Player Wins!');
    } else if (playerScore < dealerScore) {
        endGame('Dealer Wins!');
    } else {
        endGame('It\'s a Tie!');
    }
}

function enableButtons() {
    hitButton.disabled = false;
    standButton.disabled = false;
}

function disableButtons() {
    hitButton.disabled = true;
    standButton.disabled = true;
}

function endGame(message) {
    status.textContent = message;
    disableButtons();
}