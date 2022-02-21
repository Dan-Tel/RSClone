import AuthService from '../services/AuthService';
import states, { languages } from '../states';
import BasePage from './BasePage';

export default class RegistrationPage extends BasePage {
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
            <h2 class="registration-title">${languages[states.lang].registration}</h2>
            <input class="nickname-input" type="text" placeholder="${languages[states.lang].nickname}">
            <input class="password-input" type="password" placeholder="${languages[states.lang].password}">
            <span class="registration-error">Ошибка</span>
          </div>
          <button class="registration-btn">${languages[states.lang].register}</button>
          <p class="registration-text">${languages[states.lang].areYouAlreadyRegistered} <span class="registration-link">${languages[states.lang].login}</span></p>
        </div>
      </section>
      `;
  }

  render() {
    this.pageContainer.innerHTML = this.view;
    const btn : HTMLButtonElement|null = document.querySelector('.registration-btn');
    const inputNickname : HTMLInputElement | null = document.querySelector('.nickname-input');
    const inputPassword : HTMLInputElement | null = document.querySelector('.password-input');
    const inputError = document.querySelector('.registration-error') as HTMLElement;

    if (btn) {
      btn.addEventListener('click', async () => {
        const name = inputNickname?.value;
        if (name?.length === 0) {
          inputError.textContent = 'Invalid nickname';
          inputError.classList.add('show');
          inputNickname?.classList.add('error');
          inputPassword?.classList.add('error');
          return;
        }
        const response = await AuthService.Register(name ?? '', inputPassword?.value ?? '')
        if (response.success === true) {
          document.location.hash = '#home';
          inputError.classList.remove('show');
          inputNickname?.classList.remove('error');
          inputPassword?.classList.remove('error');
        } else {
          const errorMessage = response.errors.join(',');
          inputError.textContent = errorMessage;
          inputError.classList.add('show');
          inputNickname?.classList.add('error');
          inputPassword?.classList.add('error');
        }
      });
    }

    const registerLink = document.querySelector('.registration-link');
    registerLink?.addEventListener('click', (e) => {
      e.preventDefault();
      document.location.href = '/';
    });
  }
}
