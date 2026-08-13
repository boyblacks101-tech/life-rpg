const STORAGE_KEY = "troviruses_english_decks";

let decks = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
);


const params =
    new URLSearchParams(
        window.location.search
    );

const deckId =
    Number(params.get("id"));


const deck =
    decks.find(
        item => item.id === deckId
    );


if (!deck) {

    window.location.href =
        "english.html";

}


/* =========================
   ELEMENTS
========================= */

const deckTitle =
    document.getElementById(
        "deckTitle"
    );

const deckDescription =
    document.getElementById(
        "deckDescription"
    );

const cardCount =
    document.getElementById(
        "cardCount"
    );

const masteredCount =
    document.getElementById(
        "masteredCount"
    );

const cardList =
    document.getElementById(
        "cardList"
    );

const emptyCards =
    document.getElementById(
        "emptyCards"
    );


/* =========================
   SAVE
========================= */

function save() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(decks)
    );

}


/* =========================
   RENDER
========================= */

function render() {

    deckTitle.textContent =
        deck.name;

    deckDescription.textContent =
        deck.description ||
        "Vocabulary collection";


    cardCount.textContent =
        deck.cards.length;


    masteredCount.textContent =
        deck.cards.filter(
            card => card.mastered
        ).length;


    cardList.innerHTML = "";


    if (deck.cards.length === 0) {

        emptyCards.style.display =
            "block";

        return;

    }


    emptyCards.style.display =
        "none";


    deck.cards.forEach(
        (card, index) => {

            const element =
                document.createElement(
                    "div"
                );

            element.className =
                "word-card";


            element.innerHTML = `

                <div>

                    <strong>
                        ${escapeHTML(
                            card.word
                        )}
                    </strong>

                    <span>
                        ${escapeHTML(
                            card.meaning
                        )}
                    </span>

                    ${
                        card.example
                        ? `<small>
                            ${escapeHTML(
                                card.example
                            )}
                           </small>`
                        : ""
                    }

                </div>

                <button
                    data-index="${index}"
                    class="delete-card"
                >
                    ×
                </button>

            `;


            element
                .querySelector(
                    ".delete-card"
                )
                .addEventListener(
                    "click",
                    () => {

                        deck.cards.splice(
                            index,
                            1
                        );

                        save();

                        render();

                    }
                );


            cardList.appendChild(
                element
            );

        }
    );

}


/* =========================
   ADD CARD
========================= */

document
    .getElementById("cardForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const word =
                document
                    .getElementById(
                        "wordInput"
                    )
                    .value
                    .trim();


            const meaning =
                document
                    .getElementById(
                        "meaningInput"
                    )
                    .value
                    .trim();


            const example =
                document
                    .getElementById(
                        "exampleInput"
                    )
                    .value
                    .trim();


            deck.cards.push({

                id: Date.now(),

                word,

                meaning,

                example,

                mastered: false,

                reviews: 0,

                createdAt:
                    new Date()
                        .toISOString()

            });


            save();

            event.target.reset();

            render();

        }
    );


/* =========================
   REVIEW
========================= */

document
    .getElementById("startReview")
    .addEventListener(
        "click",
        () => {

            if (
                deck.cards.length === 0
            ) {

                alert(
                    "Add some cards first."
                );

                return;

            }


            window.location.href =
                `review.html?id=${deck.id}`;

        }
    );


/* =========================
   ESCAPE HTML
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

render();
