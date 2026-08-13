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
