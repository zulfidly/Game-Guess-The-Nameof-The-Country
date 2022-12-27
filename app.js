let gameSection = document.querySelector(".gameSection")
let letters = document.querySelector(".letters")
let flagContainer = document.querySelector(".flagContainer")
let a_to_z = document.querySelectorAll(".a-to-z")
let vowel = document.querySelector(".vowel")
let tryAgainCtnr = document.querySelector(".tryAgainCtnr")
let tryAgainBtn = document.querySelector(".tryAgainBtn")
let chosenGlobal, dataGlobal, liveArrWordGlobal;
let numOfTries = 5;
const ENDPOINT = "https://gist.githubusercontent.com/zulfidly/c9013ce66093dcc0cd594acd17fb5d14/raw/268e138d04ab0794e2bdbb45dfca655d8084a9a6/CountriesOfTheWorld";

window.addEventListener("load", async() => {
    if(screen.width <= 1000) {
        document.querySelector(".mainDiv").style.display = "none"
        document.querySelector(".contentNotAvailable").style.display = "block"
    }
    loadCountries();
})

a_to_z.forEach(n => n.addEventListener("click", () => {
    // console.log(n.textContent)
    updateWord(n.textContent)
}))


async function loadCountries() {
    const response = await fetch(ENDPOINT)
    const data = await response.json(); // structure response into JSON format
    // console.log(data, typeof data)
    dataGlobal = data;
    gameSect(pickRandomCountry(data))
}
function pickRandomCountry(dataGlobal) {
    let random = Math.floor(Math.random()* dataGlobal.length)
    let chosen = dataGlobal[random];
    chosenGlobal = chosen;
    liveArrWordGlobal = [...chosenGlobal.name.toUpperCase()]
    return chosen;
}
function gameSect(chosen) {
    let flagctnr = document.createElement("section");
    flagctnr.setAttribute("class", "flagContainer")
    let flag = document.createElement("img");
    flag.setAttribute("src", chosen.flag_url);
    flagctnr.append(flag);
    gameSection.append(flagctnr, lettersToGuess(chosen.name), displayHint(chosen.capital))
}
function revealVowels(indletter) {
    console.log(liveArrWordGlobal, indletter)
    liveArrWordGlobal.forEach((obj, ind)=> {
        if(liveArrWordGlobal[ind]=="A" || liveArrWordGlobal[ind]=="E" || liveArrWordGlobal[ind]=="I" || liveArrWordGlobal[ind]=="O" || liveArrWordGlobal[ind]=="U") {
            x = indletter.children[ind].firstChild
            x.classList.add("vowel")
            x.classList.remove("unGuessed")
        }
    })
}
function updateWord(letterClicked) {
    if(liveArrWordGlobal.indexOf(letterClicked) !== -1) {
        document.querySelector(".correctGuess").play();
    } else {
        document.querySelector(".wrongGuess").play();
        numOfTries = numOfTries - 1;
        console.log(numOfTries)
        checkNumOfTries(numOfTries);

    }

    liveArrWordGlobal.forEach((obj, ind)=> {
        if(liveArrWordGlobal[ind]==letterClicked) {
            x = document.querySelector(".letterToGuessCtnr").children[ind].firstChild
            x.classList.add("guessCorrectly")
            x.classList.remove("unGuessed")
        }
    })
    if(document.querySelector("p.unGuessed") == null || document.querySelector("p.unGuessed") == undefined) {
        console.log("You guessed Perfect")
        document.querySelector(".gameCompleted").play();
        setTimeout(delayReload, 1500)
    }
}
function checkNumOfTries(x) {
    document.querySelector(".triesLeft").textContent = x;
    if(x == 0) {
        tryAgainCtnr.style.display = "flex"
        document.querySelector(".gameEnded").play();
    }
    tryAgainBtn.addEventListener("click", () => {
        location.reload()
    })
}
function delayReload() {
    location.reload()
}
function lettersToGuess(name) {
    let arr = [...name.toUpperCase()]
    let indletter = document.createElement("section");
    indletter.setAttribute('class', "letterToGuessCtnr");

    for(i=0; i<arr.length; i++) {
        if(arr[i] !== " ") {
            let letter = document.createElement("p");
            letter.setAttribute('class', "unGuessed")
            letter.append(arr[i])

            let letterBox = document.createElement("section");
            letterBox.setAttribute('class', "letterBox");
            letterBox.append(letter)
            indletter.append(letterBox)
        } else {
            let letter = document.createElement("p");
            letter.setAttribute('class', "spaceNotToGuess")
            letter.append(arr[i])
            let letterBox = document.createElement("section");
            letterBox.setAttribute('class', "letterBox");

            indletter.append(letter)
        }
    }
    console.log(indletter)
    revealVowels(indletter)
    return indletter;
}
function displayHint(capital) {
    let hint = document.createElement("p");
    hint.setAttribute('class', "hint");
    hint.textContent = "Hint : Capital city is " + capital;
    return hint;
}


