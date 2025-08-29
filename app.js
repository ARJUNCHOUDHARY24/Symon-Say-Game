let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// 👇 keyboard + mobile dono ke liye start
document.addEventListener("keypress", startGame);
document.addEventListener("click", startGame);

function startGame() {
  if (!started) {
    started = true;
    levelUp();
  }
}

function gameflash(btn) {
  // yaha "flash" class ki jagah "btnflash" use karo (CSS ke hisaab se)
  btn.classList.add("btnflash");
  setTimeout(function () {
    btn.classList.remove("btnflash");
  }, 250);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log("Game Sequence:", gameSeq);

  gameflash(randBtn);
}

function checkAnss(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! your score was <b> ${level}</b> <br> Tap anywhere or press any key to restart.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "";
    }, 150);
    resetGame();
  }
}

function btnPress() {
  let btn = this;
  userflash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAnss(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function resetGame() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
