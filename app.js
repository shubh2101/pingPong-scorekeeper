const p1 = {
  score: 0,
  button: document.querySelector("#p1Button"),
  display: document.querySelector("#p1Display"),
};
const p2 = {
  score: 0,
  button: document.querySelector("#p2Button"),
  display: document.querySelector("#p2Display"),

};
const buttonconfirm = document.querySelector("#confirm2")
const resetButton = document.querySelector("#reset");
const resetscoreboardButton = document.querySelector("#resetScoreboard");
const resetnamesButton = document.querySelector("#resetNames");
const resetAll = document.querySelector("#resetAll");

const winningscoreSelect = document.querySelector("#playto");
let winningScore = 3;
let gameCount = 0;
let isGameOver = false;

buttonconfirm.addEventListener("click", function () {
  const player1Input = document.getElementById("p1Input").value;
  p1.button.innerText = player1Input;
 
  const player2Input = document.getElementById("p2Input").value;
  p2.button.innerText = player2Input;
  buttonconfirm.style.display = "none";
  
});

function updateScores(player, opponent) {
  if (!isGameOver) {
    player.score += 1;
    if (player.score === winningScore) {
      isGameOver = true;
      player.display.classList.add("has-text-success");
      opponent.display.classList.add("has-text-danger");
      player.button.disabled = true;
      opponent.button.disabled = true;
      showHistory(p1, p2);
    }
    player.display.textContent = player.score;
  }
}

p1.button.addEventListener("click", function () {
  updateScores(p1, p2);
  winBy2(p1, p2);
});
p2.button.addEventListener("click", function () {
  updateScores(p2, p1);
  winBy2(p1, p2);
});

winningscoreSelect.addEventListener("change", function () {
  winningScore = parseInt(this.value);
  reset();
});

function winBy2(player, opponent) {
  if (player.score === opponent.score && player.score === winningScore - 1) {
    winningScore++;
    winningscoreSelect.selectedOptions[0].value = winningscoreSelect;
    winningscoreSelect.classList.add("extratime");
    winningscoreSelect.selectedOptions[0].innerText = `Tie-break to ${winningScore}`;
  }
}
const gameCountUl = document.querySelector("#gameCountList");
const scoreUl = document.querySelector("#scoreList");
const winnerUl = document.querySelector("#winnerList");

function showHistory(player, opponent) {
  let gameCountLi = document.createElement("li");
  let scoreLi = document.createElement("li");
  let winnerLi = document.createElement("li");

  gameCount += 1;
  gameCountLi.innerText = gameCount;

  if (p1.score === winningScore) {
    winnerLi.innerText = p1.button.innerText;
  } else if (p2.score === winningScore) {
    winnerLi.innerText = p2.button.innerText;
  }

  // if (player.score === winningScore) {
  //     winnerLi.innerText = p1.button.innerText;
  // } else if (opponent.score === winningScore) {
  //     winnerLi.innerText === p2.button.innerText;
  // }

  // if (player.score === winningScore) {
  //     winnerLi.innerText = player1Input;
  // } else if (opponent.score === winningScore) {
  //     winnerLi.innerText === player2Input;
  // }

  scoreLi.innerText = `${player.score} - ${opponent.score}`;
  gameCountUl.append(gameCountLi);
  scoreUl.append(scoreLi);
  winnerUl.append(winnerLi);
}

resetButton.addEventListener("click", reset);

function reset() {
  for (p of [p1, p2]) {
    isGameOver = false;
    p.score = 0;
    p.display.textContent = p1.score;
    p.display.classList.remove("has-text-success", "has-text-danger");
    p.button.disabled = false;
  }
  for (let i = 0; i <= 6; i++) {
    winningscoreSelect[i].value = 3 + i;
    winningscoreSelect[i].innerText = 3 + i;
  }

  winningscoreSelect.classList.remove("extratime");
  winningscoreSelect.blur();
  winningScore = parseInt(winningscoreSelect.value);
}

const resetscoreboard = () => {
  gameCountUl.innerText = "";
  scoreUl.innerText = "";
  winnerUl.innerText = "";
  gameCount = 0;
};
resetscoreboardButton.addEventListener("click", resetscoreboard);

const resetName = () => {
  p1.button.innerText = "+1 Player One";
  p2.button.innerText = "+1 Player Two";
  buttonconfirm.style.display = "block";
  document.getElementById("p1Input").value = "";
  document.getElementById("p2Input").value = "";
};
resetnamesButton.addEventListener("click", resetName);

resetAll.addEventListener("click", function () {
  resetscoreboard();
  reset();
  resetName();
});
