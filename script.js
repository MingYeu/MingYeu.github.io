let totalProfitLoss = 0;
let history = [];
let redoStack = [];

document.querySelectorAll(".win").forEach((button) => {
  button.addEventListener("click", function () {
    handleBet(parseFloat(this.dataset.multiplier), true);
  });
});

document.querySelectorAll(".lose").forEach((button) => {
  button.addEventListener("click", function () {
    handleBet(parseFloat(this.dataset.multiplier), false);
  });
});

document.getElementById("undo").addEventListener("click", function () {
  if (history.length > 0) {
    let lastAmount = history.pop();
    redoStack.push(lastAmount);
    totalProfitLoss -= lastAmount;
    updateProfitLoss(0);
  }
});

document.getElementById("redo").addEventListener("click", function () {
  if (redoStack.length > 0) {
    let redoAmount = redoStack.pop();
    history.push(redoAmount);
    totalProfitLoss += redoAmount;
    updateProfitLoss(0);
  }
});

document.getElementById("reset").addEventListener("click", function () {
  totalProfitLoss = 0;
  history = [];
  redoStack = [];
  updateProfitLoss(0);
});

document.getElementById("bet").addEventListener("change", function () {
  document.getElementById("betAmount").innerText = `$${this.value}`;
});

function handleBet(multiplier, isWin) {
  let betAmount = parseFloat(document.getElementById("bet").value);
  let changeAmount = isWin ? betAmount * multiplier : -betAmount * multiplier;

  history.push(changeAmount);
  redoStack = [];
  updateProfitLoss(changeAmount);
}

function updateProfitLoss(amount) {
  totalProfitLoss += amount;
  document.getElementById("profitLoss").innerText = `$${totalProfitLoss.toFixed(
    2
  )}`;
  document.getElementById("betAmount").innerText = `$${
    document.getElementById("bet").value
  }`;
}

// draw card
const deck = [
  { value: 1, symbol: "A♠" },
  { value: 1, symbol: "A♥" },
  { value: 1, symbol: "A♦" },
  { value: 1, symbol: "A♣" },
  { value: 2, symbol: "2♠" },
  { value: 2, symbol: "2♥" },
  { value: 2, symbol: "2♦" },
  { value: 2, symbol: "2♣" },
  { value: 3, symbol: "3♠" },
  { value: 3, symbol: "3♥" },
  { value: 3, symbol: "3♦" },
  { value: 3, symbol: "3♣" },
  { value: 4, symbol: "4♠" },
  { value: 4, symbol: "4♥" },
  { value: 4, symbol: "4♦" },
  { value: 4, symbol: "4♣" },
  { value: 5, symbol: "5♠" },
  { value: 5, symbol: "5♥" },
  { value: 5, symbol: "5♦" },
  { value: 5, symbol: "5♣" },
  { value: 6, symbol: "6♠" },
  { value: 6, symbol: "6♥" },
  { value: 6, symbol: "6♦" },
  { value: 6, symbol: "6♣" },
  { value: 7, symbol: "7♠" },
  { value: 7, symbol: "7♥" },
  { value: 7, symbol: "7♦" },
  { value: 7, symbol: "7♣" },
  { value: 8, symbol: "8♠" },
  { value: 8, symbol: "8♥" },
  { value: 8, symbol: "8♦" },
  { value: 8, symbol: "8♣" },
  { value: 9, symbol: "9♠" },
  { value: 9, symbol: "9♥" },
  { value: 9, symbol: "9♦" },
  { value: 9, symbol: "9♣" },
  { value: 10, symbol: "10♠" },
  { value: 10, symbol: "10♥" },
  { value: 10, symbol: "10♦" },
  { value: 10, symbol: "10♣" },
  { value: 10, symbol: "J♠" },
  { value: 10, symbol: "J♥" },
  { value: 10, symbol: "J♦" },
  { value: 10, symbol: "J♣" },
  { value: 10, symbol: "Q♠" },
  { value: 10, symbol: "Q♥" },
  { value: 10, symbol: "Q♦" },
  { value: 10, symbol: "Q♣" },
  { value: 10, symbol: "K♠" },
  { value: 10, symbol: "K♥" },
  { value: 10, symbol: "K♦" },
  { value: 10, symbol: "K♣" },
];

let handValue = 0;
let cardCount = 0;
const handContainer = document.querySelector(".hand");
const handValueDisplay = document.getElementById("handValue");
const drawButton = document.getElementById("draw");
const refreshButton = document.getElementById("refresh");
const message = document.getElementById("message");

function drawCard() {
  if (handValue >= 21 || cardCount >= 5) return; // Stop if already won/lost or max 5 cards

  let randomIndex = Math.floor(Math.random() * deck.length);
  let drawnCard = deck.splice(randomIndex, 1)[0];

  handValue += drawnCard.value;
  cardCount++;
  handValueDisplay.innerText = `Hand Value: ${handValue}`;

  let cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerText = drawnCard.symbol;
  handContainer.appendChild(cardElement);

  if (handValue === 21) {
    message.innerText = "🎉 BLACKJACK! You got 21! 🎉";
    drawButton.disabled = true;
  } else if (handValue > 21) {
    message.innerText = "💀 BUSTED! Over 21! 💀";
    drawButton.disabled = true;
  } else if (cardCount === 5 && handValue <= 21) {
    message.innerText = "🎊 WIN! 5-card trick 🎊";
    drawButton.disabled = true;
  }
}

function resetGame() {
  handValue = 0;
  cardCount = 0;
  handValueDisplay.innerText = `Hand Value: 0`;
  handContainer.innerHTML = "";
  message.innerText = "";
  drawButton.disabled = false;
}

drawButton.addEventListener("click", drawCard);
refreshButton.addEventListener("click", resetGame);
