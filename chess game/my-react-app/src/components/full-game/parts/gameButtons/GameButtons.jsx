import NewGameButton from "./parts/NewGameButton";
import SellButton from "./parts/SellButton";

function GameButtons({
  onNewGame,
  selectedIdx,
  setSelectedIdx,
  pieceSquares,
  setPieceSquares,
  piecePositions,
  setPiecePositions,
  getNextSidePos,
}) {
  return (
    <div className="game-buttons">
      <NewGameButton onNewGame={onNewGame} />
      <SellButton
        selectedIdx={selectedIdx}
        setSelectedIdx={setSelectedIdx}
        pieceSquares={pieceSquares}
        setPieceSquares={setPieceSquares}
        piecePositions={piecePositions}
        setPiecePositions={setPiecePositions}
        getNextSidePos={getNextSidePos}
      />
    </div>
  );
}

export default GameButtons;
