const decks = document.querySelectorAll(".deck");

decks.forEach((deck) => {

    deck.addEventListener("click", () => {

        const name = deck.dataset.deck;

        openDeck(name);

    });

});


function openDeck(name) {

    localStorage.setItem(
        "selectedDeck",
        name
    );

    alert(`Opening ${name} deck...`);

}


document
    .getElementById("addDeck")
    .addEventListener("click", () => {

        alert("Deck creator coming next.");

    });


document
    .getElementById("browse")
    .addEventListener("click", () => {

        alert("Card browser coming next.");

    });


document
    .getElementById("stats")
    .addEventListener("click", () => {

        alert("Statistics coming next.");

    });
