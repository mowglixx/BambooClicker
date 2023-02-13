import defaultStoreItems from "./storeItems"
import defaultStoreUpgrades from "./storeUpgrades"
import defaultAchievements from "./acheivements"

const defaultScore = { bamboo: 0, }
const defaultPower = { bambooPerClick: 1, }
const defaultClicks = { clicks: 0, }

const defaultItems = {}
defaultStoreItems.forEach(({ id }) => {
    defaultItems[id] = { owned: 0 }
})
const defaultUpgrades = {}
defaultStoreUpgrades.forEach(({ id }) => {
    defaultUpgrades[id] = { owned: 0 }
})

const defaultPlayerAchievements = {}
defaultAchievements.forEach(({ id }) => {
    defaultPlayerAchievements[id] = { obtained: false }
})

const defaultPlayer = {
    ...defaultScore,
    ...defaultPower,
    ...defaultClicks,
    achievements: { ...defaultPlayerAchievements },
    items: { ...defaultItems },
    upgrades: { ...defaultItems }

}
console.log(defaultPlayer)

export default defaultPlayer