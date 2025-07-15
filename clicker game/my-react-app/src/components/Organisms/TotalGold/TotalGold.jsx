import { useState } from "react";
import "./TotalGold.css";
import GoldMinerCard from "../../Molecule/GoldMinerCard/GoldMinerCard";
import AddGoldMinerCardBtn from "../../Atoms/AddGoldMinerCardBtn/AddGoldMinerCardBtn";
import AutoGoldMinerCard from "../../Molecule/AutoGoldMinerCard/AutoGoldMinerCard";

function TotalGold() {
  const [gold, setGold] = useState(0);
  const [damage, setDamage] = useState(1);
  const [cardCost, setcardCost] = useState(100);
  const [cards, setCards] = useState([
    { level: 1, cost: 10, damage: 1, multiplyer: 1 },
  ]);

  return (
    <div className="TotalGoldContainer">
      <div className="devtester">
        <button className="clickBtn" onClick={() => setGold(gold + 200)}>
          dev + 200
        </button>
        <button className="clickBtn" onClick={() => setGold(gold + 20000)}>
          dev + 20000
        </button>
      </div>

      <button className="TotalGold" onClick={() => setGold(gold + damage)}>
        <h1>
          {gold} Gold
          <br />
          {damage} Gold per Click
        </h1>
      </button>

      <div className="GoldMinerCardcontainer">
        {cards.map((card, i) => (
          <GoldMinerCard
            key={i}
            gold={gold}
            setGold={setGold}
            damage={damage}
            setDamage={setDamage}
            card={card}
            setCard={(newCard) => {
              const newCards = [...cards];
              newCards[i] = newCard;
              setCards(newCards);
            }}
          />
        ))}

        <AddGoldMinerCardBtn
          gold={gold}
          setGold={setGold}
          cardCost={cardCost}
          setcardCost={setcardCost}
          cards={cards}
          setCards={setCards}
        ></AddGoldMinerCardBtn>
        <AutoGoldMinerCard
        ></AutoGoldMinerCard>
      </div>
    </div>
  );
}

export default TotalGold;
