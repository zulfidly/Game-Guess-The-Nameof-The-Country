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
let hamMenuIconCtnr = document.querySelector(".hamMenuIconCtnr")
let closeMenuIcon = document.querySelector(".closeMenuIcon")
let slideInPageCtnr = document.querySelector(".slideInPageCtnr")

const ENDPOINT = "https://gist.githubusercontent.com/zulfidly/c9013ce66093dcc0cd594acd17fb5d14/raw/8896c92b3fa07fe8adf131349b27060115645cac/CountriesOfTheWorld";
// const ENDPOINT = "https://gist.githubusercontent.com/zulfidly/f9c0189f9b94d84f10cb96a132d94aa7/raw/c1865140f9f69dc49f696f14873d23f4ec6b6fbe/shortlist";

let oriDataLengthGlobal, dataGlobal, objResultListGlobal;

let objectPicked, letterClicked, indexOfLetterClicked;
let numOfChances; 
let indexOfCountryInDataGlobal, chosenGlobal, liveArrWordGlobal;

let runningCountsPerAttempt = 0;
let numOfCorrectGuess = 0;
