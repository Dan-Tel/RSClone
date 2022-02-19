import GameController from "../GameController";
import PlayFieldCreator from "../PlayfieldCreator";
import IKeyHandlerSettings from "../settings/IKeyHandlerSettings";
import BasePage from "./BasePage";
import * as signalR from "@microsoft/signalr";
import { FindEnemyUrl, SignalRHubUrl } from "../settings/Urls";
import MultiplayerService from "../services/MultiplayerService";
import MultiplayerFieldCreator from "../MultiplayerFieldCreator";



export default class MultiplayerPage extends BasePage {
  // view: string;
  multiplayerService: MultiplayerService;
  gameIsOver: boolean;
  enemyScore: number;

  constructor(pageContainer, multiplayerService) {
    super(pageContainer);
    this.multiplayerService = multiplayerService;
    this.gameIsOver = false;
    this.enemyScore = 0;
  }

  findEnemy() {
    fetch(`${FindEnemyUrl}/?groupGuid=${this.multiplayerService.connectionId}`, {
      headers: {
        'mode': 'cors'  
      }
    });
  }

  async render() {
    this.pageContainer.innerHTML = `
        <section style="background-image: url('./assets/backgrounds/bg-${Math.floor(Math.random() * 12) + 1}.png')" class="multiplayer-game-page">
        <a class="back-btn" href="/#modes"><img src="./assets/svg/back.svg"></a>
        
        <div class="multiplayer-container">
            <div class="game-container enemy-game-container">
                <div class="game__stats-container">
                    <div class="game__score">0</div>
                    <div class="game__lines">0</div>
                    <div class="game__level">0</div>
                </div>
                <div class="game__screen"></div>
            </div>

            <div class="game-container my-game-container">
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
        </div>
        
    
        <div class="win-screen">
            <img class="win-logo" src="assets/svg/crown.svg"></img>
            <div class="win-screen__wrapper">
                <h1 class="win-screen__label"></h1>
                <p class="current-score">Ваш счёт: 00000</p>
                <p class="enemy-score"></p>
            </div>
            <a href="" class="win-screen__button">Назад</a>
        </div>
    
        <div class="timer-overlay hide">3</div>
        <div class="spinner-overlay">
          <p class="spinner-label">We are trying to find an opponent for you</p>
          <div class='spinner'>
            <div class='spinner__block'>
                <div class='spinner__item'></div>
                <div class='spinner__item'></div>
                <div class='spinner__item'></div>
                <div class='spinner__item'></div>
                <div class='spinner__item'></div>
                <div class='spinner__item'></div>
                <div class='spinner__item'></div>
                <div class='spinner__item'></div>
            </div>
          </div>
        </div>
        </section>
        `

    const myPlayField = new MultiplayerFieldCreator(this.pageContainer, document.querySelector('.my-game-container'));
    const enemyPlayField = new PlayFieldCreator(this.pageContainer, document.querySelector('.enemy-game-container'));
    const connection = await this.multiplayerService.GetSignalRConnection(myPlayField, enemyPlayField);
    myPlayField.hubConnection = connection;
    this.findEnemy();

    const registerKeyHandler = (gameController: GameController, keySettings: IKeyHandlerSettings) => {
      document.addEventListener('keydown', (event) => {

        const gameState = myPlayField.gameController.getState();
        connection.invoke('SendGameState', {
          PlayfieldBoard: gameState.playfieldBoard,
          Score: gameState.score,
          Lines: gameState.lines
        }, sessionStorage.getItem('enemy'));

        if (myPlayField.canPlay) {
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
              myPlayField.moveDown();
              break;
            default:
              break;
          }
        }
      });
    };

    const playerKeyHandlerSettings: IKeyHandlerSettings = {
      turnFigure: 'ArrowUp',
      moveLeft: 'ArrowLeft',
      moveRight: 'ArrowRight',
      moveDown: 'ArrowDown',
    };

    registerKeyHandler(myPlayField.gameController, playerKeyHandlerSettings);
  }
}
