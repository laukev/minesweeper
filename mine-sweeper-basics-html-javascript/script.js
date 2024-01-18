// Selecting elements from the DOM
const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.btn');

// Game constants
const totalCells = 100;
const totalBombs = 5;
const maxScores = 5;
const bombsList = [];

// Initial score
let score = 0;

// Flag to track whether the game is over
let gameOver = false;

// Function to update the score
function updateScore() {
  score++;
  scoreCounter.innerText = score.toString().padStart(5, '0');

  // Check for victory condition
  if (score === maxScores) {
    endGame(true); // Pass true to indicate victory
  }
}

// Creating cells and adding them to the grid
for (let i = 1; i <= totalCells; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');

  // Add bomb class to cells that contain bombs
  if (bombsList.includes(i)) {
    cell.classList.add('cell-bomb');
  }

  // Click event listener for each cell
  cell.addEventListener('click', function () {
    // Check if the game is already over
    if (gameOver) {
      return;
    }

    // Check if the cell has already been clicked
    if (cell.classList.contains('cell-clicked')) {
      return;
    }

    if (bombsList.includes(i)) {
      cell.classList.add('cell-clicked', 'cell-bomb');
      endGame(false);
    } else {
      cell.classList.add('cell-clicked');
      updateScore();
    }
  });

  // Append cell to the grid
  grid.appendChild(cell);
}

// Generate bomb positions
while (bombsList.length < totalBombs) {
  const randomNumber = Math.floor(Math.random() * totalCells) + 1;

  if (!bombsList.includes(randomNumber)) {
    bombsList.push(randomNumber);
  }
}

// Function to end the game
function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = 'YOU<br>WON';
    endGameScreen.classList.add('win');
  }

  endGameScreen.classList.remove('hidden');
  gameOver = true; // Set the game over flag
}

// Click event listener for the Play Again button
playAgainButton.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent default form submission behavior
  window.location.reload(); // Reload the page
});