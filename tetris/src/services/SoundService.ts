import backgroundWav from '../assets/sounds/background.wav';
import hitWav from '../assets/sounds/hit.wav';
import lineWav from '../assets/sounds/line.wav';
import selectWav from '../assets/sounds/select.wav';
import themeMP3 from '../assets/sounds/tetris-theme.mp3';
import gameoverWav from '../assets/sounds/game-over.wav';
import states from '../states';

export interface ISoundService {
  playBackground() : void;
  playHit() : void;
  playLine() : void;
  playSelect() : void;
  playTheme() : void;
}

export default class SoundService implements ISoundService {
  themeAudio: HTMLAudioElement;

  bgAudio: HTMLAudioElement;

  hitAudio: HTMLAudioElement;

  lineAudio: HTMLAudioElement;

  selectAudio: HTMLAudioElement;

  gameOverAudio: HTMLAudioElement;

  constructor() {
    this.themeAudio = new Audio(themeMP3);
    this.themeAudio.loop = true;
    this.bgAudio = new Audio(backgroundWav);
    this.hitAudio = new Audio(hitWav);
    this.lineAudio = new Audio(lineWav);
    this.selectAudio = new Audio(selectWav);
    this.gameOverAudio = new Audio(gameoverWav);
    this.changeMusicVolume();
    this.changeSfxVolume();
  }

  playBackground() : void {
    this.bgAudio.play();
  }

  playHit() : void {
    this.hitAudio = new Audio(hitWav);
    this.hitAudio.play();
  }

  playLine() : void {
    this.lineAudio.play();
  }

  playSelect() : void {
    this.selectAudio = new Audio(selectWav);
    this.selectAudio.play();
  }

  playTheme() : void {
    this.themeAudio.play();
  }

  playGameOver() : void {
    this.gameOverAudio.play();
  }

  changeSfxVolume() : void {
    this.hitAudio.volume = states.sfxVol;
    this.selectAudio.volume = states.sfxVol;
    this.lineAudio.volume = states.sfxVol;
    this.gameOverAudio.volume = states.sfxVol;
  }

  changeMusicVolume() : void {
    this.themeAudio.volume = states.musicVol;
  }
}

export const soundService = new SoundService();
