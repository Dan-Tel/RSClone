import states, { languages } from '../states';
import BasePage from './BasePage';

export default class RegistrationPage extends BasePage {
  view: string;

  constructor(pageContainer) {
    super(pageContainer);

    this.view = `
      <section class="registration-page">
        <video src="assets/videos/tetris-bg4.mp4" autoplay loop></video>
        <div class="registration-container">
          <div class="registration__wrapper">
            <h2 class="registration-title">${languages[states.lang].login}</h2>
            <input class="email-input" type="email" placeholder="${languages[states.lang].email}">
            <input class="password-input" type="password" placeholder="${languages[states.lang].password}">
          </div>
          <a class="registration-btn" href="/#home">${languages[states.lang].enter}</a>
        </div>
      </section>
      `;
  }

  render() {
    this.pageContainer.innerHTML = this.view;
  }
}
