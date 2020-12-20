const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

//When a user loads page
document.addEventListener('DOMContentLoaded', function(){
    fetchTrainers()
})
//they should see all trainers with their current team of Pokemon
function fetchTrainers(){
    //console.log('loaded!')
    fetch(TRAINERS_URL)
        .then(function(resp){
            return resp.json()
        })
        .then(function(trainers){
            for (const trainer of trainers){
                makeTrainerCard(trainer)
            }      
        })
}

function makeTrainerCard(trainer){
    //MAKE CARD
    const card = document.createElement('div')
    card.classList += "card"
    card.setAttribute("data-id", trainer.id)

   //MAKE NAME PTAG
    const trainerName = document.createElement('p')
    trainerName.innerText = trainer.name
    card.appendChild(trainerName)

    //MAKE ADD POKEMON BUTTON
    const addPokeButton = document.createElement('button')
    addPokeButton.setAttribute("data-trainer-id", trainer.id)
    addPokeButton.innerText = "Add Pokemon"
    card.appendChild(addPokeButton)
    //TODO - ADD EVENT LISTENER TO BUTTON

    //MAKE POKE LIST
    const pokeList = document.createElement('ul')
    pokeList.id = `trainer-${trainer.id}-pokemon`

    card.appendChild(pokeList)
    main.appendChild(card)

    for (const pokemon of trainer.pokemons){
        renderPokemon(pokemon)
    }
}

function renderPokemon(pokemon){
    const pokeList = document.getElementById(`trainer-${pokemon.trainer_id}-pokemon`)

    const pokeLi = document.createElement('li')
    pokeLi.innerText = `${pokemon.nickname} (${pokemon.species})`
    
    const releaseButton = document.createElement('button')
    releaseButton.classList += "release"
    releaseButton.setAttribute("data-pokemon-id", pokemon.id)
    releaseButton.innerText = "Release"
    //TO DO - ADD EVENT LISTENER
    pokeLi.appendChild(releaseButton)
    
    pokeList.appendChild(pokeLi)
}

//whenever a user hits "add pokemon"
    //-add event listener for button

//they should get a new Pokemon
    //create new pokemon and associate it with trainer on BACKEND

//and they have space on their team
    //max of 6 pokemon per team
    //add custom validation to model

//add pokemon to DOM
