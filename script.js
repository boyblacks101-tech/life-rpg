let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;
let completedQuests =
    Number(localStorage.getItem("completedQuests")) || 0;

const xpText = document.getElementById("xpText");
const xpBar = document.getElementById("xpBar");
const levelElement = document.getElementById("level");
const questCount = document.getElementById("questCount");

function saveGame() {
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
    localStorage.setItem(
        "completedQuests",
        completedQuests
    );
}

function updateUI() {
    xpText.textContent = `${xp} / 100`;
    xpBar.style.width = `${xp}%`;
    levelElement.textContent = level;

    questCount.textContent =
        `${completedQuests} / 3`;
}

function completeQuest(button, reward) {
    if (button.classList.contains("completed")) {
        return;
    }

    button.classList.add("completed");

    button.querySelector(
        ".quest-check"
    ).textContent = "✓";

    completedQuests++;
    xp += reward;

    if (xp >= 100) {
        xp -= 100;
        level++;
    }

    saveGame();
    updateUI();
}

updateUI();
