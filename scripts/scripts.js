const nameFeild = document.getElementById("name")
const age = document.getElementById('age')
const gender = document.getElementById('gender')
const guess = document.getElementById('guess')
const flag1 = document.getElementById('nation-1')
const flag2 = document.getElementById('nation-2')
let input = document.getElementById('input-name').value


guess.addEventListener('click', ()=> {
    input = document.getElementById('input-name').value
    nationApi(input)
    ageApi(input)
    genderApi(input)
})


// Functions


const nationApi = (input) => { // fetching country code
    fetch(`https://api.nationalize.io/?name=${input}`
    ).then(response =>{
        return response.json()
    }).then(json => {
        console.log(json.country[0].country_id)
        flag1.style.backgroundImage = `url(https://countryflagsapi.com/png/${json.country[0].country_id})`
        flag1.classList.add("nation-1")
        if(json.country[1].country_id){
            flag2.style.backgroundImage = `url(https://countryflagsapi.com/png/${json.country[1].country_id})`
            flag2.classList.add("nation-2")
        }
    })
}


const genderApi = (input) => { // fetches gender
    fetch(`https://api.genderize.io/?name=${input}`
    ).then(response =>{
        return response.json()
    }).then(text => {
        nameFeild.innerText = `Hi ${input}`
        console.log(text.gender)
        if(gender.classList.contains("gender-male")) gender.classList.remove("gender-male")
        if(gender.classList.contains("gender-female")) gender.classList.remove("gender-female")
        if(text.gender == 'male'){
            gender.classList.add("gender-male")
        } else gender.classList.add("gender-female")

    })
}

const ageApi = (input) =>{
    fetch(`https://api.agify.io/?name=${input}`
    ).then(response =>{
        return response.json()
    }).then(json => { 
        age.innerHTML = "Age: " + json.age
    })
}
