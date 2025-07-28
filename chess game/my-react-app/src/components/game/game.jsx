import React, { useState, useRef, useEffect, useCallback } from "react";
import "./game.css";

const BOARD_SIZE = 8;
const squareSize = 37.5; // 50 * 0.75
const circleSize = 27; // 36 * 0.75
const WHITE_SIDE_X = BOARD_SIZE * squareSize + 15; // 20 * 0.75
const BLACK_SIDE_X = -75; // 100 * 0.75
const initialSetup = [
  // Black
  ["rook", "black", 0, 0],
  ["knight", "black", 0, 1],
  ["bishop", "black", 0, 2],
  ["queen", "black", 0, 3],
  ["king", "black", 0, 4],
  ["bishop", "black", 0, 5],
  ["knight", "black", 0, 6],
  ["rook", "black", 0, 7],
  ...Array(8)
    .fill()
    .map((_, i) => ["pawn", "black", 1, i]),
  // White
  ["rook", "white", 7, 0],
  ["knight", "white", 7, 1],
  ["bishop", "white", 7, 2],
  ["queen", "white", 7, 3],
  ["king", "white", 7, 4],
  ["bishop", "white", 7, 5],
  ["knight", "white", 7, 6],
  ["rook", "white", 7, 7],
  ...Array(8)
    .fill()
    .map((_, i) => ["pawn", "white", 6, i]),
];

function getInitialPiecePositions() {
  return initialSetup.map(([type, color, row, col]) => ({
    type,
    color,
    row,
    col,
  }));
}

