import backgroundWav from '../assets/sounds/background.wav';
import hitWav from '../assets/sounds/hit.wav';
import lineWav from '../assets/sounds/line.wav';

export interface ISoundService {
  playBackground() : void;
  playHit() : void;
  playLine() : void;
}

export default class SoundService implements ISoundService {
  bgAudio: HTMLAudioElement;

  hitAudio: HTMLAudioElement;

  lineAudio: HTMLAudioElement;

  constructor() {
    this.bgAudio = new Audio(backgroundWav);
    this.hitAudio = new Audio(hitWav);
    this.lineAudio = new Audio(lineWav);
  }

  playBackground() : void {
    this.bgAudio.volume = 0.5;
    this.bgAudio.play();
  }

  playHit() : void {
    this.bgAudio.volume = 0.5;
    this.hitAudio.play();
  }

  playLine() : void {
    this.lineAudio.volume = 0.5;
    this.hitAudio.play();
  }
}
