let gameSection = document.querySelector(".gameSection")
let a_to_z = document.querySelectorAll(".a-to-z")
let tryAgainCtnr = document.querySelector(".tryAgainCtnr")
let tryAgainBtn = document.querySelector(".tryAgainBtn")
let triesLeft = document.querySelector(".triesLeft")
let guessNumberWhat = document.querySelector(".guessNumberWhat")
let overallScore = document.querySelector(".overallScore")
const ENDPOINT = "https://gist.githubusercontent.com/zulfidly/c9013ce66093dcc0cd594acd17fb5d14/raw/8896c92b3fa07fe8adf131349b27060115645cac/CountriesOfTheWorld";

let oriDataLength, dataGlobal;
window.addEventListener("load", async() => {
    const response = await fetch(ENDPOINT)
    data = await response.json(); // structure response into JSON format
    dataGlobal = data;
    oriDataLength = data.length
    // console.log(data, typeof data)
    initQWERTY();
    newGame(pickRandomCountry(dataGlobal));
}, {once:true})

let objectPicked, letterClicked, indexOfLetterClicked;
function initQWERTY() {
    tryAgainBtn.addEventListener("click", listenerForContinueButtonOnly)

    a_to_z.forEach((obj, ind) => obj.addEventListener("click", () => {
        if(dataGlobal.length > 0) {
            objectPicked = obj;
            letterClicked = obj.textContent;
            indexOfLetterClicked = ind;    
            // console.log(obj, ind, y, obj.textContent, typeof obj.textContent)
            bumpLetterOnce();
        } else {
            return;
        }
    }))
}
function bumpLetterOnce() {
    let crossMatch = "p." + letterClicked;
    document.querySelectorAll(crossMatch).forEach((x) => {
        if(x.textContent == letterClicked) {
            x.classList.add("bumpLetter")
        }
    })
    setTimeout(removeBumpLetter, 360)
}

let numOfChances; 
function newGame(chosen) {
    numOfChances = 5;
    attachModularListenersToQWERTY();

    document.querySelector(".chancesLeftQuote").style.display = 'flex';
    triesLeft.style.display = "flex";
    document.querySelector(".lastChanceQuote").style.display = 'none';

    triesLeft.textContent = numOfChances;
    let flagctnr = document.createElement("section");
    flagctnr.setAttribute("class", "flagContainer")
    flagctnr.style.backgroundImage = `url(${chosen.flag_url})`;

    let correctguess = document.createElement("p");
    correctguess.setAttribute("class", "overallScore")
    correctguess.textContent = "Total : " + numOfCorrectGuess + "/" + oriDataLength;

    let guessNumber = document.createElement("p");
    guessNumber.setAttribute("class", "guessNumberWhat")
    guessNumber.textContent = "Score: " + numOfCorrectGuess + "/" + runningCountsPerAttempt;

    flagctnr.append(correctguess, guessNumber);
    gameSection.append(flagctnr, lettersToGuess(chosen.name), displayHint(chosen.capital))
}
function loadNewCountry() {
    renewGameSection();
    if(dataGlobal.length > 0) {
        newGame(pickRandomCountry())    
    } else {
        finalPage();
        return;
    }
}
let indexOfCountryInDataGlobal, chosenGlobal, liveArrWordGlobal;
function pickRandomCountry() {
    if(dataGlobal.length > 0) {
        indexOfCountryInDataGlobal = Math.floor(Math.random() * dataGlobal.length)
        // console.log("IndexArr", indexOfCountryInArrayGlobal, dataGlobal[indexOfCountryInArrayGlobal].name)
        chosenGlobal = dataGlobal[indexOfCountryInDataGlobal];
        liveArrWordGlobal = [...chosenGlobal.name.toUpperCase()]
        return chosenGlobal;    
    } else { return;  }
}

let runningCountsPerAttempt = 0;
function renewGameSection() {
    runningCountsPerAttempt += 1;
    if(dataGlobal.length > 0) {
        dataGlobal.splice(indexOfCountryInDataGlobal, 1);
        // console.log("afterSpliced",dataGlobal)
        document.querySelector(".triesLeft").textContent = 5;
        document.querySelector(".flagContainer").remove();
        document.querySelector(".letterToGuessCtnr").remove();
        document.querySelector(".hint").remove();
    } else { void(0);  }

    document.querySelectorAll("p.highlightKeyBoard").forEach((x) => {
        x.classList.remove("highlightKeyBoard")
    })
}
function attachModularListenersToQWERTY() {
    a_to_z.forEach((obj, ind) => {
        obj.addEventListener("click", soundKontrol, {once: true});
        obj.addEventListener("click", highlightRevealedLettersOnQWERTY, {once: true});
        obj.addEventListener("click", revealCorrectLetter, {once: true});
        obj.addEventListener("click", checkForMatch, {once: true});
    })
}
function detachModularListenersFromQWERTY() {
    a_to_z.forEach((obj, ind) => {
        obj.removeEventListener("click", soundKontrol);
        obj.removeEventListener("click", highlightRevealedLettersOnQWERTY);
        obj.removeEventListener("click", revealCorrectLetter);
        obj.removeEventListener("click", checkForMatch);
    })
}

