import MultiplayerService from './services/MultiplayerService';
import states, { saveStates, updateStates } from './states';
import './style.scss';
import ClassicModePage from './views/ClassicModePage';
import ErrorPage from './views/ErrorPage';
import GameModespage from './views/GameModesPage';
import HomePage from './views/HomePage';
import MultiplayerPage from './views/MultiplayerPage';
import ShopPage from './views/ShopPage';
import SettingsPage from './views/SettingsPage';
import LeaderboardPage from './views/LeaderboardPage';
import LoginPage from './views/LoginPage';
import RegistrationPage from './views/RegistrationPage';

/* Routing section */
const pageContainer = document.querySelector('.page-container') as HTMLDivElement;

const getPageByUrl = (parsedUrl) => {
  if (parsedUrl) {
    switch (parsedUrl.resource) {
      case '/':
        return new LoginPage(pageContainer);
      case '/#home':
        return new HomePage(pageContainer);
      case '/#shop':
        return new ShopPage(pageContainer);
      case '/#settings':
        return new SettingsPage(pageContainer);
      case '/#leaderboard':
        return new LeaderboardPage(pageContainer);
      case '/#modes':
        return new GameModespage(pageContainer);
      case '/#classic':
        return new ClassicModePage(pageContainer);
      case '/#multiplayer':
        return new MultiplayerPage(pageContainer, new MultiplayerService());
      case '/#registration':
        return new RegistrationPage(pageContainer);
      default:
        return new ErrorPage(pageContainer);
    }
  }
  return new ErrorPage(pageContainer);
};

const parseUrl = () => {
  const url = document.location.pathname + document.location.hash;
  const urlChunks = url.substr(1).split('/');
  return {
    resource: `/${urlChunks[0]}`,
    id: urlChunks[1],
  };
};

const router = async () => {
  const parsedUrl = parseUrl();
  const page = getPageByUrl(parsedUrl);
  await page.render();
};

function preloadImages() {
  const preloader = document.querySelector('.preloader');
  preloader?.classList.remove('hide');
  Promise.all(Array.from(document.images).filter((img) => !img.complete).map((img) => new Promise((resolve) => { img.onload = img.onerror = resolve; }))).then(() => {
    preloader?.classList.add('hide');
  });
}

window.addEventListener('hashchange', () => {
  if(!localStorage.getItem('token') && document.location.hash !== '#registration') {
    document.location.href = '/';
    return;
  }
  pageContainer.classList.add('hide');
  setTimeout(() => {
    router();
    preloadImages();
    pageContainer.classList.remove('hide');
  }, 200)
});
window.addEventListener('load', () => {
  updateStates();
  router();
  preloadImages();
});
window.addEventListener('unload', saveStates);

// import GameController from './GameController';
// import SoundService from './services/SoundService';
// import PlayField from './PlayField';
// import IKeyHandlerSettings from './settings/IKeyHandlerSettings';
// import IPlayFieldSettings from './settings/IPlayFieldSettings';

// const playFieldSettings : IPlayFieldSettings = {
//   width: 300,
//   height: 600,
//   columns: 10,
//   rows: 20,
// };

// TODO: желательно добавить Dependency Injection
// const soundService = new SoundService();

// Создаем игровое поле для игроков 1 и 2
// const playField1 = new PlayField(document.querySelector('.player1') as HTMLDivElement, playFieldSettings);
// const playField2 = new PlayField(document.querySelector('.player2') as HTMLDivElement, playFieldSettings);

// Создаем контроллеры игры для игроков 1 и 2
// const gameController1 = new GameController(playField1, soundService);
// const gameController2 = new GameController(playField2, soundService);

// Отображаем начальное состояние фигур
// TODO: фигуры должны быть по центру и появляться за пределами игрового поля и падать вниз
// playField1.render(gameController1.getState());
// playField2.render(gameController2.getState());

// TODO: добавить модальку для старата начала игры, например: "Нажмите пробел, чтобы начать игру"
// window.addEventListener('keydown', () => {
//   soundService.playBackground();
// }, { once: true });

// Функция для подпсики на соыбытия
// TODO: надо перенести, не  должно быть в этом файле
// const registerKeyHandler = (gameController: GameController, keySettings: IKeyHandlerSettings) => {
//   document.addEventListener('keydown', (event) => {
//     switch (event.code) {
//       case keySettings.moveLeft:
//         gameController.movePieceLeft();
//         gameController.playField.render(gameController.getState());
//         break;
//       case keySettings.turnFigure:
//         gameController.rotatePiece();
//         gameController.playField.render(gameController.getState());
//         break;
//       case keySettings.moveRight:
//         gameController.movePieceRight();
//         gameController.playField.render(gameController.getState());
//         break;
//       case keySettings.moveDown:
//         gameController.movePieceDown();
//         if (gameController.isClearing) {
//           soundService.playLine();
//           gameController.playField.clearingEffect(gameController.clearingLines, true);
//           setTimeout(() => {
//             gameController.playField.clearingEffect(gameController.clearingLines, false);
//             gameController.playField.render(gameController.getState());
//           }, 250)
//         }
//         gameController.playField.render(gameController.getState());
//         break;
//       default:
//         break;
//     }
//   });
// };

// Регистриурем клавиши для управления первым игроком фигурами
// const firstPlayerKeyHandlerSettings : IKeyHandlerSettings = {
//   turnFigure: 'KeyW',
//   moveLeft: 'KeyA',
//   moveRight: 'KeyD',
//   moveDown: 'KeyS',
// };

// Регистриурем клавиши для управления вторым игроком фигурами
// const secondPlayerKeyHandlerSettings : IKeyHandlerSettings = {
//   turnFigure: 'ArrowUp',
//   moveLeft: 'ArrowLeft',
//   moveRight: 'ArrowRight',
//   moveDown: 'ArrowDown',
// };

// Подписываемся на события
// registerKeyHandler(gameController1, firstPlayerKeyHandlerSettings);
// registerKeyHandler(gameController2, secondPlayerKeyHandlerSettings);
