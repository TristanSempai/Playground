import "./footer.css";

function Footer() {
  // Emit a custom event for reset
  const handleReset = () => {
    const event = new CustomEvent("resetChessGame");
    window.dispatchEvent(event);
  };
  return (
    <>
      <h3>footer</h3>
      <button className="reset-btn" onClick={handleReset}>
        Reset Game
      </button>
    </>
  );
}

export default Footer;
