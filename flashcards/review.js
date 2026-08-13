const deckName =
    localStorage.getItem("selectedDeck") || "English";

const cards = [
    {
        type: "WORD",
        question: "overwhelmed",
        answer: "Feeling that you have too much to deal with.",
        example: "I'm overwhelmed with work."
    },
    {
        type: "WORD",
        question: "accurate",
        answer: "Correct and free from mistakes.",
        example: "The information is accurate."
    },
    {
        type: "NATIVE",
        question: "That makes sense.",
        answer: "Used when something is logical or understandable.",
        example: "Oh, that makes sense now."
    }
];

let current = 0;
let revealed = false;

const card = document.getElementById("card");
const front = document.getElementById("front");
const back = document.getElementById("back");
const actions = document.getElementById("actions");

document.getElementById("deckName")
    .textContent = deckName.toUpperCase();

function render() {
    const item = cards[current];

    document.getElementById("question")
        .textContent = item.question;

    document.getElementById("answer")
        .textContent = item.answer;

    document.getElementById("example")
        .textContent = item.example;

    document.querySelector(".type")
        .textContent = item.type;

    document.getElementById("counter")
        .textContent =
        `${current + 1} / ${cards.length}`;

    document.getElementById("progressBar")
        .style.width =
        `${((current + 1) / cards.length) * 100}%`;
}

card.onclick = () => {
    if (revealed) return;

    revealed = true;

    front.classList.add("hidden");
    back.classList.remove("hidden");
    actions.classList.remove("hidden");
};

document.querySelectorAll("[data-rating]")
.forEach((button) => {

    button.onclick = () => {

        const rating = button.dataset.rating;

        addXP(rating);

        current++;

        if (current >= cards.length) {
            location.href = "flashcards.html";
            return;
        }

        revealed = false;

        front.classList.remove("hidden");
        back.classList.add("hidden");
        actions.classList.add("hidden");

        render();
    };
});

function addXP(rating) {
    let xp =
        Number(localStorage.getItem("xp")) || 0;

    const values = {
        again: 2,
        hard: 5,
        good: 10,
        easy: 15
    };

    xp += values[rating];

    let level =
        Number(localStorage.getItem("level")) || 1;

    if (xp >= 100) {
        xp -= 100;
        level++;
    }

    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
}

render();
