// locales.js - v7.0 (GeoGator Edition)

const LOCALES = {
    ru: {
        // --- ГЛАВНОЕ МЕНЮ ---
        'gameTitle': 'GeoGator',
        'gameSubtitle': 'Исследуй мир, ставь рекорды.',
        'statsTitle': 'СТАТИСТИКА',
        
        'statTotal': 'Всего верно',
        'statRecord': 'Рекорд',
        'statAccuracy': 'Точность',
        
        'startGame': 'ИГРАТЬ',
        'settings': 'НАСТРОЙКИ',
        
        // --- НАСТРОЙКИ (SETTINGS) ---
        'settingsTitle': 'НАСТРОЙКИ',
        'language': 'ЯЗЫК',
        'sound': 'ЗВУК',
        'back': 'Назад',
        'saveSettings': 'СОХРАНИТЬ',
        
        // --- НОВАЯ ИГРА (SETUP) ---
        'gameSettingsTitle': 'НОВАЯ ИГРА',
        'gameContinents': 'РЕГИОНЫ',
        'startGameAction': 'ПОЕХАЛИ!',
        'selectContinent': 'Выберите хотя бы один регион!',
        
        // Континенты (v7.0)
        'europe': 'Европа',
        'asia': 'Азия',
        'africa': 'Африка',
        'north_america': 'Сев. Америка',
        'south_america': 'Юж. Америка',
        'oceania': 'Океания',
        
        // Режимы
        'gameMode': 'РЕЖИМ',
        'modeCapitalByCountry': 'Угадай столицу',
        'descCapitalByCountry': 'Тест: Выберите столицу',
        
        'modeCountryByCapital': 'Найти на карте',
        'descCountryByCapital': 'Поиск: Кликните по карте',
        
        'modeCountryByCapitalText': 'Угадай страну',
        'descCountryByCapitalText': 'Тест + Камера',
        
        // Настройки партии
        'questionsCount': 'ВОПРОСЫ',
        'timer': 'ТАЙМЕР',
        
        // Кнопки опций
        'quick': 'Быстро',
        'short': 'Коротко',
        'medium': 'Средне',
        'all': 'Все',
        'allDesc': 'Все страны',
        
        'unlimited': 'Без времени',
        'fast': 'Быстро',
        'normal': 'Нормально',
        'relaxed': 'Спокойно',
        
        // --- ГЕЙМПЛЕЙ ---
        'pause': 'ПАУЗА',
        'score': 'Очки',
        'question': 'Вопрос',
        'skipQuestion': 'Пропустить',
        
        // Вопросы
        'guessCapital': 'Столица этой страны?',
        'findCountry': 'Где находится {capital}?',
        'guessCountry': 'Чья это столица?',
        'clickOnCountry': 'Найдите страну на карте',
        'in': 'в', 
        
        // Ответы
        'correct': 'Верно!',
        'wrong': 'Ошибка!',
        'correctAnswer': '{country} — столица {capital}',
        
        // --- ПАУЗА И ФИНАЛ ---
        'pauseTitle': 'ПАУЗА',
        'resume': 'ПРОДОЛЖИТЬ',
        'restart': 'ЗАНОВО',
        'quit': 'В МЕНЮ',
        'timePlayed': 'Время',
        
        'restartConfirm': 'Начать заново? Текущий прогресс будет потерян.',
        'quitConfirm': 'Выйти в меню? Прогресс будет потерян.',
        'languageChangeWarning': 'Смена языка сбросит текущую игру.',
        
        // Результаты (Финальные фразы)
        'resultsTitle': 'ФИНАЛ',
        'correctAnswers': 'Верно',
        'wrongAnswers': 'Ошибки',
        'time': 'Время',
        'playAgain': 'ЕЩЁ РАЗ',
        'mainMenu': 'МЕНЮ',
        
        'perfectResult': 'Гениально! ',  // 100%
        'greatResult': 'Отлично! ',     // > 80%
        'goodResult': 'Неплохо! ',      // Средний
        'tryAgain': 'Попробуй еще! '   // Мало
    },
    
    en: {
        // --- MENU ---
        'gameTitle': 'GeoGator',
        'gameSubtitle': 'Explore the world, beat records.',
        'statsTitle': 'STATISTICS',
        
        'statTotal': 'Total Correct',
        'statRecord': 'Best Score',
        'statAccuracy': 'Accuracy',
        
        'startGame': 'PLAY',
        'settings': 'SETTINGS',
        
        // --- SETTINGS ---
        'settingsTitle': 'SETTINGS',
        'language': 'LANGUAGE',
        'sound': 'SOUND',
        'back': 'Back',
        'saveSettings': 'SAVE',
        
        // --- SETUP ---
        'gameSettingsTitle': 'NEW GAME',
        'gameContinents': 'REGIONS',
        'startGameAction': 'GO!',
        'selectContinent': 'Select at least one region!',
        
        'europe': 'Europe',
        'asia': 'Asia',
        'africa': 'Africa',
        'north_america': 'N. America',
        'south_america': 'S. America',
        'oceania': 'Oceania',
        
        'gameMode': 'MODE',
        'modeCapitalByCountry': 'Guess Capital',
        'descCapitalByCountry': 'Quiz: Pick capital',
        'modeCountryByCapital': 'Find on Map',
        'descCountryByCapital': 'Search: Click map',
        'modeCountryByCapitalText': 'Guess Country',
        'descCountryByCapitalText': 'Quiz + Camera',
        
        'questionsCount': 'QUESTIONS',
        'timer': 'TIMER',
        
        'quick': 'Quick',
        'short': 'Short',
        'medium': 'Medium',
        'all': 'All',
        'allDesc': 'All countries',
        
        'unlimited': 'Unlimited',
        'fast': 'Fast',
        'normal': 'Normal',
        'relaxed': 'Relaxed',
        
        // --- GAMEPLAY ---
        'pause': 'PAUSE',
        'score': 'Score',
        'question': 'Q',
        'skipQuestion': 'Skip',
        
        'guessCapital': 'Capital of this country?',
        'findCountry': 'Where is {capital}?',
        'guessCountry': 'Whose capital is this?',
        'clickOnCountry': 'Find country on map',
        'in': 'in',
        
        'correct': 'Correct!',
        'wrong': 'Wrong!',
        'correctAnswer': '{country} — capital is {capital}',
        
        // --- PAUSE & RESULTS ---
        'pauseTitle': 'PAUSED',
        'resume': 'RESUME',
        'restart': 'RESTART',
        'quit': 'MENU',
        'timePlayed': 'Time',
        
        'restartConfirm': 'Restart game? Progress will be lost.',
        'quitConfirm': 'Quit to menu? Progress will be lost.',
        'languageChangeWarning': 'Changing language resets the game.',
        
        'resultsTitle': 'RESULTS',
        'correctAnswers': 'Correct',
        'wrongAnswers': 'Wrong',
        'time': 'Time',
        'playAgain': 'AGAIN',
        'mainMenu': 'MENU',
        
        'perfectResult': 'Perfect! ',
        'greatResult': 'Great! ',
        'goodResult': 'Good! ',
        'tryAgain': 'Try again! '
    }
};
