import AuthService from '../services/AuthService';
import states, { languages } from '../states';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
  view: string;

  constructor(pageContainer) {
    super(pageContainer);

    this.view = `
      <section class="preloader">
        <div class="preloader__wrapper">
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
      <section class="registration-page">
        <video src="assets/videos/tetris-bg4.mp4" autoplay loop></video>
        <div class="registration-container">
          <div class="registration__wrapper">
            <h2 class="registration-title">${languages[states.lang].login}</h2>
            <input class="nickname-input" type="text" placeholder="${languages[states.lang].nickname}">
            <input class="password-input" type="password" placeholder="${languages[states.lang].password}">
          </div>
          <button class="registration-btn">${languages[states.lang].enter}</button>
          <span class="registration-link">${languages[states.lang].register}</span>
        </div>
      </section>
      `;
  }

  render() {
    this.pageContainer.innerHTML = this.view;
    const btn : HTMLButtonElement|null = document.querySelector('.registration-btn');
    const inputNickname : HTMLInputElement | null = document.querySelector('.nickname-input');
    const inputPassword : HTMLInputElement | null  = document.querySelector('.password-input');
    if(btn) {
      btn.addEventListener('click', async (event) => {
        const response = await AuthService.Login(inputNickname?.value ?? '', inputPassword?.value ?? '')
        if(response.success === true) {
          document.location.hash = '#home';
        } else {
          const errorMessage = response.errors.join(',');
          alert(errorMessage);
        }
      });
    }

    const registerLink = document.querySelector('.registration-link');
    registerLink?.addEventListener('click', (e) => {
      e.preventDefault();
      document.location.hash = '#registration';
    });
  }
}
