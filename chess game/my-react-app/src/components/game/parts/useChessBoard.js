import { useState, useRef, useCallback } from "react";
import { isLegalMove } from "./gameUtils";

const BOARD_SIZE = 8;
const squareSize = 37.5;
const circleSize = 27;
const WHITE_SIDE_X = BOARD_SIZE * squareSize + 15;
const BLACK_SIDE_X = -75;

function getInitialPiecePositions(initialSetup) {
  return initialSetup.map(([type, color, row, col]) => ({
    type,
    color,
    row,
    col,
  }));
}

export function useChessBoard(initialSetup) {
  const [pieces] = useState(getInitialPiecePositions(initialSetup));
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

  const findPieceAtSquare = useCallback(
    (row, col) =>
      pieceSquares.findIndex(
        (sq, idx) =>
          idx !== draggedIdx && !sq.side && sq.row === row && sq.col === col
      ),
    [pieceSquares, draggedIdx]
  );

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

  return {
    pieceSquares,
    setPieceSquares,
    dragging,
    setDragging,
    draggedIdx,
    setDraggedIdx,
    selectedIdx,
    setSelectedIdx,
    offset,
    piecePositions,
    setPiecePositions,
    animatingIdx,
    setAnimatingIdx,
    findPieceAtSquare,
    getNextSidePos,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    pieces,
  };
}
