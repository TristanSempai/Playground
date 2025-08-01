import "./game.css";
import React, { useEffect } from "react";
import { useChessBoard } from "./parts/useChessBoard";
import CapturedGrid from "./parts/CapturedGrid";
import initialSetup from "./parts/InitialSetup";
import Chessboard from "./parts/Chessboard";
import SideArea from "./parts/SideArea";
import {
  capturedPieceClass,
  getSquareClass,
  getPieceClass,
  isLegalMove,
} from "./parts/gameUtils";

const BOARD_SIZE = 8;
const squareSize = 37.5; // 50 * 0.75
const circleSize = 27; // 36 * 0.75

function Game({ onPieceSquaresChange }) {
  const {
    pieceSquares,
    setPieceSquares,
    selectedIdx,
    setSelectedIdx,
    piecePositions,
    setPiecePositions,
    setAnimatingIdx,
    getNextSidePos,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  } = useChessBoard(initialSetup);

  // Notify parent of pieceSquares changes
  useEffect(() => {
    if (onPieceSquaresChange) onPieceSquaresChange(pieceSquares);
  }, [pieceSquares, onPieceSquaresChange]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="chess-container">
      <SideArea color="black">
        <CapturedGrid
          color="black"
          pieceSquares={pieceSquares}
          capturedPieceClass={capturedPieceClass}
        />
      </SideArea>

      <Chessboard
        renderSquares={() => {
          return Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map(
            (_, idx) => {
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
                      newPositions[occIdx] = getNextSidePos(
                        newSquares[occIdx].color
                      );
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
            }
          );
        }}
        renderPieces={() => {
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
                  newSquares[idx] = {
                    ...newSquares[idx],
                    side: true,
                    sideIdx: null,
                  };
                  newPositions[idx] = getNextSidePos(newSquares[idx].color);
                  const sel = pieceSquares[selectedIdx];
                  newSquares[selectedIdx] = {
                    ...sel,
                    row: piece.row,
                    col: piece.col,
                  };
                  newPositions[selectedIdx] = {
                    x: piece.col * squareSize + (circleSize - circleSize) / 2,
                    y: piece.row * squareSize + (circleSize - circleSize) / 2,
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
        }}
      />

      <SideArea color="white">
        <CapturedGrid
          color="white"
          pieceSquares={pieceSquares}
          capturedPieceClass={capturedPieceClass}
        />
      </SideArea>
    </div>
  );
}

export default Game;
