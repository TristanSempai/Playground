import "./game.css";
import React, { useEffect } from "react";
import { useChessBoard } from "./parts/useChessBoard";
import CapturedGrid from "./parts/CapturedGrid";
import initialSetup from "./parts/InitialSetup";
import Chessboard from "./parts/Chessboard";
import SideArea from "./parts/SideArea";
import { capturedPieceClass } from "./parts/gameUtils";

const BOARD_SIZE = 8;

// import { useChessBoard } from "./parts/useChessBoard";
// import initialSetup from "./parts/InitialSetup";

function Game({
  pieceSquares,
  piecePositions,
  selectedIdx,
  setSelectedIdx,
  setPieceSquares,
  setPiecePositions,
  getNextSidePos,
  onPieceSquaresChange,
}) {
  useEffect(() => {
    if (onPieceSquaresChange) onPieceSquaresChange(pieceSquares);
  }, [pieceSquares, onPieceSquaresChange]);

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
            (_, idx) => <div key={idx} className="chess-square" />
          );
        }}
        renderPieces={() => {
          return pieceSquares.map((piece, idx) => {
            if (piece.side) return null;
            return (
              <div
                key={idx}
                className="chess-piece"
                style={{
                  left: piecePositions[idx]?.x,
                  top: piecePositions[idx]?.y,
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
