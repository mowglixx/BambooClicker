// import images
import assets from '../assets'

const defaultStoreUpgrades = [
    {
        name: "Hobbist luck",
        id: "hobiestLuck",
        description: "You just got into new hobby. We all know beginners luck. Your clicking power gets doubled",
        img: assets.iconPlant,
        type: "click", // type of upgrade (building/click)
        cost: 100,
        buildingIndex: "plant",
        requirement: 1,
        bonusMultiplier: 2, // amount of bonus bamboo per click/second
        purchased: false
    },
]

export default defaultStoreUpgrades