import { HubConnection } from "@microsoft/signalr";
import PlayFieldCreator from "./PlayfieldCreator";

export default class MultiplayerPlayFieldCreator extends PlayFieldCreator {

  hubConnection: HubConnection | null = null;

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
    const winScreen = this.pageContainer.querySelector('.win-screen') as HTMLDivElement;

        (winScreen.querySelector('.current-score') as HTMLDivElement).textContent = `Текущий счёт: ${this.gameController.score}`;

        // ! Надо поменять record score на те которые в базе данных :D
        (winScreen.querySelector('.record-score') as HTMLDivElement).textContent = `Рекордный счёт: ${this.gameController.score}`;   
        winScreen.classList.add('show');
  }
}