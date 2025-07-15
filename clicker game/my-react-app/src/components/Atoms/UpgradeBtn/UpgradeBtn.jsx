import "./UpgradeBtn.css";

function UpgradeBtn({ gold, setGold, card, setCard, damage, setDamage }) {
  const GPC = card.level * 2 * card.multiplyer;
  return (
    <div className="upgradeBtnContainer">
      <button
        className="upgradeBtn"
        onClick={() => {
          if (gold >= card.cost) {
            setGold(gold - card.cost);
            setCard({
              ...card,
              level: card.level + 1,
              damage: card.damage + card.level,
              cost: Math.floor(card.cost * 1.5),
            });
            setDamage(damage + GPC);
          }
        }}
      >
        Upgrade
      </button>
      <p>cost {card.cost} gold</p>
      <p>GPC +{GPC}</p>
    </div>
  );
}

export default UpgradeBtn;
