import BasePage from './BasePage';

export default class LeaderboardPage extends BasePage {
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
      <section class="leaderboard-page">
        <video src="assets/videos/tetris-bg5.mp4" autoplay loop></video>

        <div class="main-menu">
            <div class="main__logo"></div>
            <ul class="menu__list">
                <a href="/#home"><li class="menu__main"></li></a>
                <a href="/#shop"><li class="menu__shop"></li></a>
                <a href="/#settings"><li class="menu__settings"></li></a>
                <li class="menu__leaderboard active"></li>
            </ul>
        </div>

        <h2 class="leaderboard-title">ЛИДЕРЫ</h2>

        <ul class="leaderboard">
          <li>
            <div class="leaderboard__wrapper">
              <span class="leaderboard-rank">1</span>
              Nickname
            </div>
            <span class="leaderboard-score">10000</span>
          </li>
          <li>
            <div class="leaderboard__wrapper">
              <span class="leaderboard-rank">1</span>
              Nickname
            </div>
            <span class="leaderboard-score">10000</span>
          </li>
          <li>
            <div class="leaderboard__wrapper">
              <span class="leaderboard-rank">1</span>
              Nickname
            </div>
            <span class="leaderboard-score">10000</span>
          </li>
          <li>
            <div class="leaderboard__wrapper">
              <span class="leaderboard-rank">1</span>
              Nickname
            </div>
            <span class="leaderboard-score">10000</span>
          </li>
          <li>
            <div class="leaderboard__wrapper">
              <span class="leaderboard-rank">1</span>
              Nickname
            </div>
            <span class="leaderboard-score">10000</span>
          </li>
          <li>
            <div class="leaderboard__wrapper">
              <span class="leaderboard-rank">1</span>
              Nickname
            </div>
            <span class="leaderboard-score">10000</span>
          </li>
          <li>
            <div class="leaderboard__wrapper">
              <span class="leaderboard-rank">1</span>
              Nickname
            </div>
            <span class="leaderboard-score">10000</span>
          </li>
          <li>
            <div class="leaderboard__wrapper">
              <span class="leaderboard-rank">1</span>
              Nickname
            </div>
            <span class="leaderboard-score">10000</span>
          </li>
          <li>
            <div class="leaderboard__wrapper">
              <span class="leaderboard-rank">1</span>
              Nickname
            </div>
            <span class="leaderboard-score">10000</span>
          </li>
          <li>
            <div class="leaderboard__wrapper">
              <span class="leaderboard-rank">1</span>
              Nickname
            </div>
            <span class="leaderboard-score">10000</span>
          </li>
          <li>
            <div class="leaderboard__wrapper">
              <span class="leaderboard-rank">1</span>
              Nickname
            </div>
            <span class="leaderboard-score">10000</span>
          </li>
          <li>
            <div class="leaderboard__wrapper">
              <span class="leaderboard-rank">1</span>
              Nickname
            </div>
            <span class="leaderboard-score">10000</span>
          </li>
        </ul>
      </section>
      `;
  }

  render() {
    this.pageContainer.innerHTML = this.view;
  }
}
