// Hooks
import { useState, useEffect, useMemo, useReducer } from "react";

// Components
import AchievementList from "./components/Achievements";
import Store from "./components/Store";
import Footer from "./components/Footer";

// Styling
import { injectGlobal, css } from "@emotion/css";

injectGlobal`
@font-face{
  font-family: "Bamboo";
  src: url(${assets.bambooFont})
}
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

`;

// default data (new games)
import defaultAchievements from "./defaults/acheivements";
import defaultStoreItems from "./defaults/storeItems";
import defaultStoreUpgrades from "./defaults/storeUpgrades";
import defaultPlayer from "./defaults/player";
import assets from "./assets";

const App = () => {
  const [player, setPlayer] = useState(defaultPlayer);
  const [storeItems, setStoreItems] = useState(defaultStoreItems);
  const [storeUpgrades, setStoreUpgrades] = useState(defaultStoreUpgrades);
  const [achievements, setAchievements] = useState(defaultAchievements);
  const [bambooCount, setBambooCount] = useState(0);
  const [bambooPerClick, setBambooPerClick] = useState(1);
  const [bambooPerSecond, setBambooPerSecond] = useState(0);
  useEffect(() => {
    const tick = setInterval(() => {
      setBambooCount(bambooCount + bambooPerSecond);
    }, 1000);
    return () => {
      clearInterval(tick);
    };
  });

  // for special valentines face
  const today = new Date();
  const isValentines = today.getMonth() === 1 && today.getDate() === 14;

  return (
    <main>
      {/* main game */}
      <div className="">
        <h1>Bamboo Clicker Abridged</h1>
        <h2>Bamboo:{bambooCount}</h2>
        <h2>Bamboo per second: {bambooPerSecond}</h2>
        <h2>Bamboo per click: {bambooPerClick}</h2>
        <button className="bambooButton">
          {/* Valentines face */}
          {isValentines ? (
            <div className="senpai" />
          ) : (
            <div className="notSenpai" />
          )}
          &nbsp;
        </button>
      </div>
      <AchievementList achievements={achievements} />
      {/* <ResetGameButton /> */}
      <Store items={storeItems} upgrades={storeUpgrades} player={player} />
      <Footer />
    </main>
  );
};

export default App;
