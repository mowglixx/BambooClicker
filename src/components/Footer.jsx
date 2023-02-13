import { version } from "../../package.json";

const Footer = () => {
  const copyYear = new Date();
  return (
    <footer>
      <p id="version">
        BambooClicker {version} &copy;{copyYear.getFullYear()}
        <br />A project by&nbsp;
        <a href="https://github.com/Kuboxxxxx/ClickerGame">Jakub</a>
        <br />
        forked by&nbsp;
        <a href="https://github.com/mowglixx/BambooClicker">Dan</a>
      </p>
    </footer>
  );
};

export default Footer;
