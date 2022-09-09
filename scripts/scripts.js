const nameFeild = document.getElementById("name")
const age = document.getElementById('age')
const gender = document.getElementById('gender')
const guess = document.getElementById('guess')
let input = document.getElementById('input-name').value


guess.addEventListener('click', ()=> {
    input = document.getElementById('input-name').value
    nationApi(input)
})


// Functions

const countryName = (countryId) => {
    fetch(`https://restcountries.com/v3.1/alpha/LB`
    ).then(response =>{
        return response.json()
    }).then(json => { console.log(json[0].name.common) 
    })
}

const nationApi = (input) => {
    fetch(`https://api.nationalize.io/?name="${input}"`
    ).then(response =>{
        return response.json()
    }).then(json => {countryFlag(json.country[0].country_id)
        console.log(json.country[0].country_id)
    })
}

const ageApi = (input) => {
    fetch(`https://api.genderize.io/?name="${input}"`
    ).then(response =>{
        return response.json()
    }).then(text => {
        nameFeild.innerText = `Hi: ${input}`
    })
}
