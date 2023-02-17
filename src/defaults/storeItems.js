import assets from "../assets"

const defaultStoreItems = [
    {
        name: "Bamboo Plant",
        id: "plant",
        baseCost: 15,
        multiplier: 1.15, // amount per purchase to multiply by
        img: assets.iconPlant,
        income: 0.1,
    },
    {
        name: "Bamboo Plot",
        id: "plot",
        baseCost: 100,
        multiplier: 1.1,
        img: assets.iconPlot,
        income: 1,
    },
    {
        name: "Bamboo Garden",
        id: "garden",
        baseCost: 1100,
        multiplier: 1.1,
        img: assets.iconGarden,
        income: 8,
    },
    {
        name: "Bamboo Park",
        id: "park",
        baseCost: 12000,
        multiplier: 1.1,
        img: assets.iconPark,
        income: 47,
    },
    {
        name: "Bamboo Forest",
        id: "forest",
        baseCost: 130000,
        multiplier: 1.1,
        img: assets.iconForest,
        income: 260,
    },
    {
        name: "Bamboo Jungle",
        id: "jungle",
        baseCost: 1400000,
        multiplier: 1.1,
        img: assets.iconJungle,
        income: 1400,
    },
    {
        name: "Bamboo Island",
        id: "island",
        baseCost: 20000000,
        multiplier: 1.1,
        img: assets.iconIsland,
        income: 7800,
    },
    {
        name: "Bamboo Planet",
        id: "planet",
        baseCost: 330000000,
        multiplier: 1.1,
        img: assets.iconPlanet,
        income: 44000,
    },
    {
        name: "Bamboo System",
        id: "system",
        baseCost: 5100000000,
        multiplier: 1.1,
        img: assets.iconSystem,
        income: 260000,
    },
]

export default defaultStoreItems