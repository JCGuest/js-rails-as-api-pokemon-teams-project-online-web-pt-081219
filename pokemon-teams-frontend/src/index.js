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
    newDiv.id = `trainer-${trainer.id}`

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
            releaseBtn.id = `${element["id"]}`
            releaseBtn.addEventListener('click', (e) => {
                e.target.parentNode.remove()
                relasePokemon(e.target.id)
            })
            // list pokemon
            let pokemonLi = document.createElement('li')
            pokemonLi.id = element['species']
            pokemonLi.innerHTML = element['species']

            teamUl.appendChild(pokemonLi)
            pokemonLi.appendChild(releaseBtn)
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
               let configObject = {
                   method: "PATCH"
               }
                fetch(POKEMONS_URL + `/${Math.floor(Math.random() * TOTAL_POKEMONS) + 1}?trainer_id=${trainerId}`, configObject)
                .then(function(response) {
                    return response.json();
                })
                .then(function(json) {
                    let pokemonData = json["data"]
                    let pokemonToRemove = document.querySelector(`#${pokemonData['attributes']['species']}`)
                    // console.log(pokemonToRemove)
                    pokemonToRemove.remove()
                    updateTeam(pokemonData, trainerId)
                })
        }
        })
        };       
        
        function updateTeam(pokemonData, trainerId) {
            console.log(pokemonData, trainerId)
            // add poke to list
            let teamDiv = document.getElementById(`trainer-${trainerId}`)
            let teamList = teamDiv.querySelector('ul')
            let newPokemon = document.createElement('li')
            newPokemon.id = `${pokemonData['attributes']['species']}`

            newPokemon.innerHTML = `${pokemonData['attributes']['species']}`
            teamList.appendChild(newPokemon)
            // release button
            let releaseBtn = document.createElement('button')
            releaseBtn.classList.add("release")
            releaseBtn.innerHTML = "Release"
            releaseBtn.id = `${pokemonData["id"]}`
            releaseBtn.addEventListener('click', (e) => {
                e.target.parentNode.remove()
                relasePokemon(e.target.id)
            })
            newPokemon.appendChild(releaseBtn)
            
        }

    function relasePokemon(pokemonId) {
        fetch(TRAINERS_URL)
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            let numberOfTrainers = json["data"].length
        console.log(numberOfTrainers)

        let configObj = {
            method: 'PATCH'
        }
        fetch(POKEMONS_URL + `/${pokemonId}?trainer_id=${Math.floor(Math.random() * numberOfTrainers) + 1}`, configObj)
        .then(function(response) {
            console.log(json)
            return response.json()
        })
        .catch(function(err) {
            console.log(err)
        })
    })

    };
})
