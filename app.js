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
const achievementContainer = document.querySelector("#achievementContainer")
const achievementPopUp = document.querySelector("#achievementPopUp")
const versionDisplay = document.querySelector("#version")

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
            shopContainer.innerHTML += `<table id="${building.name[i]}" class="unselectable" index="${i}"><tr index="${i}"><td class="image" index="${i}"><img src="./img/${building.image[i]}" index="${i}"></td><td index="${i}">Bamboo ${building.name[i]}</td><td index="${i}">[<span index="${i}">${building.cost[i]}</span> bamboo]:</td><td index="${i}"><span index="${i}">${building.amount[i]}</span></td></tr></table>`
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
    },
    updateAchievement: function(){
        achievementContainer.innerHTML = ""
        for (i=0; i < achievement.name.length; i++){
            if (achievement.achieved[i]){
                achievementContainer.innerHTML += `<img src="./img/${achievement.image[i]}" title="${achievement.name[i]} &#10; ${achievement.description[i]}">`
            }
            else {
                achievementContainer.innerHTML += `<img src="./img/questionmark.png">`
            }
        }
    },
    updateVersion: function(){
        versionDisplay.innerHTML = `V. ${game.version}`
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
    image: [
        "bambooshoot.png",
        "plot.png",
        "garden.png",
        "park.png",
        "forest.png",
        "jungle.png",
        "island.png",
        "planet.png",
        "system.png"
    ],
    cost: [
        15,
        100,
        1100,
        12000,
        130000,
        1400000,
        20000000,
        330000000,
        5100000000
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
        1,
        8,
        47,
        260,
        1400,
        7800,
        44000,
        260000
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
        "Hobbist luck",
        "Getting a hang of it",
        "Bamboo collecting expert",
        "Collecting master",
        "Genetically modified bamboo",
        "Better fertilizer",
        "Better use of space",
        "Open to public",
        "Wild life",
        "Monkey business",
        "Tourism",
        "Space pact",
        "System of the dawn",
    ],
    description: [
        "You just got into new hobby. We all know beginners luck. Your clicking power gets doubled",
        "You're getting better with practice. Doubles clicking power",
        "Your skill is way better. Doubles clicking power",
        "No one is better in collecting bamboo than you. Quadruples your clicking power.",
        "You found some nice bamboo shoots online. Double income from plants",
        "Your friend recommended you a beter fertilizer. Doubles income from plants",
        "You're able to better manage your garden space. Doubles income from gardens",
        "You've opened your parks to public. Social bamboo is better bamboo. Doubles income from parks.",
        "More animals started living in your forest which helps your bamboo. Doubles income from forests.",
        "Monkeys started investing in your jungles. Doubles income from jungles.",
        "Toursist start visit your islands and all income goes into bamboo farms. Doubles income from islands.",
        "Made a pact with other planets to not raid you. Ever. Doubles income from plantes.",
        "Eating sees as a pastime activity. Doubles toxicity of our city. I mean income form systems."
    ],
    image: [
        "cursor.png",
        "cursor.png",
        "cursor.png",
        "goldencursor.png",
        "bambooshoot.png",
        "bambooshoot.png",
        "plot.png",
        "garden.png",
        "park.png",
        "forest.png",
        "jungle.png",
        "island.png",
        "planet.png",
        "system.png"
    ],
    type: [
        "click",
        "click",
        "click",
        "click",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
    ],
    cost: [
        100,
        500,
        10000,
        100000,
        100,
        500,
        1000,
        11000,
        120000,
        1300000,
        14000000,
        200000000,
        3300000000,
        51000000000
    ],
    buildingIndex: [
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
    ],
    requirement: [
        1,
        100,
        1000,
        5000,
        1,
        10,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
    ],
    bonus: [
        2,
        2,
        2,
        4,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
    ],
    purchased: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
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
        "Clicking expert",
        "Clicking master",
        "Clicking pro",
        "Clicking god",
        "First plant",
        "Casual planter",
        "Plant expert",
        "Planting addict",
        "Planting master",
        "Planting god",
        "Bamboo hobbist",
        "Casual bamboo farmer",
        "Nice Bamboo ;)",
        "Bamboo maker",
        "Bamboo investor",
        "Bamboo master",
        "Bamboo king",
        "Bamboo emperor",
        "Bamboo god"
    ],
    image: [
        "cursor.png",
        "cursor.png",
        "cursor.png",
        "cursor.png",
        "goldencursor.png",
        "bambooshoot.png",
        "bambooshoot.png",
        "bambooshoot.png",
        "bambooshoot.png",
        "bambooshoot.png",
        "bambooshoot.png",
        "bamboosmol.png",
        "bamboosmol.png",
        "bamboosmol.png",
        "bamboosmol.png",
        "bamboosmol.png",
        "bamboosmol.png",
        "bamboosmol.png",
        "bamboosmol.png",
        "bamboosmol.png",
    ],
    requirement: [
        100,
        1000,
        10000,
        100000,
        1000000,
        1,
        10,
        100,
        1000,
        10000,
        100000,
        1,
        10,
        69,
        100,
        1000,
        10000,
        50000,
        100000,
        1000000
    ],
    description: [
        "You clicked 100 times!",
        "You clicked 1000 times!",
        "You clicked 10000 times!",
        "You clicked 100000 times!",
        "You clicked 1000000 times!",
        "Planted your first bamboo!",
        "You got 10 bamboo plants",
        "You got 100 bamboo plants",
        "You got 1000 bamboo plants",
        "You got 10000 bamboo plants",
        "You got 100000 bamboo plants",
        "Your farm grows 1 bamboo per second!",
        "You earn 10 bamboo per second",
        "NICE (You earn 69 bamboo per second",
        "You earn 100 bamboo per second",
        "You earn 1000 bamboo per second",
        "You earn 10000 bamboo per second",
        "You earn 50000 bamboo per second",
        "You earn 100000 bamboo per second",
        "You earn 1000000 bamboo per second",
    ],
    type: [
        "click",
        "click",
        "click",
        "click",
        "click",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "income",
        "income",
        "income",
        "income",
        "income",
        "income",
        "income",
        "income",
        "income",
    ],
    buildingIndex: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ],
    achieved: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ],
    getAchievement: function() {
        for (i=0; i < this.name.length; i++){
            if (!this.achieved[i]){
                if (this.type[i] == "click" && game.totalClicks >= this.requirement[i]){
                    achievementPopUp.innerHTML += `<div id="popUp"><img src="./img/${achievement.image[i]}"><h2>Achievement get!</h2><p>${achievement.name[i]}</p><p>${achievement.description[i]}</p></div>`
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

//Reseting game

const resetGame = () => {
    if (confirm("Are you sure you want to reset your game?")){
        let gameSave = {}
        localStorage.setItem("gameSave", JSON.stringify(gameSave))
        location.reload()
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

    document.querySelector("#reset").addEventListener("click", event => {
        resetGame()
    })

//Adding bamboo every second to a score
setInterval(() => {
    game.bamboo += Math.round(game.getBambooPerSecond() * 10) / 10
    game.totalBamboo += Math.round(game.getBambooPerSecond() * 10) / 10
    display.updateScore()
}, 1000)

//Executes every 1 second - Saves game and udates all displays
setInterval(() => {
    display.updateUpgrades()
    display.updateScore()
    display.udpateShop()
    display.updateAchievement()
    achievement.getAchievement()
    saveGame()
}, 1000)

//Loading everything on refresh
window.onload = function(){
    loadGame()
    display.udpateShop()
    display.updateScore()
    display.updateUpgrades()
    display.updateAchievement()
    display.updateVersion()
}