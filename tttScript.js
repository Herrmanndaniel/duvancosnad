document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  let currentPlayer = "X";
  let gameBoard = new Array(5).fill(null).map(() => new Array(5).fill(null));
  let gameActive = true;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", handleCellClick);
      board.appendChild(cell);
    }
  }

  function handleCellClick(event) {
    if (!gameActive) return;
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (gameBoard[row][col] === null) {
      gameBoard[row][col] = currentPlayer;
      event.target.textContent = currentPlayer;
      checkWinner(row, col);
      togglePlayer();
    }
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function checkWinner(row, col) {
    if (checkRow(row) || checkColumn(col) || checkDiagonals(row, col)) {
      status.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (isBoardFull()) {
      status.textContent = "It's a tie!";
      gameActive = false;
    }
  }

  function checkRow(row) {
    return gameBoard[row].every((cell) => cell === currentPlayer);
  }

  function checkColumn(col) {
    return gameBoard.every((row) => row[col] === currentPlayer);
  }

  function checkDiagonals(row, col) {
    const diagonal1 = gameBoard.every((row, i) => row[i] === currentPlayer);
    const diagonal2 = gameBoard.every((row, i) => row[4 - i] === currentPlayer);
    return (
      diagonal1 ||
      diagonal2 ||
      (row == col && diagonal1) ||
      (row + col == 4 && diagonal2)
    );
  }

  function isBoardFull() {
    return gameBoard.every((row) => row.every((cell) => cell !== null));
  }
});


function resetGame() {
  window.location.reload();
}