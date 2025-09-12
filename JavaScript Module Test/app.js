let playerScore = 0;
let computerScore = 0;

const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");

const choices = document.querySelectorAll(".choice");
const options = ["rock", "paper", "scissors"];

const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const playerPick = document.getElementById("playerPick");
const computerPick = document.getElementById("computerPick");
const resultMessage = document.getElementById("resultMessage");
const playAgainBtn = document.getElementById("playAgain");

const hurrayScreen = document.getElementById("hurrayScreen");
const lostScreen = document.getElementById("lostScreen");
const tieScreen = document.getElementById("tieScreen");
const nextButton = document.getElementById("nextButton");

let gameOver = false;
let finalResult = null; // "win" | "lose" | "tie"

// --- Player makes a choice ---
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (gameOver) return;

    const playerChoice = choice.dataset.choice;
    const computerChoice = options[Math.floor(Math.random() * 3)];

    displayResult(playerChoice, computerChoice);
  });
});

function displayResult(playerChoice, computerChoice) {
  gameScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  // Show player pick
  playerPick.innerHTML = getIcon(playerChoice);
  playerPick.style.borderColor = getBorderColor(playerChoice);

  // Show computer pick
  computerPick.innerHTML = getIcon(computerChoice);
  computerPick.style.borderColor = getBorderColor(computerChoice);

  let result = "";

  if (playerChoice === computerChoice) {
    result = "tie";
    resultMessage.textContent = "IT'S A TIE!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    result = "win";
    playerScore++;
    resultMessage.textContent = "YOU WIN AGAINST PC!";
  } else {
    result = "lose";
    computerScore++;
    resultMessage.textContent = "YOU LOSE AGAINST PC!";
  }

  // Update score display
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  // --- Glow only on winner ---

  playerPick.classList.remove("glow");
  computerPick.classList.remove("glow");

  if (result === "win") playerPick.classList.add("glow");
  else if (result === "lose") computerPick.classList.add("glow");

  // --- Check if game over (15 points) ---
  if (playerScore === 15 && computerScore === 15) {
    gameOver = true;
    finalResult = "tie";
    nextButton.classList.remove("hidden");
  } else if (playerScore >= 15) {
    gameOver = true;
    finalResult = "win";
    nextButton.classList.remove("hidden");
  } else if (computerScore >= 15) {
    gameOver = true;
    finalResult = "lose";
    nextButton.classList.remove("hidden");
  }
}

// --- Play Again (continue same match) ---
playAgainBtn.addEventListener("click", () => {
  gameScreen.classList.remove("hidden");
  resultScreen.classList.add("hidden");
});

// --- NEXT button goes to final screen ---
nextButton.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  nextButton.classList.add("hidden");

  if (finalResult === "win") {
    hurrayScreen.classList.remove("hidden");
  } else if (finalResult === "lose") {
    lostScreen.classList.remove("hidden");
  } else if (finalResult === "tie") {
    tieScreen.classList.remove("hidden");
  }
});

// --- Restart game from any final screen ---
document.querySelectorAll(".restartGame").forEach((btn) => {
  btn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;
    gameOver = false;
    finalResult = null;

    hurrayScreen.classList.add("hidden");
    lostScreen.classList.add("hidden");
    tieScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  });
});

// --- Helpers ---
function getIcon(choice) {
  if (choice === "rock")
    return `<i class="fas fa-hand-fist text-5xl text-black"></i>`;
  if (choice === "paper")
    return `<i class="fas fa-hand text-5xl text-black"></i>`;
  if (choice === "scissors")
    return `<i class="fas fa-hand-scissors text-5xl text-black"></i>`;
}

function getBorderColor(choice) {
  if (choice === "rock") return "#0B5EA4";
  if (choice === "paper") return "#F9A825";
  if (choice === "scissors") return "#9B00FF";
}

// Remove previous glow
playerPick.classList.remove("glowing-circle");
computerPick.classList.remove("glowing-circle");

// Add glow to winner
if (result === "win") {
  playerPick.classList.add("glowing-circle");
  playerPick.style.setProperty("--glow-color", getBorderColor(playerChoice));
} else if (result === "lose") {
  computerPick.classList.add("glowing-circle");
  computerPick.style.setProperty(
    "--glow-color",
    getBorderColor(computerChoice)
  );
}
