let gameSection = document.querySelector(".gameSection")
let a_to_z = document.querySelectorAll(".a-to-z")
let tryAgainCtnr = document.querySelector(".tryAgainCtnr")
let tryAgainBtn = document.querySelector(".tryAgainBtn")
let triesLeft = document.querySelector(".triesLeft")
let guessNumberWhat = document.querySelector(".guessNumberWhat")
let overallScore = document.querySelector(".overallScore")
let resumePrevGameCtnr = document.querySelector(".resumePrevGameCtnr")
let resumeGameBtn = document.querySelector(".resumeGameBtn")
let startNewGameBtn = document.querySelector(".startNewGameBtn")
let resultListUL = document.querySelector(".resultListUL")
let hamMenuIcon = document.querySelector(".hamMenuIcon")
let closeMenuIcon = document.querySelector(".closeMenuIcon")
let slideInPageCtnr = document.querySelector(".slideInPageCtnr")

const ENDPOINT = "https://gist.githubusercontent.com/zulfidly/c9013ce66093dcc0cd594acd17fb5d14/raw/8896c92b3fa07fe8adf131349b27060115645cac/CountriesOfTheWorld";

let oriDataLengthGlobal, dataGlobal, objResultListGlobal;

let objectPicked, letterClicked, indexOfLetterClicked;
let numOfChances; 
let indexOfCountryInDataGlobal, chosenGlobal, liveArrWordGlobal;

let runningCountsPerAttempt = 0;
let numOfCorrectGuess = 0;
