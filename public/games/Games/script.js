let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function renderBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.textContent = cell;
    div.onclick = () => handleCellClick(index);
    boardElement.appendChild(div);
  });
}

function handleCellClick(index) {
  if (!gameActive || board[index]) return;
  board[index] = currentPlayer;
  renderBoard();
  if (checkWin()) {
    document.getElementById('status').textContent = `🎉 اللاعب ${currentPlayer} فاز!`;
    gameActive = false;
  } else if (!board.includes('')) {
    document.getElementById('status').textContent = '🤝 تعادل!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return wins.some(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
}

function startGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  document.getElementById('status').textContent = '';
  renderBoard();
}

window.onload = startGame;
