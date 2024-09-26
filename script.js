const cardsArray = [
  'Circle.png', 'Circle.png', 
  'Heart.png', 'Heart.png', 
  'Triangle.png', 'Triangle.png', 
  'Square.png', 'Square.png',
  'Circle.png', 'Circle.png', 
  'Heart.png', 'Heart.png', 
  'Triangle.png', 'Triangle.png', 
  'Square.png', 'Square.png'
];

let moves = 0;
let time = 0;
let flippedCards = [];
let matchedCards = [];
let timer;
let isGameActive = false;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : Infinity;

const gameBoard = document.getElementById('gameBoard');
const movesCounter = document.getElementById('moves');
const timeCounter = document.getElementById('time');
const highScoreCounter = document.getElementById('highScore');
const restartButton = document.getElementById('restart');

// Shuffle array
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Initialize game
function initGame() {
  isGameActive = false;
  moves = 0;
  time = 0;
  flippedCards = [];
  matchedCards = [];
  movesCounter.textContent = moves;
  timeCounter.textContent = time;
  highScoreCounter.textContent = highScore === Infinity ? "N/A" : highScore;
  clearInterval(timer);
  
  const shuffledCards = shuffle([...cardsArray]);
  gameBoard.innerHTML = '';

  shuffledCards.forEach((image, index) => {
    const card = document.createElement('div');
    card.classList.add('card', 'hidden');
    card.dataset.symbol = image;
    card.innerHTML = `<img src="${image}" alt="card image" style="width: 100%; height: 100%; display: none;">`;
    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

// Flip a card
function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    card.classList.remove('hidden');
    const img = card.querySelector('img');
    img.style.display = 'block';  // Show the image
    flippedCards.push(card);
    
    if (!isGameActive) {
      startTimer();
      isGameActive = true;
    }

    if (flippedCards.length === 2) {
      moves++;
      movesCounter.textContent = moves;
      checkForMatch();
    }
  }
}

// Check if two flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === cardsArray.length) {
      clearInterval(timer);
      updateHighScore();
      alert(`Congrats! You won in ${moves} moves and ${time} seconds!`);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.classList.add('hidden');
      card2.classList.add('hidden');
      card1.querySelector('img').style.display = 'none';  // Hide the image
      card2.querySelector('img').style.display = 'none';  // Hide the image
      flippedCards = [];
    }, 1000);
  }
}

// Start game timer
function startTimer() {
  timer = setInterval(() => {
    time++;
    timeCounter.textContent = time;
  }, 1000);
}

// Update high score
function updateHighScore() {
  if (moves < highScore) {
    highScore = moves;
    localStorage.setItem('highScore', highScore);
    highScoreCounter.textContent = highScore;
  }
}

// Restart game
restartButton.addEventListener('click', initGame);

// Start game on page load
initGame();

const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const closePopup = document.getElementById('closePopup');

// Check if two flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === cardsArray.length) {
      clearInterval(timer);
      updateHighScore();
      showPopup(`Congrats! You won in ${moves} moves and ${time} seconds!`);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.classList.add('hidden');
      card2.classList.add('hidden');
      card1.querySelector('img').style.display = 'none';  // Hide the image
      card2.querySelector('img').style.display = 'none';  // Hide the image
      flippedCards = [];
    }, 1000);
  }
}

// Show popup message
function showPopup(message) {
  popupMessage.textContent = message;
  popup.style.display = 'block'; // Show popup
}

// Close popup
closePopup.addEventListener('click', () => {
  popup.style.display = 'none'; // Hide popup
});

// Get the audio element
const cardClickSound = document.getElementById('cardClickSound');

// Function to handle card click
function handleCardClick(card) {
    // Play sound
    cardClickSound.currentTime = 0; // Reset sound to start
    cardClickSound.play(); // Play the sound

    // Your existing logic for handling card clicks goes here
}

// Example of attaching the click event to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => handleCardClick(card));
});
