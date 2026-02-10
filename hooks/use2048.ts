import { useCallback, useEffect, useState } from "react";

/* ================= TYPES ================= */

export type Direction = "left" | "right" | "up" | "down";

export type Tile = {
  id: string;
  value: number;
  r: number;
  c: number;
  from?: { r: number; c: number };
  merged?: boolean;
  spawned?: boolean;
};

type MoveResult = {
  tiles: Tile[];
  moved: boolean;
  scoreGained: number;
  mergedValues: number[];
};

/* ================= UTILS ================= */

function uid() {
  return Math.random().toString(36).slice(2);
}

function key(r: number, c: number) {
  return `${r}-${c}`;
}

/* ================= INIT ================= */

function createInitialTiles(size: number): Tile[] {
  const cells: { r: number; c: number }[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) cells.push({ r, c });
  }

  const pick = () =>
    cells.splice(Math.floor(Math.random() * cells.length), 1)[0];

  const a = pick();
  const b = pick();

  return [
    { id: uid(), value: 2, r: a.r, c: a.c, spawned: true },
    {
      id: uid(),
      value: Math.random() < 0.9 ? 2 : 4,
      r: b.r,
      c: b.c,
      spawned: true,
    },
  ];
}

/* ================= MOVE CORE ================= */

function moveTiles(tiles: Tile[], size: number, dir: Direction): MoveResult {
  const map = new Map<string, Tile>();
  tiles.forEach((t) => map.set(key(t.r, t.c), t));

  const newTiles: Tile[] = [];
  const mergedValues: number[] = [];
  let scoreGained = 0;
  let moved = false;

  const idx = [...Array(size).keys()];

  const lines =
    dir === "left" || dir === "right"
      ? idx.map((r) => idx.map((c) => ({ r, c })))
      : idx.map((c) => idx.map((r) => ({ r, c })));

  lines.forEach((line) => {
    const cells =
      dir === "right" || dir === "down" ? [...line].reverse() : line;

    const lineTiles = cells
      .map((p) => map.get(key(p.r, p.c)))
      .filter(Boolean) as Tile[];

    let targetIndex = 0;
    let lastTile: Tile | null = null;

    lineTiles.forEach((tile) => {
      const targetCell = cells[targetIndex];

      if (lastTile && lastTile.value === tile.value && !lastTile.merged) {
        // ===== MERGE =====
        lastTile.value *= 2;
        lastTile.merged = true;

        mergedValues.push(lastTile.value);
        scoreGained += lastTile.value;
        moved = true;

        lastTile = null; // ❗ khóa merge tiếp theo
      } else {
        const newTile: Tile = {
          ...tile,
          from: { r: tile.r, c: tile.c },
          r: targetCell.r,
          c: targetCell.c,
          merged: false,
        };

        if (tile.r !== newTile.r || tile.c !== newTile.c) {
          moved = true;
        }

        newTiles.push(newTile);
        lastTile = newTile;
        targetIndex++;
      }
    });
  });

  /* ===== SPAWN TILE ===== */
  if (moved) {
    const occupied = new Set(newTiles.map((t) => key(t.r, t.c)));
    const empty: { r: number; c: number }[] = [];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!occupied.has(key(r, c))) empty.push({ r, c });
      }
    }

    if (empty.length > 0) {
      const { r, c } = empty[Math.floor(Math.random() * empty.length)];
      newTiles.push({
        id: uid(),
        value: Math.random() < 0.9 ? 2 : 4,
        r,
        c,
        spawned: true,
      });
    }
  }

  return { tiles: newTiles, moved, scoreGained, mergedValues };
}

/* ================= HOOK ================= */

export function use2048(size: number, resetKey: number) {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lastMerged, setLastMerged] = useState<number[]>([]);
  const [hasWon, setHasWon] = useState(false);

  const WIN_TILE = 2048;

  /* ================= RESET GAME ================= */
  useEffect(() => {
    setTiles(createInitialTiles(size));
    setScore(0);
    setGameOver(false);
    setLastMerged([]);
    setHasWon(false);
  }, [size, resetKey]);

  /* ================= MOVE ================= */
  const move = useCallback(
    (dir: Direction) => {
      if (gameOver) return;

      const res = moveTiles(tiles, size, dir);
      if (!res.moved) return;

      setTiles(res.tiles);
      setScore((s) => s + res.scoreGained);
      setLastMerged(res.mergedValues);

      if (!hasWon && res.tiles.some((t) => t.value >= WIN_TILE)) {
        setHasWon(true);
      }
    },
    [tiles, size, gameOver, hasWon],
  );

  /* ================= GAME OVER CHECK ================= */
  useEffect(() => {
    if (tiles.length < size * size) {
      setGameOver(false);
      return;
    }

    const grid = Array.from({ length: size }, () => Array(size).fill(0));

    tiles.forEach((t) => {
      grid[t.r][t.c] = t.value;
    });

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const v = grid[r][c];
        if (
          (r < size - 1 && grid[r + 1][c] === v) ||
          (c < size - 1 && grid[r][c + 1] === v)
        ) {
          setGameOver(false);
          return;
        }
      }
    }

    setGameOver(true);
  }, [tiles, size]);

  return {
    tiles,
    score,
    move,
    gameOver,
    lastMerged,
    hasWon,
  };
}
