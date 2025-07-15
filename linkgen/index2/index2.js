

// Start countdown when page loads
window.onload = function () {
  let timeLeft = 20;
  const countdownElement = document.getElementById("countdown");
  const messageElement = document.getElementById("message");

  const countdownInterval = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      disableWebsite();
    }
  }, 1000);
};

function disableWebsite() {
  const messageElement = document.getElementById("message");
  messageElement.style.display = "block";

  document.body.classList.add("disabled");
}
