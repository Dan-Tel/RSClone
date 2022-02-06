import GameController from "../GameController";
import PlayField from "../PlayField";
import SoundService from "../services/SoundService";
import IKeyHandlerSettings from "../settings/IKeyHandlerSettings";
import IPlayFieldSettings from "../settings/IPlayFieldSettings";
import BasePage from "./BasePage";

export default class ClassicModePage extends BasePage {

    constructor(pageConteiner) {
        super(pageConteiner)
    }

    createPlayField() {
        const playFieldSettings : IPlayFieldSettings = {
          width: 300,
          height: 600,
          columns: 10,
          rows: 20,
        };
        const soundService = new SoundService();

        const gameContainer = document.createElement('div');
        gameContainer.classList.add('game-container');
        const playField = new PlayField(gameContainer as HTMLDivElement, playFieldSettings);
        const gameController = new GameController(playField, soundService);
        playField.render(gameController.getState());


        const registerKeyHandler = (gameController: GameController, keySettings: IKeyHandlerSettings) => {
            document.addEventListener('keydown', (event) => {
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
                  gameController.movePieceDown();
                  if (gameController.isClearing) {
                    soundService.playLine();
                    gameController.playField.clearingEffect(gameController.clearingLines, true);
                    setTimeout(() => {
                      gameController.playField.clearingEffect(gameController.clearingLines, false);
                      gameController.playField.render(gameController.getState());
                    }, 250)
                  }
                  gameController.playField.render(gameController.getState());
                  break;
                default:
                  break;
              }
            });
          };

          const playerKeyHandlerSettings : IKeyHandlerSettings = {
            turnFigure: 'ArrowUp',
            moveLeft: 'ArrowLeft',
            moveRight: 'ArrowRight',
            moveDown: 'ArrowDown',
          };

          registerKeyHandler(gameController, playerKeyHandlerSettings);

        return gameContainer;
    }

    render() {
        this.pageContainer.innerHTML = '';
        this.pageContainer.appendChild(this.createPlayField());
    }
}