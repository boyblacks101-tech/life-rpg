/* =========================
   PLAYER DATA
========================= */

let xp =
    Number(localStorage.getItem("xp")) || 0;

let level =
    Number(localStorage.getItem("level")) || 1;


/* =========================
   BASIC UI
========================= */

const xpBar =
    document.getElementById("xpBar");

const xpText =
    document.getElementById("xpText");

const levelText =
    document.getElementById("level");

const nextXP =
    document.getElementById("nextXP");

const chartValue =
    document.getElementById("chartValue");

const chartLevel =
    document.getElementById("chartLevel");


function updateUI() {

    xpBar.style.width =
        `${xp}%`;

    xpText.textContent =
        `${xp} / 100 XP`;

    levelText.textContent =
        level;

    chartLevel.textContent =
        level;

    nextXP.textContent =
        `${100 - xp} XP`;
}


/* =========================
   DATE
========================= */

function updateDate() {

    const date =
        new Date();

    const text =
        date.toLocaleDateString(
            "en-US",
            {
                weekday: "short",
                month: "short",
                day: "numeric"
            }
        ).toUpperCase();

    document.getElementById(
        "todayDate"
    ).textContent = text;
}


/* =========================
   TODAY STATS
========================= */

function updateToday() {

    const cards =
        Number(
            localStorage.getItem(
                "flashcardsDone"
            )
        ) || 0;

    const quests =
        Number(
            localStorage.getItem(
                "questsDone"
            )
        ) || 0;

    const streak =
        Number(
            localStorage.getItem(
                "streak"
            )
        ) || 0;

    document.getElementById(
        "cardCount"
    ).textContent = cards;

    document.getElementById(
        "questCount"
    ).textContent = quests;

    document.getElementById(
        "streakCount"
    ).textContent = streak;
}


/* =========================
   PERFORMANCE CHART
========================= */

let chartMode = "xp";

const chartTitle =
    document.getElementById(
        "chartTitle"
    );

const chartSubtitle =
    document.getElementById(
        "chartSubtitle"
    );

const chartSwitch =
    document.getElementById(
        "chartSwitch"
    );


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
            localStorage.getItem(
                "rivalXP"
            )
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
   WORLDS MENU
========================= */

const worldButton =
    document.getElementById(
        "worldButton"
    );

const worldNav =
    document.getElementById(
        "worldNav"
    );

const worldMenu =
    document.getElementById(
        "worldMenu"
    );

const closeWorlds =
    document.getElementById(
        "closeWorlds"
    );


function openWorlds() {

    worldMenu.classList.add(
        "open"
    );
}


function closeWorldMenu() {

    worldMenu.classList.remove(
        "open"
    );
}


worldButton.addEventListener(
    "click",
    openWorlds
);

worldNav.addEventListener(
    "click",
    openWorlds
);

closeWorlds.addEventListener(
    "click",
    closeWorldMenu
);


/* =========================
   SETTINGS
========================= */

const dashboardButton =
    document.getElementById(
        "dashboardButton"
    );

const dashboardMenu =
    document.getElementById(
        "dashboardMenu"
    );

const closeDashboard =
    document.getElementById(
        "closeDashboard"
    );


dashboardButton.addEventListener(
    "click",
    () => {

        dashboardMenu.classList.add(
            "open"
        );
    }
);


closeDashboard.addEventListener(
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

const input =
    document.getElementById(
        "photoInput"
    );

const bg =
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

    bg.style.backgroundImage =
        `url("${photos[index]}")`;

    bg.style.opacity = "1";
}


input.addEventListener(
    "change",
    () => {

        [...input.files].forEach(
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


setInterval(
    () => {

        if (!photos.length)
            return;

        showPhoto(
            (currentPhoto + 1)
            % photos.length
        );

    },
    60000
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

            localStorage.removeItem(
                "xp"
            );

            localStorage.removeItem(
                "level"
            );

            localStorage.removeItem(
                "studyMinutes"
            );

            localStorage.removeItem(
                "flashcardsDone"
            );

            localStorage.removeItem(
                "questsDone"
            );

            localStorage.removeItem(
                "streak"
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

if (photos.length) {
    showPhoto(0);
}
