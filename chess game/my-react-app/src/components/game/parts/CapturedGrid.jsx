import React from "react";

const CapturedGrid = ({ color, pieceSquares, capturedPieceClass }) => (
  <div className="captured-grid">
    {pieceSquares
      .filter((piece) => piece.side && piece.color === color)
      .map((piece, idx) => (
        <div key={idx} title={piece.type} className={capturedPieceClass(color)}>
          {piece.type}
        </div>
      ))}
  </div>
);

export default CapturedGrid;
