import BasePage from "./BasePage";

export default class GameModespage extends BasePage {
    constructor(pageContainer) {
        super(pageContainer);
    }

    render() {
        this.pageContainer.innerHTML = 
        `<section class="game-mode-page">
        <video autoplay muted loop>
            <source src="assets/videos/tetris-bg2.mp4" type="video/mp4">
        </video>
  
        <div class="game-mode__card">
            <div class="mode__name">
                <img src="assets/svg/singleplayer.svg" class="mode__logo"></img>
                ОДИНОЧНАЯ ИГРА
            </div>
  
            <div class="game-mode__desc">
                <img src="assets/svg/singleplayer_2.svg" class="desc__logo"></img>
                <span>
                    Сыграй в легендарный, классический Tetris, котрый вы знаете и любите!
                </span>
            </div>
  
            <a href="#classic" class="game-mode__play single-play">Играть</a>
        </div>
  
        <div class="game-mode__card">
            <div class="mode__name">
                <img src="assets/svg/multiplayer.svg" class="mode__logo"></img>
                СЕТЕВАЯ ИГРА
            </div>
  
            <div class="game-mode__desc">
                <img src="assets/svg/multiplayer_2.svg" class="desc__logo"></img>
                <span>
                    Сыграй в легендарный, классический Tetris, со своими друзьями!
                </span>
            </div>
  
            <a href="/#multiplayer" class="game-mode__play multi-play">Играть</a>
        </div>
    </section>`;
    }
}