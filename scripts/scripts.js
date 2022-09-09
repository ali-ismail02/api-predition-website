let gender = fetch("https://api.genderize.io/?name=sarah"
).then(response =>{
    return response.json()
}).then(text => console.log(text.gender))