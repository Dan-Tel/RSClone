import Blocks from './Blocks';
import clearingAnimationTimeOut from './Constants';
import IBlock from './interfaces';
import PlayField from './PlayField';
import ISoundService from './services/SoundService';

export default class GameController {
  block: Blocks;

  playField: PlayField;

  points: object;

  score: number;

  lines: number;

  level: number;

  topOut: boolean;

  playfieldBoard: number[][];

  activePiece: IBlock;

  nextPiece: IBlock;

  isClearing: boolean;

  clearingLines: Array<number>;

  soundService: ISoundService;

  constructor(playField, soundService: ISoundService) {
    this.playField = playField;
    this.block = new Blocks();
    this.soundService = soundService;

    this.points = {
      1: 40,
      2: 100,
      3: 300,
      4: 1000,
    };
    this.score = 0;
    this.lines = 0;
    this.level = 0;

    this.topOut = false;

    this.playfieldBoard = this.createPlayfield();

    this.activePiece = this.createPiece();

    this.nextPiece = this.createPiece();

    this.isClearing = false;
    this.clearingLines = [];
  }

  getState() {
    const playfieldBoard: number[][] = this.createPlayfield();

    for (let y = 0; y < this.playfieldBoard.length; y += 1) {
      playfieldBoard[y] = [];

      for (let x = 0; x < this.playfieldBoard[y].length; x += 1) {
        playfieldBoard[y][x] = this.playfieldBoard[y][x];
      }
    }

    for (let y = 0; y < this.activePiece.blocks.length; y += 1) {
      for (let x = 0; x < this.activePiece.blocks[y].length; x += 1) {
        if (this.activePiece.blocks[y][x]) {
          // eslint-disable-next-line max-len
          playfieldBoard[this.activePiece.y + y][this.activePiece.x + x] = this.activePiece.blocks[y][x];
        }
      }
    }
    return {
      playfieldBoard,
      score: this.score,
      lines: this.lines,
      nextPiece: this.nextPiece,
    };
  }

  createPlayfield() {
    const playfieldBoard: number[][] = [];
    for (let y = 0; y < this.playField.playFieldSettings.rows; y += 1) {
      playfieldBoard[y] = [];

      playfieldBoard[y] = new Array(this.playField.playFieldSettings.columns).fill(0);
    }
    return playfieldBoard;
  }

  createPiece() {
    const blockOptions = 'IJLOSTZ';
    const blockLetter = Math.floor(Math.random() * blockOptions.length);
    const blockType = blockOptions[blockLetter];
    const piece = this.block.getBlock(blockType);
    return piece;
  }

  movePieceLeft() {
    this.activePiece.x -= 1;

    if (this.hasCollision()) {
      this.activePiece.x += 1;
    }
  }

  movePieceRight() {
    this.activePiece.x += 1;

    if (this.hasCollision()) {
      this.activePiece.x -= 1;
    }
  }

  movePieceDown() {
    if (this.topOut) return;

    this.activePiece.y += 1;

    if (this.hasCollision()) {
      this.soundService.playHit();
      this.clearingLines = [];
      this.activePiece.y -= 1;
      this.lockPiece();
      this.updatePieces();
      this.updateScore(this.clearLines());
    }

    if (this.hasCollision()) {
      this.topOut = true;
    }
  }

  rotatePiece() {
    const { blocks } = this.activePiece;
    const { length } = blocks;

    const temp: number[][] = [];
    for (let i = 0; i < length; i += 1) {
      temp[i] = new Array(length).fill(0);
    }

    for (let y = 0; y < length; y += 1) {
      for (let x = 0; x < length; x += 1) {
        temp[x][y] = blocks[length - 1 - y][x];
      }
    }

    this.activePiece.blocks = temp;

    if (this.hasCollision()) {
      this.activePiece.blocks = blocks;
    }
  }

  hasCollision() {
    const { x, y, blocks } = this.activePiece;

    for (let i = 0; i < blocks.length; i += 1) {
      for (let j = 0; j < blocks[i].length; j += 1) {
        if (blocks[i][j]
          && (
            (this.playfieldBoard[y + i] === undefined
              || this.playfieldBoard[y + i][x + j] === undefined)
          || this.playfieldBoard[y + i][x + j])) {
          return true;
        }
      }
    }
    return false;
  }

  lockPiece() {
    const block = this.activePiece.blocks;

    for (let y = 0; y < block.length; y += 1) {
      for (let x = 0; x < block[y].length; x += 1) {
        if (block[y][x]) {
          this.playfieldBoard[this.activePiece.y + y][this.activePiece.x + x] = block[y][x];
        }
      }
    }
  }

  clearLines() {
    const { rows, columns } = this.playField.playFieldSettings;

    const lines: Array<number> = [];

    for (let y = rows - 1; y >= 0; y -= 1) {
      let numberOfBlocks = 0;

      for (let x = 0; x < columns; x += 1) {
        if (this.playfieldBoard[y][x]) {
          numberOfBlocks += 1;
        }
      }

      if (numberOfBlocks === 0) {
        break;
      } else if (numberOfBlocks === columns) {
        if (!this.isClearing) {
          this.isClearing = true;
        }
        lines.unshift(y);
      }
    }

    this.clearingLines = lines;
    setTimeout(() => {
      this.clearingAnimation(lines);
      this.isClearing = false;
    }, clearingAnimationTimeOut);
    return lines.length;
  }

  clearingAnimation(lines) {
    if (!this.isClearing) {
      return;
    }
    for (const index of lines) {
      this.playfieldBoard.splice(index, 1);
      this.playfieldBoard.unshift(new Array(this.playField.playFieldSettings.columns).fill(0));
    }
  }

  updateScore(clearedLines) {
    if (clearedLines > 0) {
      this.score += this.points[clearedLines];
      this.lines += clearedLines;
    }
  }

  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }
}
