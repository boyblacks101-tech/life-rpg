let xp = Number(localStorage.getItem("cyberXP")) || 0;
let level = Number(localStorage.getItem("cyberLevel")) || 1;

const xpBar = document.getElementById("cyberXPBar");
const xpText = document.getElementById("cyberXP");
const levelText = document.getElementById("cyberLevel");

function updateCyberUI() {
    xpBar.style.width = `${xp}%`;
    xpText.textContent = `${xp} / 100 XP`;
    levelText.textContent = level;
}

updateCyberUI();
