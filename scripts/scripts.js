const nameFeild = document.getElementById("name")
const age = document.getElementById('age')
const gender = document.getElementById('gender')
const guess = document.getElementById('guess')
const flag1 = document.getElementById('nation-1')
const flag2 = document.getElementById('nation-2')
const nationLabel0 = document.getElementById('nationality-1-label')
const nationLabel1 = document.getElementById('nationality-2-label')
const dogPhoto = document.getElementById('dog-photo')
let input = document.getElementById('input-name').value


// Functions


const nationApi = (input) => { // fetching country code
    fetch(`https://api.nationalize.io/?name=${input}`
    ).then(response =>{
        return response.json()
    }).then(json => {
        if(flag1.classList.contains("nation-1")) flag1.classList.remove("nation-1")// removing flags in case of another guess
        if(flag2.classList.contains("nation-2")) flag2.classList.remove("nation-2")
        flag1.style.backgroundImage = `url(https://countryflagsapi.com/png/${json.country[0].country_id})` // fetches country flag png
        flag1.classList.add("nation-1")
        countryName(json.country[0].country_id, 0)
        if(json.country[1].country_id){
            flag2.style.backgroundImage = `url(https://countryflagsapi.com/png/${json.country[1].country_id})` // fetches the second flag
            flag2.classList.add("nation-2")
            countryName(json.country[1].country_id, 1)
        }else nationLabel1.innerHTML = ""
    })
}

const countryName = (countryId, i) => { // fetches country full name
    fetch(`https://restcountries.com/v3.1/alpha/${countryId}` 
    ).then(response =>{
        return response.json()
    }).then(json => { if(!i) {
        nationLabel0.innerHTML = json[0].name.common
    }else nationLabel1.innerHTML = json[0].name.common
    })
}


const genderApi = (input) => { // fetches gender
    fetch(`https://api.genderize.io/?name=${input}`
    ).then(response =>{
        return response.json()
    }).then(text => {
        nameFeild.innerText = `Hi ${input}`
        if(gender.classList.contains("gender-male")) gender.classList.remove("gender-male")
        if(gender.classList.contains("gender-female")) gender.classList.remove("gender-female")
        if(gender.classList.contains("gender-alien")) gender.classList.remove("gender-alien")
        if(text.gender == 'male'){
            gender.classList.add("gender-male")
        } else if(text.gender == "female"){ gender.classList.add("gender-female")
        }else gender.classList.add("gender-alien")

    })
}

const ageApi = (input) =>{ // fetches age
    fetch(`https://api.agify.io/?name=${input}`
    ).then(response =>{
        return response.json()
    }).then(json => { 
        if(!json.age) {
            age.innerHTML = "Age: Unknown"
        }else age.innerHTML = "Age: " + json.age
    })
}

const dogApi = () => { // fetches random dog photo
    fetch(`https://dog.ceo/api/breeds/image/random`
    ).then(response =>{
        return response.json()
    }).then(json => { 
        dogPhoto.innerHTML = `<img src="${json.message}" style="height: 35vh; max-width: 100%"></img>`
    })
}

const callAll = () => { // calls all apis' fetches
    input = document.getElementById('input-name').value
    if(!input){
        return
    }
    nationApi(input)
    ageApi(input)
    genderApi(input)
}

// Listener and function calls

guess.addEventListener('click', ()=> { //eventListener for the button
    callAll()
})

document.addEventListener("keypress", function(e) { // eventLisener for enter key
    if (e.key === "Enter") {
        e.preventDefault();
        callAll()
    }
  });

dogApi() // calls on reload