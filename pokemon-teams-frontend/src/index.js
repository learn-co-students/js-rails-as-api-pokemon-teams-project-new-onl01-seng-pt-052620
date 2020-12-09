const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const body = document.querySelector('body')
const main = document.querySelector('main')
const alphabeticalBtn = document.createElement('button')
alphabeticalBtn.innerText = 'Alphabetical'
const orgOrderBtn = document.createElement('button')
orgOrderBtn.innerText = 'Reorder'

const toggleLabel = document.createElement('label')
toggleLabel.className = 'switch'
const toggleInput = document.createElement('input')
toggleInput.type = 'checkbox'
const toggleSpan = document.createElement('span')
toggleSpan.className = 'slider round'
toggleLabel.append(toggleInput, toggleSpan)
main.append(toggleLabel, alphabeticalBtn, orgOrderBtn)

const trainerCardCollection = document.createElement('div')
trainerCardCollection.className = 'card-collection'
main.appendChild(trainerCardCollection)



displayTrainers(); 

orgOrderBtn.addEventListener('click', () => {
  trainerCardCollection.innerHTML = ''
  displayTrainers();
})


alphabeticalBtn.addEventListener('click', () => {
  ApiService.getTrainersAlphabetical()
  .then(trainers => {
    trainerCardCollection.innerHTML = ''
    trainers.forEach(trainer => {
      new Trainer(trainer)
    })
  })
})


function displayTrainers() {
  ApiService.getAllTrainers()
  .then(trainers => {
    trainers.forEach(trainer => {
      new Trainer(trainer)
    })
  })
}

toggleSpan.addEventListener('click', () => {
  if (body.className === 'light-mode') {
    body.className = 'dark-mode'
  } else {
    body.className = 'light-mode'
  }
})