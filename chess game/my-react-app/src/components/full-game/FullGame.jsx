import "./FullGame.css";
import React, { useState } from "react";
import Game from "./parts/game/game.jsx";
import GameButtons from "./parts/gameButtons/GameButtons.jsx";
import ScoreBar from "./parts/scoreBar/ScoreBar.jsx";

function FullGame() {
  const [resetKey, setResetKey] = useState(0);
  const [pieceSquares, setPieceSquares] = useState([]);
  const handleNewGame = () => setResetKey((k) => k + 1);
  const handlePieceSquaresChange = (squares) => setPieceSquares(squares);
  return (
    <>
      <ScoreBar pieceSquares={pieceSquares} />
      <Game key={resetKey} onPieceSquaresChange={handlePieceSquaresChange} />
      <GameButtons onNewGame={handleNewGame} />
    </>
  );
}

export default FullGame;
