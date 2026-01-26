// locales.js - v7.0 (GeoGator Edition)
// Updates: Split Americas, Unlimited Time, "All" Questions

const LOCALES = {
    ru: {
        // --- ЗАГОЛОВКИ И МЕНЮ ---
        'gameTitle': 'ГеоГатор', // Capitalized Cyrillic
        'gameSubtitle': 'Исследуй мир, ставь рекорды.',
        'statsTitle': 'СТАТИСТИКА',
        'guest': 'Гость',

        'statTotal': 'Всего Верно',
        'statRecord': 'Рекорд',
        'statAccuracy': 'Точность',

        // --- ПРОФИЛЬ И АВТОРИЗАЦИЯ ---
        'profileTitle': 'Профиль',
        'loginTitle': 'Вход',
        'registerTitle': 'Регистрация',
        'nickname': 'Имя',
        'login': 'Логин',
        'password': 'Пароль',
        'confirmPassword': 'Повторите Пароль',
        'loginAction': 'Войти',
        'registerAction': 'Зарегистрироваться',
        'logout': 'Выйти',
        'noAccount': 'Нет аккаунта?',
        'registerLink': 'Зарегистрироваться',
        'loginInvalid': 'Недопустимый Логин',

        // --- ПОЛНАЯ СТАТИСТИКА ---
        'totalGames': 'Всего Игр',
        'totalCorrect': 'Всего Верно',
        'totalWrong': 'Всего Неверно',
        'totalTime': 'Время в Игре',
        'overallSuccess': 'Успешность',
        'regionSuccess': 'Успешность по Регионам',
        'region': 'Регион',
        'success': 'Успех',

        'startGame': 'ИГРАТЬ',
        'settings': 'НАСТРОЙКИ',
        'back': 'Назад',
        'saveSettings': 'СОХРАНИТЬ',

        // --- ЭКРАН НАСТРОЕК (SETTINGS) ---
        'settingsTitle': 'НАСТРОЙКИ',
        'language': 'ЯЗЫК',
        'sound': 'ЗВУК',
        'theme': 'ТЕМА', // (Оставлено для совместимости, хотя скрыто в CSS)
        'lightTheme': 'Светлая',
        'darkTheme': 'Тёмная',

        // --- ЭКРАН НОВОЙ ИГРЫ (SETUP) ---
        'gameSettingsTitle': 'НОВАЯ ИГРА',
        'gameContinents': 'РЕГИОНЫ',
        'startGameAction': 'ПОЕХАЛИ!',
        'selectContinent': 'Выберите хотя бы один регион!',

        // Континенты (НОВОЕ: Разделение Америки)
        'europe': 'Европа',
        'asia': 'Азия',
        'africa': 'Африка',
        'north_america': 'Сев. Америка',
        'south_america': 'Юж. Америка',
        'oceania': 'Океания',
        'america': 'Америка', // Фоллбэк

        // Режимы игры
        'gameMode': 'РЕЖИМ',
        'modeCapitalByCountry': 'Угадай столицу',
        'descCapitalByCountry': 'Выбери столицу по стране',

        'modeCountryByCapital': 'Найти на карте',
        'descCountryByCapital': 'Укажи страну на карте по столице',

        'modeCountryByCapitalText': 'Угадай страну',
        'descCountryByCapitalText': 'Выбери страну по столице',

        // Настройки партии
        'questionsCount': 'ВОПРОСЫ',
        'timer': 'ТАЙМЕР',

        // Подписи к кнопкам (НОВОЕ)
        'quick': 'Быстро',
        'short': 'Коротко',
        'medium': 'Средне',
        'long': 'Длинно',
        'all': 'Все',
        'allDesc': 'Все страны',

        'unlimited': 'Безгранично', // No Time
        'fast': 'Быстро',
        'normal': 'Нормально',
        'relaxed': 'Спокойно',
        'noRush': 'Не спеша',
        'marathon': 'Марафон',

        // --- ГЕЙМПЛЕЙ ---
        'pause': 'ПАУЗА',
        'score': 'Очки',
        'question': 'Вопрос',
        'skipQuestion': 'Пропустить вопрос',

        // Вопросы
        'guessCapital': 'Столица этой страны?',
        'findCountry': 'Где находится {capital}?',
        'guessCountry': 'Чья это столица?',
        'clickOnCountry': 'Найдите страну на карте',
        'in': 'в', // предлог "в Европе"

        // Ответы
        'correct': 'Верно!',
        'wrong': 'Ошибка!',
        'correctAnswer': '{country} — столица {capital}',

        // --- ПАУЗА И ФИНАЛ ---
        'pauseTitle': 'ПАУЗА',
        'resume': 'ПРОДОЛЖИТЬ',
        'restart': 'ЗАНОВО',
        'quit': 'В МЕНЮ',
        'progress': 'Прогресс',
        'timePlayed': 'Время',

        'restartConfirm': 'Начать заново? Текущий прогресс будет потерян.',
        'quitConfirm': 'Выйти в меню? Прогресс будет потерян.',
        'languageChangeWarning': 'Смена языка сбросит текущую игру.',
        'gameReset': 'Игра сброшена',
        'settingsSaved': 'Настройки сохранены',

        // Результаты
        'resultsTitle': 'ФИНАЛ',
        'correctAnswers': 'Верно',
        'wrongAnswers': 'Ошибки',
        'time': 'Время',
        'playAgain': 'ЕЩЁ РАЗ',
        'mainMenu': 'МЕНЮ',

        'perfectResult': 'Гениально! 🏆',
        'greatResult': 'Отлично! 🔥',
        'goodResult': 'Неплохо! 👍',
        'tryAgain': 'Тренируйся! 🔄',

        // Дополнительно (на всякий случай)
        'about': 'Об игре',
        'aboutText': 'GeoGator v7.0\nSmart TV Edition'
    },

    en: {
        // --- HEADERS & MENU ---
        'gameTitle': 'GeoGator',
        'gameSubtitle': 'Explore the world, beat records.',
        'statsTitle': 'STATISTICS',
        'guest': 'Guest',

        'statTotal': 'Total Correct',
        'statRecord': 'Best Score',
        'statAccuracy': 'Accuracy',

        // --- PROFILE & AUTH ---
        'profileTitle': 'Profile',
        'loginTitle': 'Sign In',
        'registerTitle': 'Registration',
        'nickname': 'Nickname',
        'login': 'Login',
        'password': 'Password',
        'confirmPassword': 'Confirm Password',
        'loginAction': 'Sign In',
        'registerAction': 'Register',
        'logout': 'Logout',
        'noAccount': 'No account?',
        'registerLink': 'Register',
        'loginInvalid': 'Invalid Login',

        // --- FULL STATISTICS ---
        'totalGames': 'Total Games',
        'totalCorrect': 'Total Correct',
        'totalWrong': 'Total Wrong',
        'totalTime': 'Time Played',
        'overallSuccess': 'Success Rate',
        'regionSuccess': 'Regional Success',
        'region': 'Region',
        'success': 'Success',

        'startGame': 'PLAY',
        'settings': 'SETTINGS',
        'back': 'Back',
        'saveSettings': 'SAVE',

        // --- SETTINGS SCREEN ---
        'settingsTitle': 'SETTINGS',
        'language': 'LANGUAGE',
        'sound': 'SOUND',
        'theme': 'THEME',
        'lightTheme': 'Light',
        'darkTheme': 'Dark',

        // --- SETUP SCREEN ---
        'gameSettingsTitle': 'NEW GAME',
        'gameContinents': 'REGIONS',
        'startGameAction': 'GO!',
        'selectContinent': 'Select at least one region!',

        // Continents (NEW: Split Americas)
        'europe': 'Europe',
        'asia': 'Asia',
        'africa': 'Africa',
        'north_america': 'N. America',
        'south_america': 'S. America',
        'oceania': 'Oceania',
        'america': 'America',

        // Game Modes
        'gameMode': 'MODE',
        'modeCapitalByCountry': 'Guess Capital',
        'descCapitalByCountry': 'Quiz: Pick capital',

        'modeCountryByCapital': 'Find on Map',
        'descCountryByCapital': 'Search: Click map',

        'modeCountryByCapitalText': 'Guess Country',
        'descCountryByCapitalText': 'Quiz + Camera',

        // Setup Options
        'questionsCount': 'QUESTIONS',
        'timer': 'TIMER',

        // Button Labels
        'quick': 'Quick',
        'short': 'Short',
        'medium': 'Medium',
        'long': 'Long',
        'all': 'All',
        'allDesc': 'All countries',

        'unlimited': 'Unlimited', // No Time
        'fast': 'Fast',
        'normal': 'Normal',
        'relaxed': 'Relaxed',
        'noRush': 'No Rush',
        'marathon': 'Marathon',

        // --- GAMEPLAY ---
        'pause': 'PAUSE',
        'score': 'Score',
        'question': 'Q',
        'skipQuestion': 'Skip the question',

        // Questions
        'guessCapital': 'Capital of this country?',
        'findCountry': 'Where is {capital}?',
        'guessCountry': 'Whose capital is this?',
        'clickOnCountry': 'Find country on map',
        'in': 'in',

        // Feedback
        'correct': 'Correct!',
        'wrong': 'Wrong!',
        'correctAnswer': '{country} — capital is {capital}',

        // --- PAUSE & RESULTS ---
        'pauseTitle': 'PAUSED',
        'resume': 'RESUME',
        'restart': 'RESTART',
        'quit': 'MENU',
        'progress': 'Progress',
        'timePlayed': 'Time',

        'restartConfirm': 'Restart game? Progress will be lost.',
        'quitConfirm': 'Quit to menu? Progress will be lost.',
        'languageChangeWarning': 'Changing language resets the game.',
        'gameReset': 'Game reset',
        'settingsSaved': 'Settings saved',

        // Results
        'resultsTitle': 'RESULTS',
        'correctAnswers': 'Correct',
        'wrongAnswers': 'Wrong',
        'time': 'Time',
        'playAgain': 'AGAIN',
        'mainMenu': 'MENU',

        'perfectResult': 'Perfect! 🏆',
        'greatResult': 'Great! 🔥',
        'goodResult': 'Good! 👍',
        'tryAgain': 'Try again! 🔄',

        'about': 'About',
        'aboutText': 'GeoGator v7.0\nSmart TV Edition'
    }
};
