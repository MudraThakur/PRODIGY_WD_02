const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
let currentPlayer = 'X';
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener('click', () => handleClick(cell));
});

function handleClick(cell) {
  const index = cell.getAttribute('data-index');
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winConditions.some(condition => {
    return condition.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach(cell => cell.textContent = "");
  statusText.textContent = "Player X's turn";
}




function showWinLine(condition) {
  const line = document.getElementById("winLine");
  const positions = {
    "0,1,2": { top: "50px", left: "0", width: "310px", rotate: "0deg" },
    "3,4,5": { top: "160px", left: "0", width: "310px", rotate: "0deg" },
    "6,7,8": { top: "270px", left: "0", width: "310px", rotate: "0deg" },
    "0,3,6": { top: "0", left: "50px", width: "310px", rotate: "90deg" },
    "1,4,7": { top: "0", left: "160px", width: "310px", rotate: "90deg" },
    "2,5,8": { top: "0", left: "270px", width: "310px", rotate: "90deg" },
    "0,4,8": { top: "0", left: "0", width: "440px", rotate: "45deg" },
    "2,4,6": { top: "0", left: "0", width: "440px", rotate: "-45deg" }
  };

  const key = condition.sort().join(",");
  const style = positions[key];
  if (style) {
    line.style.display = "block";
    line.style.top = style.top;
    line.style.left = style.left;
    line.style.width = style.width;
    line.style.transform = `rotate(${style.rotate})`;
  }
}
