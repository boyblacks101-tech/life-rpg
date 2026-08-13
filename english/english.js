let xp = Number(localStorage.getItem("englishXP")) || 0;
let level = Number(localStorage.getItem("englishLevel")) || 1;

const xpBar = document.getElementById("englishXPBar");
const xpText = document.getElementById("englishXP");
const levelText = document.getElementById("englishLevel");

function updateEnglishUI() {
    xpBar.style.width = `${xp}%`;
    xpText.textContent = `${xp} / 100 XP`;
    levelText.textContent = level;
}

updateEnglishUI();
