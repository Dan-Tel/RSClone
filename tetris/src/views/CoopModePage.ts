import PlayFieldCreator from '../PlayfieldCreator';
import BasePage from './BasePage';
import IKeyHandlerSettings from '../settings/IKeyHandlerSettings';
import GameController from '../GameController';
import states, { languages, updateStates } from '../states';

export default class CoopModePage extends BasePage {
  pageContainer: HTMLDivElement;

  constructor(pageContainer) {
    super(pageContainer);
    this.pageContainer = pageContainer;
  }

  render() {
    this.pageContainer.innerHTML = `
    <section style="background-image: url('./assets/backgrounds/bg-${Math.floor(Math.random() * 12) + 1}.png')" class="coop-game-page">
    <a class="back-btn" href="/#modes"><img src="./assets/svg/back.svg"></a>

    <div class="coop-container">
      <div class="player1-container">
          <div class="game__stats-container">
              <div class="game__score">0</div>
              <div class="game__lines">${languages[states.lang].lines}:<br>0</div>
              <div class="game__level">${languages[states.lang].level}:<br>0</div>
          </div>
          <div class="game__screen"></div>
          <div class="game__next">
            <img>
          </div>
      </div>

      <div class="player2-container">
          <div class="game__stats-container">
              <div class="game__score">0</div>
              <div class="game__lines">${languages[states.lang].lines}:<br>0</div>
              <div class="game__level">${languages[states.lang].level}:<br>0</div>
          </div>
          <div class="game__screen"></div>
          <div class="game__next">
            <img>
          </div>
      </div>
    </div>

    <div class="win-screen">
        <img class="win-logo" src="assets/svg/crown.svg"></img>
        <div class="win-screen__wrapper">
            <h1>${languages[states.lang].gameOver}!</h1>
            <p class="current1-score">${languages[states.lang].firstPlayerScore}: 00000</p>
            <p class="current2-score">${languages[states.lang].secondPlayerScore}: 00000</p>
        </div>
        <a href="/#home" class="win-screen__button">${languages[states.lang].back}</a>
    </div>

    <div class="timer-overlay">3</div>
    </section>
    `

    // updateStates();
    const playfield1 = new PlayFieldCreator(this.pageContainer, document.querySelector('.player1-container'));
    const playfield2 = new PlayFieldCreator(this.pageContainer, document.querySelector('.player2-container'));

    const winScreen = document.querySelector('.win-screen') as HTMLDivElement;
    let isOneLost = false;

    const options = {
      attributes: true,
      attributeFilter: ['class'],
    }

    function callback(mutationList, observer) {
      if (!isOneLost) {
        mutationList.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (!playfield1.isGameOver || !playfield2.isGameOver) {
              winScreen.classList.remove('show');
              isOneLost = true;
            }
          }
        })
      } else {
        (winScreen.querySelector('.current1-score') as HTMLElement).innerHTML = `${languages[states.lang].firstPlayerScore}:<br>${playfield1.gameController.score}`;
        (winScreen.querySelector('.current2-score') as HTMLElement).innerHTML = `${languages[states.lang].secondPlayerScore}:<br>${playfield2.gameController.score}`;
      }
    }

    const observer = new MutationObserver(callback)
    observer.observe(winScreen, options)

    const registerKeyHandler = (gameController: GameController, keySettings: IKeyHandlerSettings, playfield: PlayFieldCreator) => {
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
              playfield.moveDown();
              break;
            default:
              break;
          }
        }
      });
    };

    const player2KeyHandlerSettings : IKeyHandlerSettings = {
      turnFigure: 'KeyW',
      moveLeft: 'KeyA',
      moveRight: 'KeyD',
      moveDown: 'KeyS',
    };

    const player1KeyHandlerSettings : IKeyHandlerSettings = {
      turnFigure: 'ArrowUp',
      moveLeft: 'ArrowLeft',
      moveRight: 'ArrowRight',
      moveDown: 'ArrowDown',
    };

    registerKeyHandler(playfield1.gameController, player1KeyHandlerSettings, playfield1);
    registerKeyHandler(playfield2.gameController, player2KeyHandlerSettings, playfield2);

    playfield1.create();
    playfield2.create();
  }
}
