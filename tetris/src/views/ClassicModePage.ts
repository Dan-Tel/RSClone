import PlayFieldCreator from '../PlayfieldCreator';
import BasePage from './BasePage';
import IKeyHandlerSettings from '../settings/IKeyHandlerSettings';
import GameController from '../GameController';
import states, { languages, updateStates } from '../states';

export default class ClassicModePage extends BasePage {
  pageContainer: HTMLDivElement;

  constructor(pageContainer) {
    super(pageContainer);
    this.pageContainer = pageContainer;
  }

  render() {
    this.pageContainer.innerHTML = `
    <section style="background-image: url('./assets/backgrounds/bg-${Math.floor(Math.random() * 12) + 1}.png')" class="classic-game-page">
    <a class="back-btn" href="/#modes"><img src="./assets/svg/back.svg"></a>

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

    <div class="win-screen">
        <img class="win-logo" src="assets/svg/crown.svg"></img>
        <div class="win-screen__wrapper">
            <h1>${languages[states.lang].win}!</h1>
            <p class="current-score">${languages[states.lang].currentScore}: 00000</p>
            <p class="record-score">${languages[states.lang].recordScore}: 00000</p>
        </div>
        <a href="" class="win-screen__button">${languages[states.lang].back}</a>
    </div>

    <div class="timer-overlay">3</div>
    </section>
    `

    // updateStates();
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
