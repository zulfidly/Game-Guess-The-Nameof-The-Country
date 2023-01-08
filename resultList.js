function updateResultList(rightOrWrong) {
    if(rightOrWrong) {
        let tempstr = `<li class="liResult" style="text-decoration: none; font-style: normal; list-style-type: number;">${chosenGlobal.name}</li>`
        UpdateResultToLocalStorage(tempstr)
    } else {
        let tempstr = `<li class="liResult" style="text-decoration: line-through; font-style: italic; list-style-type: number;">${chosenGlobal.name}</li>`
        UpdateResultToLocalStorage(tempstr)
    }
}
function UpdateResultToLocalStorage(htmlstr) {
    let objResultListJSON = JSON.parse(localStorage.getItem("localStorage-ResultList"))
    if(objResultListJSON) {
        let tempobj = {"li" : `${htmlstr}`}
        objResultListJSON.push(tempobj)
        displayUpdatedResultList(objResultListJSON)
        let stringified =  JSON.stringify(objResultListJSON)
        localStorage.setItem("localStorage-ResultList", stringified)
        console.log("resultList", objResultListJSON)
    } else { //for fresh game
        objResultListJSON = []
        let tempobj = {"li" : `${htmlstr}`}
        objResultListJSON.push(tempobj)
        displayUpdatedResultList(objResultListJSON)
        let stringified =  JSON.stringify(objResultListJSON)
        localStorage.setItem("localStorage-ResultList", stringified)
        console.log(objResultListJSON)
    }
}
function displayUpdatedResultList(obj) {
    document.querySelectorAll(".liResult").forEach((x) => {
        x.remove()
    })
    let tempstr = ""
    obj.forEach((y) => {
        tempstr += `${y.li}`
    })
    resultListUL.innerHTML += tempstr
}
function displayResulListUponBrowserReload() {
    if(objResultListGlobal) {
        objResultListGlobal.forEach((x)  =>{
            resultListUL.innerHTML += x.li
        })
    } else { return }
}

hamMenuIconCtnr.addEventListener("click", () =>{
    console.log("slide")
    slideInPageCtnr.classList.remove("slideOutMenu")
    slideInPageCtnr.classList.add("slideInMenu")
})
closeMenuIcon.addEventListener("click", () => {
    slideInPageCtnr.classList.remove("slideInMenu")
    slideInPageCtnr.classList.add("slideOutMenu")
})