let numOfCorrectGuess = 0;
function checkForMatch() {
        if(liveArrWordGlobal.indexOf(letterClicked) !== -1) {
            void(0);
        } else {
            numOfChances = numOfChances - 1;
            triesLeft.textContent = numOfChances;
            document.querySelector(".triesLeft").classList.add("bumpLetter")
            setTimeout(removeBumpLetter,350)
        }    
        // console.log("numOfChances", numOfChances)
        // if(document.querySelector("p.unGuessed") == null || document.querySelector("p.unGuessed") == undefined) {
        if(!(document.querySelector("p.unGuessed"))) {
            detachModularListenersFromQWERTY();
            console.log("You guessed Correcttttt")
            numOfCorrectGuess = numOfCorrectGuess + 1;
            document.querySelector(".gameCompleted").play();
            setTimeout(loadNewCountry, 1000)
        } else {
            if(numOfChances == 0) {
                console.log("You guessed Wrongggg")
                tryAgainCtnr.style.display = "flex"
                document.querySelector(".gameEnded").play();
            } else if (numOfChances == 1) {
                document.querySelector(".chancesLeftQuote").style.display = 'none';
                document.querySelector(".triesLeft").style.display = 'none';
                document.querySelector(".lastChanceQuote").style.display = 'flex';
                document.querySelector(".lastChanceQuote").classList.add("bumpLetter");
            } else { void (0); }    
        }
}
function listenerForContinueButtonOnly() {
    tryAgainCtnr.style.display = "none";
    loadNewCountry();
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
        } else if (arr[i] == " ") {
            let letter = document.createElement("p");
            letter.setAttribute('class', "spaceNotToGuess")
            letter.append(arr[i])
            let letterBox = document.createElement("section");
            letterBox.setAttribute('class', "letterBox");

            indletter.append(letter)
        } else { void(0); }
    }
    // console.log(indletter)
    revealVowels(indletter)
    return indletter;
}
function revealCorrectLetter() {
    liveArrWordGlobal.forEach((obj, ind)=> {
        if(liveArrWordGlobal[ind]==letterClicked) {
            x = document.querySelector(".letterToGuessCtnr").children[ind].firstChild
            x.classList.add("guessCorrectly")
            x.classList.remove("unGuessed")
        } else { void(0); }
    }) 
}
function displayHint(capital) {
    let hint = document.createElement("p");
    hint.setAttribute('class', "hint");
    hint.textContent = "Hint : Capital city is " + capital;
    return hint;
}
function soundKontrol() {
    if(liveArrWordGlobal.indexOf(letterClicked) !== -1) {
        document.querySelector(".correctGuess").play();
    } else {
        document.querySelector(".wrongGuess").play();
    }
}
function removeBumpLetter() {
    document.querySelectorAll(".bumpLetter").forEach((xx) => {
        xx.classList.remove("bumpLetter")
    })
}
function removeListenerSoundKontrol() {
    objectPicked.removeEventListener('click', soundKontrol)
}
function revealVowels(indletter) {
    // console.log(liveArrWordGlobal, indletter)
    liveArrWordGlobal.forEach((obj, ind)=> {
        x = indletter.children[ind].firstChild
        y = liveArrWordGlobal[ind];
        if( y=="A" || y=="E" || y=="I" || y=="O" || y=="U" || y=="-" || y=="&") {
            x.classList.add("vowel")
            x.classList.remove("unGuessed")
            a_to_z.forEach((q, w) => {
                if(q.textContent == liveArrWordGlobal[ind]){
                    // console.log(q.textContent, w)
                    q.classList.add("highlightKeyBoard")
                }
            })
        }
    })
    removeListenersForRevealedVowels();
}
function removeListenersForRevealedVowels() {
    document.querySelectorAll(".highlightKeyBoard").forEach((x) => {
        x.removeEventListener("click", soundKontrol)
        x.removeEventListener("click", checkForMatch)
    })
}
function highlightRevealedLettersOnQWERTY() { //onkeyboard 
    if(a_to_z[indexOfLetterClicked]) {
        a_to_z[indexOfLetterClicked].classList.add("highlightKeyBoard")
    } else { return; } ;
}
function finalPage() {
    let lastQuote1 = document.createElement("p");
    lastQuote1.textContent = "Thank You"; 
    
    let lastQuote2 = document.createElement("p");
    lastQuote2.style.fontSize = "large"
    lastQuote2.textContent = "Final Score : " + numOfCorrectGuess + "/" + oriDataLength; 

    let lastQuoteCtnr = document.createElement("div")
    lastQuoteCtnr.setAttribute("class", "forThoseWhoTriedItAll")
    lastQuoteCtnr.style.display = "flex";
    lastQuoteCtnr.append(lastQuote1, lastQuote2)

    gameSection.append(lastQuoteCtnr)
    document.querySelector("h3").remove();

    gameSection.style.backgroundImage = `url(https://upload.wikimedia.org/wikipedia/commons/b/b2/WhiteCat.jpg)`;
    gameSection.style.backgroundRepeat= "no-repeat";
    gameSection.style.backgroundPosition = "center center";
    gameSection.style.backgroundSize = "cover";

    document.querySelector(".chancesLeftQuote").style.display = 'none';
    document.querySelector(".triesLeft").style.display = 'none';
    document.querySelector(".lastChanceQuote").textContent = "Game Completed";
    document.querySelector(".lastChanceQuote").style.display = 'flex';
    document.querySelector(".lastChanceQuote").classList.add("bumpLetter");

    detachModularListenersFromQWERTY();
}

