const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {

    fetch(TRAINERS_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            createCards(json)
        })

    function createCards(trainers) {
        let main = document.querySelector('main')
        trainers.forEach(function (trainer) {
            let pokemons = trainer.pokemons
            console.log(pokemons.length)
            let div = document.createElement('div')
            let p = document.createElement('p')
            let ul = document.createElement('ul')
            let button = document.createElement('button')
            button.setAttribute('data-trainer-id', trainer.id)
            button.innerText = "Add Pokemon"
            button.addEventListener("click", (e) => {
                e.preventDefault
                addPokemon(e, ul)
            })
            div.className = "card"
            div.setAttribute = ('data-id', trainer.id)
            div.appendChild(p)
            div.appendChild(button)
            div.appendChild(ul)
            main.appendChild(div)
            pokemons.forEach(function (pokemon) {
                renderPokemon(pokemon, ul)
            })
        })
    }
    
    function renderPokemon(pokemon, ul) {        
        let li = document.createElement('li')
        let button = document.createElement('button')
        button.className = "release"
        button.setAttribute('data-pokemon-id', pokemon.id)
        button.innerText = "Release"
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        li.appendChild(button)
        ul.appendChild(li)
        button.addEventListener("click", (e) => {
            e.preventDefault
            releasePokemon(e)
        })
    }

    function releasePokemon(e) {
        let id = e.target.getAttribute("data-pokemon-id")
        let pokemon = e.target.parentNode
        fetch(`${POKEMONS_URL}/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(result => {
            pokemon.remove()
            console.log(result)
        })
    }

    function addPokemon(e, ul) {
        let id = e.target.getAttribute("data-trainer-id")
        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: `${id}`
            })
        })
            .then(response => response.json())
            .then(result => {
                renderPokemon(result.data.attributes, ul)
            })
    }
})

// The only thing left is limiting the number of pokemons that can be added to a team 