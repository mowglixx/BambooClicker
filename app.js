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
const upgradeContainer = document.querySelector("#upgradeContainer")
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
        //document.title = `${Math.round(game.bamboo * 10) / 10} bamboo - Bamboo clicker`
        bambooPerSecondDisplay.innerHTML = game.getBambooPerSecond()
    },
    udpateShop: function(){
        shopContainer.innerHTML = ""
        for (i=0; i < building.name.length; i++){
            shopContainer.innerHTML += `<table id="${building.name[i]}" class="unselectable" index="${i}"><tr index="${i}"><td class="image" index="${i}"></td><td index="${i}">Bamboo ${building.name[i]}</td><td index="${i}">[<span index="${i}">${building.cost[i]}</span> ${building.price[i]}]:</td><td index="${i}"><span index="${i}">${building.amount[i]}</span></td></tr></table>`
        }
    },
    updateUpgrades: function(){
        upgradeContainer.innerHTML = ""
        for (i=0; i < upgrade.name.length; i++){
            if (!upgrade.purchased[i]) {
                if (upgrade.type[i] == "building" && building.amount[upgrade.buildingIndex[i]] >= upgrade.requirement[i]){
                    upgradeContainer.innerHTML += `<img src="./img/${upgrade.image[i]}" title="${upgrade.name[i]} &#10; ${upgrade.description[i]} &#10; ${upgrade.cost[i]} bamboo" index="${i}">`
                }
                else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]){
                    upgradeContainer.innerHTML += `<img src="./img/${upgrade.image[i]}" title="${upgrade.name[i]} &#10; ${upgrade.description[i]} &#10; ${upgrade.cost[i]} bamboo" index="${i}">`
                }
            }
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
            display.updateUpgrades()
            achievement.getAchievement()
        }
    }
}

//Upgrades object

const upgrade = {
    name: [
        "Strong hands",
        "Genetically modified bamboo"
    ],
    description: [
        "You're getting better at collecting bamboo. Your clicking power gets doubled",
        "You found some nice bamboo shoots online. Double income from plants"
    ],
    image: [
        "bamboo.png",
        "bambooShoot.jpg"
    ],
    type: [
        "click",
        "building"
    ],
    cost: [
        100,
        100
    ],
    buildingIndex: [
        0,
        0
    ],
    requirement: [
        1,
        10
    ],
    bonus: [
        2,
        2
    ],
    purchased: [
        false,
        false
    ],

    purchase: function(index) {
        if (!this.purchased[index] && game.bamboo >= this.cost[index]) {
            if (this.type[index] == "building" && building.amount[this.buildingIndex[index]] >= this.requirement[index]){
                game.bamboo -= this.cost[index]
                building.income[this.buildingIndex[index]] *= this.bonus[index]
                this.purchased[index] = true

                display.updateScore()
                display.updateUpgrades()
            }
            else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]){
                game.bamboo -= this.cost[index]
                game.clickingPower *= this.bonus[index]
                this.purchased[index] = true

                display.updateScore()
                display.updateUpgrades()
            }
        }
    }
}

const achievement = {
    name: [
        "Clicking rookie",
        "Plant rookie",
        "Passive rookie"
    ],
    requirement: [
        10,
        1,
        40
    ],
    description: [
        "You clicked 10 times!",
        "Got 10 plants",
        "Earning 1 bamboo per second"
    ],
    type: [
        "click",
        "building",
        "income"
    ],
    buildingIndex: [
        0,
        0,
        0
    ],
    achieved: [
        false,
        false,
        false
    ],
    getAchievement: function() {
        for (i=0; i < this.name.length; i++){
            if (!this.achieved[i]){
                if (this.type[i] == "click" && game.totalClicks >= this.requirement[i]){
                    alert("click")
                    this.achieved[i] = true
                }
                else if (this.type[i] == "building" && building.amount[this.buildingIndex[i]] >= this.requirement[i]){
                    alert("building")
                    this.achieved[i] = true
                }
                else if (this.type[i] == "income" && bambooPerSecondDisplay.innerHTML >= this.requirement[i]){
                    alert("income")
                    this.achieved[i] = true
                }
            }
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
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased,
        achievementAchieved: achievement.achieved
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
        if (typeof savedGame.buildingAmount !== "undefined") {
            for (i=0; i < savedGame.buildingAmount.length; i++){
                building.amount[i] = savedGame.buildingAmount[i]
            }
        }
        if (typeof savedGame.buildingIncome !== "undefined") {
            for (i=0; i < savedGame.buildingIncome.length; i++){
                building.income[i] = savedGame.buildingIncome[i]
            }
        }
        if (typeof savedGame.buildingCost !== "undefined") {
            for (i=0; i < savedGame.buildingCost.length; i++){
                building.cost[i] = savedGame.buildingCost[i]
            }
        }
        if (typeof savedGame.upgradePurchased !== "undefined") {
            for (i=0; i < savedGame.upgradePurchased.length; i++){
                upgrade.purchased[i] = savedGame.upgradePurchased[i]
            }
        }
        if (typeof savedGame.achievementAchieved !== "undefined") {
            for (i=0; i < savedGame.achievementAchieved.length; i++){
                achievement.achieved[i] = savedGame.achievementAchieved[i]
            }
        }
    }
}

//Event Listeners

    //Main bamboo button - adding score and counting clicks
    bambooImage.addEventListener("click", function(){
        game.addBamboo()
        game.totalClicks++
    })

    //Shop listener - triggers a purchase funtcion with correct index
    shopContainer.addEventListener("click", event => {
        building.purchase(event.target.getAttribute("index"))
    })

    //Upgrade listener = triggers a pruchase function of upgrade with correct id
    upgradeContainer.addEventListener("click", event => {
        upgrade.purchase(event.target.getAttribute("index"))
    })

//Adding bamboo every second to a score
setInterval(() => {
    game.bamboo += Math.round(game.getBambooPerSecond() * 10) / 10
    game.totalBamboo += Math.round(game.getBambooPerSecond() * 10) / 10
    display.updateScore()
}, 1000)

//Executes every 10 seconds - Saves game and udates all displays
setInterval(() => {
    display.updateUpgrades()
    display.updateScore()
    display.udpateShop()
    achievement.getAchievement()
    saveGame()
}, 10000)

//Loading everything on refresh
window.onload = function(){
    loadGame()
    display.udpateShop()
    display.updateScore()
    display.updateUpgrades()
}