const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const MAIN = document.querySelector('main');

function getTrainers() {
  return fetch(TRAINERS_URL)
    .then(resp => resp.json())
}

function renderTrainer(trainer) {
  const trainerCard = document.createElement('div');
  trainerCard.className = 'card'
  trainerCard.setAttribute('data-id', trainer.id);

  const trainerName = document.createElement('p');
  trainerName.innerText = trainer.name;

  const addPokemonButton = document.createElement('button');
  addPokemonButton.innerText = 'Add Pokemon';
  addPokemonButton.setAttribute('data-trainer-id', trainer.id);
  addPokemonButton.addEventListener('click', (e) => {
    e.preventDefault();
    addNewPokemon(e);
  })

  const pokemonList = document.createElement('ul');
  trainer.pokemons.forEach(pokemon => {
    const pokemonListItem = document.createElement('li');
    pokemonListItem.innerText = `${pokemon.nickname} (${pokemon.species})`

    const pokemonReleaseButton = document.createElement('button');
    pokemonReleaseButton.innerText = 'Release';
    pokemonReleaseButton.className = 'release';
    pokemonReleaseButton.setAttribute('data-attribute-id', pokemon.id);
    pokemonReleaseButton.addEventListener('click', (e) => {
      e.preventDefault();
      releasePokemon(e);
    });
    pokemonListItem.appendChild(pokemonReleaseButton);

    pokemonList.appendChild(pokemonListItem);
  })

  trainerCard.append(trainerName, addPokemonButton, pokemonList);
  MAIN.appendChild(trainerCard);
}

function addNewPokemon(e) {
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'trainer_id': e.target.dataset.trainerId
    })
  })
  .then(resp => resp.json())
  .then(newPokemon => {
    renderPokemonToList(newPokemon);
  })
}

function renderPokemonToList(newPokemon) {
  console.log(newPokemon);
  const trainerCard = document.querySelector(`[data-id="${newPokemon.trainer_id}"]`);
  const pokemonList = trainerCard.querySelector('ul');
  
  const newPokemonListItem = document.createElement('li');
  newPokemonListItem.innerText = `${newPokemon.nickname} (${newPokemon.species})`

  const pokemonReleaseButton = document.createElement('button');
  pokemonReleaseButton.innerText = 'Release';
  pokemonReleaseButton.className = 'release';
  pokemonReleaseButton.setAttribute('data-attribute-id', newPokemon.id);
  pokemonReleaseButton.addEventListener('click', (e) => {
    e.preventDefault();
    releasePokemon(e);
  });
  newPokemonListItem.appendChild(pokemonReleaseButton);

  pokemonList.appendChild(newPokemonListItem);
}

function releasePokemon(e) {
  fetch(`${POKEMONS_URL}/${e.target.dataset.attributeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'pokemon_id': e.target.dataset.attributeId
    })
  })
  .then(resp => resp.json())
  .then(deletedPokemon => {
    console.log(deletedPokemon)
    removeDeletedPokemon(deletedPokemon);
  })
  .catch(error => console.log(error.message))
}

function removeDeletedPokemon(deletedPokemon) {
  console.log(deletedPokemon);
  const pokemonListItem = document.querySelector(`[data-attribute-id="${deletedPokemon.id}"]`).parentElement;
  pokemonListItem.remove();
}

document.addEventListener('DOMContentLoaded', () => {

  getTrainers()
    .then(render => {
      render.forEach(trainer => {
        renderTrainer(trainer)
      })
  })
})