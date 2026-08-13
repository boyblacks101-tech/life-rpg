const STORAGE_KEY =
    "troviruses_english_decks";


let decks = JSON.parse(
    localStorage.getItem(
        STORAGE_KEY
    ) || "[]"
);


const params =
    new URLSearchParams(
        window.location.search
    );


const deckId =
    Number(
        params.get("id")
    );


const deck =
    decks.find(
        d => d.id === deckId
    );


if (!deck || deck.cards.length === 0) {

    window.location.href =
        "english.html";

}


let currentIndex = 0;


/* =========================
   ELEMENTS
========================= */

const word =
    document.getElementById(
        "word"
    );

const answer =
    document.getElementById(
        "answer"
    );

const showAnswer =
    document.getElementById(
        "showAnswer"
    );

const cardNumber =
    document.getElementById(
        "cardNumber"
    );

const reviewProgress =
    document.getElementById(
        "reviewProgress"
    );

const reviewDeckName =
    document.getElementById(
        "reviewDeckName"
    );

const ratingButtons =
    document.getElementById(
        "ratingButtons"
    );


/* =========================
   RENDER
========================= */

function renderCard() {

    const card =
        deck.cards[currentIndex];


    reviewDeckName.textContent =
        deck.name;


    cardNumber.textContent =
        `CARD ${String(
            currentIndex + 1
        ).padStart(2, "0")}`;


    reviewProgress.textContent =
        `${currentIndex + 1} / ${
            deck.cards.length
        }`;


    word.textContent =
        card.word;


    answer.innerHTML = `

        <strong>
            ${escapeHTML(
                card.meaning
            )}
        </strong>

        ${
            card.example
            ? `<small>
                ${escapeHTML(
                    card.example
                )}
               </small>`
            : ""
        }

    `;


    answer.classList.remove(
        "visible"
    );


    showAnswer.style.display =
        "block";


    ratingButtons.style.display =
        "none";

}


/* =========================
   SHOW ANSWER
========================= */

showAnswer.addEventListener(
    "click",
    () => {

        answer.classList.add(
            "visible"
        );

        showAnswer.style.display =
            "none";

        ratingButtons.style.display =
            "grid";

    }
);


/* =========================
   RATING
========================= */

ratingButtons
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const rating =
                    button.dataset.rating;


                const card =
                    deck.cards[
                        currentIndex
                    ];


                card.reviews =
                    (card.reviews || 0) + 1;


                if (
                    rating === "easy"
                ) {

                    card.mastered =
                        true;

                }


                if (
                    rating === "again"
                ) {

                    card.mastered =
                        false;

                }


                save();


                currentIndex++;


                if (
                    currentIndex >=
                    deck.cards.length
                ) {

                    finishReview();

                    return;

                }


                renderCard();

            }
        );

    });


/* =========================
   FINISH
========================= */

function finishReview() {

    document.querySelector(
        ".review-main"
    ).innerHTML = `

        <div class="review-card">

            <small>
                REVIEW COMPLETE
            </small>

            <h2>
                Nice work.
            </h2>

            <p>
                You reviewed ${
                    deck.cards.length
                } cards.
            </p>

            <a
                href="english.html"
                class="show-answer"
            >
                Back to English World
            </a>

        </div>

    `;

}


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
   ESCAPE
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

renderCard();
