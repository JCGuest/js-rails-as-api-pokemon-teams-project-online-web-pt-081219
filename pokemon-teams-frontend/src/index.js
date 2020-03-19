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
    let main = document.querySelector("body > main")
    let newDiv = document.createElement('div')
    let trainerName = document.createElement('p')
    let teamLi = document.createElement('li')
    let teamUl = document.createElement('ul')
    newDiv.classList.add('card')

    // trainer name
        trainerName.innerHTML = `${trainer['attributes']['name']}`
        newDiv.appendChild(trainerName)
    // add poke button
        let addBtn = document.createElement('button')
        addBtn.id = trainer.id
        addBtn.innerHTML = "Add Pokemon"
        addBtn.addEventListener('click', (e) => {
            addPokemon(e.target.id)
        })
        newDiv.appendChild(addBtn)
    // current team
        trainer['attributes']['pokemon'].forEach(element => {
        teamLi.innerHTML = element['species']
        teamUl.appendChild(teamLi)
    })
    newDiv.appendChild(teamUl)
    main.appendChild(newDiv)
}

    function addPokemon(trainerId) {
        console.log(trainerId)
    };

})
