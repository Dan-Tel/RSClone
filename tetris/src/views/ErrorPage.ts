import BasePage from "./BasePage";

export default class ErrorPage extends BasePage {

  constructor(pageCotainer) {
    super(pageCotainer);
  }

  render() {
    this.pageContainer.innerHTML = 
    `
    <div class="error-container">
      <h1>This page doesn't exist</h1>
    </div>
    `;
  }
}
