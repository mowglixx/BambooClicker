import { css } from "@emotion/css";
import { v4 as uuid } from "uuid";
import assets from "../assets";
import defaultPlayer from "../defaults/player";
import defaultStoreItems from "../defaults/storeItems";
import defaultStoreUpgrades from "../defaults/storeUpgrades";

const costMultiplier = ({ baseCost, multiplier }, amountOwned = 1) => {
  return (
    amountOwned ? Math.ceil((baseCost * multiplier) ** amountOwned) : baseCost
  ).toLocaleString();
};

const StoreUpgrade = ({ upgrade, player }) => {
  const styles = {
    upgrade: css`
      display: flex;
      flex-direction: row;
    `,
    imageWrapper: css``,
    image: css``,
    nameWrapper: css``,
    name: css``,
    costWrapper: css``,
    costCurrency: css``,
    description: css``,
  };

  return (
    <button className={styles.upgrade}>
      <div className={styles.imageWrapper}>
        <img
          src={upgrade.img.src}
          alt={upgrade.img.alt}
          className={styles.image}
        />
      </div>
      <div className={styles.nameWrapper}>
        <div className={styles.name}>{upgrade.name}</div>
        <div className={styles.costWrapper}>
          <span className={styles.costCurrency}>B</span>
          {upgrade.cost}
        </div>
        <div className={styles.description}>{upgrade.description}</div>
      </div>
    </button>
  );
};
const StoreItem = ({ item, player }) => {
  const styles = {
    container: css`
      display: flex;
      font-family: "Bamboo";
      flex-direction: row;
      width: 100%;
      justify-content: start;
      transition: ease 0.1s;
      border: 
      padding: 1em;
      &:hover {
        transform: scaleY(1.1) scaleX(1.01);
      }
      &:active {
        transform: scale(1.01);
      }
    `,
    imageWrapper: css``,
    image: css``,
    nameWrapper: css``,
    name: css``,
    costWrapper: css``,
    costCurrency: css``,
  };

  return (
    <button className={styles.container}>
      <div className={styles.imageWrapper}>
        <img {...item.img} className={styles.image} />
      </div>
      <div className={styles.nameWrapper}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.costWrapper}>
          <span className={styles.costCurrency}>B</span>
          {costMultiplier(item, player.items[item.id]?.owned)}
        </div>
        <div className={styles.description}>{item.description}</div>
      </div>
    </button>
  );
};

const UpgradesPOS = ({ upgradesAvailable, upgrades, player }) => {
  const styles = {
    container: css``,
  };
  return (
    <div className={styles.container}>
      {upgradesAvailable.length
        ? upgrades.map((item) => (
            <StoreUpgrade key={uuid()} upgrade={item} player={player} />
          ))
        : `No Upgrades Available`}
    </div>
  );
};

const ItemsPOS = ({ items, player }) => {
  const styles = {
    container: css`
      font-family: "Bamboo";
    `,
  };
  return (
    <div className={styles.container}>
      <div className="headerWrapper">
        <h3 className="header">Automation</h3>
      </div>
      {items.length
        ? items.map((item) => (
            <StoreItem key={uuid()} item={item} player={player} />
          ))
        : `No Items Available`}
    </div>
  );
};

const Store = ({
  items = defaultStoreItems,
  upgrades = defaultStoreUpgrades,
  player = defaultPlayer,
}) => {
  const upgradesAvailable = upgrades.filter((upgrade) => {
    if (upgrade.type === "click") {
      /* check the player click amount */
    } else {
      /* check the player  */
    }
  });
  const styles = {
    container: css`
      font-family: "Bamboo";
    `,
    headerWrapper: css``,
    header: css``,
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Store</h2>
      </div>
      <UpgradesPOS
        upgradesAvailable={upgradesAvailable}
        upgrades={upgrades}
        player={player}
      />
      <ItemsPOS items={items} player={player} />
    </div>
  );
};

export default Store;
