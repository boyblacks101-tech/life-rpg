const xp = 0;
const level = 1;

const xpElement =
    document.getElementById("xp");

const levelElement =
    document.getElementById("level");

const xpBar =
    document.getElementById("xpBar");

function updateCharacter() {

    xpElement.textContent = xp;

    levelElement.textContent = level;

    xpBar.style.width = `${xp}%`;

}

updateCharacter();
