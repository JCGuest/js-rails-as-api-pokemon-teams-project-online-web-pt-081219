document.addEventListener('DOMContentLoaded', () => {
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
// get total number of pokemon
fetch(POKEMONS_URL)
.then(function(response) {
    return response.json()
})
.then(function(json) {
    TOTAL_POKEMONS = json['data'].length
})
//fetch trainer info
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
//render trainer teams
function createCard(trainer) {
    let main = document.querySelector("body > main")
    let newDiv = document.createElement('div')
    let trainerName = document.createElement('p')
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
            // release button
            let releaseBtn = document.createElement('button')
            releaseBtn.classList.add("release")
            releaseBtn.innerHTML = "Release"
            releaseBtn.id = element["id"]
            releaseBtn.addEventListener('click', (e) => {
                relasePokemon(e.target.id)
            })
            // list pokemon
            let teamLi = document.createElement('li')
            teamLi.innerHTML = element['species']

            teamUl.appendChild(teamLi)
            teamLi.appendChild(releaseBtn)
    })
    newDiv.appendChild(teamUl)
    main.appendChild(newDiv)
}

    function addPokemon(trainerId) {
        fetch(TRAINERS_URL + `/${trainerId}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) { 
           teamSize = json['data']['attributes']['pokemon'].length
           if (teamSize < 6) {
                fetch(POKEMONS_URL + `/${Math.floor(Math.random() * TOTAL_POKEMONS) + 1}`)
                .then(function(response) {
                    return response.json();
                })
                .then(function(json) {
                    console.log(json['data']['id'])
                })
        }
        })
        };       
        

    // function relasePokemon(pokemonId) {
    //     console.log(pokemonId)
    // };
})
