window.addEventListener("load", async() => {
    // localStorage.clear();
    if(localStorage.getItem("localStorage-dataGlobal")) {
        resumePrevGameCtnr.style.display = "flex"
        addListenerResumeGamePage();
    } else {
        fetchFreshData_StartGame();
        resumePrevGameCtnr.style.display = "none"
    }
}, {once:true})
async function fetchFreshData_StartGame() {
    localStorage.removeItem("localStorage-ResultList")
    const response = await fetch(ENDPOINT)
    data = await response.json(); // structure response into JSON format
    dataGlobal = data;
    oriDataLengthGlobal = data.length
    // console.log(data, typeof data)
    initQWERTY();
    newGame(pickRandomCountry(dataGlobal));
}
function prevGameDataIsAvailable() { //check localStorage variables
    objResultListGlobal = JSON.parse(localStorage.getItem("localStorage-ResultList"))
    dataGlobal = JSON.parse(localStorage.getItem("localStorage-dataGlobal"))
    numOfCorrectGuess = localStorage.getItem("localStorage-numOfCorrectGuess") * 1;
    runningCountsPerAttempt = localStorage.getItem("localStorage-runningCountsPerAttempt") * 1;
    oriDataLengthGlobal = localStorage.getItem("localStorage-oriDataLengthGlobal") * 1;
    displayResulListUponBrowserReload();
}
function addListenerResumeGamePage() {
    resumeGameBtn.addEventListener("click", addListenerToResumeButton, {once:true})
    startNewGameBtn.addEventListener("click", addListenerToStartNewGameButton, {once:true})
}
function addListenerToResumeButton() {
    prevGameDataIsAvailable();
    initQWERTY();
    loadNewCountry();
    resumePrevGameCtnr.style.display = "none"
    startNewGameBtn.removeEventListener("click", addListenerToStartNewGameButton);
}
function addListenerToStartNewGameButton() {
    initQWERTY();
    fetchFreshData_StartGame();
    resumePrevGameCtnr.style.display = "none";
    resumeGameBtn.removeEventListener("click", addListenerToResumeButton);
}
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
    correctguess.textContent = "Total : " + numOfCorrectGuess + "/" + oriDataLengthGlobal;

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
function pickRandomCountry() {
    if(dataGlobal.length > 0) {
        indexOfCountryInDataGlobal = Math.floor(Math.random() * dataGlobal.length)
        // console.log("IndexArr", indexOfCountryInArrayGlobal, dataGlobal[indexOfCountryInArrayGlobal].name)
        chosenGlobal = dataGlobal[indexOfCountryInDataGlobal];
        liveArrWordGlobal = [...chosenGlobal.name.toUpperCase()]
        storeDataToLocalStorage();
        return chosenGlobal;    
    } else { return;  }
}
function storeDataToLocalStorage() {
    // console.log("-------------------------------store data")
    // console.log("indexCountry:", indexOfCountryInDataGlobal,"dataLength:", dataGlobal.length)
    // console.log("dataGlobal", dataGlobal)
    // console.log("numOfCorrectGuess:",numOfCorrectGuess, "runningCountsPerAttempt:", runningCountsPerAttempt)
    localStorage.setItem("localStorage-numOfCorrectGuess", numOfCorrectGuess.toString())
    localStorage.setItem("localStorage-runningCountsPerAttempt", runningCountsPerAttempt.toString())
    localStorage.setItem("localStorage-dataGlobal", JSON.stringify(dataGlobal))
    localStorage.setItem("localStorage-oriDataLengthGlobal", oriDataLengthGlobal.toString())
}
function renewGameSection() {
    if(dataGlobal.length > 0) {
        document.querySelector(".triesLeft").textContent = 5;
        if(document.querySelector(".flagContainer") || document.querySelector(".letterToGuessCtnr") || document.querySelector(".hint")) {
            document.querySelector(".flagContainer").remove();
            document.querySelector(".letterToGuessCtnr").remove();
            document.querySelector(".hint").remove();
        } else {
            void(0)
        }
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

function checkForMatch() {
        if(liveArrWordGlobal.indexOf(letterClicked) !== -1) {
            void(0);
        } else {
            numOfChances = numOfChances - 1;
            triesLeft.textContent = numOfChances;
            document.querySelector(".triesLeft").classList.add("bumpLetter")
            setTimeout(removeBumpLetter,350)
        }    
        if(!(document.querySelector("p.unGuessed"))) {
            document.querySelector(".gameCompleted").play();
            detachModularListenersFromQWERTY();
            console.log("You guessed Correcttttt");
            runningCountsPerAttempt += 1;
            numOfCorrectGuess = numOfCorrectGuess + 1;
            spliceDataGlobalAfterEachGuessAttempt();
            storeDataToLocalStorage()
            updateResultList(true)
            if(dataGlobal.length > 0) {
                setTimeout(loadNewCountry, 1000)
            } else { 
                document.querySelector(".flagContainer").remove();
                document.querySelector(".letterToGuessCtnr").remove();
                document.querySelector(".hint").remove();                                                    
                finalPage(); 
            }
        } else {
            if(numOfChances == 0) {
                document.querySelector(".gameEnded").play();
                console.log("You guessed Wrongggg");
                runningCountsPerAttempt += 1;
                spliceDataGlobalAfterEachGuessAttempt();
                storeDataToLocalStorage()
                updateResultList(false)
                if(dataGlobal.length > 0) {
                    tryAgainCtnr.style.display = "flex"
                } else { 
                    document.querySelector(".flagContainer").remove();
                    document.querySelector(".letterToGuessCtnr").remove();
                    document.querySelector(".hint").remove();                                                    
                    finalPage(); 
                }
            } else if (numOfChances == 1) {
                document.querySelector(".chancesLeftQuote").style.display = 'none';
                document.querySelector(".triesLeft").style.display = 'none';
                document.querySelector(".lastChanceQuote").style.display = 'flex';
                document.querySelector(".lastChanceQuote").classList.add("bumpLetter");
            } else { void (0); }    
        }
}
function spliceDataGlobalAfterEachGuessAttempt() {
    dataGlobal.splice(indexOfCountryInDataGlobal, 1);
    // console.log("afterSpliced",dataGlobal)
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
        x.removeEventListener("click", highlightRevealedLettersOnQWERTY);
        x.removeEventListener("click", revealCorrectLetter);
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
    lastQuote2.textContent = "Final Score : " + numOfCorrectGuess + "/" + oriDataLengthGlobal; 

    let lastQuoteCtnr = document.createElement("div")
    lastQuoteCtnr.setAttribute("class", "forThoseWhoTriedItAll")
    lastQuoteCtnr.style.display = "flex";
    lastQuoteCtnr.append(lastQuote1, lastQuote2)

    gameSection.append(lastQuoteCtnr)
    document.querySelector("h3").remove();

    gameSection.style.width = "390px";
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

