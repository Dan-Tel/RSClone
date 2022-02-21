import { HubConnection } from '@microsoft/signalr';
import PlayFieldCreator from './PlayfieldCreator';
import states, { languages } from './states';
import { soundService } from './services/SoundService';

export default class MultiplayerPlayFieldCreator extends PlayFieldCreator {
  hubConnection: HubConnection | null = null;

  enemyScore: number = 0;

  enemyIsLost: boolean = false;

  constructor(pageContainer, gameContainer) {
    super(pageContainer, gameContainer);
  }

  moveDown = () => {
    if (this.hubConnection) {
      const gameState = this.gameController.getState();
      this.hubConnection.invoke('SendGameState', {
        PlayfieldBoard: gameState.playfieldBoard,
        Score: gameState.score,
        Lines: gameState.lines,
      }, sessionStorage.getItem('enemy'));
    }
    if (this.gameController.topOut && !this.isGameOver) {
      this.isGameOver = true;
      this.isWinner = true;
      this.stopTimer();

      if (this.isWinner) {
        this.hubConnection?.invoke('SendLossMessage', sessionStorage.getItem('enemy'), this.gameController.score);
        this.gameOver();
      }
    }

    this.gameController.movePieceDown();
    if (this.gameController.isClearing) {
      soundService.playLine();
      this.gameController.playField.clearingEffect(this.gameController.clearingLines, true);
      setTimeout(() => {
        this.gameController.playField.clearingEffect(this.gameController.clearingLines, false);
        this.gameController.playField.render(this.gameController.getState());
      }, 250)
    }
    this.gameController.playField.render(this.gameController.getState());
  }

  gameOver = () => {
    const gameOverScreen = this.pageContainer.querySelector('.win-screen') as HTMLDivElement;
    (gameOverScreen.querySelector('.current-score') as HTMLDivElement).textContent = `${languages[states.lang].yourResult}: ${this.gameController.score}`;

    gameOverScreen.classList.add('show');

    if (this.enemyIsLost) {
      (gameOverScreen.querySelector('.enemy-score') as HTMLDivElement).textContent = `${languages[states.lang].enemyResult}: ${this.enemyScore}`;
      if (this.gameController.score > this.enemyScore) {
        (gameOverScreen.querySelector('.win-screen__label') as HTMLDivElement).textContent = `${languages[states.lang].youWin}!`;
      } else if (this.gameController.score < this.enemyScore) {
        (gameOverScreen.querySelector('.win-screen__label') as HTMLDivElement).textContent = `${languages[states.lang].youLost}! :(`;
      } else {
        (gameOverScreen.querySelector('.win-screen__label') as HTMLDivElement).textContent = `${languages[states.lang].draw}! :(`;
      }
    } else {
      (gameOverScreen.querySelector('.win-screen__label') as HTMLDivElement).textContent = `${languages[states.lang].waitOfTheEnd}...`;
    }
  }
}
