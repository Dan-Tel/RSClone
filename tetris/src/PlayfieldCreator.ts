import GameController from './GameController';
import PlayField from './PlayField';
import SoundService from './services/SoundService';
import UserService from './services/UserService';
import IPlayFieldSettings from './settings/IPlayFieldSettings';
import states, { languages } from './states';

export default class PlayFieldCreator {
  pageContainer: HTMLDivElement;

  gameContainer: HTMLDivElement;

  isGameOver: boolean;

  playFieldSettings: IPlayFieldSettings;

  soundService: SoundService;

  playField: PlayField;

  gameController: GameController;

  canPlay: boolean;

  isWinner: boolean = false;

  movingDownInterval: NodeJS.Timer | null = null;

  constructor(pageContainer, gameContainer) {
    this.pageContainer = pageContainer;
    this.gameContainer = gameContainer;
    this.isGameOver = false;

    this.playFieldSettings = {
      width: 300,
      height: 600,
      columns: 10,
      rows: 20,
    };
    this.soundService = new SoundService();
    this.playField = new PlayField(this.gameContainer as HTMLDivElement, this.playFieldSettings);
    this.gameController = new GameController(this.playField, this.soundService);

    this.canPlay = false;
  }

  stopTimer = () => {
    if (this.movingDownInterval && this.isGameOver) {
      clearInterval(this.movingDownInterval);
      this.movingDownInterval = null;
    }
  }

  startTimer = () => {
    if (!this.movingDownInterval && !this.isGameOver) {
      this.movingDownInterval = setInterval(() => this.moveDown(), 800);
    }
  }

  gameOver = () => {
    const winScreen = this.pageContainer.querySelector('.win-screen') as HTMLDivElement;

    (winScreen.querySelector('.current-score') as HTMLDivElement).textContent = `${languages[states.lang].currentScore}: ${this.gameController.score}`;
    (winScreen.querySelector('.record-score') as HTMLDivElement).textContent = `${languages[states.lang].recordScore}: ${this.gameController.score > states.bestResult ? this.gameController.score : states.bestResult}`;
    if(this.gameController.score > states.bestResult) {
      UserService.updateBestResult(this.gameController.score);
    }
    states.coins += this.gameController.score / 2
    winScreen.classList.add('show');
  }

  moveDown = () => {
    if (this.gameController.topOut && !this.isGameOver) {
      this.isGameOver = true;
      this.isWinner = true;
      this.stopTimer();

      if (this.isWinner) {
        this.gameOver();
      }
    }

    this.gameController.movePieceDown();
    if (this.gameController.isClearing) {
      this.soundService.playLine();
      this.gameController.playField.clearingEffect(this.gameController.clearingLines, true);
      setTimeout(() => {
        this.gameController.playField.clearingEffect(this.gameController.clearingLines, false);
        this.gameController.playField.render(this.gameController.getState());
      }, 250)
    }
    this.gameController.playField.render(this.gameController.getState());
  }

  createPlayField() {
    let countDown = 3;

    const countInterval = setInterval(() => {
      const timer = this.pageContainer.querySelector('.timer-overlay') as HTMLDivElement;
      if (countDown <= 0) {
        this.canPlay = true;

        clearInterval(countInterval);
        timer.classList.add('hide');

        this.startTimer();
      }
      timer.textContent = `${countDown}`;
      countDown -= 1;
    }, 1000)

    window.addEventListener('hashchange', () => {
      this.isGameOver = true;
      this.stopTimer();
      clearInterval(countInterval);
    });
  }

  create() {
    this.createPlayField();
  }
}
