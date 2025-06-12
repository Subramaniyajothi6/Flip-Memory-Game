const baseColors = ["#800080", "blue", "green", "yellow", "pink", "orange", "#00ff00", "#00ffff"];
let colors = [...baseColors, ...baseColors]; 
let game = document.getElementById("game");

let firstCard = null;
let lock = false;

function shuffle() {
  colors.sort(() => Math.random() - 0.5);
}

function createCards() {
  game.innerHTML = "";
  colors.forEach(color => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.color = color;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back" style="background-color: ${color};"></div>
      </div>
    `;

    card.addEventListener("click", () => handleCardClick(card));

    game.appendChild(card);
  });
}

function handleCardClick(card) {
  if (lock || card.classList.contains("matched") || card === firstCard) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
  } else {
    const secondCard = card;
    if (firstCard.dataset.color === secondCard.dataset.color) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      firstCard = null;
    } else {
      lock = true;
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard = null;
        lock = false;
      }, 1000);
    }
  }
}

function restartGame() {
  shuffle();
  createCards();
}

restartGame();
