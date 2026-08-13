/* =========================
   PLAYER
========================= */

let xp =
    Number(localStorage.getItem("xp")) || 0;

let level =
    Number(localStorage.getItem("level")) || 1;


const xpBar =
    document.getElementById("xpBar");

const xpText =
    document.getElementById("xpText");

const levelText =
    document.getElementById("level");

const nextXP =
    document.getElementById("nextXP");


function updateUI() {

    xpBar.style.width =
        `${xp}%`;

    xpText.textContent =
        `${xp} / 100 XP`;

    levelText.textContent =
        level;

    nextXP.textContent =
        `${100 - xp} XP`;
}


/* =========================
   DATE
========================= */

function updateDate() {

    const date = new Date();

    document.getElementById(
        "todayDate"
    ).textContent =
        date.toLocaleDateString(
            "en-US",
            {
                weekday: "short",
                month: "short",
                day: "numeric"
            }
        ).toUpperCase();
}


/* =========================
   TODAY
========================= */

function updateToday() {

    document.getElementById(
        "cardCount"
    ).textContent =
        localStorage.getItem(
            "flashcardsDone"
        ) || 0;

    document.getElementById(
        "questCount"
    ).textContent =
        localStorage.getItem(
            "questsDone"
        ) || 0;

    document.getElementById(
        "streakCount"
    ).textContent =
        localStorage.getItem(
            "streak"
        ) || 0;
}


/* =========================
   CHART
========================= */

let chartMode = "xp";

const chartTitle =
    document.getElementById("chartTitle");

const chartSubtitle =
    document.getElementById("chartSubtitle");

const chartValue =
    document.getElementById("chartValue");

const chartLevel =
    document.getElementById("chartLevel");

const chartSwitch =
    document.getElementById("chartSwitch");


function updateChart() {

    chartLevel.textContent =
        level;

    if (chartMode === "xp") {

        chartTitle.textContent =
            "XP Progress";

        chartSubtitle.textContent =
            "Your character growth";

        chartValue.textContent =
            xp;

        chartSwitch.innerHTML =
            `XP <span>⌄</span>`;
    }


    if (chartMode === "study") {

        chartTitle.textContent =
            "Study Time";

        chartSubtitle.textContent =
            "Your learning activity";

        chartValue.textContent =
            localStorage.getItem(
                "studyMinutes"
            ) || 0;

        chartSwitch.innerHTML =
            `STUDY <span>⌄</span>`;
    }


    if (chartMode === "flashcards") {

        chartTitle.textContent =
            "Flashcards";

        chartSubtitle.textContent =
            "Cards completed";

        chartValue.textContent =
            localStorage.getItem(
                "flashcardsDone"
            ) || 0;

        chartSwitch.innerHTML =
            `CARDS <span>⌄</span>`;
    }
}


chartSwitch.addEventListener(
    "click",
    () => {

        if (chartMode === "xp") {

            chartMode = "study";

        } else if (
            chartMode === "study"
        ) {

            chartMode = "flashcards";

        } else {

            chartMode = "xp";
        }

        updateChart();
    }
);


/* =========================
   RIVAL
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


    document.getElementById(
        "playerScore"
    ).textContent =
        `${playerXP} XP`;


    document.getElementById(
        "rivalScore"
    ).textContent =
        `${rivalXP} XP`;


    const total =
        playerXP + rivalXP;


    const percentage =
        total === 0
            ? 50
            : (playerXP / total) * 100;


    document.getElementById(
        "rivalProgress"
    ).style.width =
        `${percentage}%`;


    const message =
        document.getElementById(
            "rivalMessage"
        );


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


/* =========================
   WORLDS
========================= */

const worldMenu =
    document.getElementById("worldMenu");

function openWorlds() {

    worldMenu.classList.add("open");
}

function closeWorlds() {

    worldMenu.classList.remove("open");
}


document
    .getElementById("worldButton")
    .addEventListener(
        "click",
        openWorlds
    );


document
    .getElementById("worldNav")
    .addEventListener(
        "click",
        openWorlds
    );


document
    .getElementById("closeWorlds")
    .addEventListener(
        "click",
        closeWorlds
    );


/* =========================
   SETTINGS
========================= */

const dashboardMenu =
    document.getElementById(
        "dashboardMenu"
    );


document
    .getElementById("dashboardButton")
    .addEventListener(
        "click",
        () => {

            dashboardMenu.classList.add(
                "open"
            );
        }
    );


document
    .getElementById("closeDashboard")
    .addEventListener(
        "click",
        () => {

            dashboardMenu.classList.remove(
                "open"
            );
        }
    );


/* =========================
   BACKGROUND
========================= */

const photoInput =
    document.getElementById(
        "photoInput"
    );

const photoBg =
    document.getElementById(
        "photoBg"
    );


let photos =
    JSON.parse(
        localStorage.getItem(
            "photos"
        ) || "[]"
    );


let currentPhoto = 0;


function savePhotos() {

    localStorage.setItem(
        "photos",
        JSON.stringify(photos)
    );
}


function showPhoto(index) {

    if (!photos.length)
        return;

    currentPhoto = index;

    photoBg.style.backgroundImage =
        `url("${photos[index]}")`;

    photoBg.style.opacity = "1";
}


photoInput.addEventListener(
    "change",
    () => {

        [...photoInput.files].forEach(
            file => {

                const reader =
                    new FileReader();

                reader.onload =
                    event => {

                        photos.push(
                            event.target.result
                        );

                        savePhotos();

                        showPhoto(
                            photos.length - 1
                        );
                    };

                reader.readAsDataURL(
                    file
                );
            }
        );
    }
);


if (photos.length) {
    showPhoto(0);
}


/* =========================
   SOUND
========================= */

let soundEnabled =
    localStorage.getItem(
        "soundEnabled"
    ) !== "false";


const soundButton =
    document.getElementById(
        "soundButton"
    );


function updateSoundUI() {

    soundButton.querySelector(
        ".setting-state"
    ).textContent =
        soundEnabled
            ? "ON"
            : "OFF";
}


soundButton.addEventListener(
    "click",
    () => {

        soundEnabled =
            !soundEnabled;

        localStorage.setItem(
            "soundEnabled",
            soundEnabled
        );

        updateSoundUI();
    }
);


/* =========================
   THEME
========================= */

const themeButton =
    document.getElementById(
        "themeButton"
    );


themeButton.addEventListener(
    "click",
    () => {

        alert(
            "Dark theme is currently active."
        );
    }
);


/* =========================
   RESET
========================= */

document
    .getElementById("resetProgress")
    .addEventListener(
        "click",
        () => {

            const confirmReset =
                confirm(
                    "Reset all RPG progress?"
                );

            if (!confirmReset)
                return;

            [
                "xp",
                "level",
                "studyMinutes",
                "flashcardsDone",
                "questsDone",
                "streak",
                "rivalXP"
            ].forEach(
                key =>
                    localStorage.removeItem(key)
            );

            location.reload();
        }
    );


/* =========================
   START
========================= */

updateUI();
updateDate();
updateToday();
updateChart();
updateRival();
updateSoundUI();
