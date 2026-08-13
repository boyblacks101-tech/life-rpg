const STORAGE_KEY = "troviruses_english_decks";

let decks = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
);


/* GET DECK ID */

const params = new URLSearchParams(
    window.location.search
);

const deckId = Number(
    params.get("id")
);


const deck = decks.find(
    item => item.id === deckId
);


/* ELEMENTS */

const deckTitle =
    document.getElementById("deckTitle");

const deckDescription =
    document.getElementById("deckDescription");

const cardList =
    document.getElementById("cardList");

const emptyCards =
    document.getElementById("emptyCards");

const cardCount =
    document.getElementById("cardCount");

const masteredCount =
    document.getElementById("masteredCount");

const deckXP =
    document.getElementById("deckXP");

const wordModal =
    document.getElementById("wordModal");

const wordForm =
    document.getElementById("wordForm");


/* CHECK DECK */

if (!deck) {

    deckTitle.textContent = "Deck not found";

} else {

    renderDeck();

}


/* RENDER */

function renderDeck() {

    deckTitle.textContent =
        deck.name;

    deckDescription.textContent =
        deck.description || "";


    cardCount.textContent =
        deck.cards.length;


    const mastered =
        deck.cards.length === 0
            ? 0
            : Math.round(
                deck.cards.filter(
                    card => card.mastered
                ).length
                /
                deck.cards.length
                * 100
            );


    masteredCount.textContent =
        mastered + "%";


    deckXP.textContent =
        deck.cards.length * 10;


    cardList.innerHTML = "";


    if (deck.cards.length === 0) {

        emptyCards.style.display =
            "block";

        return;
    }


    emptyCards.style.display =
        "none";


    deck.cards.forEach(card => {

        const element =
            document.createElement("div");

        element.className =
            "word-card";


        element.innerHTML = `

            <div class="word-top">

                <div>

                    <div class="word">
                        ${escapeHTML(card.word)}
                    </div>

                    <div class="pronunciation">
                        ${escapeHTML(
                            card.pronunciation || ""
                        )}
                    </div>

                </div>

                <div class="card-status">
                    NEW
                </div>

            </div>

            <div class="meaning">
                ${escapeHTML(card.meaning)}
            </div>

            ${
                card.example
                ?
                `
                <div class="example">
                    ${escapeHTML(card.example)}
                </div>
                `
                :
                ""
            }

        `;


        cardList.appendChild(element);

    });

}


/* ESCAPE */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;
}


/* OPEN MODAL */

function openWordModal() {

    wordModal.classList.add("active");

    setTimeout(() => {

        document
            .getElementById("wordInput")
            .focus();

    }, 100);

}


/* CLOSE MODAL */

function closeWordModal() {

    wordModal.classList.remove("active");

    wordForm.reset();

}


/* BUTTONS */

document
    .getElementById("addWordButton")
    .addEventListener(
        "click",
        openWordModal
    );


document
    .getElementById("emptyAddButton")
    .addEventListener(
        "click",
        openWordModal
    );


document
    .getElementById("closeWordModal")
    .addEventListener(
        "click",
        closeWordModal
    );


document
    .getElementById("cancelWord")
    .addEventListener(
        "click",
        closeWordModal
    );


wordModal.addEventListener(
    "click",
    event => {

        if (event.target === wordModal) {
            closeWordModal();
        }

    }
);


/* SAVE WORD */

wordForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (!deck) return;


        const word =
            document
                .getElementById("wordInput")
                .value
                .trim();


        const meaning =
            document
                .getElementById("meaningInput")
                .value
                .trim();


        const example =
            document
                .getElementById("exampleInput")
                .value
                .trim();


        const pronunciation =
            document
                .getElementById("pronunciationInput")
                .value
                .trim();


        if (!word || !meaning) {
            return;
        }


        const card = {

            id: Date.now(),

            word,

            meaning,

            example,

            pronunciation,

            mastered: false,

            reviews: 0,

            createdAt:
                new Date().toISOString()

        };


        deck.cards.push(card);


        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(decks)
        );


        renderDeck();

        closeWordModal();

    }
);
