import BasePage from "./BasePage";

export default class HomePage extends BasePage {
    view: string;

    constructor(pageContainer) {
      super(pageContainer);

      this.view = `
      <section class="main-page">
        <video src="assets/videos/tetris-bg1.mp4" autoplay loop></video>

        <header class="main-header">
            <div class="player__name"><span class="player__level">1</span>Nickname</div>
            <div class="player__coins"><span class="coin__logo"></span>0.0</div>
        </header>

        <div class="main-container">
            <a href="#modes" class="main__play-btn">Играть</a>
        </div>

        <div class="main-menu">
            <div class="main__logo"></div>
            <ul class="menu__list">
                <li class="menu__main"></li>
                <li class="menu__shop"></li>
                <li class="menu__themes"></li>
                <li class="menu__settings"></li>
            </ul>
        </div>
      </section>
      `;
    }
  
    render() {
      this.pageContainer.innerHTML = this.view;
    }
  }
  