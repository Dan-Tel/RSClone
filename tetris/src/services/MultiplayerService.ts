import * as signalR from "@microsoft/signalr";
import GuidGenerator from "../helpers/GuidGenerator";
import MultiplayerFieldCreator from "../MultiplayerFieldCreator";
import PlayFieldCreator from "../PlayfieldCreator";
import { SignalRHubUrl } from "../settings/Urls";

export default class MultiplayerService {

  connectionId: string;
  constructor() {
    this.connectionId = this.GetUniqConnectionId();
  }

  private GetUniqConnectionId(): string {
    let connectionId = localStorage.getItem('connection-id');
    if (!connectionId) {
      connectionId = GuidGenerator.newGuid();
      localStorage.setItem('connection-id', connectionId);
    }
    return connectionId;
  }

  async GetSignalRConnection(myPlayField: MultiplayerFieldCreator, enemyPlayField: PlayFieldCreator): Promise<signalR.HubConnection> {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(SignalRHubUrl).build();

    connection.on('ReceiveGuidEnemy', (enemyGuid) => {
      sessionStorage.setItem('enemy', enemyGuid);
      const spinnerOverlay = document.querySelector('.spinner-overlay');
      const timerOverlay = document.querySelector('.timer-overlay');
      if(spinnerOverlay && timerOverlay) {
        spinnerOverlay.classList.add('hide');
        timerOverlay.classList.remove('hide');
      }
      myPlayField.create();
    });

    connection.on("EnemyGameStateUpdated", (gamestate) => {
      enemyPlayField.playField.render(gamestate);
    });

    connection.on("EnemyLost", (enemyScore) => {
      myPlayField.enemyScore = enemyScore;
      myPlayField.enemyIsLost = true;
      if(myPlayField.gameController.score > enemyScore) {
        myPlayField.gameOver();
        connection.invoke("SendLossMessage", sessionStorage.getItem('enemy'), myPlayField.gameController.score)
      }

      if(myPlayField.isGameOver){
        myPlayField.gameOver();
      }
    });

    try {
      await connection.start();
      console.log(localStorage.getItem('connection-id'));
      await connection.invoke("AddToGroup", localStorage.getItem('connection-id'));
    }
    catch (ex) {
      console.error(ex);
    }

    return connection;
  }
}