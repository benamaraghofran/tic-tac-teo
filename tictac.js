
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    function createBoard() {
      boardElement.innerHTML = '';
      board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        cellElement.addEventListener('click', handleCellClick);
        boardElement.appendChild(cellElement);
      });
    }

    function handleCellClick(e) {
      const index = e.target.dataset.index;
      if (!gameActive || board[index] !== "") return;

      board[index] = currentPlayer;
      e.target.textContent = currentPlayer;
      if (checkWin()) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;

        if (currentPlayer === "X") {
            scoreX++;}
         else {
             scoreO++;
         }

        saveScores();
        updateScoreDisplay();
    return;}
 else if (board.every(cell => cell !== "")) {
        statusElement.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWin() {
      const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];

      return winConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
      });
    }

    function resetGame() {
      board = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameActive = true;
      statusElement.textContent = `Player ${currentPlayer}'s turn`;
      createBoard();
    }


let scoreX = 0;
let scoreO = 0;

const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

// Load scores from localStorage
function loadScores() {
  scoreX = parseInt(localStorage.getItem('scoreX')) || 0;
  scoreO = parseInt(localStorage.getItem('scoreO')) || 0;
  updateScoreDisplay();
}

// Update score display
function updateScoreDisplay() {
  scoreXElement.textContent = scoreX;
  scoreOElement.textContent = scoreO;
}

// Save scores to localStorage
function saveScores() {
  localStorage.setItem('scoreX', scoreX);
  localStorage.setItem('scoreO', scoreO);
}

// Reset scores
function resetScores() {
  scoreX = 0;
  scoreO = 0;
  saveScores();
  updateScoreDisplay();
}



    createBoard();
    loadScores();



    