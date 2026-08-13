let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;

let decks = JSON.parse(
    localStorage.getItem("decks") || "[]"
);

const defaults = [
    {
        name: "English",
        desc: "Words & Native Patterns",
        icon: "EN"
    },
    {
        name: "Cybersecurity",
        desc: "Bug Bounty & Web Security",
        icon: "CY"
    },
    {
        name: "Programming",
        desc: "Code, Concepts & Commands",
        icon: "DEV"
    }
];

if (!decks.length) {
    decks = defaults;
    saveDecks();
}

function saveDecks() {
    localStorage.setItem(
        "decks",
        JSON.stringify(decks)
    );
}

function updatePlayer() {
    document.getElementById("level").textContent = level;
    document.getElementById("xpText").textContent =
        `${xp} / 100 XP`;
    document.getElementById("xpBar").style.width =
        `${xp}%`;
}

function openDeck(name) {
    localStorage.setItem("selectedDeck", name);
    location.href = "review.html";
}

function renderDecks() {
    const list = document.getElementById("deckList");
    list.innerHTML = "";

    decks.forEach((deck) => {
        const item = document.createElement("button");

        item.className = "deck";

        item.innerHTML = `
            <div class="deck-icon">${deck.icon}</div>
            <div class="deck-info">
                <strong>${deck.name}</strong>
                <span>${deck.desc}</span>
            </div>
            <div class="deck-arrow">›</div>
        `;

        item.onclick = () => openDeck(deck.name);
        list.appendChild(item);
    });
}

document.getElementById("newDeck").onclick = () => {
    const name = prompt("Collection name:");

    if (!name) return;

    decks.push({
        name,
        desc: "New flashcard collection",
        icon: "+"
    });

    saveDecks();
    renderDecks();
};

updatePlayer();
renderDecks();
