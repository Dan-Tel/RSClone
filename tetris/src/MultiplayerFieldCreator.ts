import { HubConnection } from "@microsoft/signalr";
import PlayFieldCreator from "./PlayfieldCreator";

export default class MultiplayerPlayFieldCreator extends PlayFieldCreator {

  hubConnection: HubConnection | null = null;
  enemyScore: number = 0;
  enemyIsLost: boolean = false;
  constructor(pageContainer, gameContainer) {
    super(pageContainer, gameContainer);
  }

  // initHubConnection(hubConnection) {
  //   this.hubConnection = hubConnection();
  //   this.hubConnection?.on('EnemyIsLose', (score) => {
  //     sessionStorage.setItem('enemy', enemyGuid);
  //     myPlayField.create();
  //   });
  // } 

  moveDown = () => {
      if(this.hubConnection) {
        const gameState = this.gameController.getState();
        this.hubConnection.invoke('SendGameState', {
          PlayfieldBoard: gameState.playfieldBoard,
          Score: gameState.score,
          Lines: gameState.lines
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
        this.soundService.playLine();
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
    (gameOverScreen.querySelector('.current-score') as HTMLDivElement).textContent = `Ваш результат: ${this.gameController.score}`;
 
    gameOverScreen.classList.add('show');
    
    if(this.enemyIsLost) {
      (gameOverScreen.querySelector('.enemy-score') as HTMLDivElement).textContent = `Результат соперника: ${this.enemyScore}`;
      if(this.gameController.score > this.enemyScore) {
        (gameOverScreen.querySelector('.win-screen__label') as HTMLDivElement).textContent = 'Вы победили!';
      } else if (this.gameController.score < this.enemyScore){
        (gameOverScreen.querySelector('.win-screen__label') as HTMLDivElement).textContent = 'Вы проиграли :(';
      } else {
        (gameOverScreen.querySelector('.win-screen__label') as HTMLDivElement).textContent = 'Ничья!';
      }
    }
    else {
      (gameOverScreen.querySelector('.win-screen__label') as HTMLDivElement).textContent = 'Ожидайте окончания игры';
    }
  }
}