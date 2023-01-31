//Mechanical variables
let bambooScore = 0
let plantAmount = 0 
let clickingPower = 1
let bambooPerSecond = 0
//Selecting HTML elements
const bambooImage = document.querySelector("#bamboo")
const bambooScoreDisplay = document.querySelector("#score")
const bambooPerSecondDisplay = document.querySelector("#scorePerSecond")
const upgradeCost = document.querySelector(".cost")
const buyButton = document.querySelector("#plant")
const plantAmountDisplay = document.querySelector(".amount")
//Updating score on refresh from localStorage

bambooScoreDisplay.innerHTML = localStorage.getItem("score")
//plantAmountDisplay.innerHTML = localStorage.getItem("plant")

//Adding score to counter

const addScore = () => {
    bambooScore = bambooScore + clickingPower
    bambooScoreDisplay.innerHTML = bambooScore
    localStorage.setItem("score", bambooScore)
}

//Basic buying function

const buyPlant = () => {
    if (bambooScore >= parseInt(upgradeCost.textContent)) {
    bambooScore = bambooScore - parseInt(upgradeCost.textContent)
    bambooScoreDisplay.innerHTML = bambooScore
    localStorage.setItem("score", bambooScore)
    plantAmount = plantAmount + 1
    localStorage.setItem("plant", plantAmount)
    plantAmountDisplay.innerHTML = plantAmount
    }
    else {
        alert("You need more bamboo!")
    }
}

//Adding bamboo over time, 1000ms = 1s

const bambooOverTime = () => {
    bambooScore = bambooScore + plantAmount * 0.1
    bambooScoreDisplay.innerHTML = Math.round(bambooScore * 10) / 10
}

setInterval(bambooOverTime, 1000)

bambooImage.addEventListener("click", addScore)
buyButton.addEventListener("click", buyPlant)

//Saving game

const saveGame = () => {
    gameSave = {
        bambooScore: bambooScore,
        bambooPerSecond: bambooPerSecond,
        clickingPower: clickingPower,
        plantAmount: plantAmount
    }
    localStorage.setItem("gameSave", JSON.stringify(gameSave))
}

//Loading game

const loadGame = () => {
    let savedGame = JSON.parse(localStorage.getItem("gameSave"))
    bambooScore = savedGame.bambooScore
    bambooPerSecond = savedGame.bambooPerSecond
    clickingPower = savedGame.clickingPower
    plantAmount = savedGame.plantAmount
}