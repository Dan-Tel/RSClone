import Blocks from './Blocks';
import IBlock from './interfaces';

export default class Game {
  block: Blocks;

  points: object;

  score: number;

  lines: number;

  level: number;

  playfield: number[][];

  activePiece: IBlock;

  nextPiece: IBlock;

  isClearing: boolean;

  clearingLines: Array<number>;

  constructor() {
    this.points = {
      1: 40,
      2: 100,
      3: 300,
      4: 1000,
    };
    this.score = 0;
    this.lines = 0;
    this.level = 0;
    this.playfield = this.createPlayfield();

    this.activePiece = this.createPiece();

    this.nextPiece = this.createPiece();

    this.isClearing = false;
    this.clearingLines = [];

    this.block = new Blocks();
  }

  getState() {
    const playfield: number[][] = this.createPlayfield();

    for (let y = 0; y < this.playfield.length; y += 1) {
      playfield[y] = [];

      for (let x = 0; x < this.playfield[y].length; x += 1) {
        playfield[y][x] = this.playfield[y][x];
      }
    }

    for (let y = 0; y < this.activePiece.blocks.length; y += 1) {
      for (let x = 0; x < this.activePiece.blocks[y].length; x += 1) {
        if (this.activePiece.blocks[y][x]) {
          playfield[this.activePiece.y + y][this.activePiece.x + x] = this.activePiece.blocks[y][x];
        }
      }
    }
    return {
      playfield,
      score: this.score,
      lines: this.lines,
      nextPiece: this.nextPiece,
    };
  }

  createPlayfield() {
    const playfield: number[][] = [];

    for (let y = 0; y < 20; y += 1) {
      playfield[y] = [];

      playfield[y] = new Array(10).fill(0);
    }

    return playfield;
  }

  createPiece() {
    const index = Math.floor(Math.random() * 7);
    const type = 'IJLOSTZ'[index];
    const piece = this.block.getBlock(type);
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
    this.activePiece.y += 1;

    if (this.hasCollision()) {
      const audio = new Audio('./sounds/hit.wav');
      audio.play();
      this.clearingLines = [];
      this.activePiece.y -= 1;
      this.lockPiece();
      this.updatePieces();
      this.updateScore(this.clearLines());
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
          && ((this.playfield[y + i] === undefined || this.playfield[y + i][x + j] === undefined)
          || this.playfield[y + i][x + j])) {
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
          this.playfield[this.activePiece.y + y][this.activePiece.x + x] = block[y][x];
        }
      }
    }
  }

  clearLines() {
    const rows = 20;
    const columns = 10;

    const lines: Array<number> = [];

    for (let y = rows - 1; y >= 0; y -= 1) {
      let numberOfBlocks = 0;

      for (let x = 0; x < columns; x += 1) {
        if (this.playfield[y][x]) {
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

    // console.log(this.isClearing);
    setTimeout(() => {
      this.clearingAnimation(lines);
      this.isClearing = false;
    }, 250);
    return lines.length;
  }

  clearingAnimation(lines) {
    if (!this.isClearing) {
      return;
    }
    for (const index of lines) {
      this.playfield.splice(index, 1);
      this.playfield.unshift(new Array(10).fill(0));
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
