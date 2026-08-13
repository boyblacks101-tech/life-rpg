/* =================================================
   RPG CORE
================================================= */

let xp =
    Number(
        localStorage.getItem("xp")
    ) || 0;

let level =
    Number(
        localStorage.getItem("level")
    ) || 1;


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


updateUI();



/* =================================================
   BACKGROUND PHOTOS
================================================= */

const input =
    document.getElementById(
        "photoInput"
    );

const bg =
    document.getElementById(
        "photoBg"
    );

const tabs =
    document.getElementById(
        "photoTabs"
    );


let photos =
    JSON.parse(
        localStorage.getItem(
            "photos"
        ) || "[]"
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
        .forEach(
            (tab, i) => {

                tab.classList.toggle(
                    "active",
                    i === current
                );

            }
        );
}


function renderTabs() {

    tabs.innerHTML = "";

    photos.forEach(
        (photo, index) => {

            const tab =
                document.createElement(
                    "button"
                );

            tab.className =
                "photo-tab";

            tab.style.backgroundImage =
                `url("${photo}")`;


            tab.onclick =
                () => showPhoto(index);


            tabs.appendChild(tab);

        }
    );


    showPhoto(current);
}


input.addEventListener(
    "change",
    () => {

        [
            ...input.files
        ].forEach(
            file => {

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


                reader.readAsDataURL(
                    file
                );

            }
        );

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


renderTabs();



/* =================================================
   SETTINGS
================================================= */

const settingsButton =
    document.getElementById(
        "settings"
    );

const settingsOverlay =
    document.getElementById(
        "settingsOverlay"
    );

const closeSettings =
    document.getElementById(
        "closeSettings"
    );


function openSettings() {

    settingsOverlay.classList.add(
        "open"
    );

}


function closeSettingsPanel() {

    settingsOverlay.classList.remove(
        "open"
    );

}


settingsButton.addEventListener(
    "click",
    openSettings
);


closeSettings.addEventListener(
    "click",
    closeSettingsPanel
);


settingsOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            settingsOverlay
        ) {

            closeSettingsPanel();

        }

    }
);



/* =================================================
   ACCOUNT
================================================= */

const usernameInput =
    document.getElementById(
        "usernameInput"
    );

const passwordInput =
    document.getElementById(
        "passwordInput"
    );

const saveAccount =
    document.getElementById(
        "saveAccount"
    );

const accountStatus =
    document.getElementById(
        "accountStatus"
    );


usernameInput.value =
    localStorage.getItem(
        "playerUsername"
    ) || "";


passwordInput.value =
    localStorage.getItem(
        "playerPassword"
    ) || "";


saveAccount.addEventListener(
    "click",
    () => {

        const username =
            usernameInput.value.trim();

        const password =
            passwordInput.value.trim();


        if (!username || !password) {

            accountStatus.textContent =
                "Enter username and password.";

            accountStatus.style.color =
                "#ff5964";

            return;

        }


        localStorage.setItem(
            "playerUsername",
            username
        );


        localStorage.setItem(
            "playerPassword",
            password
        );


        accountStatus.textContent =
            "Account saved.";

        accountStatus.style.color =
            "#35d98b";


        setTimeout(
            () => {

                accountStatus.textContent =
                    "";

            },
            2500
        );

    }
);



/* =================================================
   NOTIFICATIONS
================================================= */

const notificationsButton =
    document.getElementById(
        "notificationsButton"
    );


notificationsButton.addEventListener(
    "click",
    () => {

        const enabled =
            localStorage.getItem(
                "notifications"
            ) !== "off";


        if (enabled) {

            localStorage.setItem(
                "notifications",
                "off"
            );

            notificationsButton.childNodes[
                1
            ].textContent =
                " Notifications";

        } else {

            localStorage.setItem(
                "notifications",
                "on"
            );

            notificationsButton.childNodes[
                1
            ].textContent =
                " Notifications";

        }

    }
);



/* =================================================
   BACKGROUND BUTTON
================================================= */

const backgroundButton =
    document.getElementById(
        "backgroundButton"
    );


backgroundButton.addEventListener(
    "click",
    () => {

        input.click();

    }
);



/* =================================================
   ACCOUNT BUTTON
================================================= */

const accountButton =
    document.getElementById(
        "accountButton"
    );


accountButton.addEventListener(
    "click",
    () => {

        usernameInput.focus();

    }
);



/* =================================================
   RESET PROGRESS
================================================= */

const resetButton =
    document.getElementById(
        "resetButton"
    );


resetButton.addEventListener(
    "click",
    () => {

        const confirmReset =
            confirm(
                "Reset XP and level?"
            );


        if (!confirmReset) return;


        localStorage.removeItem(
            "xp"
        );

        localStorage.removeItem(
            "level"
        );


        xp = 0;
        level = 1;


        updateUI();

    }
);
