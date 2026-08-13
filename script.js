let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;

const xpBar = document.getElementById("xpBar");
const xpText = document.getElementById("xpText");
const levelText = document.getElementById("level");

function updateUI() {
    xpBar.style.width = `${xp}%`;
    xpText.textContent = `${xp} / 100 XP`;
    levelText.textContent = level;
}

function saveGame() {
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
}

updateUI();
