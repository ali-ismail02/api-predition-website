const dog = document.getElementById("test")
let gender = fetch("https://api.genderize.io/?name=sarah"
).then(response =>{
    return response.json()
}).then(text => console.log(text.gender))


fetch("https://dog.ceo/api/breeds/image/random"
).then(response =>{
    return response.json()
}).then(text => {
    console.log(text.message)
    dog.innerHTML = `<img src="${text.message}"/>`
})