function Game() {
  const [pieces] = useState(getInitialPiecePositions());
  const [pieceSquares, setPieceSquares] = useState(
    pieces.map((p) => ({ ...p }))
  );
  const [dragging, setDragging] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const offset = useRef({ x: 0, y: 0 });
  const [piecePositions, setPiecePositions] = useState(
    pieces.map((p) => ({
      x: p.col * squareSize + (squareSize - circleSize) / 2,
      y: p.row * squareSize + (squareSize - circleSize) / 2,
    }))
  );
  const [animatingIdx, setAnimatingIdx] = useState(null);

  // Find piece index at a board square
  const findPieceAtSquare = useCallback(
    (row, col) =>
      pieceSquares.findIndex(
        (sq, idx) =>
          idx !== draggedIdx && !sq.side && sq.row === row && sq.col === col
      ),
    [pieceSquares, draggedIdx]
  );

  // Get next position for captured piece in side area
  const getNextSidePos = useCallback(
    (color) => {
      const sideCount = pieceSquares.filter(
        (sq) => sq.side && sq.color === color
      ).length;
      return {
        x: color === "white" ? WHITE_SIDE_X : BLACK_SIDE_X,
        y: 20 + sideCount * (circleSize + 10),
      };
    },
    [pieceSquares]
  );

  // Mouse down handler for drag/select
  const handleMouseDown = (idx, e) => {
    setDragging(true);
    setDraggedIdx(idx);
    setSelectedIdx(idx);
    offset.current = {
      x: e.clientX - piecePositions[idx].x,
      y: e.clientY - piecePositions[idx].y,
    };
    document.body.style.userSelect = "none";
  };

  // Mouse up handler for drag end
  // import { useCallback } from "react"; // Moved to top

  const handleMouseUp = useCallback(
    (e) => {
      if (draggedIdx === null) return;
      setDragging(false);
      document.body.style.userSelect = "";
      const mouseX = e.clientX,
        mouseY = e.clientY;
      const parentRect = e.target.parentNode.getBoundingClientRect();
      const relX = mouseX - parentRect.left,
        relY = mouseY - parentRect.top;
      const col = Math.floor(relX / squareSize),
        row = Math.floor(relY / squareSize);
      let newSquares = [...pieceSquares],
        newPositions = [...piecePositions];
      const piece = pieceSquares[draggedIdx];
      const from = { row: piece.row, col: piece.col };
      // If dropped outside the board, return to original position
      if (col < 0 || col >= BOARD_SIZE || row < 0 || row >= BOARD_SIZE) {
        newPositions[draggedIdx] = {
          x: from.col * squareSize + (squareSize - circleSize) / 2,
          y: from.row * squareSize + (squareSize - circleSize) / 2,
        };
      } else {
        const to = { row, col };
        if (!isLegalMove(piece, from, to, pieceSquares)) {
          newPositions[draggedIdx] = {
            x: from.col * squareSize + (squareSize - circleSize) / 2,
            y: from.row * squareSize + (squareSize - circleSize) / 2,
          };
        } else {
          const occupiedIdx = findPieceAtSquare(row, col);
          if (occupiedIdx === -1) {
            newSquares[draggedIdx] = { ...piece, row, col };
            newPositions[draggedIdx] = {
              x: col * squareSize + (squareSize - circleSize) / 2,
              y: row * squareSize + (squareSize - circleSize) / 2,
            };
          } else if (piece.color !== newSquares[occupiedIdx].color) {
            newSquares[occupiedIdx] = {
              ...newSquares[occupiedIdx],
              side: true,
              sideIdx: null,
            };
            newPositions[occupiedIdx] = getNextSidePos(
              newSquares[occupiedIdx].color
            );
            newSquares[draggedIdx] = { ...piece, row, col };
            newPositions[draggedIdx] = {
              x: col * squareSize + (squareSize - circleSize) / 2,
              y: row * squareSize + (squareSize - circleSize) / 2,
            };
          } else {
            newPositions[draggedIdx] = {
              x: from.col * squareSize + (squareSize - circleSize) / 2,
              y: from.row * squareSize + (squareSize - circleSize) / 2,
            };
          }
        }
      }
      setPieceSquares(newSquares);
      setPiecePositions(newPositions);
      setDraggedIdx(null);
    },
    [
      draggedIdx,
      pieceSquares,
      piecePositions,
      findPieceAtSquare,
      getNextSidePos,
    ]
  );

  // Mouse move handler for drag
  const handleMouseMove = useCallback(
    (e) => {
      if (!dragging || draggedIdx === null) return;
      setPiecePositions((prev) =>
        prev.map((pos, idx) =>
          idx === draggedIdx
            ? {
                x: e.clientX - offset.current.x,
                y: e.clientY - offset.current.y,
              }
            : pos
        )
      );
    },
    [dragging, draggedIdx]
  );

  // Attach drag listeners
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, draggedIdx, handleMouseMove, handleMouseUp]);

  // Helper for captured piece class
  const capturedPieceClass = (color) =>
    color === "white"
      ? "captured-piece captured-white"
      : "captured-piece captured-black";

  // Helper for board square class
  const getSquareClass = (
    isWhite,
    isSelected,
    isPossible,
    isSameColor,
    isOppositeColor
  ) => {
    let base = isWhite ? "square white-square" : "square black-square";
    if (isSelected) return base + " selected-square";
    if (isPossible && isSameColor)
      return base + " possible-square same-color-square";
    if (isPossible && isOppositeColor)
      return base + " possible-square opposite-color-square";
    if (isPossible) return base + " possible-square";
    return base;
  };

  // Helper for piece class
  const getPieceClass = (piece, idx, canBeCaptured) => {
    let base =
      piece.color === "white" ? "piece piece-white" : "piece piece-black";
    if (canBeCaptured) base += " piece-capturable";
    if (animatingIdx === idx) base += " piece-animating";
    return base;
  };

  // Captured pieces grid
  const CapturedGrid = ({ color }) => (
    <div className="captured-grid">
      {pieceSquares
        .filter((piece) => piece.side && piece.color === color)
        .map((piece, idx) => (
          <div
            key={idx}
            title={piece.type}
            className={capturedPieceClass(color)}
          >
            {piece.type}
          </div>
        ))}
    </div>
  );

  // Chessboard squares
  const renderSquares = () =>
    Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => {
      const row = Math.floor(idx / BOARD_SIZE);
      const col = idx % BOARD_SIZE;
      const isWhite = (row + col) % 2 === 0;
      let isSelected = false;
      let isPossible = false;
      let isSameColor = false;
      let isOppositeColor = false;
      let occIdx = -1;

      if (selectedIdx !== null && !pieceSquares[selectedIdx]?.side) {
        const sel = pieceSquares[selectedIdx];
        isSelected = sel.row === row && sel.col === col;
        occIdx = pieceSquares.findIndex(
          (sq) => !sq.side && sq.row === row && sq.col === col
        );
        if (!isSelected) {
          if (occIdx === -1) {
            // Empty square
            if (
              isLegalMove(
                sel,
                { row: sel.row, col: sel.col },
                { row, col },
                pieceSquares
              )
            ) {
              isPossible = true;
            }
          } else {
            // Occupied square
            if (pieceSquares[occIdx].color === sel.color) {
              // Friendly piece: only highlight for selection, not as a legal move
              isSameColor = true;
              isPossible = false;
            } else {
              // Enemy piece
              if (
                isLegalMove(
                  sel,
                  { row: sel.row, col: sel.col },
                  { row, col },
                  pieceSquares
                )
              ) {
                isPossible = true;
                isOppositeColor = true;
              }
            }
          }
        }
      }

      const handleSquareClick = () => {
        if (isPossible && selectedIdx !== null) {
          const sel = pieceSquares[selectedIdx];
          if (isSameColor && occIdx !== -1) {
            setSelectedIdx(occIdx);
            return;
          }
          setAnimatingIdx(selectedIdx);
          setTimeout(() => {
            let newSquares = [...pieceSquares],
              newPositions = [...piecePositions];
            if (isOppositeColor && occIdx !== -1) {
              newSquares[occIdx] = {
                ...newSquares[occIdx],
                side: true,
                sideIdx: null,
              };
              newPositions[occIdx] = getNextSidePos(newSquares[occIdx].color);
            }
            newSquares[selectedIdx] = { ...sel, row, col };
            newPositions[selectedIdx] = {
              x: col * squareSize + (squareSize - circleSize) / 2,
              y: row * squareSize + (squareSize - circleSize) / 2,
            };
            setPieceSquares(newSquares);
            setPiecePositions(newPositions);
            setAnimatingIdx(null);
            setSelectedIdx(null);
          }, 180);
        }
      };

      return (
        <div
          key={idx}
          className={getSquareClass(
            isWhite,
            isSelected,
            isPossible,
            isSameColor,
            isOppositeColor
          )}
          style={{
            left: `${col * squareSize}px`,
            top: `${row * squareSize}px`,
            width: `${squareSize}px`,
            height: `${squareSize}px`,
          }}
          onClick={handleSquareClick}
        />
      );
    });

  // Chess pieces
  const renderPieces = () => {
    return pieceSquares.map((piece, idx) => {
      if (piece.side) return null;
      let canBeCaptured = false;
      if (selectedIdx !== null && !pieceSquares[selectedIdx]?.side) {
        const sel = pieceSquares[selectedIdx];
        const from = { row: sel.row, col: sel.col },
          to = { row: piece.row, col: piece.col };
        if (
          isLegalMove(sel, from, to, pieceSquares) &&
          sel.color !== piece.color
        ) {
          canBeCaptured = true;
        }
      }
      const handlePieceClick = (e) => {
        if (canBeCaptured) {
          setAnimatingIdx(selectedIdx);
          setTimeout(() => {
            let newSquares = [...pieceSquares];
            let newPositions = [...piecePositions];
            newSquares[idx] = { ...newSquares[idx], side: true, sideIdx: null };
            newPositions[idx] = getNextSidePos(newSquares[idx].color);
            const sel = pieceSquares[selectedIdx];
            newSquares[selectedIdx] = {
              ...sel,
              row: piece.row,
              col: piece.col,
            };
            newPositions[selectedIdx] = {
              x: piece.col * squareSize + (squareSize - circleSize) / 2,
              y: piece.row * squareSize + (squareSize - circleSize) / 2,
            };
            setPieceSquares(newSquares);
            setPiecePositions(newPositions);
            setAnimatingIdx(null);
            setSelectedIdx(null);
          }, 180);
        } else {
          handleMouseDown(idx, e);
        }
      };
      return (
        <div
          key={idx}
          onMouseDown={handlePieceClick}
          title={piece.type}
          className={getPieceClass(piece, idx, canBeCaptured)}
          style={{
            left: `${piecePositions[idx].x}px`,
            top: `${piecePositions[idx].y}px`,
            width: `${circleSize}px`,
            height: `${circleSize}px`,
          }}
        >
          {piece.type}
        </div>
      );
    });
  };

  // Placeholder for move legality check
  function isLegalMove(piece, from, to, squares) {
    // Basic chess rules for move validation
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

  // Main render
  return (
    <div className="chess-container">
      {/* Black side area */}
      <div className="side-area side-black">
        <div className="side-label">Black Side</div>
        <CapturedGrid color="black" />
      </div>
      {/* Chessboard and pieces */}
      <div className="chessboard">
        {renderSquares()}
        {renderPieces()}
      </div>
      {/* White side area */}
      <div className="side-area side-white">
        <div className="side-label">White Side</div>
        <CapturedGrid color="white" />
      </div>
    </div>
  );
}

export default Game;
