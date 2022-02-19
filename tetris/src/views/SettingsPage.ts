import { tns } from 'tiny-slider';
import states, { languages } from '../states';
import BasePage from './BasePage';

export default class SettingsPage extends BasePage {
  view: string;

  constructor(pageContainer) {
    super(pageContainer);

    this.view = `
      <section class="settings-page">
        <video src="assets/videos/tetris-bg3.mp4" autoplay loop></video>

        <div class="main-menu">
            <div class="main__logo"></div>
            <ul class="menu__list">
                <a href="/#home"><li class="menu__main"></li></a>
                <a href="/#shop"><li class="menu__shop"></li></a>
                <li class="menu__settings"></li>
            </ul>
        </div>

        <div class="settings-container">
          <h2 class="settings-title music-title">${languages[states.lang].soundSettings}</h2>

          <div class="music-settings__wrapper">
            <h4 class="music-settings__title">${languages[states.lang].musicVol}</h4>
            <input class="music-volume" type="range" min="0" max="10" value="5">
          </div>

          <div class="sfx-settings__wrapper">
            <h4 class="sfx-settings__title">${languages[states.lang].sfxVol}</h4>
            <input class="sfx-volume" type="range" min="0" max="10" value="5">
          </div>
          
          <h2 class="settings-title language-title">${languages[states.lang].language}</h2>
          <div id="language-slider">
            <div>
              <div class="lang-box">
                <div class="lang-img lang-it"></div>
                <p class="lang-title">Italiano</p>
              </div>
            </div>
            <div>
              <div class="lang-box">
                <div class="lang-img lang-de"></div>
                <p class="lang-title">Deutsch</p>
              </div>
            </div>
            <div>
              <div class="lang-box">
                <div class="lang-img lang-en"></div>
                <p class="lang-title">English</p>
              </div>
            </div>
            <div>
              <div class="lang-box">
                <div class="lang-img lang-ru"></div>
                <p class="lang-title">Русский</p>
              </div>
            </div>
            <div>
              <div class="lang-box">
                <div class="lang-img lang-be"></div>
                <p class="lang-title">Беларускі</p>
              </div>
            </div>
            <div>
              <div class="lang-box">
                <div class="lang-img lang-kz"></div>
                <p class="lang-title">Қазақша</p>
              </div>
            </div>
            <div>
              <div class="lang-box">
                <div class="lang-img lang-uk"></div>
                <p class="lang-title">Український</p>
              </div>
            </div>
          </div>

        </div>

      </section>
      `;
  }

  render() {
    this.pageContainer.innerHTML = this.view;

    function volumeRangeUpdate(sound: HTMLInputElement, soundVol: string, color: string) {
      const value = sound.valueAsNumber;
      // eslint-disable-next-line no-param-reassign
      sound.style.background = `linear-gradient(to right, ${color} 0 ${value * 10}%, #ffffff ${value * 10}% 100%)`;

      states[soundVol] = value / 10;
    }

    const sfxVolume = document.querySelector('.sfx-volume') as HTMLInputElement;
    sfxVolume.valueAsNumber = states.sfxVol * 10;
    volumeRangeUpdate(sfxVolume, 'sfxVol', '#80d2ff');
    sfxVolume.addEventListener('input', () => volumeRangeUpdate(sfxVolume, 'sfxVol', '#80d2ff'));

    const musicVolume = document.querySelector('.music-volume') as HTMLInputElement;
    musicVolume.valueAsNumber = states.musicVol * 10;
    volumeRangeUpdate(musicVolume, 'musicVol', '#ff78e9');
    musicVolume.addEventListener('input', () => volumeRangeUpdate(musicVolume, 'musicVol', '#ff78e9'));

    const langs = ['it', 'de', 'en', 'ru', 'be', 'kz', 'uk'];

    const langSlider = tns({
      container: '#language-slider',
      loop: false,
      mouseDrag: true,
      slideBy: 'page',
      fixedWidth: 150,
      gutter: 50,
      swipeAngle: false,
      speed: 400,
      center: true,
      controls: false,
      nav: false,
    });
    langSlider.goTo(langs.indexOf(states.lang))

    const allLangBoxes = document.querySelectorAll('.lang-box');
    allLangBoxes[langs.indexOf(states.lang)].classList.add('selected');

    langSlider.events.on('indexChanged', () => {
      const langIndex = langSlider.getInfo().index;

      allLangBoxes.forEach((lang) => {
        lang.classList.remove('selected');
      })

      allLangBoxes[langIndex].classList.add('selected');

      states.lang = langs[langIndex];

      (document.querySelector('.music-title') as HTMLElement).textContent = languages[states.lang].soundSettings;
      (document.querySelector('.music-settings__title') as HTMLElement).textContent = languages[states.lang].musicVol;
      (document.querySelector('.sfx-settings__title') as HTMLElement).textContent = languages[states.lang].sfxVol;
      (document.querySelector('.language-title') as HTMLElement).textContent = languages[states.lang].language;
    })
  }
}
