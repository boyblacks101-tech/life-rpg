/* =========================
   RPG DATA
========================= */

let xp =
    Number(localStorage.getItem("xp")) || 0;

let level =
    Number(localStorage.getItem("level")) || 1;


/* =========================
   XP UI
========================= */

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
   BACKGROUND PHOTOS
========================= */

const input =
    document.getElementById("photoInput");

const bg =
    document.getElementById("photoBg");

const tabs =
    document.getElementById("photoTabs");


let photos =
    JSON.parse(
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

        const tab =
            document.createElement("button");

        tab.className =
            "photo-tab";

        tab.style.backgroundImage =
            `url("${photo}")`;

        tab.onclick =
            () => showPhoto(index);

        tabs.appendChild(tab);

    });

    showPhoto(current);
}


input.addEventListener(
    "change",
    () => {

        [...input.files].forEach(file => {

            const reader =
                new FileReader();

            reader.onload =
                event => {

                    photos.push(
                        event.target.result
                    );

                    savePhotos();
                    renderTabs();

                };

            reader.readAsDataURL(file);

        });

    }
);


setInterval(
    () => {

        if (!photos.length) return;

        showPhoto(
            (current + 1) %
            photos.length
        );

    },
    60000
);


/* =========================
   RPG CLOCK
========================= */

function updateClock() {

    const now =
        new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    document.getElementById(
        "hourTens"
    ).textContent = hours[0];


    document.getElementById(
        "hourOnes"
    ).textContent = hours[1];


    document.getElementById(
        "minuteTens"
    ).textContent = minutes[0];


    document.getElementById(
        "minuteOnes"
    ).textContent = minutes[1];
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


    if (!playerScore) return;


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


/* =========================
   PERFORMANCE
========================= */

const chartTitle =
    document.getElementById(
        "chartTitle"
    );

const chartSubtitle =
    document.getElementById(
        "chartSubtitle"
    );

const chartValue =
    document.getElementById(
        "chartValue"
    );

const chartLevel =
    document.getElementById(
        "chartLevel"
    );

const chartSwitch =
    document.getElementById(
        "chartSwitch"
    );


let chartMode = "xp";


function updateChart() {

    if (!chartSwitch) return;


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


if (chartSwitch) {

    chartSwitch.addEventListener(
        "click",
        () => {

            if (chartMode === "xp") {

                chartMode =
                    "study";

            } else if (
                chartMode === "study"
            ) {

                chartMode =
                    "flashcards";

            } else {

                chartMode =
                    "xp";

            }

            updateChart();

        }
    );

}


updateChart();


/* =========================
   DASHBOARD
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


if (
    dashboardButton &&
    dashboardMenu &&
    closeDashboard
) {

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


    dashboardMenu.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                dashboardMenu
            ) {

                dashboardMenu.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================
   CHECKLIST SAVE
========================= */

document
    .querySelectorAll(
        ".my-form input[type='checkbox']"
    )
    .forEach(
        checkbox => {

            const key =
                `check_${checkbox.id}`;

            checkbox.checked =
                localStorage.getItem(
                    key
                ) === "true";


            checkbox.addEventListener(
                "change",
                () => {

                    localStorage.setItem(
                        key,
                        checkbox.checked
                    );

                }
            );

        }
    );


/* =========================
   MOOD SAVE
========================= */

const savedMood =
    localStorage.getItem(
        "playerMood"
    );


document
    .querySelectorAll(
        ".mood-reactions button"
    )
    .forEach(
        button => {

            if (
                button.dataset.mood ===
                savedMood
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".mood-reactions button"
                        )
                        .forEach(
                            item => {

                                item.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    localStorage.setItem(
                        "playerMood",
                        button.dataset.mood
                    );

                }
            );

        }
    );


/* =========================
   START
========================= */

updateUI();
renderTabs();
updateRival();
updateChart();
