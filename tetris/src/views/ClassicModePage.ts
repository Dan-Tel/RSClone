import PlayFieldCreator from '../PlayfieldCreator';
import BasePage from './BasePage';
import IKeyHandlerSettings from '../settings/IKeyHandlerSettings';
import GameController from '../GameController';

export default class ClassicModePage extends BasePage {
  pageContainer: HTMLDivElement;

  constructor(pageContainer) {
    super(pageContainer);
    this.pageContainer = pageContainer;
  }

  render() {
    this.pageContainer.innerHTML = `<section class="classic-game-page">
    <video autoplay muted loop>
        <source src="assets/videos/tetris-bg3.mp4" type="video/mp4">
    </video>

    <div class="game-container">
        <div class="game__stats-container">
            <div class="game__score">0</div>
            <div class="game__lines">0</div>
            <div class="game__level">0</div>
        </div>
        <div class="game__screen"></div>
        <div class="game__next">
          <img>
        </div>
    </div>

    <div class="game-container1">
        <div class="game__stats-container">
            <div class="game__score">0</div>
            <div class="game__lines">0</div>
            <div class="game__level">0</div>
        </div>
        <div class="game__screen"></div>
        <div class="game__next">
          <img>
        </div>
    </div>

    <div class="win-screen">
        <img class="win-logo" src="assets/svg/crown.svg"></img>
        <div class="win-screen__wrapper">
            <h1>ПОЗДРАВЛЯЕМ!</h1>
            <p class="current-score">Текущий счёт: 00000</p>
            <p class="record-score">Рекордный счёт: 00000</p>
        </div>
        <a href="" class="win-screen__button">Назад</a>
    </div>

    <div class="timer-overlay">3</div>
    </section>
    `

    const playfield1 = new PlayFieldCreator(this.pageContainer, document.querySelector('.game-container'));

    const registerKeyHandler = (gameController: GameController, keySettings: IKeyHandlerSettings) => {
      document.addEventListener('keydown', (event) => {
        if (playfield1.canPlay) {
          switch (event.code) {
            case keySettings.moveLeft:
              gameController.movePieceLeft();
              gameController.playField.render(gameController.getState());
              break;
            case keySettings.turnFigure:
              gameController.rotatePiece();
              gameController.playField.render(gameController.getState());
              break;
            case keySettings.moveRight:
              gameController.movePieceRight();
              gameController.playField.render(gameController.getState());
              break;
            case keySettings.moveDown:
              playfield1.moveDown();
              break;
            default:
              break;
          }
        }
      });
    };

    const playerKeyHandlerSettings : IKeyHandlerSettings = {
      turnFigure: 'ArrowUp',
      moveLeft: 'ArrowLeft',
      moveRight: 'ArrowRight',
      moveDown: 'ArrowDown',
    };

    registerKeyHandler(playfield1.gameController, playerKeyHandlerSettings);

    playfield1.create();
  }
}
