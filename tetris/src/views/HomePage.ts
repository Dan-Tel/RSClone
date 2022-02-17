import BasePage from './BasePage';
import states from '../states';

export default class HomePage extends BasePage {
  view: string;

  constructor(pageContainer) {
    super(pageContainer);

    this.view = `
      <section class="main-page">
        <video src="assets/videos/tetris-bg1.mp4" autoplay loop></video>

        <header class="main-header">
            <div class="player__name"><span class="player__level">9</span>DanTel</div>
            <div class="player__coins"><span class="coin__logo"></span>0.0</div>
        </header>

        <div class="main-container">
            <img class="tetris-logo" src="./assets/images/tetris-logo.png">
            <a href="/#modes" class="main__play-btn">Играть</a>
        </div>

        <div class="main-menu">
            <div class="main__logo"></div>
            <ul class="menu__list">
                <li class="menu__main"></li>
                <a href="/#shop"><li class="menu__shop"></li></a>
                <li class="menu__settings"></li>
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
