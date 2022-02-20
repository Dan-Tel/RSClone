import BasePage from './BasePage';
import states, { languages } from '../states';

export default class HomePage extends BasePage {
  view: string;

  constructor(pageContainer) {
    super(pageContainer);

    this.view = `
      <section class="preloader">
        <div class="preloader__wrapper">
          <div class='spinner'>
            <div class='spinner__block'>
              <div class='spinner__item'></div>
              <div class='spinner__item'></div>
              <div class='spinner__item'></div>
              <div class='spinner__item'></div>
              <div class='spinner__item'></div>
              <div class='spinner__item'></div>
              <div class='spinner__item'></div>
              <div class='spinner__item'></div>
            </div>
          </div>
        </div>
      </section>
      <section class="main-page">
        <video src="assets/videos/tetris-bg1.mp4" autoplay loop></video>

        <header class="main-header">
            <div class="player__name"><span class="player__level">${states.rank}</span>${states.nickname}</div>
            <div class="player__coins"><span class="coin__logo"></span>0.0</div>
        </header>

        <div class="main-container">
            <img class="tetris-logo" src="./assets/images/tetris-logo.png">
            <a href="/#modes" class="main__play-btn">${languages[states.lang].play}</a>
        </div>

        <div class="main-menu">
            <div class="main__logo"></div>
            <ul class="menu__list">
                <li class="menu__main active"></li>
                <a href="/#shop"><li class="menu__shop"></li></a>
                <a href="/#settings"><li class="menu__settings"></li></a>
                <a href="/#leaderboard"><li class="menu__leaderboard"></li></a>
            </ul>
        </div>
      </section>
      `;
  }

  render() {
    this.pageContainer.innerHTML = this.view;
    const coinsContainer = this.pageContainer.querySelector('.player__coins') as HTMLDivElement;
    coinsContainer.innerHTML = `<span class="coin__logo"></span>${states.coins}`;
  }
}
