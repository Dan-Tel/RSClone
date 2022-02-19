import states, { languages } from '../states';
import BasePage from './BasePage';

export default class GameModespage extends BasePage {
  constructor(pageContainer) {
    super(pageContainer);
  }

  render() {
    this.pageContainer.innerHTML = `<section class="game-mode-page">
        <video autoplay muted loop>
            <source src="assets/videos/tetris-bg2.mp4" type="video/mp4">
        </video>

        <a class="back-btn" href="/#home"><img src="./assets/svg/back.svg"></a>
  
        <div class="game-mode__card">
            <div class="mode__name">
                <img src="assets/svg/singleplayer.svg" class="mode__logo"></img>
                ${languages[states.lang].singlePlayer}
            </div>
  
            <div class="game-mode__desc">
                <img src="assets/svg/singleplayer_2.svg" class="desc__logo"></img>
                <span>
                    ${languages[states.lang].singlePlayerDesc}
                </span>
            </div>
  
            <a href="#classic" class="game-mode__play single-play">${languages[states.lang].play}</a>
        </div>
  
        <div class="game-mode__card">
            <div class="mode__name">
                <img src="assets/svg/multiplayer.svg" class="mode__logo"></img>
                ${languages[states.lang].multiPlayer}
            </div>
  
            <div class="game-mode__desc">
                <img src="assets/svg/multiplayer_2.svg" class="desc__logo"></img>
                <span>
                    ${languages[states.lang].multiPlayerDesc}
                </span>
            </div>
  
            <a href="/#multiplayer" class="game-mode__play multi-play">${languages[states.lang].play}</a>
        </div>
    </section>`;
  }
}
