const STORAGE_KEY = "troviruses_english_decks";

let decks = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
);


const deckModal =
    document.getElementById("deckModal");

const deckList =
    document.getElementById("deckList");

const emptyDeck =
    document.getElementById("emptyDeck");

const deckCount =
    document.getElementById("deckCount");

const deckForm =
    document.getElementById("deckForm");


function saveDecks() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(decks)
    );
}


function renderDecks() {

    deckList.innerHTML = "";

    deckCount.textContent = decks.length;


    if (decks.length === 0) {

        emptyDeck.style.display = "block";

        return;
    }


    emptyDeck.style.display = "none";


    decks.forEach((deck, index) => {

        const element =
            document.createElement("div");

        element.className = "deck";


        element.innerHTML = `

            <div class="deck-top">

                <div class="deck-icon">
                    ${index + 1}
                </div>

                <div class="deck-arrow">
                    →
                </div>

            </div>

            <h3>
                ${escapeHTML(deck.name)}
            </h3>

            <p>
                ${escapeHTML(
                    deck.description ||
                    "Vocabulary collection"
                )}
            </p>

            <div class="deck-meta">

                <span>
                    ${deck.cards.length} cards
                </span>

                <span>
                    0% mastered
                </span>

            </div>

        `;


        element.addEventListener(
            "click",
            () => openDeck(deck.id)
        );


        deckList.appendChild(element);

    });

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


function openDeck(id) {

    /*
        قدم بعدی همین‌جا ساخته می‌شود:

        Deck Page
        ↓
        Add Word
        ↓
        Front / Back
        ↓
        Example
        ↓
        Pronunciation
        ↓
        Review
        ↓
        XP
    */

    alert(
        "Deck selected. Review system is coming next."
    );
}


function openModal() {

    deckModal.classList.add("active");

    setTimeout(() => {

        document
            .getElementById("deckName")
            .focus();

    }, 100);

}


function closeModal() {

    deckModal.classList.remove("active");

    deckForm.reset();

}


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
    (event) => {

        if (event.target === deckModal) {
            closeModal();
        }

    }
);


deckForm.addEventListener(
    "submit",
    (event) => {

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


        const newDeck = {

            id:
                Date.now(),

            name,

            description,

            cards: [],

            createdAt:
                new Date().toISOString()

        };


        decks.push(newDeck);

        saveDecks();

        renderDecks();

        closeModal();

    }
);


document
    .getElementById("reviewButton")
    .addEventListener(
        "click",
        () => {

            if (decks.length === 0) {

                openModal();

                return;
            }


            alert(
                "Review system is coming next."
            );

        }
    );


renderDecks();
