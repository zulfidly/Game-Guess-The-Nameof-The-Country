let mainContainer = document.querySelector(".mainContainer")
let singleContainer = document.querySelector(".singleContainer")
let flagContainer = document.querySelector(".flagContainer")

const ENDPOINT = "https://gist.githubusercontent.com/zulfidly/c9013ce66093dcc0cd594acd17fb5d14/raw/0bd3fd3e01f90c6e2047b5188c1011c9fe12772f/CountriesOfTheWorld";

window.addEventListener("load", async() => {
    getCountries();
})


async function getCountries() {
    const response = await fetch(ENDPOINT)
    const data = await response.json(); // structure response into JSON format
    console.log(data)
  
    data.forEach((obj, ind) => {
        displayAllCountries (data[ind].name, data[ind].capital, data[ind].flag_url)
    });
    // displayAllCountries (data[0].name, data[0].capital, data[0].flag_url)
    // displayAllCountries (data[1].name, data[1].capital, data[1].flag_url)
}
function displayAllCountries(name, capital, flagImgUrl) {

    let singlectnr = document.createElement("section");
    singlectnr.setAttribute("id", name)
    singlectnr.setAttribute("capital", capital)
    singlectnr.setAttribute("class", "singleContainer")
    singlectnr.append (getFlags(flagImgUrl), createTableInfo(name, capital));
    mainContainer.append(singlectnr);
    // console.log(singlectnr)
}

function getFlags(flagImgUrl) {
        let flagctnr = document.createElement("section");
        flagctnr.setAttribute("class", "flagContainer")
    
        let flag = document.createElement("img");
        flag.setAttribute("src", flagImgUrl);
        flagctnr.append(flag);
    
        return flagctnr;    
}

function createTableInfo(name, capital) {
    let table = document.createElement('table');
    table.setAttribute('class', "infoTable");

    let r0 = document.createElement('tr');
    let r0c0 = document.createElement('td');
        r0c0.setAttribute('class', "countryTitle")
        r0c0.textContent = "Country :";
    let r0c1 = document.createElement('td')
        r0c1.setAttribute('class', "countryName")
        r0c1.textContent = name;

    let r1 = document.createElement('tr');
    let r1c0 = document.createElement('td')
        r1c0.setAttribute('class', "capitalTitle")
        r1c0.textContent = "Capital :";
    let r1c1 = document.createElement('td')
        r1c1.setAttribute('class', "capitalName")
        r1c1.textContent = capital;

    r0.append(r0c0, r0c1);
    r1.append(r1c0, r1c1);
    table.append(r0, r1)
    return table
}