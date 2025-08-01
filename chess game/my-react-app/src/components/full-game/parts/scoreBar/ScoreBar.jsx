import React from "react";

// Piece values for scoring
const PIECE_VALUES = {
  pawn: 1,
  knight: 3,
  bishop: 3,
  rook: 5,
  queen: 9,
  king: 10,
};

// Expects prop: pieceSquares (array of all pieces, including captured)
function ScoreBar({ pieceSquares }) {
  // Calculate captured pieces for each side
  const whiteScore = pieceSquares
    .filter((p) => p.side && p.color === "black")
    .reduce((sum, p) => sum + (PIECE_VALUES[p.type] || 0), 0);
  const blackScore = pieceSquares
    .filter((p) => p.side && p.color === "white")
    .reduce((sum, p) => sum + (PIECE_VALUES[p.type] || 0), 0);

  return (
    <div className="score-bar">
      <span>White score: {whiteScore}</span>
      <span style={{ marginLeft: 20 }}>Black score: {blackScore}</span>
    </div>
  );
}

export default ScoreBar;
