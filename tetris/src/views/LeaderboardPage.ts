import UserService from '../services/UserService';
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
                <a href="/"><li class="menu__logout"></li></a>
            </ul>
        </div>

        <h2 class="leaderboard-title">ЛИДЕРЫ</h2>

        <ul class="leaderboard">
        </ul>
      </section>
      `;
  }

  async render() {
    this.pageContainer.innerHTML = this.view;
    const leaderBord = document.querySelector('.leaderboard');
    const fragment = document.createDocumentFragment();
    const leaders = await UserService.getLeaders();
    leaders.forEach(leader => {
      const li = document.createElement('li');

      const div = document.createElement('div');
      div.classList.add('leaderboard__wrapper');

      const rankSpan = document.createElement('span');
      rankSpan.classList.add('leaderboard-rank');
      rankSpan.textContent = leader.position;
      const nickNameSpan = document.createElement('span');
      nickNameSpan.textContent = leader.nickname;
      div.appendChild(rankSpan);
      div.appendChild(nickNameSpan);

      const scoreSpan = document.createElement('span');
      scoreSpan.classList.add('leaderboard-score');
      scoreSpan.textContent = leader.bestResult;

      li.appendChild(div);
      li.appendChild(scoreSpan);
      fragment.appendChild(li);
    });

    leaderBord?.append(fragment);
  }
}
