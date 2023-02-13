import { css } from "@emotion/css";

const Achievement = ({ achievement }) => {
  const styles = {
    achievementWrapper: css`
      display: flex;
    `,
  };

  return (
    <div
      className={styles.achievementWrapper}
      data-description={achievement.description}
      data-achieved={achievement.achieved.date}
    >
      <img {...achievement.img} />
      {achievement.name}
    </div>
  );
};

const AchievementList = (props) => {
  return (
    <>
      <button
        type="button"
        className="collapseShow"
        data-collapseid="#achievementContainer"
      >
        <h1>Achievements</h1>
      </button>
      <div id="achievementContainer" className="collapse">
        {props.achievements.map((cheeve, i) => (
          <Achievement key={i} achievement={cheeve} />
        ))}
      </div>
    </>
  );
};
export default AchievementList;
