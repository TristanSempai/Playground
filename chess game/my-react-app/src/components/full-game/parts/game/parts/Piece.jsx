import React from "react";

const Piece = ({
  idx,
  piece,
  canBeCaptured,
  piecePositions,
  getPieceClass,
  handlePieceClick,
  circleSize,
}) => (
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

export default Piece;
