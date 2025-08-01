import NewGameButton from "./parts/NewGameButton";
import SellButton from "./parts/SellButton";

function GameButtons({ onNewGame }) {
  return (
    <div className="game-buttons">
      <NewGameButton onNewGame={onNewGame} />
      <SellButton />
    </div>
  );
}

export default GameButtons;
