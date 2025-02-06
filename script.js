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
