let computerNum = 0;

let playBtn = document.getElementById("play-btn");

let userInput = document.getElementById("user-input");

let result = document.getElementById("result");

let resetBtn = document.getElementById("reset-btn");

let chances = 5;

let gameOver = false;

let chanceArea = document.getElementById("chance-area");

let history = [];

playBtn.addEventListener("click", play);

resetBtn.addEventListener("click", reset);

userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    result.textContent = "1과 100사이만 입력해";
    return;
  }

  if (history.includes(userValue)) {
    result.textContent = "이미 입력한 숫자입니다.";
    return;
  }

  chances--;
  chanceArea.textContent = `남은찬스:${chances}`;
  console.log("chance", chances);
  if (userValue < computerNum) {
    result.textContent = "UP";
  } else if (userValue > computerNum) {
    result.textContent = "DOWN";
  } else {
    result.textContent = "정답";
    gameOver = true;
  }

  history.push(userValue);

  console.log(history);

  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    playBtn.disabled = true;
  }
}

function reset() {
  userInput.value = "";
  pickRandomNum();
  result.textContent = "";
}

pickRandomNum();
