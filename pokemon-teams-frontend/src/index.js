const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    fetchPokemonTrainers();
})

function fetchPokemonTrainers() {
    fetch(`${TRAINERS_URL}`)
    .then(res => res.json())
    .then(object => addTrainers(object)) 
}

function addTrainers(trainers) {
    const trainersData = trainers

    for (const element of trainers["data"]) {
        const newDiv = document.createElement("div");
        newDiv.className = "card";
        newDiv.setAttribute("data-id", `${element.id}`);
        document.querySelector("main").appendChild(newDiv);

        const newP = document.createElement("p");
        newP.innerHTML = `Team ${element.attributes.name}`;
        newDiv.appendChild(newP);

        const newButton = document.createElement("button");
        newButton.setAttribute("data-trainer-id", `${element.id}`);
        newButton.innerHTML = "Add Pokemon";
        newButton.addEventListener('click', (event) => addPokemon(event.target));
        newDiv.appendChild(newButton);

        const newUl = document.createElement("ul");
        newDiv.appendChild(newUl);

        const pokemonForTrainer = trainersData.included.filter(pokemon => pokemon.relationships.trainer.data.id == element["id"])
        
        for(const pokemon of pokemonForTrainer) {
            const newLi = document.createElement("li");
            newLi.innerHTML = `${pokemon.attributes.nickname} (${pokemon.attributes.species})`
            newUl.appendChild(newLi);

            const newButton = document.createElement("button");
            newButton.className = "release"
            newButton.setAttribute("data-pokemon-id", pokemon.id);
            newLi.appendChild(newButton)
        }
    }
}

function addPokemon(event) {
    let trainer = event.dataset.trainerId
    debugger
}
