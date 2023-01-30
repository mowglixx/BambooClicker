let bambooScore = JSON.parse(localStorage.getItem("score"))
const bambooImage = document.querySelector("#bamboo")
const bambooScoreDisplay = document.querySelector("#score")
const upgradeCost = document.querySelector(".cost")
const buyButton = document.querySelector(".buy")
const plantAmountDisplay = document.querySelector(".amount")
let plantAmount = JSON.parse(localStorage.getItem("plant")) 
//Updating score on refresh from localStorage

bambooScoreDisplay.innerHTML = localStorage.getItem("score")

//Adding score to counter

const addScore = () => {
    bambooScore = bambooScore + 1
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
    bambooScore = Math.round(bambooScore + (plantAmount * 0.1))
    bambooScoreDisplay.innerHTML = bambooScore
}

setInterval(bambooOverTime, 1000)

bambooImage.addEventListener("click", addScore)
buyButton.addEventListener("click", buyPlant)