import { useState, useEffect } from "react";
import "../App.css";

function TestGame() {
  const [count, setCount] = useState(0);
  const [LVL, setLVL] = useState(1);
  const [autoClicker, setAutoClicker] = useState(0);

  // Calculate cost and damage based on level
  const baseCost = 10;
  const baseDamage = 1;
  const upgradeCost = Math.floor(baseCost * Math.pow(1.1, LVL - 1));
  const damage =
    LVL < 30
      ? Math.floor(baseDamage * Math.pow(1.1, LVL - 1))
      : LVL < 50
      ? Math.floor(baseDamage * Math.pow(1.1, 29) * Math.pow(1.2, LVL - 30))
      : Math.floor(
          baseDamage *
            Math.pow(1.1, 29) *
            Math.pow(1.2, 20) *
            Math.pow(1.3, LVL - 50)
        );

  // Determine the next upgrade percent
  const nextUpgradePercent = LVL < 30 ? 10 : LVL < 50 ? 20 : 30;

  // Auto clicker DPS is 1 per autoClicker level
  const autoClickerDPS = autoClicker * 1;

  // Auto clicker effect
  useEffect(() => {
    if (autoClicker > 0) {
      const interval = setInterval(() => {
        setCount((c) => c + autoClickerDPS);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClicker, autoClickerDPS]);

  return (
    <>
      <h1>gold clicker</h1>
      <p className="gold">you have {count} gold coins</p>
      <div className="goldMiner">
        <button onClick={() => setCount((count) => count + damage)}>
          LVL {LVL} Gold Miner (Damage: {damage})
        </button>
        <button
          onClick={() => {
            if (count >= upgradeCost) {
              setLVL((LVL) => LVL + 1);
              setCount((count) => count - upgradeCost);
            }
          }}
        >
          {upgradeCost} gold coins to
          <br />
          upgrade Gold Miner +{nextUpgradePercent}% damage
        </button>
        <button
          onClick={() => {
            if (LVL >= 10) {
              setLVL((lvl) => lvl - 10);
              setAutoClicker((a) => a + 1);
            }
          }}
        >
          Spend 10 LVLs for +1 DPS Auto Clicker
          <br />
          (Current: {autoClicker}, +1 DPS each)
        </button>
        <button
          onClick={() => {
            if (LVL >= 20) {
              setLVL((lvl) => lvl - 20);
              setAutoClicker((a) => a + 10);
            }
          }}
        >
          Spend 20 LVLs for +10 DPS Auto Clicker
          <br />
          (Current: {autoClicker}, +10 DPS)
        </button>
      </div>
    </>
  );
}

export default TestGame;
