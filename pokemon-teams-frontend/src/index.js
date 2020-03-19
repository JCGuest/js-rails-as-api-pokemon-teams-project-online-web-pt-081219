document.addEventListener('DOMContentLoaded', () => {
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(function(response) {
    return response.json();
})
.then(function(json) { 
    for (key in json) {
        json[key].forEach(element => {
            createCard(element)
        })
    }

})

function createCard(trainer) {
    console.log(trainer['attributes']['name'])
    let newDiv = document.createElement('div')
    let trainerName = document.createElement('h1')
    let main = document.querySelector("body > main")

    newDiv.classList.add('card')
    // trainer name
    trainerName.innerHTML = `${trainer['attributes']['name']}`
    newDiv.appendChild(trainerName)
    // add poke button
    main.appendChild(newDiv)
}



})
