"use strict";

// declaration des constante

const player1 = document.querySelector(".player_1");
const player2 = document.querySelector(".player_2");

const scorePlayer1 = document.getElementById("score_1");
const scorePlayer2 = document.getElementById("score_2");
const diceImg = document.querySelector(".dice");

const currentScore1 = document.getElementById("current_1");
const currentScore2 = document.getElementById("current_2");


const btnplay = document.querySelector(".btn_play");
const btnsave = document.querySelector(".btn_save");
const btnNew = document.querySelector(".btn_new");

// les variable  

let scores, currentScore, activePlayer, playGame;

//initialisation des variable 

const init = function () {
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  diceImg.classList.add("hidden");

  scores = [0,0];
  activePlayer = 1;
  currentScore = 0;
  playGame = true;

  currentScore1.textContent = 0;
  currentScore2.textContent = 0;

  diceImg.classList.add("hidden");
  player1.classList.remove("player_winner");
  player2.classList.remove("player_winner");
  player1.classList.add("player_active");
  player2.classList.remove("player_active");
};

init();

// fonction pour changer de joueur

const switchPlayer = function () {
  document.getElementById(`current_${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  currentScore = 0;
  player1.classList.toggle("player_active");
  player2.classList.toggle("player_active");
};

// fonction pour faire tourner le dés

btnplay.addEventListener("click", function () {
  if (playGame) {
    diceImg.classList.remove("hidden");

    //1. generate the random number
    const dice = Math.floor(Math.random() * 6) + 1;

    //2. display random image
    diceImg.src = `./image/dice-${dice}.png`;

    //3. check for rolled 1
    if (dice !== 1) {
      // display the score
      currentScore += dice;
      // currentScore1.textContent = currentScore;
      document.getElementById(`current_${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch the player
      switchPlayer();
    }
  }
});

// btn hold even
btnsave.addEventListener("click", function () {
  if (playGame) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score_${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playGame = false;
      document.querySelector(`.player_${activePlayer}`).classList.add("player_winner");
      document .querySelector(`.player_${activePlayer}`) .classList.add("player_active");
      diceImg.classList.add("hidden");
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);