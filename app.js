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
    // if(screen.width <= 1000) {
    //     document.querySelector(".mainDiv").style.display = "none"
    //     document.querySelector(".contentNotAvailable").style.display = "block"
    // }
    loadCountries();
})


let letterPicked = "";
let indexOfLetterPicked;
a_to_z.forEach((obj, ind, y) => {
    obj.addEventListener("click", () => {
        letterPicked = obj.textContent;
        indexOfLetterPicked = ind;
        // console.log(obj, ind, y, obj.textContent, typeof obj.textContent)
        updateWord(obj.textContent)
        highlightRevealedLetters(ind)
        setTimeout(delayRemoveListener, 1500)

        // console.log(document.querySelectorAll(".guessCorrectly"))
    })
    obj.addEventListener("click", soundKontrol);
})


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
    // console.log(liveArrWordGlobal, indletter)
    liveArrWordGlobal.forEach((obj, ind)=> {
        x = indletter.children[ind].firstChild

        if(liveArrWordGlobal[ind]=="A" || liveArrWordGlobal[ind]=="E" || liveArrWordGlobal[ind]=="I" || liveArrWordGlobal[ind]=="O" || liveArrWordGlobal[ind]=="U") {
            x.classList.add("vowel")
            x.classList.remove("unGuessed")

            document.querySelectorAll(".a-to-z").forEach((q, w) => {
                if(q.textContent == liveArrWordGlobal[ind]){
                    // console.log(q.textContent, w)
                    highlightRevealedLetters(w)
                }
            })
        }
    })
    document.querySelectorAll("p.highlightKeyBoard").forEach((x) => {
        x.removeEventListener("click", soundKontrol)
    })
}
function highlightRevealedLetters(x) { //onkeyboard
    document.querySelectorAll(".a-to-z")[x].classList.add("highlightKeyBoard")

    document.querySelectorAll(".highlightKeyBoard").forEach((v) => v.addEventListener("click", () => {
        console.log(v)
        built = "p." + v.textContent;
        let y = document.querySelectorAll(`${built}`);

        y.forEach((q) => {
            q.classList.add("bumpLetter")
        })
        // console.log("y:", y ,v.textContent)
    }))
    setTimeout(removeBumpLetter, 710)
}
function removeBumpLetter() {
    document.querySelectorAll("p.bumpLetter").forEach((xx) => {
        xx.classList.remove("bumpLetter")
    })
    document.querySelector(".triesLeft").classList.remove("bumpLetter")
}

function delayRemoveListener() {
    document.querySelectorAll(".a-to-z")[indexOfLetterPicked].removeEventListener('click', soundKontrol)
}
function soundKontrol() {
    if(liveArrWordGlobal.indexOf(letterPicked) !== -1) {
        document.querySelector(".correctGuess").play();
    } else {
        document.querySelector(".wrongGuess").play();
        numOfTries = numOfTries - 1;
        // console.log(numOfTries)
        checkNumOfTries(numOfTries);
        document.querySelector(".triesLeft").classList.add("bumpLetter")
        setTimeout(removeBumpLetter,710)
    }
    if(document.querySelector("p.unGuessed") == null || document.querySelector("p.unGuessed") == undefined) {
        console.log("You guessed Correct")
        document.querySelector(".gameCompleted").play();
        setTimeout(delayReload, 1500)
    }
}
function updateWord(letterClicked) {
    liveArrWordGlobal.forEach((obj, ind)=> {
        if(liveArrWordGlobal[ind]==letterClicked) {
            x = document.querySelector(".letterToGuessCtnr").children[ind].firstChild
            x.classList.add("guessCorrectly")
            x.classList.remove("unGuessed")
        }
    })
}
function checkNumOfTries(x) {
    document.querySelector(".triesLeft").textContent = x;
    if(x == 0) {
        tryAgainCtnr.style.display = "flex"
        document.querySelector(".gameEnded").play();
    } else if (x == 1) {
        document.querySelector(".triesLeft").previousSibling.textContent = '';
        document.querySelector(".triesLeft").textContent = 'Last Chance !'
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
            letter.setAttribute('class', "gameLetter unGuessed")
            letter.classList.add(arr[i])
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
    // console.log(indletter)
    revealVowels(indletter)
    return indletter;
}
function displayHint(capital) {
    let hint = document.createElement("p");
    hint.setAttribute('class', "hint");
    hint.textContent = "Hint : Capital city is " + capital;
    return hint;
}


