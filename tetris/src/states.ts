interface IState {
  nickname: string,
  coins: number,
  lvl: number,
  availableSkins: Set<string>,
  selectedSkin: string,
  lang: string,
  musicVol: number,
  sfxVol: number,
}

const states: IState = {
  nickname: '',
  coins: 0,
  lvl: 0,
  availableSkins: new Set<string>(['skin-1']),
  selectedSkin: 'skin-1',
  lang: 'ru',
  musicVol: 0.5,
  sfxVol: 0.5,
}

export const languages = {
  it: {
    login: 'Registrazione',
    email: 'E-mail',
    password: 'Parola d\'ordine',
    enter: 'Entrare',
    play: 'GIOCARE',
    back: 'INDIETRO',
    currentScore: 'Profilo corrente',
    recordScore: 'Punteggio record',
    win: 'Vittoria',
    lose: 'Perdere',
    singlePlayer: 'GIOCO A GIOCATORE SINGOLO',
    multiPlayer: 'GIOCO ONLINE',
    singlePlayerDesc: 'Gioca al leggendario e classico Tetris che conosci e ami!',
    multiPlayerDesc: 'Gioca al leggendario e classico Tetris con i tuoi amici!',
    classicSkin: 'CLASSICO',
    oresSkin: 'GEMME',
    snowSkin: 'NEVICATA',
    cookieSkin: 'BISCOTTI',
    candySkin: 'DOLCI',
    kawaiiSkin: 'KAWAII',
    chickenSkin: 'CAZZI',
    halloweenSkin: 'HALLOWEEN',
    soundSettings: 'IMPOSTAZIONI DEL VOLUME',
    musicVol: 'Musica',
    sfxVol: 'Effetti sonori',
    language: 'Lingua',
    selected: 'SELEZIONATO',
    bought: 'ACQUISTATO',
  },
  de: {
    login: 'Anmeldung',
    email: 'E-mail',
    password: 'Passwort',
    enter: 'Betreten',
    play: 'ABSPIELEN',
    back: 'ZURÜCK',
    currentScore: 'Aktuelles Konto',
    recordScore: 'Rekordergebnis',
    win: 'Sieg',
    lose: 'Verlieren',
    singlePlayer: 'EINZELSPIELER-SPIEL',
    multiPlayer: 'ONLINE SPIEL',
    singlePlayerDesc: 'Spiele das legendäre, klassische Tetris, das du kennst und liebst!',
    multiPlayerDesc: 'Spielen Sie mit Ihren Freunden den legendären Klassiker Tetris!',
    classicSkin: 'KLASSISCH',
    oresSkin: 'EDELSTEINE',
    snowSkin: 'SCHNEEFALL',
    cookieSkin: 'KEKSE',
    candySkin: 'SÜSSIGKEITEN',
    kawaiiSkin: 'KAWAII',
    chickenSkin: 'HÄNGE',
    halloweenSkin: 'HALLOWEEN',
    soundSettings: 'LAUTSTÄRKEEINST ELLUNGEN',
    musicVol: 'Musik',
    sfxVol: 'Soundeffekte',
    language: 'Sprache',
    selected: 'AUSGEWÄHLT',
    bought: 'GEKAUFT',
  },
  en: {
    login: 'Sign in',
    email: 'E-mail',
    password: 'Password',
    enter: 'Enter',
    play: 'PLAY',
    back: 'BACK',
    currentScore: 'Current score',
    recordScore: 'Record score',
    win: 'Win',
    lose: 'Lose',
    singlePlayer: 'SINGLE PLAYER',
    multiPlayer: 'MULTI PLAYER',
    singlePlayerDesc: 'Play the legendary, classic Tetris you know and love!',
    multiPlayerDesc: 'Play the legendary, classic Tetris with your friends!',
    classicSkin: 'CLASSICAL',
    oresSkin: 'GEMS',
    snowSkin: 'SNOWFALL',
    cookieSkin: 'COOKIES',
    candySkin: 'CANDIES',
    kawaiiSkin: 'KAWAII',
    chickenSkin: 'COCKS',
    halloweenSkin: 'HALLOWEEN',
    soundSettings: 'VOLUME SETTINGS',
    musicVol: 'Music',
    sfxVol: 'Sound effects',
    language: 'LANGUAGE',
    selected: 'SELECTED',
    bought: 'BOUGHT',
  },
  ru: {
    login: 'Войти в аккаунт',
    email: 'Почта',
    password: 'Пароль',
    enter: 'Войти',
    play: 'ИГРАТЬ',
    back: 'НАЗАД',
    currentScore: 'Текущий счёт',
    recordScore: 'Рекордный счёт',
    win: 'Победа',
    lose: 'Проигрыш',
    singlePlayer: 'ОДИНОЧНАЯ ИГРА',
    multiPlayer: 'СЕТЕВАЯ ИГРА',
    singlePlayerDesc: 'Сыграй в легендарный, классический Tetris, котрый вы знаете и любите!',
    multiPlayerDesc: 'Сыграй в легендарный, классический Tetris, со своими друзьями!',
    classicSkin: 'КЛАССИЧЕСКИЙ',
    oresSkin: 'ДРАГОЦЕННЫЕ КАМНИ',
    snowSkin: 'СНЕГОПАД',
    cookieSkin: 'ПЕЧЕНЬКИ',
    candySkin: 'СЛАДОСТИ',
    kawaiiSkin: 'КАВАИЙ',
    chickenSkin: 'ПЕТУШКИ',
    halloweenSkin: 'ХЕЛЛОУИН',
    soundSettings: 'НАСТРОЙКИ ГРОМКОСТИ',
    musicVol: 'Музыка',
    sfxVol: 'Звуковые эффекты',
    language: 'ЯЗЫК',
    selected: 'ВЫБРАНО',
    bought: 'КУПЛЕНО',
  },
  be: {
    login: 'Увайсці ў рахунак',
    email: 'Пошта',
    password: 'Пароль',
    enter: 'Увайсці',
    play: 'ГУЛЬНЯ',
    back: 'НАЗАД',
    currentScore: 'Бягучы бал',
    recordScore: 'Рэкордны бал',
    win: 'Перамога',
    lose: 'Пройгрыш',
    singlePlayer: 'АДЗІНАЧНАЯ ГУЛЬНЯ',
    multiPlayer: 'СЕТКАВАЯ ГУЛЬНЯ',
    singlePlayerDesc: 'Згуляй у легендарны, класічны Tetris, які вы ведаеце і любіце!',
    multiPlayerDesc: 'Згуляй у легендарны, класічны Tetris, са сваімі сябрамі!',
    classicSkin: 'КЛАСІЧНЫ',
    oresSkin: 'КАШТОЎНЫЯ КАМЯНІ',
    snowSkin: 'СНЕГАПАД',
    cookieSkin: 'ПЯЧЭНЬКІ',
    candySkin: 'САЛАДОСЦІ',
    kawaiiSkin: 'КАВАІЙ',
    chickenSkin: 'ПЯТУШКІ',
    halloweenSkin: 'ХЭЛОЎІН',
    soundSettings: 'НАЛАДКІ ГУЧНАСЦІ',
    musicVol: 'Музыка',
    sfxVol: 'Гукавыя эфекты',
    language: 'МОВА',
    selected: 'ВЫБРАНА',
    bought: 'КУПЛЕНА',
  },
  kz: {
    login: 'Аккаунтқа кіру',
    email: 'Пошта',
    password: 'Құпия сөз',
    enter: 'Кіру',
    play: 'ОЙНАУ',
    back: 'ШЫҒУ',
    currentScore: 'Ағымдағы ұпай',
    recordScore: 'Рекордты ұпай',
    win: 'Жеңіс',
    lose: 'Жеңіліс',
    singlePlayer: 'БІР ОЙЫНШЫ ОЙЫН',
    multiPlayer: 'ОНЛАЙН ОЙЫН',
    singlePlayerDesc: 'Өзіңіз білетін және жақсы көретін аты аңызға айналған классикалық Tetris ойнаңыз!',
    multiPlayerDesc: 'Достарыңызбен аты аңызға айналған, классикалық Tetris ойнаңыз!',
    classicSkin: 'КЛАССИКАЛЫҚ',
    oresSkin: 'АСЫЛ ТАСТАР',
    snowSkin: 'ҚАР ЖАУУЫ',
    cookieSkin: 'БИСКВИТ',
    candySkin: 'ТӘТТІЛЕР',
    kawaiiSkin: 'КАВАИЙ',
    chickenSkin: 'ӘТЕШТЕР',
    halloweenSkin: 'ХЕЛЛОУИН',
    soundSettings: 'ДЫБЫС ПАРАМЕТРЛЕРІ',
    musicVol: 'Музыка',
    sfxVol: 'Дыбыс эффектілері',
    language: 'ТІЛ',
    selected: 'ТАҢДАЛДЫ',
    bought: 'САТЫП АЛЫНДЫ',
  },
  uk: {
    login: 'Увійти в аккаунт',
    email: 'Пошта',
    password: 'Пароль',
    enter: 'Увійти',
    play: 'ГРАТИ',
    back: 'НАЗАД',
    currentScore: 'Поточний бали',
    recordScore: 'Рекордні бали',
    win: 'Перемога',
    lose: 'Програш',
    singlePlayer: 'ОДИНОЧНА ГРА',
    multiPlayer: 'МЕРЕЖЕВА ГРА',
    singlePlayerDesc: 'Зіграй у легендарний, класичний Tetris, котрий ви знаєте та любите!',
    multiPlayerDesc: 'Зіграй у легендарний, класичний Tetris зі своїми друзями!',
    classicSkin: 'КЛАСИЧНИЙ',
    oresSkin: 'ДОРОГОЦІННЕ КАМІННЯ',
    snowSkin: 'СНІГОПАД',
    cookieSkin: 'ПЕЧЕНЬКИ',
    candySkin: 'СОЛОДОЩІ',
    kawaiiSkin: 'КАВАІЙ',
    chickenSkin: 'ПІВНИКИ',
    halloweenSkin: 'ХЕЛЛОВІН',
    soundSettings: 'НАЛАШТУВАННЯ ГУЧНОСТІ',
    musicVol: 'Музика',
    sfxVol: 'Звукові ефекти',
    language: 'МОВА',
    selected: 'ВИБРАНО',
    bought: 'КУПЛЕНО',
  },
}
export function saveStates() {
  localStorage.setItem('tetris-state', JSON.stringify(states));
  localStorage.setItem('tetris-available-skins', JSON.stringify([...states.availableSkins]));
}

export function updateStates() {
  if (localStorage.getItem('tetris-state')) {
    const temp = JSON.parse(localStorage.getItem('tetris-state') as string);

    // eslint-disable-next-line guard-for-in
    for (const key in temp) {
      states[key] = temp[key];
    }
    states.availableSkins = new Set(JSON.parse(localStorage.getItem('tetris-available-skins') as string));
  }
}

export default states;
