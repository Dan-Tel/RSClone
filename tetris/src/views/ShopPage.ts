/* eslint-disable max-len */
import { tns } from 'tiny-slider';
import states, { languages } from '../states';
import BasePage from './BasePage';

export default class ShopPage extends BasePage {
  view: string;

  boughtSkins: Array<number>;

  constructor(pageContainer) {
    super(pageContainer);

    this.boughtSkins = [0];
    this.view = `
      <section class="shop-page">
        <video src="assets/videos/tetris-bg1.mp4" autoplay loop></video>
        <header class="main-header">
          <div class="player__name"><span class="player__level">9</span>DanTel</div>
          <div class="player__coins"><span class="coin__logo"></span>0.0</div>
        </header>
        <div class="main-menu">
          <div class="main__logo"></div>
          <ul class="menu__list">
            <a href="/#home"><li class="menu__main"></li></a>
            <li class="menu__shop"></li>
            <a href="/#settings"><li class="menu__settings"></li></a>
          </ul>
        </div>

        <div id="shop-slider">
          <div>
            <div class="skin-card common bought">
              <img src="./assets/shop-cards/card-1.png">
              <div class="skin-wrapper">
                <div class="skin-name">${languages[states.lang].classicSkin}</div>
                <div class="skin-cost skin-1">${languages[states.lang].selected}</div>
              </div>
            </div>
          </div>

          <div>
            <div class="skin-card common">
              <img src="./assets/shop-cards/card-2.png">
              <div class="skin-wrapper">
                <div class="skin-name">${languages[states.lang].oresSkin}</div>
                <div class="skin-cost skin-2"><span class="coin__logo"></span>10</div>
              </div>
            </div>
          </div>

          <div>
            <div class="skin-card rare">
              <img src="./assets/shop-cards/card-3.png">
              <div class="skin-wrapper">
                <div class="skin-name">${languages[states.lang].snowSkin}</div>
                <div class="skin-cost skin-3"><span class="coin__logo"></span>20</div>
              </div>
            </div>
          </div>

          <div>
            <div class="skin-card rare">
              <img src="./assets/shop-cards/card-4.png">
              <div class="skin-wrapper">
                <div class="skin-name">${languages[states.lang].cookieSkin}</div>
                <div class="skin-cost skin-4"><span class="coin__logo"></span>30</div>
              </div>
            </div>
          </div>

          <div>
            <div class="skin-card rare">
              <img src="./assets/shop-cards/card-5.png">
              <div class="skin-wrapper">
                <div class="skin-name">${languages[states.lang].candySkin}</div>
                <div class="skin-cost skin-5"><span class="coin__logo"></span>40</div>
              </div>
            </div>
          </div>

          <div>
            <div class="skin-card epic">
              <img src="./assets/shop-cards/card-6.png">
              <div class="skin-wrapper">
                <div class="skin-name">${languages[states.lang].kawaiiSkin}</div>
                <div class="skin-cost skin-6"><span class="coin__logo"></span>40</div>
              </div>
            </div>
          </div>

          <div>
            <div class="skin-card legendary">
              <img src="./assets/shop-cards/card-7.png">
              <div class="skin-wrapper">
                <div class="skin-name">${languages[states.lang].chickenSkin}</div>
                <div class="skin-cost skin-7"><span class="coin__logo"></span>60</div>
              </div>
            </div>
          </div>

          <div>
            <div class="skin-card legendary">
              <img src="./assets/shop-cards/card-8.png">
              <div class="skin-wrapper">
                <div class="skin-name">${languages[states.lang].halloweenSkin}</div>
                <div class="skin-cost skin-8"><span class="coin__logo"></span>60</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  handler() {
    const coinsContainer = this.pageContainer.querySelector('.player__coins') as HTMLDivElement;

    const allSkins = document.querySelectorAll('.skin-card');

    const skinBuyEvent = (event) => {
      const cardCost = event.target as HTMLDivElement;
      const cost = Number(cardCost.textContent);

      if (cardCost.classList.contains('skin-cost')) {
        if (!states.availableSkins.has(cardCost.classList[1]) && states.coins >= cost) {
          states.availableSkins.add(cardCost.classList[1]);

          const card = cardCost.parentElement?.parentElement as HTMLDivElement;
          card.classList.add('bought');
          this.boughtSkins.push(Array.from(allSkins).indexOf(card));

          cardCost.textContent = languages[states.lang].bought;

          states.coins -= cost;
          coinsContainer.textContent = `${states.coins}`;

          localStorage.setItem('boughtSkins', JSON.stringify(this.boughtSkins));
        }
      }
    }

    document.addEventListener('click', skinBuyEvent);

    function removeSelectedSkins() {
      allSkins.forEach((skin) => {
        if (skin.classList.contains('bought')) {
          const cardCost = skin.querySelector('.skin-cost') as HTMLDivElement;
          cardCost.textContent = languages[states.lang].bought;
        }
      })
    }

    function skinSelectEvent(skin) {
      if (skin.classList.contains('bought')) {
        removeSelectedSkins();

        const cardCost = skin.querySelector('.skin-cost') as HTMLDivElement;
        cardCost.textContent = languages[states.lang].selected;

        localStorage.setItem('selectSkin', `${Array.from(allSkins).indexOf(skin)}`);

        // eslint-disable-next-line prefer-destructuring
        states.selectedSkin = cardCost.classList[1];
      }
    }

    allSkins.forEach((skin) => {
      skin.addEventListener('click', () => {
        skinSelectEvent(skin)
      });
    })

    window.addEventListener('hashchange', () => {
      document.removeEventListener('click', skinBuyEvent);

      allSkins.forEach((skin) => {
        skin.removeEventListener('click', () => {
          skinSelectEvent(skin);
        });
      })
    }, { once: true })
  }

  render() {
    this.pageContainer.innerHTML = this.view;

    const shopSlider = tns({
      // autoWidth: true,
      container: '#shop-slider',
      loop: false,
      mouseDrag: true,
      slideBy: 'page',
      gutter: 50,
      fixedWidth: 500,
      swipeAngle: false,
      speed: 400,
      center: true,
      controls: false,
      nav: false,
    });

    const coinsContainer = this.pageContainer.querySelector('.player__coins') as HTMLDivElement;
    coinsContainer.innerHTML = `<span class="coin__logo"></span>${states.coins}`;

    const allSkins = document.querySelectorAll('.skin-card');

    if (localStorage.getItem('boughtSkins')) {
      this.boughtSkins = JSON.parse(localStorage.getItem('boughtSkins') as string);
      this.boughtSkins.forEach((index) => {
        const card = allSkins[index];
        card.classList.add('bought');

        const cardCost = card.querySelector('.skin-cost') as HTMLDivElement;
        cardCost.innerHTML = languages[states.lang].bought;
      })
    }

    if (localStorage.getItem('selectSkin')) {
      const index = Number(localStorage.getItem('selectSkin'));
      const card = allSkins[index];

      const cardCost = card.querySelector('.skin-cost') as HTMLDivElement;
      cardCost.innerHTML = languages[states.lang].selected;
    }
    this.handler();
  }
}
