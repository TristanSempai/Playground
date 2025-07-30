import React from "react";

const Chessboard = ({ renderSquares, renderPieces }) => (
  <div className="chessboard">
    {renderSquares()}
    {renderPieces()}
  </div>
);

export default Chessboard;
