// Hvis du vil ramme et specifikt sted i din HTML via JS!

/*const titles = document.querySelectorAll("p");
titles.forEach(title => {
title.style.color = "red";
});
*/

// HVis man vil bruge javascript-arrays til, at fjerne eller tilføje elememer:
// Tilføj = push og Fjern = pop.
/*
let fruits = ["Æble", "Banan", "Jordbærd", "Ananas"];
fruits.pop("Appelsin");
*/

function setResult(text, color) {
  result.textContent = text;
  result.style.color = color;
  result.style.fontWeight = "bold";
  result.style.fontSize = "18px";
  result.style.textShadow = "1px 1px 2px black";
}

function endGame(message, color) {
  setResult(message, color);
  clearInterval(timer);
  guessInput.disabled = true;
  guessButton.disabled = true;

  restartButton.style.display = "inline-block";
}

const secret = Math.floor(Math.random() * 1000) + 1;
const result = document.getElementById("GetResult");
const timerText = document.getElementById("timer");
const guessInput = document.getElementById("guess");
const guessList = document.getElementById("guessList");
const guessButton = document.getElementById("guessButton");
const restartButton = document.getElementById("restartButton");

let time = 60;
const maxGuesses = 20;
let guessCount = 0;

const timer = setInterval(() => {
  time--;
  timerText.textContent = time + " Sekunder tilbage";

  if (time <= 0) {
    endGame("Tiden er gået! Du tabte!", "red");
  }
}, 1000);

guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.repeat) {
    checkGuess();
  }
});

function saveGuess(guess) {
  let guesses = JSON.parse(localStorage.getItem("guesses")) || [];
  guesses.push(guess);
  localStorage.setItem("guesses", JSON.stringify(guesses));
}

function showGuess(guess) {
  const li = document.createElement("li");

  if (guess < secret) {
    li.textContent = `Du gættede: ${guess} – For lavt!`;
  } else if (guess > secret) {
    li.textContent = `Du gættede: ${guess} – For højt!`;
  } else {
    li.textContent = `Du gættede: ${guess} – Rigtigt!`;
  }

  guessList.appendChild(li);
}

function checkGuess() {
  if (guessInput.value === "") return;

  const guess = Number(guessInput.value);

  if (guess < 1 || guess > 1000) {
    setResult("Ugyldigt input – indtast et tal mellem 1 og 1000", "red");
    return;
  }

  saveGuess(guess);
  showGuess(guess);
  guessCount++;

  if (guessCount >= maxGuesses) {
    endGame(`Du har brugt alle 20 gæt! Tallet var ${secret}`, "red");
    return;
  }

  if (guess < secret) {
    setResult("For lavt!", "red");
  } else if (guess > secret) {
    setResult("For højt!", "red");
  } else {
    endGame(`Rigtigt! Tallet var ${secret}`, "green");
  }

  guessInput.value = "";
  guessInput.focus();
}

restartButton.addEventListener("click", () => {
  location.reload();
});