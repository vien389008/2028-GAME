export type Board = number[][];

export function createEmptyBoard(size: number): Board {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

export function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

export function getRandomEmptyCell(board: Board) {
  const empty: { r: number; c: number }[] = [];
  board.forEach((row, r) =>
    row.forEach((v, c) => {
      if (v === 0) empty.push({ r, c });
    }),
  );
  return empty[Math.floor(Math.random() * empty.length)];
}

export function spawnTile(board: Board): Board {
  const cell = getRandomEmptyCell(board);
  if (!cell) return board;

  const newBoard = cloneBoard(board);
  newBoard[cell.r][cell.c] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
}

function mergeRow(row: number[]): { row: number[]; score: number } {
  const filtered = row.filter((v) => v !== 0);
  let score = 0;

  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      score += filtered[i];
      filtered[i + 1] = 0;
      i++;
    }
  }

  const merged = filtered.filter((v) => v !== 0);
  while (merged.length < row.length) merged.push(0);

  return { row: merged, score };
}

export function moveLeft(board: Board) {
  let moved = false;
  let score = 0;

  const newBoard = board.map((row, r) => {
    const { row: merged, score: s } = mergeRow(row);
    if (!moved && merged.some((v, i) => v !== row[i])) moved = true;
    score += s;
    return merged;
  });

  return { board: newBoard, moved, score };
}

export function moveRight(board: Board) {
  const reversed = board.map((r) => [...r].reverse());
  const res = moveLeft(reversed);
  return {
    board: res.board.map((r) => r.reverse()),
    moved: res.moved,
    score: res.score,
  };
}

export function moveUp(board: Board) {
  const size = board.length;
  let moved = false;
  let score = 0;
  const newBoard = cloneBoard(board);

  for (let c = 0; c < size; c++) {
    const col = board.map((r) => r[c]);
    const { row: merged, score: s } = mergeRow(col);
    score += s;
    for (let r = 0; r < size; r++) {
      if (newBoard[r][c] !== merged[r]) moved = true;
      newBoard[r][c] = merged[r];
    }
  }

  return { board: newBoard, moved, score };
}

export function moveDown(board: Board) {
  const size = board.length;
  const reversed = cloneBoard(board).reverse();
  const res = moveUp(reversed);
  return {
    board: res.board.reverse(),
    moved: res.moved,
    score: res.score,
  };
}

export function hasMoves(board: Board): boolean {
  const size = board.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) return true;
      if (c < size - 1 && board[r][c] === board[r][c + 1]) return true;
      if (r < size - 1 && board[r][c] === board[r + 1][c]) return true;
    }
  }
  return false;
}
