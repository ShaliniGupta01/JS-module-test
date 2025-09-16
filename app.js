// Select elements
const choices = document.querySelectorAll(".choice");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const hurrayScreen = document.getElementById("hurrayScreen");
const lostScreen = document.getElementById("lostScreen");
const tieScreen = document.getElementById("tieScreen");

const playerPick = document.getElementById("playerPick");
const computerPick = document.getElementById("computerPick");
const resultMessage = document.getElementById("resultMessage");

const playAgainBtn = document.getElementById("playAgain");
const nextButton = document.getElementById("nextButton");
const restartBtns = document.querySelectorAll(".restartGame");

const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");

// Scores (keep persistent across play again, reset only if refresh)
let playerScore = 0;
let computerScore = 0;
const WIN_SCORE = 15;

// Computer choice
const options = ["rock", "paper", "scissors"];

// Icons for choices
const choiceIcons = {
  rock: '<i class="fas fa-hand-fist text-5xl text-black"></i>',
  paper: '<i class="fas fa-hand text-5xl text-black"></i>',
  scissors: '<i class="fas fa-hand-scissors text-5xl text-black"></i>',
};

// Borders for choices
const borderColors = {
  rock: "#0B5EA4",
  paper: "#F9A825",
  scissors: "#9B00FF",
};

// Function to get computer choice
function getComputerChoice() {
  const rand = Math.floor(Math.random() * 3);
  return options[rand];
}

// Function to check winner
function checkWinner(player, computer) {
  if (player === computer) return "tie";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "win";
  }
  return "lose";
}
// Handle choice click
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const playerChoice = choice.getAttribute("data-choice");
    const computerChoice = getComputerChoice();

    // Hide game screen, show result screen
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    // Reset glow from previous rounds
    playerPick.classList.remove("glow");
    computerPick.classList.remove("glow");

    // Show picks
    playerPick.innerHTML = choiceIcons[playerChoice];
    playerPick.style.border = `10px solid ${borderColors[playerChoice]}`;

    computerPick.innerHTML = choiceIcons[computerChoice];
    computerPick.style.border = `10px solid ${borderColors[computerChoice]}`;

    // Decide result
    const result = checkWinner(playerChoice, computerChoice);

    if (result === "win") {
      playerScore++;
      resultMessage.textContent = "YOU WIN! AGAINST PC";
      playerPick.classList.add("glow"); // green glow on player circle
    } else if (result === "lose") {
      computerScore++;
      resultMessage.textContent = "YOU LOSE! AGAINST PC";
      computerPick.classList.add("glow"); // green glow on computer circle
    } else {
      resultMessage.textContent = "IT'S A TIE!";
    }

    // Update scores
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;

    // Show "Next" button only when player wins
    if (result === "win") {
      nextButton.classList.remove("hidden");
    } else {
      nextButton.classList.add("hidden");
    }

    // Check for final win/loss/tie
    if (playerScore >= WIN_SCORE && computerScore >= WIN_SCORE) {
      resultScreen.classList.add("hidden");
      tieScreen.classList.remove("hidden");
    } else if (playerScore >= WIN_SCORE) {
      resultScreen.classList.add("hidden");
      hurrayScreen.classList.remove("hidden");
    } else if (computerScore >= WIN_SCORE) {
      resultScreen.classList.add("hidden");
      lostScreen.classList.remove("hidden");
    }
  });
});


// Play again (keeps score, returns to game screen)
playAgainBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  playerPick.classList.remove("glow");
  computerPick.classList.remove("glow");
});

// Restart (used in hurray, lost, tie → goes back but keeps score)
restartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    hurrayScreen.classList.add("hidden");
    lostScreen.classList.add("hidden");
    tieScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    document.querySelector(".header").classList.remove("hidden");
  });
});


// Next button (goes to Hurray page → only minimal screen visible)
nextButton.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");   // hide game
  document.querySelector(".header").classList.add("hidden"); // hide score header
  hurrayScreen.classList.remove("hidden");
  nextButton.classList.add("hidden");
});



