interface IState {
  nickname: string,
  coins: number,
  lvl: number,
  availableSkins: Set<string>,
  selectedSkin: string,
  lang: string,
  musicVol: number,
  sfxVol: number,
  rank: number,
  bestResult: number
}

const states: IState = {
  nickname: 'Nickname',
  coins: 0,
  lvl: 0,
  availableSkins: new Set<string>(['skin-1']),
  selectedSkin: 'skin-1',
  lang: 'ru',
  musicVol: 0.5,
  sfxVol: 0.5,
  rank: 1,
  bestResult: 0,
}

export const languages = {
  it: {
    login: 'Registrazione',
    registration: 'Deposito',
    register: 'Iscriviti',
    areYouNotRegistered: 'Non sei ancora registrato?',
    areYouAlreadyRegistered: 'Sei già registrato?',
    email: 'E-mail',
    password: 'Parola d\'ordine',
    nickname: 'Login',
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
    coopPlayer: 'GIOCO COOPERATIVO',
    coopPlayerDesc: 'Gioca al leggendario e classico Tetris con i tuoi amici sullo stesso dispositivo!',
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

    // Multiplayer mode
    lookingForEnemy: 'Stiamo cercando di trovare una corrispondenza per te',
    yourResult: 'Il tuo risultato', // Вы победили
    enemyResult: 'Risultato avversario', // Результат врага
    youWin: 'Hai vinto', // Вы победили
    youLost: 'Hai perso', // Вы проиграли
    draw: 'Pareggiare', // Ничья
    waitOfTheEnd: 'Aspettatevi la fine del gioco', // Ожидайте окончания игры

    lines: 'Linee',
    level: 'Livello',

    gameOver: 'Game over',
    firstPlayerScore: 'Risultato del primo giocatore',
    secondPlayerScore: 'Risultato del secondo giocatore',
  },
  de: {
    login: 'Anmeldung',
    registration: 'Eintragung',
    register: 'Sich registrieren lassen',
    areYouNotRegistered: 'Sie sind noch nicht registriert?',
    areYouAlreadyRegistered: 'Sie sind bereits registriert?',
    email: 'E-mail',
    password: 'Passwort',
    nickname: 'Login',
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
    coopPlayer: 'KOOPERATIVES SPIEL',
    coopPlayerDesc: 'Spielen Sie den legendären, klassischen Tetris mit Ihren Freunden auf demselben Gerät!',
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

    // Multiplayer mode
    lookingForEnemy: 'Wir versuchen, eine Übereinstimmung für Sie zu finden',
    yourResult: 'Ihr Ergebnis', // Вы победили
    enemyResult: 'Das Ergebnis des Gegners', // Результат врага
    youWin: 'Sie haben gewonnen', // Вы победили
    youLost: 'Sie haben verloren', // Вы проиграли
    draw: 'Unentschieden', // Ничья
    waitOfTheEnd: 'Warten Sie auf das Ende des Spiels', // Ожидайте окончания игры

    lines: 'Linien',
    level: 'Stufe',

    gameOver: 'Spiel ist aus',
    firstPlayerScore: 'Ergebnis des ersten Spielers',
    secondPlayerScore: 'Ergebnis des zweiten Spielers',
  },
  en: {
    login: 'Sign in',
    registration: 'Registration',
    register: 'Register',
    areYouNotRegistered: 'Are you not registered yet?',
    areYouAlreadyRegistered: 'Are you already registered?',
    email: 'E-mail',
    password: 'Password',
    nickname: 'Login',
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
    coopPlayer: 'COOP GAME',
    coopPlayerDesc: 'Play the legendary, classic Tetris with your friends on the same device!',
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

    // Multiplayer mode
    lookingForEnemy: 'We are trying to find an opponent for you',
    yourResult: 'Your result', // Вы победили
    enemyResult: 'Opponent`s result', // Результат врага
    youWin: 'You`ve won', // Вы победили
    youLost: 'You`ve lost', // Вы проиграли
    draw: 'Draw', // Ничья
    waitOfTheEnd: 'Wait till the end', // Ожидайте окончания игры

    lines: 'Lines',
    level: 'Level',

    gameOver: 'Game over',
    firstPlayerScore: 'Result of the first player',
    secondPlayerScore: 'Result of the second player',
  },
  ru: {
    login: 'Войти в аккаунт',
    registration: 'Регистрация',
    register: 'Зарегистрироваться',
    areYouNotRegistered: 'Вы ещё не зарегистрированны?',
    areYouAlreadyRegistered: 'Вы уже зарегистрированны?',
    email: 'Почта',
    password: 'Пароль',
    nickname: 'Никнейм',
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
    coopPlayer: 'КООПЕРАТИВНАЯ ИГРА',
    coopPlayerDesc: 'Сыграй в легендарный, классический Тетрис, со своими друзьями на одном устройстве!',
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

    // Multiplayer mode
    lookingForEnemy: 'Мы пытаемся найти соперника для вас',
    yourResult: 'Ваш результат', // Вы победили
    enemyResult: 'Результат соперника', // Результат врага
    youWin: 'Вы победили', // Вы победили
    youLost: 'Вы проиграли', // Вы проиграли
    draw: 'Ничья', // Ничья
    waitOfTheEnd: 'Ожидайте окончания игры', // Ожидайте окончания игры

    lines: 'Линии',
    level: 'Уровень',

    gameOver: 'Игра окончена',
    firstPlayerScore: 'Результат первого игрока',
    secondPlayerScore: 'Результат второго игрока',
  },
  be: {
    login: 'Увайсці ў рахунак',
    registration: 'Рэгістрацыя',
    register: 'Зарэгістравацца',
    areYouNotRegistered: 'Вы яшчэ не зарэгістраваны?',
    areYouAlreadyRegistered: 'Вы ўжо зарэгістраваны?',
    email: 'Пошта',
    password: 'Пароль',
    nickname: 'Логин',
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
    coopPlayer: 'КААПЕРАТЫЎНАЯ ГУЛЬНЯ',
    coopPlayerDesc: 'Згуляй у легендарны, класічны Тэтрыс, са сваімі сябрамі на адным прыладзе!',
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

    // Multiplayer mode
    lookingForEnemy: 'Мы спрабуем знайсці суперніка для вас',
    yourResult: 'Ваш вынік', // Вы победили
    enemyResult: 'Вынік суперніка', // Результат врага
    youWin: 'Вы перамаглі', // Вы победили
    youLost: 'Вы прайгралі', // Вы проиграли
    draw: 'Чые', // Ничья
    waitOfTheEnd: 'Чакайце заканчэння гульні', // Ожидайте окончания игры

    lines: 'Лініі',
    level: 'Узровень',

    gameOver: 'Гульня скончаная',
    firstPlayerScore: 'Вынік першага гульца',
    secondPlayerScore: 'Вынік другога гульца',
  },
  kz: {
    login: 'Аккаунтқа кіру',
    registration: 'Тіркеу',
    register: 'Тіркелу',
    areYouNotRegistered: 'Сіз әлі тіркелген жоқсыз ба?',
    areYouAlreadyRegistered: 'Сіз тіркеліп қойдыңыз ба?',
    email: 'Пошта',
    password: 'Құпия сөз',
    nickname: 'Логин',
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
    coopPlayer: 'КОПЕРАТИВТІК ОЙЫН',
    coopPlayerDesc: 'Достарыңызбен бір құрылғыда аты аңызға айналған классикалық Tetris ойнаңыз!',
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

    // Multiplayer mode
    lookingForEnemy: 'Біз сізге қарсыласты табуға тырысудамыз',
    yourResult: 'Сіздің нәтижеңіз', // Вы победии
    enemyResult: 'Қарсыластың нәтижесі', // Результат врага
    youWin: 'Сіз жеңдіңіз', // Вы победили
    youLost: 'Сіз жоғалттыңыз', // Вы проиграли
    draw: 'Тең', // Ничья
    waitOfTheEnd: 'Ойынның аяқталуын күтіңіз', // Ожидайте окончания игры

    lines: 'Жолдар',
    level: 'Деңгей',

    gameOver: 'Ойын аяқталды',
    firstPlayerScore: 'Бірінші ойыншының нәтижесі',
    secondPlayerScore: 'Екінші ойыншының нәтижесі',
  },
  uk: {
    login: 'Увійти в аккаунт',
    registration: 'Реєстрація',
    register: 'Зареєструватися',
    areYouNotRegistered: 'Ви ще не зареєстровані?',
    areYouAlreadyRegistered: 'Ви вже зареєстровані?',
    email: 'Пошта',
    password: 'Пароль',
    nickname: 'Логин',
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
    coopPlayer: 'КООПЕРАТИВНА ГРА',
    coopPlayerDesc: 'Зіграй у легендарний, класичний Тетріс зі своїми друзями на одному пристрої!',
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

    // Multiplayer mode
    lookingForEnemy: 'Ми намагаємося знайти суперника для вас',
    yourResult: 'Ваш результат', // Вы победили
    enemyResult: 'Результат суперника', // Результат врага
    youWin: 'Ви перемогли', // Вы победили
    youLost: 'Ви програли', // Вы проиграли
    draw: 'Нiчия', // Ничья
    waitOfTheEnd: 'Чекайте на закiнчення гри', // Ожидайте окончания игры

    lines: 'Лінії',
    level: 'Рівень',

    gameOver: 'Гру закінчено',
    firstPlayerScore: 'Результат першого гравця',
    secondPlayerScore: 'Результат другого гравця',
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
