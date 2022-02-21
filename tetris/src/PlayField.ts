import IPlayFieldSettings from './settings/IPlayFieldSettings';
import states, { languages } from './states';

// TODO: после того, как будет расскоментирован код, интерфейс надо перенести в interfaces.ts
export interface IPlayField {
  playFieldSettings: IPlayFieldSettings;

  cells: Element[];

  width: number;
  height: number;

  blockWidth: number;
  blockHeight: number;

  // nextFigureContainer: HTMLImageElement, TODO: временно закоментировал, надо поправить стил
  gameContainer: HTMLDivElement;
  scoreContainer: HTMLDivElement;
  linesContainer: HTMLDivElement;
  levelContainer: HTMLDivElement;

  playFieldBoard: HTMLDivElement;
}

export default class PlayField implements IPlayField {
  playFieldSettings: IPlayFieldSettings;

  blockWidth: number;

  blockHeight: number;

  gameContainer: HTMLDivElement;

  width: number;

  height: number;

  playFieldBoard: HTMLDivElement;

  // TODO: временно закоментировал, надо поправить стили
  // nextFigureContainer: HTMLImageElement;

  scoreContainer: HTMLDivElement;

  linesContainer: HTMLDivElement;

  levelContainer: HTMLDivElement;

  cells: HTMLElement[];

  constructor(playFieldContainer: HTMLDivElement, playFieldSettings: IPlayFieldSettings) {
    this.gameContainer = playFieldContainer;

    // Создание контейнеров для поля игры
    // const statsContainer = document.createElement('div');
    // statsContainer.classList.add('game__stats-container');
    const statsContainer = this.gameContainer.querySelector('.game__stats-container') as HTMLElement;

    // const scoreContainer = document.createElement('div');
    // scoreContainer.classList.add('game__score');
    const scoreContainer = statsContainer.querySelector('.game__score') as HTMLDivElement;

    // const linesContainer = document.createElement('div');
    // linesContainer.classList.add('game__lines');
    const linesContainer = statsContainer.querySelector('.game__lines') as HTMLDivElement;

    // const levelContainer = document.createElement('div');
    // levelContainer.classList.add('game__level');
    const levelContainer = statsContainer.querySelector('.game__level') as HTMLDivElement;

    // const gameScreenContainer = document.createElement('div');
    // gameScreenContainer.classList.add('game__screen');
    const gameScreenContainer = this.gameContainer.querySelector('.game__screen') as HTMLDivElement;
    // gameScreenContainer.style.height = `${playFieldSettings.height}px`;
    // gameScreenContainer.style.width = `${playFieldSettings.width}px`;

    // statsContainer.appendChild(scoreContainer);
    // statsContainer.appendChild(linesContainer);
    // statsContainer.appendChild(levelContainer);

    // playFieldContainer.appendChild(statsContainer);
    // playFieldContainer.appendChild(gameScreenContainer);

    this.playFieldSettings = playFieldSettings;

    this.width = playFieldSettings.width;
    this.height = playFieldSettings.height;

    this.playFieldBoard = gameScreenContainer;

    this.blockWidth = this.width / playFieldSettings.columns;
    this.blockHeight = this.height / playFieldSettings.rows;

    this.scoreContainer = scoreContainer;
    this.linesContainer = linesContainer;
    this.levelContainer = levelContainer;
    // TODO: временно закоментировал, надо поправить стили
    // this.nextFigureContainer = nextFigureImg;

    this.cells = [];
    for (let i = 0; i < this.playFieldSettings.rows * this.playFieldSettings.columns; i += 1) {
      const cell = document.createElement('div');
      cell.className = 'game__cell';
      cell.style.width = `${this.blockWidth}px`;
      cell.style.height = `${this.blockHeight}px`;

      this.cells.push(cell);
      this.playFieldBoard.append(cell);
    }
  }

  render(state) {
    this.clearScreen();
    this.renderPlayfield(state);
    this.renderPanel(state);

    const nextFigureImg = this.gameContainer.querySelector('.game__next img') as HTMLImageElement;
    nextFigureImg.src = `../assets/images/next-${'IJLOSTZ'.indexOf(state.nextPiece.blockType) + 1}.png`;
  }

  clearScreen() {
    this.cells.forEach((cell) => {
      // eslint-disable-next-line no-param-reassign
      cell.style.backgroundImage = '';
    })
  }

  renderPanel({ score, lines, level = 0 /* , nextPiece */ }) {
    this.scoreContainer.textContent = score;
    this.linesContainer.innerHTML = `${languages[states.lang].lines}:<br>${lines}`;
    this.levelContainer.innerHTML = `${languages[states.lang].level}:<br>${level}`;
    // TODO: временно закоментировал, надо поправить стили
    // this.nextFigureContainer.src = `./assets/images/next-${nextPiece.blocks[1][1]}.png`;
  }

  clearingEffect(lines, flag) {
    for (let i = 0; i < lines.length; i += 1) {
      for (let j = 0; j < this.playFieldSettings.columns; j += 1) {
        const block = this.cells[lines[i] * this.playFieldSettings.columns + j];
        if (flag) {
          if (!block.classList.contains('effect')) {
            block.classList.add('effect');
          } 
        } else {
          block.classList.remove('effect');
        }
      }
    }
  }

  renderPlayfield({ playfieldBoard }) {
    for (let y = 0; y < playfieldBoard.length; y += 1) {
      const line = playfieldBoard[y];

      for (let x = 0; x < line.length; x += 1) {
        const block = line[x];

        if (block) {
          const cell = this.cells[y * this.playFieldSettings.columns + x];
          cell.style.backgroundImage = `url('./assets/images/${states.selectedSkin}_${block}.png')`;
        }
      }
    }
  }
}
