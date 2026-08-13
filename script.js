let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;

const xpBar = document.getElementById("xpBar");
const xpText = document.getElementById("xpText");
const levelText = document.getElementById("level");
const nextXP = document.getElementById("nextXP");

function updateUI() {
    xpBar.style.width = `${xp}%`;
    xpText.textContent = `${xp} / 100 XP`;
    levelText.textContent = level;
    nextXP.textContent = `${100 - xp} XP`;
}

const input = document.getElementById("photoInput");
const bg = document.getElementById("photoBg");
const tabs = document.getElementById("photoTabs");

let photos = JSON.parse(
    localStorage.getItem("photos") || "[]"
);

let current = 0;

function savePhotos() {
    localStorage.setItem(
        "photos",
        JSON.stringify(photos)
    );
}

function showPhoto(index) {
    if (!photos.length) return;

    current = index;

    bg.style.backgroundImage =
        `url("${photos[current]}")`;

    bg.style.opacity = "1";

    document
        .querySelectorAll(".photo-tab")
        .forEach((tab, i) => {
            tab.classList.toggle(
                "active",
                i === current
            );
        });
}

function renderTabs() {
    tabs.innerHTML = "";

    photos.forEach((photo, index) => {
        const tab = document.createElement("button");

        tab.className = "photo-tab";
        tab.style.backgroundImage =
            `url("${photo}")`;

        tab.onclick = () => showPhoto(index);

        tabs.appendChild(tab);
    });

    showPhoto(current);
}

input.addEventListener("change", () => {

    [...input.files].forEach(file => {

        const reader = new FileReader();

        reader.onload = event => {

            photos.push(event.target.result);

            savePhotos();
            renderTabs();

        };

        reader.readAsDataURL(file);
    });

});

setInterval(() => {

    if (!photos.length) return;

    showPhoto(
        (current + 1) % photos.length
    );

}, 60000);

updateUI();
renderTabs();

/* =========================
   RPG CLOCK
========================= */

function updateClock() {

    const now = new Date();

    const hours = String(
        now.getHours()
    ).padStart(2, "0");

    const minutes = String(
        now.getMinutes()
    ).padStart(2, "0");


    document.getElementById("hourTens")
        .innerHTML = `<span>${hours[0]}</span>`;

    document.getElementById("hourOnes")
        .innerHTML = `<span>${hours[1]}</span>`;

    document.getElementById("minuteTens")
        .innerHTML = `<span>${minutes[0]}</span>`;

    document.getElementById("minuteOnes")
        .innerHTML = `<span>${minutes[1]}</span>`;
}


updateClock();

setInterval(
    updateClock,
    1000
);


/* =========================
   RIVAL SYSTEM
========================= */

function updateRival() {

    const playerXP =
        Number(
            localStorage.getItem("xp")
        ) || 0;

    const rivalXP =
        Number(
            localStorage.getItem("rivalXP")
        ) || 0;


    const playerScore =
        document.getElementById(
            "playerScore"
        );

    const rivalScore =
        document.getElementById(
            "rivalScore"
        );

    const progress =
        document.getElementById(
            "rivalProgress"
        );

    const message =
        document.getElementById(
            "rivalMessage"
        );


    playerScore.textContent =
        `${playerXP} XP`;

    rivalScore.textContent =
        `${rivalXP} XP`;


    const total =
        playerXP + rivalXP;

    const percentage =
        total === 0
            ? 0
            : (playerXP / total) * 100;


    progress.style.width =
        `${percentage}%`;


    if (playerXP > rivalXP) {

        message.textContent =
            "You're ahead. Keep pushing.";

    } else if (playerXP < rivalXP) {

        message.textContent =
            "Your rival is ahead. Catch up.";

    } else {

        message.textContent =
            "You're perfectly tied.";
    }
}


updateRival();
