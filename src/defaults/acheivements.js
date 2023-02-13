import assets from "../assets"

const defaultAchievements = [
    {
        name: "First Plant",
        id: "firstPlant",
        requirement: 1,
        type: "building", // type of acheivement (click/building)
        building: "plant",
        achieved: { current: false, date: null, },
        description: "Purchased your first plant",
        img: assets.iconPlant
    },
]

export default defaultAchievements