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
        newDiv.setAttribute("id", `num${element.id}`);
        document.querySelector("main").appendChild(newDiv);

        const newP = document.createElement("p");
        newP.innerHTML = `Team ${element.attributes.name}`;
        newDiv.appendChild(newP);

        const newButton = document.createElement("button");
        newButton.setAttribute("data-trainer-id", `${element.id}`);
        newButton.innerHTML = "Add Pokemon";
        newButton.addEventListener('click', (event) => createNewPokemon(event.target));
        newDiv.appendChild(newButton);

        const newUl = document.createElement("ul");
        newDiv.appendChild(newUl);
        
        const pokemonForTrainer = trainersData.included.filter(pokemon => pokemon.relationships.trainer.data.id == element["id"]);

        for(const pokemon of pokemonForTrainer) {
            addPokemon(pokemon);
        }
    }
}

function addPokemon(pokemon) {
    const trainerCard = document.querySelector(`div#num${pokemon.attributes.trainer_id} ul`)

    const newLi = document.createElement("li");
    newLi.innerHTML = `${pokemon.attributes.nickname} (${pokemon.attributes.species})`;
    trainerCard.appendChild(newLi);
    
    const newButton = document.createElement("button");
    newButton.className = "release"
    newButton.setAttribute("id", pokemon.id);
    newButton.addEventListener('click', (event) => releasePokemon(event.target));
    newLi.appendChild(newButton);
}

function createNewPokemon(event) {
    let trainer = event.dataset.trainerId
    fetch(`${POKEMONS_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            id: trainer
        })
    })
    .then(res => res.json())
    .then(pokemon => addPokemonToDom(pokemon))
}

function addPokemonToDom(pokemon) {
    const trainerCard = document.querySelector(`div#num${pokemon.trainer_id} ul`)
    
    const newLi = document.createElement("li");
    newLi.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
    trainerCard.appendChild(newLi);
    
    const newButton = document.createElement("button");
    newButton.className = "release"
    newButton.setAttribute("id", pokemon.id);
    newButton.addEventListener('click', (event) => releasePokemon(event.target));
    newLi.appendChild(newButton);
}

function releasePokemon(event) {
    let pokemon = parseInt(event.id)

    fetch(`${POKEMONS_URL}/${pokemon}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            id: pokemon
        })
    })
    .then(res => res.json())
    .then(pokemon => deletePokemonFromDom(pokemon))
}

function deletePokemonFromDom(pokemon) {
    const li = document.getElementById(`${pokemon.id}`).parentElement;
    li.remove();
}