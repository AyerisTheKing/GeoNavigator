// locales.js - файл локализации версия 6.0
const LOCALES = {
    ru: {
        // Главное меню
        'gameTitle': 'GeoNavigator',
        'gameSubtitle': 'Проверьте свои знания географии! Угадывайте страны и столицы на интерактивной карте мира.',
        'modeCapitalByCountry': 'Столица по стране',
        'modeCountryByCapital': 'Страна по столице',
        'startGame': 'НАЧАТЬ ИГРУ',
        'featuresTitle': 'Особенности игры',
        'feature1': 'Интерактивная карта',
        'feature2': 'Система достижений',
        'feature3': 'Гибкие настройки',
        'countries': 'Стран',
        'modes': 'Режима',
        'continents': 'Континентов',
        'settings': 'Настройки',
        'about': 'Об игре',
        
        // Настройки
        'settingsTitle': 'НАСТРОЙКИ',
        'language': 'ЯЗЫК',
        'sound': 'ЗВУК',
        'theme': 'ТЕМА',
        'lightTheme': 'Светлая',
        'darkTheme': 'Тёмная',
        'saveSettings': 'СОХРАНИТЬ НАСТРОЙКИ',
        'back': 'Назад',
        
        // Настройки игры
        'gameSettingsTitle': 'НАСТРОЙКИ ИГРЫ',
        'gameContinents': 'КОНТИНЕНТЫ',
        'europe': 'Европа',
        'asia': 'Азия',
        'africa': 'Африка',
        'oceania': 'Океания',
        'america': 'Америка',
        'gameMode': 'РЕЖИМ ИГРЫ',
        'capitalByCountryDesc': 'Угадайте столицу по стране',
        'countryByCapitalDesc': 'Найдите страну на карте',
        'questions': 'ВОПРОСЫ',
        'quick': 'Быстро',
        'short': 'Коротко',
        'medium': 'Средне',
        'long': 'Длинно',
        'all': 'ВСЕ',
        'timer': 'ТАЙМЕР',
        'fast': 'Быстро',
        'normal': 'Нормально',
        'relaxed': 'Расслабленно',
        'noRush': 'Не торопясь',
        'startGameNow': 'НАЧАТЬ ИГРУ',
        
        // Игровой экран
        'guessCapital': 'Угадайте столицу этой страны:',
        'findCountry': 'Найдите на карте страну со столицей: {capital}',
        'clickOnCountry': 'Кликните на нужную страну на карте',
        'skipQuestion': 'ПРОПУСТИТЬ ВОПРОС',
        'quitConfirm': 'Вы уверены, что хотите выйти из игры?',
        'correct': 'Правильно! ✓',
        'wrong': 'Неправильно! ✗',
        'correctAnswer': 'Правильный ответ: {country} ({capital})',
        'selectContinent': 'Пожалуйста, выберите хотя бы один континент',
        
        // Пауза
        'pauseTitle': 'ПАУЗА',
        'resume': 'ПРОДОЛЖИТЬ',
        'restart': 'НАЧАТЬ ЗАНОВО',
        'score': 'Счет',
        'progress': 'Прогресс',
        'timePlayed': 'Время игры',
        'restartConfirm': 'Вы уверены, что хотите начать игру заново? Текущий прогресс будет потерян.',
        'languageChangeWarning': 'Внимание: Вы находитесь в активной игре. Изменение языка сбросит текущую игру. Продолжить?',
        
        // Результаты
        'resultsTitle': 'РЕЗУЛЬТАТЫ ИГРЫ',
        'correctAnswers': 'Правильно',
        'wrongAnswers': 'Неправильно',
        'time': 'Время',
        'playAgain': 'ИГРАТЬ СНОВА',
        'mainMenu': 'ГЛАВНОЕ МЕНЮ',
        'perfectResult': 'Идеальный результат! Вы эксперт по географии! 🌟',
        'greatResult': 'Отличный результат! Продолжайте в том же духе! 👍',
        'goodResult': 'Хороший результат! Есть куда стремиться! 💪',
        'tryAgain': 'Попробуйте еще раз! Вы обязательно улучшите результат! 🔄',
        
        // Уведомления
        'settingsSaved': 'Настройки сохранены',
        'gameReset': 'Игра сброшена из-за изменения языка',
        'aboutText': `GeoNavigator v6.0
Географическая игра для изучения стран и столиц.

Разработано с использованием:
- Leaflet.js для карт
- Font Awesome для иконок
- Poppins шрифт

Все страны мира - 195 стран!`,
        
        // Дополнительные
        'in': 'в'
    },
    
    en: {
        // Main menu
        'gameTitle': 'GeoNavigator',
        'gameSubtitle': 'Test your geography knowledge! Guess countries and capitals on the interactive world map.',
        'modeCapitalByCountry': 'Capital by Country',
        'modeCountryByCapital': 'Country by Capital',
        'startGame': 'START GAME',
        'featuresTitle': 'Game Features',
        'feature1': 'Interactive Map',
        'feature2': 'Achievement System',
        'feature3': 'Flexible Settings',
        'countries': 'Countries',
        'modes': 'Modes',
        'continents': 'Continents',
        'settings': 'Settings',
        'about': 'About',
        
        // Settings
        'settingsTitle': 'SETTINGS',
        'language': 'LANGUAGE',
        'sound': 'SOUND',
        'theme': 'THEME',
        'lightTheme': 'Light',
        'darkTheme': 'Dark',
        'saveSettings': 'SAVE SETTINGS',
        'back': 'Back',
        
        // Game settings
        'gameSettingsTitle': 'GAME SETTINGS',
        'gameContinents': 'CONTINENTS',
        'europe': 'Europe',
        'asia': 'Asia',
        'africa': 'Africa',
        'oceania': 'Oceania',
        'america': 'America',
        'gameMode': 'GAME MODE',
        'capitalByCountryDesc': 'Guess the capital from the country',
        'countryByCapitalDesc': 'Find the country on the map',
        'questions': 'QUESTIONS',
        'quick': 'Quick',
        'short': 'Short',
        'medium': 'Medium',
        'long': 'Long',
        'all': 'ALL',
        'timer': 'TIMER',
        'fast': 'Fast',
        'normal': 'Normal',
        'relaxed': 'Relaxed',
        'noRush': 'No Rush',
        'startGameNow': 'START GAME NOW',
        
        // Game screen
        'guessCapital': 'Guess the capital of this country:',
        'findCountry': 'Find the country on the map with the capital: {capital}',
        'clickOnCountry': 'Click on the country on the map',
        'skipQuestion': 'SKIP QUESTION',
        'quitConfirm': 'Are you sure you want to quit the game?',
        'correct': 'Correct! ✓',
        'wrong': 'Wrong! ✗',
        'correctAnswer': 'Correct answer: {country} ({capital})',
        'selectContinent': 'Please select at least one continent',
        
        // Pause
        'pauseTitle': 'PAUSE',
        'resume': 'RESUME',
        'restart': 'RESTART GAME',
        'score': 'Score',
        'progress': 'Progress',
        'timePlayed': 'Time Played',
        'restartConfirm': 'Are you sure you want to restart the game? Current progress will be lost.',
        'languageChangeWarning': 'Warning: You are in an active game. Changing the language will reset the current game. Continue?',
        
        // Results
        'resultsTitle': 'GAME RESULTS',
        'correctAnswers': 'Correct',
        'wrongAnswers': 'Wrong',
        'time': 'Time',
        'playAgain': 'PLAY AGAIN',
        'mainMenu': 'MAIN MENU',
        'perfectResult': 'Perfect score! You are a geography expert! 🌟',
        'greatResult': 'Great result! Keep it up! 👍',
        'goodResult': 'Good result! There is room for improvement! 💪',
        'tryAgain': 'Try again! You will definitely improve your result! 🔄',
        
        // Notifications
        'settingsSaved': 'Settings saved',
        'gameReset': 'Game reset due to language change',
        'aboutText': `GeoNavigator v6.0
A geography game for learning countries and capitals.

Developed using:
- Leaflet.js for maps
- Font Awesome for icons
- Poppins font

All countries of the world - 195 countries!`,
        
        // Additional
        'in': 'in'
    }
};