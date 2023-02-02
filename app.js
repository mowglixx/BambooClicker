//Mechanical variables
let bambooScore = 0
let plantAmount = 0 
let clickingPower = 1

//Selecting HTML elements
const bambooImage = document.querySelector("#bamboo")
const bambooScoreDisplay = document.querySelector("#score")
const bambooPerSecondDisplay = document.querySelector("#scorePerSecond")
const upgradeCost = document.querySelector(".plantCost")
const buyButton = document.querySelector("#plant")
const plantAmountDisplay = document.querySelector(".plantAmount")
const shopContainer = document.querySelector("#shopContainer")
//Updating score on refresh from localStorage

//bambooScoreDisplay.innerHTML = localStorage.getItem("score")
//plantAmountDisplay.innerHTML = localStorage.getItem("plant")

//Adding score to counter

// const addScore = () => {
//     bambooScore = bambooScore + clickingPower
//     bambooScoreDisplay.innerHTML = bambooScore
//     localStorage.setItem("score", bambooScore)
// }

//Basic buying function

// const buyPlant = () => {
//     if (bambooScore >= parseInt(upgradeCost.textContent)) {
//     bambooScore = bambooScore - parseInt(upgradeCost.textContent)
//     bambooScoreDisplay.innerHTML = bambooScore
//     localStorage.setItem("score", bambooScore)
//     plantAmount = plantAmount + 1
//     localStorage.setItem("plant", plantAmount)
//     plantAmountDisplay.innerHTML = plantAmount
//     }
//     else {
//         alert("You need more bamboo!")
//     }
// }

//Adding bamboo over time, 1000ms = 1s

// const bambooOverTime = () => {
//     bambooScore = bambooScore + plantAmount * 0.1
//     bambooScoreDisplay.innerHTML = Math.round(bambooScore * 10) / 10
//     bambooPerSecondDisplay.innerHTML = plantAmount * 0.1
// }

// setInterval(bambooOverTime, 1000)

//bambooImage.addEventListener("click", addScore)
//buyButton.addEventListener("click", buyPlant)

//Game object - Contains all important variables and socre functions

const game = {
    bamboo: 0,
    totalBamboo: 0,
    totalClicks: 0,
    clickingPower: 1,
    totalCoins: 0,
    version: 0.1,
    addBamboo: function(){
        this.bamboo += this.clickingPower
        this.totalBamboo += this.clickingPower
        display.updateScore()
    },
    getBambooPerSecond: function(){
        let bambooPerSecond = 0
        for (i=0; i < building.name.length; i++) {
            bambooPerSecond += building.income[i] * building.amount[i]
        }
        bambooPerSecond = Math.round(bambooPerSecond * 10) / 10
        return bambooPerSecond
    }
}

//Display object - Functions that make sure score is displayed

const display = {
    updateScore: function(){
        bambooScoreDisplay.innerHTML = Math.round(game.bamboo * 10) / 10
        document.title = `${Math.round(game.bamboo * 10) / 10} bamboo - Bamboo clicker`
        bambooPerSecondDisplay.innerHTML = game.getBambooPerSecond()
    },
    udpateShop: function(){
        shopContainer.innerHTML = ""
        for (i=0; i < building.name.length; i++){
            shopContainer.innerHTML += `<table id="${building.name[i]}" class="unselectable" index="${i}"><tr index="${i}"><td class="image" index="${i}"></td><td index="${i}">Bamboo ${building.name[i]}</td><td index="${i}">[<span index="${i}">${building.cost[i]}</span> ${building.price[i]}]:</td><td index="${i}"><span index="${i}">${building.amount[i]}</span></td></tr></table>`
        }
    }
}

//Building object = hold all information about buildings

const building = {
    name: [
        "plant",
        "plot",
        "garden",
        "park",
        "forest",
        "jungle",
        "island",
        "planet",
        "system"
    ],
    image: [],
    cost: [
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10
    ],
    amount: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    income: [
        0.1,
        2,
        25,
        300,
        3200,
        35000,
        400000,
        5000000,
        60000000
    ],

    price: [
        "bamboo",
        "plants",
        "plots",
        "gardens",
        "parks",
        "forests",
        "jungles",
        "islands",
        "planets"
    ],

    purchase: function(index){
        if (game.bamboo >= this.cost[index]) {
            game.bamboo -= this.cost[index]
            this.amount[index]++
            this.cost[index] = Math.ceil(this.cost[index] * 1.15)
            display.updateScore()
            display.udpateShop()
        }
    }
}

//Saving game

const saveGame = () => {
    const gameSave = {
        bamboo: game.bamboo,
        totalBamboo: game.totalBamboo,
        totalClicks: game.totalClicks,
        clickingPower: game.clickingPower,
        totalCoins: game.totalCoins,
        version: game.version,
        buildingAmount: building.amount,
        buildingIncome: building.income,
        buildingCost: building.cost
    }
    localStorage.setItem("gameSave", JSON.stringify(gameSave))
}

//Loading game

const loadGame = () => {
    let savedGame = JSON.parse(localStorage.getItem("gameSave"))
    if (localStorage.getItem("gameSave") !== null){
        if (typeof savedGame.bamboo !== "undefined") {game.bamboo = savedGame.bamboo}
        if (typeof savedGame.totalBamboo !== "undefined") {game.totalBamboo = savedGame.totalBamboo}
        if (typeof savedGame.totalClicks !== "undefined") {game.totalClicks = savedGame.totalClicks}
        if (typeof savedGame.clickingPower !== "undefined") {game.clickingPower = savedGame.clickingPower}
        if (typeof savedGame.totalCoins !== "undefined") {game.totalCoins = savedGame.totalCoins}
        if (typeof savedGame.version !== "undefined") {game.version = savedGame.version}
        if (typeof savedGame.buildingAmount !== "undefined") {building.amount = savedGame.buildingAmount}
        if (typeof savedGame.buildingIncome !== "undefined") {game.income = savedGame.buildingIncome}
        if (typeof savedGame.buildingCost !== "undefined") {game.cost = savedGame.buildingCost}
    }
}

//Event Listeners

    //Main bamboo button - adding score and counting clicks
    bambooImage.addEventListener("click", function(){
        game.addBamboo()
        game.totalClicks++
    })

    shopContainer.addEventListener("click", event => {
        building.purchase(event.target.getAttribute("index"))
    })

    setInterval(() => {
        game.bamboo += Math.round(game.getBambooPerSecond() * 10) / 10
        game.totalBamboo += Math.round(game.getBambooPerSecond() * 10) / 10
        display.updateScore()
    }, 1000)
//Loading everything on refresh

window.onload = function(){
    display.udpateShop()
    display.updateScore()
}
