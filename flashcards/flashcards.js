let xp =
Number(localStorage.getItem("xp")) || 0;

let level =
Number(localStorage.getItem("level")) || 1;

const decks = [
{
name:"English",
desc:"Words & Native Patterns",
icon:"EN"
},
{
name:"Cybersecurity",
desc:"Bug Bounty & Web Security",
icon:"CY"
},
{
name:"Programming",
desc:"Code, Concepts & Commands",
icon:"DEV"
}
];

const levelEl =
document.getElementById("level");

const xpText =
document.getElementById("xpText");

const xpBar =
document.getElementById("xpBar");

function updatePlayer() {

levelEl.textContent = level;

xpText.textContent =
`${xp} / 100 XP`;

xpBar.style.width =
`${xp}%`;

}

function renderDecks() {

const list =
document.getElementById("deckList");

list.innerHTML = "";

decks.forEach(deck => {

const item =
document.createElement("button");

item.className = "deck";

item.innerHTML = `
<div class="deck-icon">
${deck.icon}
</div>

<div class="deck-info">
<strong>${deck.name}</strong>
<span>${deck.desc}</span>
</div>

<div class="deck-arrow">›</div>
`;

item.onclick = () =>
openDeck(deck.name);

list.appendChild(item);

});

}

function openDeck(name) {

localStorage.setItem(
"selectedDeck",
name
);

alert(`Opening ${name}`);

}

document
.getElementById("newDeck")
.addEventListener("click", () => {

const name =
prompt("Collection name:");

if (!name) return;

decks.push({
name:name,
desc:"New flashcard collection",
icon:"＋"
});

renderDecks();

});

updatePlayer();
renderDecks();
