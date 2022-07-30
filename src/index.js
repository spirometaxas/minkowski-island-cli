const minkowski_sausage = require('minkowski-sausage-cli');

const createBoard = function(w, h) {
  let board = [];
  for (let i = 0; i < h; i++) {
    let row = [];
    for (let j = 0; j < w; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

const draw = function(board) {
  var result = '\n ';
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      result += board[board.length - i - 1][j];
    }
    result += '\n ';
  }
  return result;
}

const addToBoard = function(board, part, pos) {
  for (let i = 0; i < part.length; i++) {
    for (let j = 0; j < part[0].length; j++) {
      if (board[pos.y + i][pos.x + j] === ' ') {
        board[pos.y + i][pos.x + j] = part[i][j];
      }
    }
  }
}

const create = function(n, inverse=false) {
  if (n === undefined || isNaN(n) || n < 0) {
    return '';
  }

  if (n === 0) {
    const board = createBoard(3, 2);
    board[0][0] = '└';
    board[0][1] = '─';
    board[0][2] = '┘';
    board[1][0] = '┌';
    board[1][1] = '─';
    board[1][2] = '┐';
    return draw(board);
  }

  const rightBoard = minkowski_sausage.minkowski(n, 'right', { end1: 'down', end2: 'down' }, inverse);
  const downBoard = minkowski_sausage.minkowski(n, 'down', { end1: 'left', end2: 'left' }, inverse);
  const leftBoard = minkowski_sausage.minkowski(n, 'left', { end1: 'up', end2: 'up' }, inverse);
  const upBoard = minkowski_sausage.minkowski(n, 'up', { end1: 'right', end2: 'right' }, inverse);

  const w = rightBoard[0].length + upBoard[0].length - 1;
  const h = upBoard.length + rightBoard.length - 1;
  const board = createBoard(w, h);

  addToBoard(board, rightBoard, { x: parseInt(upBoard[0].length / 2), y: board.length - leftBoard.length });
  addToBoard(board, leftBoard, { x: parseInt(upBoard[0].length / 2), y: 0 });
  addToBoard(board, upBoard, { x: 0, y: parseInt(rightBoard.length / 2) });
  addToBoard(board, downBoard, { x: board[0].length - downBoard[0].length, y: parseInt(rightBoard.length / 2) });
  
  return draw(board);
}

module.exports = {
  create: create
};