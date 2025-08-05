function SellButton({
  selectedIdx,
  setSelectedIdx,
  pieceSquares,
  setPieceSquares,
  piecePositions,
  setPiecePositions,
  getNextSidePos,
}) {
  const handleSell = () => {
    if (selectedIdx == null) return;
    const sel = pieceSquares[selectedIdx];
    if (!sel || sel.side) return; // Already in side
    // Move to captured zone
    const newSquares = [...pieceSquares];
    const newPositions = [...piecePositions];
    newSquares[selectedIdx] = {
      ...sel,
      side: true,
      sideIdx: null,
    };
    newPositions[selectedIdx] = getNextSidePos(sel.color);
    setPieceSquares(newSquares);
    setPiecePositions(newPositions);
    setSelectedIdx(null);
  };
  return (
    <button className="sell-button" onClick={handleSell}>
      Sell
    </button>
  );
}
export default SellButton;
