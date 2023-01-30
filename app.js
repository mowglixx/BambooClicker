let bambooScore = JSON.parse(localStorage.getItem("score"))
const bambooImage = document.querySelector("#bamboo")
const bambooScoreDisplay = document.querySelector("#score")
const upgradeCost = document.querySelector(".cost")
const buyButton = document.querySelector(".buy")

//Updating score on refresh from localStorage

bambooScoreDisplay.innerHTML = localStorage.getItem("score")

//Adding score to counter

const addScore = () => {
    bambooScore = bambooScore + 1
    bambooScoreDisplay.innerHTML = bambooScore
    localStorage.setItem("score", bambooScore)
}

//Basic score remover to buy things

const removeScore = () => {
    if (bambooScore >= parseInt(upgradeCost.textContent)) {
    bambooScore = bambooScore - parseInt(upgradeCost.textContent)
    bambooScoreDisplay.innerHTML = bambooScore
    localStorage.setItem("score", bambooScore)
    }
    else {
        alert("You need more bamboo!")
    }
}

//Adding bamboo over time, 1000ms = 1s

const bambooOverTime = () => {
    
}

setInterval(bambooOverTime, 1000)

bambooImage.addEventListener("click", addScore)
buyButton.addEventListener("click", removeScore)