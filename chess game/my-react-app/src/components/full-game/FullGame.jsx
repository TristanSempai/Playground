import "./FullGame.css";
import React, { useState } from "react";
import Game from "./parts/game/game.jsx";
import GameButtons from "./parts/gameButtons/GameButtons.jsx";
import ScoreBar from "./parts/scoreBar/ScoreBar.jsx";

import { useChessBoard } from "./parts/game/parts/useChessBoard";
import initialSetup from "./parts/game/parts/InitialSetup";

function FullGame() {
  const [resetKey, setResetKey] = useState(0);
  // const [pieceSquares, setPieceSquares] = useState([]);
  // Use chess board hook for all state
  const {
    pieceSquares,
    setPieceSquares,
    selectedIdx,
    setSelectedIdx,
    piecePositions,
    setPiecePositions,
    getNextSidePos,
  } = useChessBoard(initialSetup);
  const handleNewGame = () => setResetKey((k) => k + 1);
  // const handlePieceSquaresChange = (squares) => setPieceSquares(squares);
  return (
    <>
      <ScoreBar pieceSquares={pieceSquares} />
      <Game
        key={resetKey}
        pieceSquares={pieceSquares}
        setPieceSquares={setPieceSquares}
        piecePositions={piecePositions}
        setPiecePositions={setPiecePositions}
        selectedIdx={selectedIdx}
        setSelectedIdx={setSelectedIdx}
        getNextSidePos={getNextSidePos}
        onPieceSquaresChange={() => {}}
      />
      <GameButtons
        onNewGame={handleNewGame}
        selectedIdx={selectedIdx}
        setSelectedIdx={setSelectedIdx}
        pieceSquares={pieceSquares}
        setPieceSquares={setPieceSquares}
        piecePositions={piecePositions}
        setPiecePositions={setPiecePositions}
        getNextSidePos={getNextSidePos}
      />
    </>
  );
}

export default FullGame;
