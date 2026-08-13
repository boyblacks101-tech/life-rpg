let selectedType = "";
let selectedTech = "";

const types =
document.querySelectorAll("[data-type]");

const techTypes =
document.getElementById("techTypes");

const form =
document.getElementById("form");

types.forEach((button) => {

    button.onclick = () => {

        selectedType =
            button.dataset.type;

        if (selectedType === "tech") {

            techTypes.classList
                .remove("hidden");

            form.classList.add("hidden");

        } else {

            techTypes.classList
                .add("hidden");

            form.classList
                .remove("hidden");
        }
    };
});

document
.querySelectorAll("[data-tech]")
.forEach((button) => {

    button.onclick = () => {

        selectedTech =
            button.dataset.tech;

        techTypes.classList
            .add("hidden");

        form.classList
            .remove("hidden");
    };
});

document.getElementById("save")
.onclick = () => {

    const front =
        document.getElementById("frontInput")
        .value.trim();

    const back =
        document.getElementById("backInput")
        .value.trim();

    const example =
        document.getElementById("exampleInput")
        .value.trim();

    if (!front || !back) {
        alert("Front and back are required.");
        return;
    }

    const cards =
        JSON.parse(
            localStorage.getItem("cards") || "[]"
        );

    cards.push({
        id: Date.now(),
        type: selectedType,
        techType: selectedTech,
        front,
        back,
        example,
        createdAt: Date.now()
    });

    localStorage.setItem(
        "cards",
        JSON.stringify(cards)
    );

    location.href = "flashcards.html";
};
