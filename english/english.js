const STORAGE_KEY = "troviruses_english_decks";

let decks = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
);


/* =========================
   ELEMENTS
========================= */

const deckList =
    document.getElementById("deckList");

const emptyDeck =
    document.getElementById("emptyDeck");

const deckCount =
    document.getElementById("deckCount");

const englishXP =
    document.getElementById("englishXP");

const englishXPBar =
    document.getElementById("englishXPBar");

const deckModal =
    document.getElementById("deckModal");

const deckForm =
    document.getElementById("deckForm");


/* =========================
   SAVE
========================= */

function saveDecks() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(decks)
    );

}


/* =========================
   XP
========================= */

function calculateXP() {

    let xp = 0;

    decks.forEach(deck => {

        xp += deck.cards.length * 10;

        xp += deck.cards.filter(
            card => card.mastered
        ).length * 25;

    });

    return xp;

}


/* =========================
   RENDER DECKS
========================= */

function renderDecks() {

    deckList.innerHTML = "";

    deckCount.textContent =
        decks.length;


    const xp = calculateXP();

    englishXP.textContent =
        `${xp} XP`;


    const levelXP = xp % 100;

    englishXPBar.style.width =
        `${levelXP}%`;


    if (decks.length === 0) {

        emptyDeck.style.display =
            "block";

        return;
    }


    emptyDeck.style.display =
        "none";


    decks.forEach(deck => {

        const card = document.createElement("button");

        card.className = "deck-card";


        card.innerHTML = `

            <div class="deck-icon">
                ${deck.name
                    .charAt(0)
                    .toUpperCase()}
            </div>

            <div class="deck-content">

                <strong>
                    ${escapeHTML(deck.name)}
                </strong>

                <small>
                    ${escapeHTML(
                        deck.description ||
                        "Vocabulary collection"
                    )}
                </small>

                <span>
                    ${deck.cards.length} cards
                </span>

            </div>

            <b>
                →
            </b>

        `;


        card.addEventListener(
            "click",
            () => {

                openDeck(deck.id);

            }
        );


        deckList.appendChild(card);

    });

}


/* =========================
   CREATE DECK
========================= */

function createDeck(
    name,
    description
) {

    const deck = {

        id: Date.now(),

        name: name,

        description:
            description || "",

        cards: [],

        createdAt:
            new Date().toISOString()

    };


    decks.push(deck);

    saveDecks();

    renderDecks();

}


/* =========================
   OPEN DECK
========================= */

function openDeck(id) {

    window.location.href =
        `deck.html?id=${id}`;

}


/* =========================
   MODAL
========================= */

function openModal() {

    deckModal.classList.add(
        "active"
    );

    setTimeout(() => {

        document
            .getElementById("deckName")
            .focus();

    }, 100);

}


function closeModal() {

    deckModal.classList.remove(
        "active"
    );

    deckForm.reset();

}


/* =========================
   BUTTONS
========================= */

document
    .getElementById("createDeckButton")
    .addEventListener(
        "click",
        openModal
    );


document
    .getElementById("emptyCreateButton")
    .addEventListener(
        "click",
        openModal
    );


document
    .getElementById("closeDeckModal")
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById("cancelDeck")
    .addEventListener(
        "click",
        closeModal
    );


deckModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            deckModal
        ) {

            closeModal();

        }

    }
);


/* =========================
   FORM
========================= */

deckForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById("deckName")
                .value
                .trim();


        const description =
            document
                .getElementById("deckDescription")
                .value
                .trim();


        if (!name) return;


        createDeck(
            name,
            description
        );


        closeModal();

    }
);


/* =========================
   REVIEW
========================= */

document
    .getElementById("reviewButton")
    .addEventListener(
        "click",
        () => {

            const reviewableDeck =
                decks.find(
                    deck =>
                        deck.cards.length > 0
                );


            if (!reviewableDeck) {

                alert(
                    "Add some words first."
                );

                return;
            }


            window.location.href =
                `deck.html?id=${reviewableDeck.id}&review=true`;

        }
    );


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text || "";

    return div.innerHTML;

}


/* =========================
   START
========================= */

renderDecks();
