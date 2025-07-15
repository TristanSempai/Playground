import "./GoldMinerCard.css";
import UpgradeBtn from "../../Atoms/UpgradeBtn/UpgradeBtn";

function GoldMinerCard({ gold, setGold, card, setCard, damage, setDamage }) {
  return (
    <div className="goldMinerCard">
      <h2 className="goldMiner">Gold Miner {card.multiplyer}</h2>
      <h2 className="level">Level {card.level}</h2>
      <UpgradeBtn
        gold={gold}
        setGold={setGold}
        card={card}
        setCard={setCard}
        damage={damage}
        setDamage={setDamage}
      />
    </div>
  );
}

export default GoldMinerCard;
