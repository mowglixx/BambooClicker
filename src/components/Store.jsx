import { css } from "@emotion/css";

const costMultiplier = ({ baseCost, multiplier }, amountOwned = 1) => {
  return (
    amountOwned
      ? Math.ceil((baseCost * multiplier) ** amountOwned).toLocaleString()
      : baseCost
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
const StoreItem = ({ item, amountOwned, player }) => {
  const styles = {
    storeItem: css`
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: start;
      transition: ease 0.1s;
      &:hover {
        transform: scale(1.05);
      }
      &:active {
        transform: scale(1.01);
      }
      &.disabled {
        filter: greyscale(1);
      }
    `,
    storeItemImageWrapper: css``,
    storeItemImage: css``,
  };

  return (
    <button className={[styles.storeItem, "disabled"]}>
      <div className={styles.storeItemImageWrapper}>
        <img src={item.img.src} alt={item.img.alt} className="storeItemImage" />
      </div>
      <div className="itemNameWrapper">
        <div className="itemName">{item.name}</div>
        <div className="itemCost">
          <span className="itemCostCurrency">B</span>
          {costMultiplier(item, player.items[item.id]?.owned)}
        </div>
      </div>
    </button>
  );
};

const Store = ({ items = [], upgrades = [], player }) => {
  const upgradesAvailable = upgrades.filter((upgrade) => upgrade);

  return (
    <div className="storeWrapper">
      <div className="storeHeader">
        <h2>Store</h2>
      </div>
      <div id="upgradeContainer">
        {upgradesAvailable.length
          ? upgrades.map((item) => (
              <StoreUpgrade
                key={item.itemName}
                upgrade={item}
                player={player}
              />
            ))
          : `No Upgrades Available`}
      </div>
      <div id="shopContainer">
        {items.length
          ? items.map((item) => (
              <StoreItem key={item.itemName} item={item} player={player} />
            ))
          : `No Items Available`}
      </div>
    </div>
  );
};

export default Store;
