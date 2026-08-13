const deck =
localStorage.getItem("selectedDeck")
|| "English";

let cards =
JSON.parse(
localStorage.getItem("cards")
|| "[]"
);

cards = cards.filter(
card => card.deck === deck
);

let current = 0;
let revealed = false;

const card =
document.getElementById("card");

const front =
document.getElementById("front");

const back =
document.getElementById("back");

const actions =
document.getElementById("actions");

document.getElementById("deckName")
.textContent =
deck.toUpperCase();

function render() {

if (!cards.length) {

document.getElementById("question")
.textContent =
"No cards yet";

document.querySelector(".type")
.textContent =
"EMPTY";

document.querySelector(".card p")
.textContent =
"Create your first card";

return;

}

const item =
cards[current];

document.getElementById("question")
.textContent =
item.front;

document.getElementById("answer")
.textContent =
item.back;

document.getElementById("example")
.textContent =
item.example || "No example";

document.querySelector(".type")
.textContent =
item.techType
|| item.type.toUpperCase();

document.getElementById("counter")
.textContent =
`${current + 1} / ${cards.length}`;

document.getElementById("progressBar")
.style.width =
`${((current + 1) /
cards.length) * 100}%`;

}

card.onclick = () => {

if (revealed || !cards.length)
return;

revealed = true;

front.classList.add("hidden");
back.classList.remove("hidden");
actions.classList.remove("hidden");

};

document
.querySelectorAll("[data-rating]")
.forEach(button => {

button.onclick = () => {

if (!cards.length)
return;

const rating =
button.dataset.rating;

updateCard(rating);

current++;

if (current >= cards.length) {

location.href =
"flashcards.html";

return;

}

revealed = false;

front.classList.remove("hidden");
back.classList.add("hidden");
actions.classList.add("hidden");

render();

};

});

function updateCard(rating) {

const item =
cards[current];

const now =
Date.now();

const days = {

again: 0,
hard: 1,
good: 4,
easy: 7

};

item.interval =
days[rating];

item.reviews++;

item.due =
now +
(days[rating] * 86400000);

if (rating === "easy")
item.ease += 0.15;

if (rating === "hard")
item.ease -= 0.15;

if (item.ease < 1.3)
item.ease = 1.3;

const allCards =
JSON.parse(
localStorage.getItem("cards")
|| "[]"
);

const index =
allCards.findIndex(
c => c.id === item.id
);

if (index !== -1)
allCards[index] = item;

localStorage.setItem(
"cards",
JSON.stringify(allCards)
);

addXP(rating);

}

function addXP(rating) {

let xp =
Number(localStorage.getItem("xp"))
|| 0;

let level =
Number(localStorage.getItem("level"))
|| 1;

const values = {

again: 2,
hard: 5,
good: 10,
easy: 15

};

xp += values[rating];

while (xp >= 100) {

xp -= 100;
level++;

}

localStorage.setItem("xp", xp);
localStorage.setItem("level", level);

}

render();
