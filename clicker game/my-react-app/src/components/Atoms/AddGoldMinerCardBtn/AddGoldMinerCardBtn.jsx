import "./AddGoldMinerCardBtn.css";

function AddGoldMinerCardBtn({
  gold,
  setGold,
  cardCost,
  setcardCost,
  cards,
  setCards,
}) {
  return (
    <div>
      <button
        className="AddGoldMinerCardBtn"
        onClick={() => {
          if (gold >= cardCost) {
            setGold(gold - cardCost);
            setcardCost(cardCost * (cards.length + 1));
            setCards([
              ...cards,
              {
                level: 1,
                cost: cardCost,
                damage: 1,
                multiplyer: cards.length + 1,
              },
            ]);
          }
        }}
      >
        Add Gold Miner <br />
        cost {cardCost} gold
      </button>
    </div>
  );
}

export default AddGoldMinerCardBtn;
