// Utility functions for chess game logic

export function capturedPieceClass(color) {
  return color === "white"
    ? "captured-piece captured-white"
    : "captured-piece captured-black";
}

export function getSquareClass(
  isWhite,
  isSelected,
  isPossible,
  isSameColor,
  isOppositeColor
) {
  let base = isWhite ? "square white-square" : "square black-square";
  if (isSelected) return base + " selected-square";
  if (isPossible && isSameColor)
    return base + " possible-square same-color-square";
  if (isPossible && isOppositeColor)
    return base + " possible-square opposite-color-square";
  if (isPossible) return base + " possible-square";
  return base;
}

export function getPieceClass(piece, idx, canBeCaptured, animatingIdx) {
  let base =
    piece.color === "white" ? "piece piece-white" : "piece piece-black";
  if (canBeCaptured) base += " piece-capturable";
  if (animatingIdx === idx) base += " piece-animating";
  return base;
}

// Chess move legality logic
export function isLegalMove(piece, from, to, squares) {
  const occIdx = squares.findIndex(
    (sq) => !sq.side && sq.row === to.row && sq.col === to.col
  );
  const dx = to.col - from.col;
  const dy = to.row - from.row;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  const targetEmpty = occIdx === -1;
  const targetEnemy = occIdx !== -1 && squares[occIdx].color !== piece.color;

  switch (piece.type) {
    case "pawn": {
      const dir = piece.color === "white" ? -1 : 1;
      const startRow = piece.color === "white" ? 6 : 1;
      if (dx === 0 && dy === dir && targetEmpty) return true;
      if (
        dx === 0 &&
        dy === 2 * dir &&
        from.row === startRow &&
        targetEmpty &&
        squares.findIndex(
          (sq) => !sq.side && sq.row === from.row + dir && sq.col === from.col
        ) === -1
      )
        return true;
      if (absDx === 1 && dy === dir && targetEnemy) return true;
      return false;
    }
    case "knight": {
      if ((absDx === 2 && absDy === 1) || (absDx === 1 && absDy === 2)) {
        return targetEmpty || targetEnemy;
      }
      return false;
    }
    case "bishop": {
      if (absDx === absDy && absDx > 0) {
        for (let i = 1; i < absDx; i++) {
          const r = from.row + i * Math.sign(dy);
          const c = from.col + i * Math.sign(dx);
          if (
            squares.findIndex(
              (sq) => !sq.side && sq.row === r && sq.col === c
            ) !== -1
          )
            return false;
        }
        return targetEmpty || targetEnemy;
      }
      return false;
    }
    case "rook": {
      if ((dx === 0 && absDy > 0) || (dy === 0 && absDx > 0)) {
        const steps = dx === 0 ? absDy : absDx;
        for (let i = 1; i < steps; i++) {
          const r = from.row + (dx === 0 ? i * Math.sign(dy) : 0);
          const c = from.col + (dy === 0 ? i * Math.sign(dx) : 0);
          if (
            squares.findIndex(
              (sq) => !sq.side && sq.row === r && sq.col === c
            ) !== -1
          )
            return false;
        }
        return targetEmpty || targetEnemy;
      }
      return false;
    }
    case "queen": {
      if (absDx === absDy && absDx > 0) {
        for (let i = 1; i < absDx; i++) {
          const r = from.row + i * Math.sign(dy);
          const c = from.col + i * Math.sign(dx);
          if (
            squares.findIndex(
              (sq) => !sq.side && sq.row === r && sq.col === c
            ) !== -1
          )
            return false;
        }
        return targetEmpty || targetEnemy;
      } else if ((dx === 0 && absDy > 0) || (dy === 0 && absDx > 0)) {
        const steps = dx === 0 ? absDy : absDx;
        for (let i = 1; i < steps; i++) {
          const r = from.row + (dx === 0 ? i * Math.sign(dy) : 0);
          const c = from.col + (dy === 0 ? i * Math.sign(dx) : 0);
          if (
            squares.findIndex(
              (sq) => !sq.side && sq.row === r && sq.col === c
            ) !== -1
          )
            return false;
        }
        return targetEmpty || targetEnemy;
      }
      return false;
    }
    case "king": {
      if (absDx <= 1 && absDy <= 1 && absDx + absDy > 0) {
        return targetEmpty || targetEnemy;
      }
      return false;
    }
    default:
      return false;
  }
}
