// GeoNavigator v6.0 - Main Application Logic (UPDATED for Local Map)
// Core game engine for geography quiz with interactive map

class GeoNavigator {
    constructor() {
        // Configuration object for game state and settings
        this.config = {
            currentGame: null,      
            settings: {             
                language: 'ru',
                volume: 80,
                theme: 'dark'
            },
            gameState: {            
                score: 0,
                currentQuestionIndex: 0,
                questions: [],
                startTime: null,
                timerInterval: null,
                map: null,
                boundariesLayer: null,
                isInputBlocked: false,
                elapsedTime: 0,
                isPaused: false,
                lastTimerTime: 0
            },
            navigation: {
                previousScreen: null,   
                fromPause: false,       
                gameActive: false       
            },
            // Данные теперь берутся из модуля GeoCountries динамически
            countryNameMapping: {},
            continents: {},
            countryData: {}
        };

        // Initialize the application
        this.init();
    }

    // ============================================
    // INITIALIZATION AND SETUP
    // ============================================

    init() {
        console.log('GeoNavigator v6.0 initializing...');
        
        // Load saved user settings from localStorage
        this.loadSettings();
        
        // Load country data from GeoCountries module
        this.loadCountryData();
        
        // Set up event listeners for UI interactions
        this.setupEventListeners();
        
        // Show main menu as default screen
        this.showScreen('mainMenu');
        
        // Initialize notification system
        this.setupNotifications();
    }

    loadCountryData() {
        if (window.GeoCountries) {
            console.log('Loading country data from GeoCountries module...');
            this.config.countryNameMapping = window.GeoCountries.countryNameMapping || {};
            this.config.continents = window.GeoCountries.continents || {};
            this.config.countryData = window.GeoCountries.countryData || {};
        } else {
            console.error('GeoCountries module not found! Game data will be unavailable.');
            this.config.countryNameMapping = {};
            this.config.continents = {
                europe: [], asia: [], africa: [], america: [], oceania: []
            };
            this.config.countryData = {};
        }
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        this.setupMainMenuEvents();
        this.setupGameSetupEvents();
        this.setupGameScreenEvents();
        this.setupPauseMenuEvents();
        this.setupResultsScreenEvents();
        this.setupSettingsEvents();
        this.setupMapEvents();
    }

    setupMainMenuEvents() {
        const startGameBtn = document.getElementById('startGameBtn');
        if (startGameBtn) {
            startGameBtn.addEventListener('click', () => {
                this.config.navigation.previousScreen = 'mainMenu';
                this.showScreen('gameSetupScreen');
            });
        }

        const openSettingsBtn = document.getElementById('openSettingsBtn');
        if (openSettingsBtn) {
            openSettingsBtn.addEventListener('click', () => {
                this.navigateToSettings('mainMenu');
            });
        }

        const openAboutBtn = document.getElementById('openAboutBtn');
        if (openAboutBtn) {
            openAboutBtn.addEventListener('click', () => {
                const currentLang = this.config.settings.language;
                const aboutText = LOCALES?.[currentLang]?.aboutText || LOCALES?.['ru']?.aboutText || 'About GeoNavigator';
                alert(aboutText);
            });
        }
    }

    setupGameSetupEvents() {
        const backFromSetupBtn = document.getElementById('backFromSetupBtn');
        if (backFromSetupBtn) {
            backFromSetupBtn.addEventListener('click', () => {
                if (this.config.currentGame) {
                    this.resetGameState();
                }
                this.showScreen('mainMenu');
            });
        }

        const startGameWithParamsBtn = document.getElementById('startGameWithParamsBtn');
        if (startGameWithParamsBtn) {
            startGameWithParamsBtn.addEventListener('click', () => {
                console.log('Start game button clicked in setup screen');
                this.startGame();
            });
        }
    }

    setupGameScreenEvents() {
        const pauseGameBtn = document.getElementById('pauseGameBtn');
        if (pauseGameBtn) {
            pauseGameBtn.addEventListener('click', () => {
                if (this.config.gameState.isPaused) {
                    this.resumeGame();
                } else {
                    this.showPauseMenu();
                }
            });
        }

        const skipQuestionBtn = document.getElementById('skipQuestionBtn');
        if (skipQuestionBtn) {
            skipQuestionBtn.addEventListener('click', () => {
                this.skipQuestion();
            });
        }
    }

    setupPauseMenuEvents() {
        const resumeGameBtn = document.getElementById('resumeGameBtn');
        if (resumeGameBtn) {
            resumeGameBtn.addEventListener('click', () => {
                this.resumeGame();
            });
        }
        
        const restartGameBtn = document.getElementById('restartGameBtn');
        if (restartGameBtn) {
            restartGameBtn.addEventListener('click', () => {
                const confirmMsg = this.getLocalizedText('restartConfirm');
                if (confirm(confirmMsg)) {
                    this.resetGameState();
                    this.showScreen('gameSetupScreen');
                }
            });
        }
        
        const openSettingsFromPauseBtn = document.getElementById('openSettingsFromPauseBtn');
        if (openSettingsFromPauseBtn) {
            openSettingsFromPauseBtn.addEventListener('click', () => {
                this.navigateToSettings('pauseScreen');
            });
        }
        
        const quitToMenuFromPauseBtn = document.getElementById('quitToMenuFromPauseBtn');
        if (quitToMenuFromPauseBtn) {
            quitToMenuFromPauseBtn.addEventListener('click', () => {
                const confirmMsg = this.getLocalizedText('quitConfirm');
                if (confirm(confirmMsg)) {
                    this.resetGameState();
                    this.showScreen('mainMenu');
                }
            });
        }
    }

    setupResultsScreenEvents() {
        const playAgainBtn = document.getElementById('playAgainBtn');
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => {
                this.playAgain();
            });
        }

        const backToMenuFromResultBtn = document.getElementById('backToMenuFromResultBtn');
        if (backToMenuFromResultBtn) {
            backToMenuFromResultBtn.addEventListener('click', () => {
                this.resetGameState();
                this.showScreen('mainMenu');
            });
        }
    }

    setupSettingsEvents() {
        const backFromSettingsBtn = document.getElementById('backFromSettingsBtn');
        if (backFromSettingsBtn) {
            backFromSettingsBtn.addEventListener('click', () => {
                this.returnFromSettings();
            });
        }

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                if (this.config.navigation.gameActive) {
                    this.showLanguageChangeWarning(lang, btn);
                } else {
                    this.changeLanguage(lang, btn);
                }
            });
        });

        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.theme;
                this.config.settings.theme = theme;
                this.applyTheme(theme);
                this.saveSettings();
                
                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const volume = parseInt(e.target.value);
                this.config.settings.volume = volume;
                const volumeValue = document.getElementById('volumeValue');
                if (volumeValue) {
                    volumeValue.textContent = `${volume}%`;
                }
                this.saveSettings();
            });
        }

        const saveSettingsBtn = document.querySelector('.btn-save');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => {
                this.saveSettingsAndReturn();
            });
        }
    }

    setupMapEvents() {
        const zoomInBtn = document.getElementById('zoomInBtn');
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                if (this.config.gameState.map) {
                    this.config.gameState.map.zoomIn();
                }
            });
        }

        const zoomOutBtn = document.getElementById('zoomOutBtn');
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                if (this.config.gameState.map) {
                    this.config.gameState.map.zoomOut();
                }
            });
        }

        const resetViewBtn = document.getElementById('resetViewBtn');
        if (resetViewBtn) {
            resetViewBtn.addEventListener('click', () => {
                if (this.config.gameState.map) {
                    this.config.gameState.map.setView([20, 0], 2);
                }
            });
        }
    }

    // ============================================
    // SCREEN MANAGEMENT
    // ============================================

    showScreen(screenName) {
        console.log(`Showing screen: ${screenName}`);
        
        this.updateGameActiveStatus(screenName);
        this.handleScreenTransition(screenName);
        this.hideAllScreens();
        
        const targetScreen = document.getElementById(screenName);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.initializeScreen(screenName);
            console.log(`Screen ${screenName} displayed successfully`);
        } else {
            console.error(`Screen ${screenName} not found in DOM`);
        }
    }

    updateGameActiveStatus(screenName) {
        if (screenName === 'gameScreen') {
            this.config.navigation.gameActive = true;
        } else if (screenName === 'mainMenu' || screenName === 'resultScreen') {
            this.config.navigation.gameActive = false;
        }
    }

    handleScreenTransition(screenName) {
        if (screenName !== 'gameScreen' && screenName !== 'pauseScreen' && screenName !== 'resultScreen') {
            this.stopTimer();
            this.config.gameState.isInputBlocked = true;
            this.config.gameState.isPaused = false;
            
            if (screenName === 'mainMenu' || screenName === 'gameSetupScreen' || screenName === 'settingsScreen') {
                this.config.navigation.gameActive = false;
            }
        }
    }

    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }

    initializeScreen(screenName) {
        switch(screenName) {
            case 'gameScreen':
                this.initializeGameScreen();
                break;
            case 'pauseScreen':
                this.updatePauseStats();
                break;
            case 'settingsScreen':
                this.initializeSettingsScreen();
                break;
            case 'resultScreen':
                this.initializeResultScreen();
                break;
        }
    }

    initializeGameScreen() {
        setTimeout(() => {
            this.initMap();
            if (this.config.gameState.map) {
                this.config.gameState.map.setView([20, 0], 2);
            }
        }, 100);
    }

    initializeSettingsScreen() {
        this.applySettingsToUI();
    }

    initializeResultScreen() {
        this.showResults();
    }

    applySettingsToUI() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.config.settings.language) {
                btn.classList.add('active');
            }
        });
        
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === this.config.settings.theme) {
                btn.classList.add('active');
            }
        });
        
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeValue = document.getElementById('volumeValue');
        if (volumeSlider && volumeValue) {
            volumeSlider.value = this.config.settings.volume;
            volumeValue.textContent = `${this.config.settings.volume}%`;
        }
    }

    navigateToSettings(fromScreen) {
        this.config.navigation.previousScreen = fromScreen;
        this.config.navigation.fromPause = (fromScreen === 'pauseScreen');
        this.showScreen('settingsScreen');
    }

    returnFromSettings() {
        const previousScreen = this.config.navigation.previousScreen;
        
        if (previousScreen === 'pauseScreen' || this.config.navigation.fromPause) {
            this.config.navigation.fromPause = false;
            this.showScreen('pauseScreen');
        } else if (previousScreen === 'gameSetupScreen') {
            this.showScreen('gameSetupScreen');
        } else {
            if (this.config.currentGame) {
                this.resetGameState();
            }
            this.showScreen('mainMenu');
        }
    }

    saveSettingsAndReturn() {
        this.saveSettings();
        
        if (this.config.navigation.fromPause) {
            this.config.navigation.fromPause = false;
            this.showScreen('pauseScreen');
        } else {
            this.returnFromSettings();
        }
        
        this.showNotification(this.getLocalizedText('settingsSaved'), 'success');
    }

    // ============================================
    // PAUSE MENU SYSTEM
    // ============================================

    showPauseMenu() {
        if (this.config.gameState.isPaused) {
            this.resumeGame();
            return;
        }
        
        this.stopTimer();
        this.config.gameState.isPaused = true;
        this.config.gameState.isInputBlocked = true;
        this.updatePauseStats();
        this.showScreen('pauseScreen');
    }

    resumeGame() {
        this.config.gameState.isPaused = false;
        this.config.gameState.isInputBlocked = false;
        this.startTimer();
        this.showScreen('gameScreen');
    }

    updatePauseStats() {
        const totalQuestions = this.config.gameState.questions.length;
        const currentQuestion = this.config.gameState.currentQuestionIndex;
        const score = this.config.gameState.score;
        
        if (this.config.gameState.startTime) {
            const elapsedMs = Date.now() - this.config.gameState.startTime;
            this.config.gameState.elapsedTime = Math.floor(elapsedMs / 1000);
        }
        
        const pauseScore = document.getElementById('pauseScore');
        const pauseProgress = document.getElementById('pauseProgress');
        const pauseTime = document.getElementById('pauseTime');
        
        if (pauseScore) pauseScore.textContent = score;
        
        if (pauseProgress) {
            const progress = totalQuestions > 0 ? 
                Math.round((currentQuestion / totalQuestions) * 100) : 0;
            pauseProgress.textContent = `${progress}%`;
        }
        
        if (pauseTime) pauseTime.textContent = `${this.config.gameState.elapsedTime}с`;
    }

    // ============================================
    // GAME LOGIC
    // ============================================

    startGame() {
        console.log('Starting new game...');
        
        const gameParams = this.getGameParameters();
        if (!this.validateGameParameters(gameParams)) {
            return;
        }
        
        this.config.currentGame = gameParams;
        this.resetGameStateForNewGame();
        this.generateQuestions();
        this.showScreen('gameScreen');
        this.showQuestion();
    }

    getGameParameters() {
        const continents = Array.from(
            document.querySelectorAll('input[name="continent"]:checked')
        ).map(cb => cb.value);
        
        const gameMode = document.querySelector('input[name="gameMode"]:checked')?.value || 'capitalByCountry';
        const questionCount = parseInt(document.querySelector('input[name="questionCount"]:checked')?.value || '10');
        const timerDuration = parseInt(document.querySelector('input[name="timer"]:checked')?.value || '5');
        
        console.log('Game parameters:', { continents, gameMode, questionCount, timerDuration });
        
        return { continents, mode: gameMode, questionCount, timerDuration };
    }

    validateGameParameters(params) {
        if (!params || params.continents.length === 0) {
            this.showNotification(this.getLocalizedText('selectContinent'), 'error');
            return false;
        }
        
        let totalCountries = 0;
        params.continents.forEach(continent => {
            if (this.config.continents[continent]) {
                totalCountries += this.config.continents[continent].length;
            }
        });
        
        if (totalCountries === 0) {
            this.showNotification(this.getLocalizedText('selectContinent'), 'error');
            return false;
        }
        
        return true;
    }

    resetGameStateForNewGame() {
        this.config.gameState.score = 0;
        this.config.gameState.currentQuestionIndex = 0;
        this.config.gameState.startTime = Date.now();
        this.config.gameState.elapsedTime = 0;
        this.config.gameState.questions = [];
        this.config.gameState.isInputBlocked = false;
        this.config.gameState.isPaused = false;
        
        document.getElementById('correctCount').textContent = '0';
        document.getElementById('currentQuestion').textContent = '1';
        document.getElementById('progressBar').style.width = '0%';
    }

    generateQuestions() {
        const { continents: selectedContinents, questionCount } = this.config.currentGame;
        
        let allCountries = [];
        selectedContinents.forEach(continent => {
            if (this.config.continents[continent]) {
                allCountries = [...allCountries, ...this.config.continents[continent]];
            }
        });
        
        const shuffledCountries = this.shuffleArray(allCountries);
        const selectedCountries = shuffledCountries.slice(0, Math.min(questionCount, shuffledCountries.length));
        
        this.config.gameState.questions = selectedCountries.map(country => {
            const countryData = this.config.countryData[country];
            if (!countryData) {
                console.error(`No data found for country: ${country}`);
                return null;
            }
            
            return {
                country,
                capital: countryData.capital,
                code: countryData.code,
                continent: countryData.continent,
                type: this.config.currentGame.mode
            };
        }).filter(q => q !== null);
        
        console.log(`Generated ${this.config.gameState.questions.length} questions`);
        document.getElementById('totalQuestions').textContent = this.config.gameState.questions.length;
    }

    showQuestion() {
        this.config.gameState.isInputBlocked = false;
        this.resetCountryColors();
        
        const { currentQuestionIndex, questions } = this.config.gameState;
        const { mode } = this.config.currentGame;
        
        if (currentQuestionIndex >= questions.length) {
            this.endGame();
            return;
        }
        
        const question = questions[currentQuestionIndex];
        this.updateQuestionUI(currentQuestionIndex, questions.length);
        this.startTimer();
        
        if (mode === 'capitalByCountry') {
            this.showCapitalByCountryQuestion(question);
        } else {
            this.showCountryByCapitalQuestion(question);
        }
    }

    updateQuestionUI(currentIndex, totalQuestions) {
        document.getElementById('currentQuestion').textContent = currentIndex + 1;
        document.getElementById('totalQuestions').textContent = totalQuestions;
        document.getElementById('correctCount').textContent = this.config.gameState.score;
        
        const progress = ((currentIndex + 1) / totalQuestions) * 100;
        document.getElementById('progressBar').style.width = `${progress}%`;
    }

    showCapitalByCountryQuestion(question) {
        const questionText = document.getElementById('questionText');
        if (questionText) {
            questionText.textContent = this.getLocalizedText('guessCapital');
        }
        
        const flagContainer = document.getElementById('countryFlagContainer');
        if (flagContainer) flagContainer.style.display = 'block';
        
        const capitalHint = document.getElementById('capitalHint');
        if (capitalHint) capitalHint.style.display = 'none';
        
        const answerOptions = document.getElementById('answerOptions');
        if (answerOptions) answerOptions.style.display = 'grid';
        
        const flagDisplay = document.getElementById('countryFlag');
        if (flagDisplay) {
            flagDisplay.innerHTML = '';
            const flagImg = document.createElement('img');
            flagImg.src = `https://flagcdn.com/w320/${question.code}.png`;
            flagImg.alt = question.country;
            flagImg.onerror = () => {
                flagImg.src = 'https://flagcdn.com/w320/un.png';
            };
            flagDisplay.appendChild(flagImg);
        }
        
        const countryName = document.getElementById('countryName');
        if (countryName) {
            countryName.textContent = question.country;
        }
        
        this.generateAnswerOptions(question);
    }

    showCountryByCapitalQuestion(question) {
        const questionText = document.getElementById('questionText');
        if (questionText) {
            const hintText = this.getLocalizedText('findCountry').replace('{capital}', question.capital);
            questionText.textContent = hintText;
        }
        
        const flagContainer = document.getElementById('countryFlagContainer');
        if (flagContainer) flagContainer.style.display = 'none';
        
        const capitalHint = document.getElementById('capitalHint');
        if (capitalHint) capitalHint.style.display = 'flex';
        
        const answerOptions = document.getElementById('answerOptions');
        if (answerOptions) answerOptions.style.display = 'none';
        
        this.displayContinentHint(question.continent, question.capital);
        
        if (this.config.gameState.map) {
            this.config.gameState.map.flyTo([20, 0], 2, {
                duration: 1,
                easeLinearity: 0.25
            });
        }
    }

    displayContinentHint(continent, capital) {
        const hintElement = document.querySelector('.capital-hint span');
        if (hintElement) {
            const continentNames = {
                europe: this.getLocalizedText('europe'),
                asia: this.getLocalizedText('asia'),
                africa: this.getLocalizedText('africa'),
                america: this.getLocalizedText('america'),
                oceania: this.getLocalizedText('oceania')
            };
            const continentName = continentNames[continent] || '';
            const inText = this.getLocalizedText('in');
            hintElement.innerHTML = `
                <strong>${capital}</strong> — ${this.getLocalizedText('clickOnCountry')}
                ${continentName ? `<br><small>${inText} ${continentName}</small>` : ''}
            `;
        }
    }

    generateAnswerOptions(question) {
        const answersGrid = document.getElementById('answerOptions');
        if (!answersGrid) return;
        
        answersGrid.innerHTML = '';
        
        const correctAnswer = question.capital;
        const selectedContinents = this.config.currentGame?.continents || ['europe', 'asia', 'africa', 'america', 'oceania'];
        
        let allCapitals = [];
        selectedContinents.forEach(continent => {
            if (this.config.continents[continent]) {
                this.config.continents[continent].forEach(country => {
                    const countryData = this.config.countryData[country];
                    if (countryData && countryData.capital) {
                        allCapitals.push(countryData.capital);
                    }
                });
            }
        });
        
        allCapitals = [...new Set(allCapitals)];
        
        const filteredCapitals = allCapitals.filter(capital => capital !== correctAnswer);
        const wrongAnswersCount = Math.min(7, filteredCapitals.length);
        const shuffledWrong = this.shuffleArray(filteredCapitals);
        const wrongAnswers = shuffledWrong.slice(0, wrongAnswersCount);
        
        const allAnswers = [correctAnswer, ...wrongAnswers];
        const shuffledAnswers = this.shuffleArray(allAnswers);
        
        shuffledAnswers.forEach(answer => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.textContent = answer;
            button.addEventListener('click', () => {
                if (this.config.gameState.isInputBlocked || this.config.gameState.isPaused) return;
                this.handleAnswerSelection(answer, correctAnswer, question.country);
            });
            answersGrid.appendChild(button);
        });
    }

    handleAnswerSelection(selectedAnswer, correctAnswer, correctCountry) {
        this.config.gameState.isInputBlocked = true;
        
        if (selectedAnswer === correctAnswer) {
            this.config.gameState.score++;
            this.showNotification(this.getLocalizedText('correct'), 'success');
            
            document.querySelectorAll('.answer-option').forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.classList.add('correct');
                }
            });
        } else {
            this.showNotification(this.getLocalizedText('wrong'), 'error');
            
            document.querySelectorAll('.answer-option').forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.classList.add('correct');
                } else if (btn.textContent === selectedAnswer) {
                    btn.classList.add('wrong');
                }
            });
            
            const message = this.getLocalizedText('correctAnswer')
                .replace('{country}', correctCountry)
                .replace('{capital}', correctAnswer);
            
            setTimeout(() => {
                this.showNotification(message, 'info');
            }, 1000);
        }
        
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    nextQuestion() {
        this.config.gameState.isInputBlocked = false;
        this.config.gameState.currentQuestionIndex++;
        this.resetCountryColors();
        this.showQuestion();
    }

    skipQuestion() {
        if (this.config.gameState.isInputBlocked || this.config.gameState.isPaused) return;
        
        this.config.gameState.isInputBlocked = true;
        const question = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
        if (!question) return;
        
        const message = this.getLocalizedText('correctAnswer')
            .replace('{country}', question.country)
            .replace('{capital}', question.capital);
        this.showNotification(message, 'info');
        
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    // ============================================
    // MAP AND GEOGRAPHY FUNCTIONS (UPDATED)
    // ============================================

    initMap() {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;
        
        try {
            if (this.config.gameState.map) {
                this.config.gameState.map.remove();
            }
            
            const map = L.map('map', {
                zoomControl: false,
                attributionControl: false,
                center: [20, 0],
                zoom: 2,
                minZoom: 2,
                maxZoom: 8,
                worldCopyJump: true,
                maxBounds: [[-90, -180], [90, 180]],
                maxBoundsViscosity: 1.0
            });
            
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '© OpenStreetMap, © CARTO',
                subdomains: 'abcd',
                maxZoom: 8
            }).addTo(map);
            
            this.addCountryBoundaries(map);
            this.config.gameState.map = map;
            
        } catch (error) {
            console.error('Map initialization error:', error);
        }
    }

    addCountryBoundaries(map) {
        // Fetching LOCAL file from root
        fetch('countries.geo.json')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load local map data');
                return response.json();
            })
            .then(data => {
                const geoJsonLayer = L.geoJson(data, {
                    style: () => {
                        return {
                            fillColor: 'transparent',
                            weight: 1.5,
                            opacity: 0.6,
                            color: '#4cc9f0',
                            fillOpacity: 0.1,
                            dashArray: '3, 3',
                            className: 'country-polygon'
                        };
                    },
                    onEachFeature: (feature, layer) => {
                        this.setupCountryInteractivity(feature, layer, map);
                    }
                }).addTo(map);
                
                this.config.gameState.boundariesLayer = geoJsonLayer;
                console.log('Local map loaded successfully');
            })
            .catch(error => {
                console.error('Map loading error:', error);
                this.showNotification('Error loading map file (check countries.geo.json)', 'error');
                this.addSimpleBoundaries(map); // Fallback
            });
    }

    setupCountryInteractivity(feature, layer, map) {
        // === UPDATED: Identify country by ISO_A2 code ===
        // Natural Earth uses ISO_A2 or ISO_A2_EH
        const isoCode = feature.properties.ISO_A2 || feature.properties.ISO_A2_EH;
        
        // Resolve Russian name using our helper
        let countryName = null;
        if (window.GeoCountries && isoCode) {
            countryName = window.GeoCountries.getCountryNameByCode(isoCode);
        }

        // If not found in our game database, disable interaction
        if (!countryName) {
            layer.setStyle({ interactive: false }); 
            return;
        }

        layer.options.interactive = true;
        layer.options.bubblingMouseEvents = false;
        
        layer.on('mouseover', (e) => {
            if (this.config.gameState.isInputBlocked || this.config.gameState.isPaused) return;
            
            layer.setStyle({
                weight: 2.5,
                color: '#ffffff',
                fillOpacity: 0.2,
                dashArray: ''
            });
            
            layer.bindTooltip(countryName, {
                permanent: false,
                direction: 'auto',
                className: 'country-tooltip'
            }).openTooltip();
            
            layer.bringToFront();
        });
        
        layer.on('mouseout', () => {
            if (this.config.gameState.isInputBlocked || this.config.gameState.isPaused) return;
            if (this.config.gameState.boundariesLayer) {
                this.config.gameState.boundariesLayer.resetStyle(layer);
            }
            layer.closeTooltip();
        });

        // === CLICK HANDLING MOVED HERE ===
        layer.on('click', (e) => {
            if (this.config.currentGame?.mode !== 'countryByCapital' || 
                this.config.gameState.isInputBlocked || 
                this.config.gameState.isPaused) {
                return;
            }

            // Stop event propagation so map doesn't get clicked
            L.DomEvent.stop(e);

            const currentQuestion = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
            
            // Handle click with the correctly identified country name
            this.handleMapCountryClick(countryName, currentQuestion, e.latlng);
        });
    }

    // Note: old setupMapClickHandler is no longer needed as logic is inside the layer

    handleMapCountryClick(clickedCountry, currentQuestion, latlng) {
        this.config.gameState.isInputBlocked = true;
        
        if (clickedCountry === currentQuestion.country) {
            this.config.gameState.score++;
            this.showNotification(this.getLocalizedText('correct'), 'success');
            this.highlightCorrectCountry(currentQuestion.country);
        } else {
            this.showNotification(this.getLocalizedText('wrong'), 'error');
            this.highlightCorrectCountry(currentQuestion.country);
            
            const message = this.getLocalizedText('correctAnswer')
                .replace('{country}', currentQuestion.country)
                .replace('{capital}', currentQuestion.capital);
            
            setTimeout(() => {
                this.showNotification(message, 'info');
            }, 1000);
        }
        
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    highlightCorrectCountry(countryName) {
        if (!this.config.gameState.boundariesLayer || !this.config.gameState.map) return;
        
        // === UPDATED: Find correct country by ISO code ===
        const targetCode = window.GeoCountries.getCodeByCountryName(countryName);
        if (!targetCode) return;

        const geoJsonLayer = this.config.gameState.boundariesLayer;
        
        geoJsonLayer.eachLayer((layer) => {
            const mapIsoCode = layer.feature?.properties?.ISO_A2 || layer.feature?.properties?.ISO_A2_EH;
            
            if (mapIsoCode && targetCode && 
                mapIsoCode.toLowerCase() === targetCode.toLowerCase()) {
                
                layer.setStyle({
                    weight: 3,
                    color: '#4ade80',
                    fillColor: '#4ade80',
                    fillOpacity: 0.4,
                    dashArray: ''
                });
                
                const bounds = layer.getBounds();
                if (bounds && Object.keys(bounds).length > 0) {
                    this.config.gameState.map.flyToBounds(bounds, {
                        padding: [50, 50],
                        maxZoom: 5,
                        duration: 1.5,
                        easeLinearity: 0.25
                    });
                }
            }
        });
    }

    resetCountryColors() {
        if (!this.config.gameState.boundariesLayer) return;
        
        const geoJsonLayer = this.config.gameState.boundariesLayer;
        geoJsonLayer.eachLayer((layer) => {
            if (layer.setStyle) {
                geoJsonLayer.resetStyle(layer);
            }
        });
    }

    addSimpleBoundaries(map) {
        // Fallback rectangles if geojson fails
        const continents = [
            { name: 'Europe', bounds: [[35, -10], [71, 40]] },
            { name: 'Asia', bounds: [[10, 60], [75, 180]] },
            { name: 'Africa', bounds: [[-35, -20], [37, 50]] },
            { name: 'North America', bounds: [[15, -170], [72, -50]] },
            { name: 'South America', bounds: [[-55, -80], [12, -35]] },
            { name: 'Oceania', bounds: [[-50, 110], [0, 180]] }
        ];
        
        continents.forEach(continent => {
            L.rectangle(continent.bounds, {
                color: '#4cc9f0',
                weight: 1.5,
                opacity: 0.6,
                fillOpacity: 0.05,
                dashArray: '3, 3'
            }).addTo(map);
        });
    }

    // ============================================
    // TIMER MANAGEMENT
    // ============================================

    startTimer() {
        this.stopTimer();
        
        if (!this.config.currentGame || this.config.gameState.isInputBlocked || this.config.gameState.isPaused) {
            return;
        }
        
        let timeLeft = this.config.currentGame.timerDuration;
        const timerDisplay = document.getElementById('timerDisplay');
        
        if (timerDisplay) {
            timerDisplay.textContent = timeLeft;
            timerDisplay.style.color = timeLeft <= 10 ? '#ef4444' : '#f59e0b';
        }
        
        this.config.gameState.timerInterval = setInterval(() => {
            if (!this.config.currentGame || this.config.gameState.isInputBlocked || this.config.gameState.isPaused) {
                this.stopTimer();
                return;
            }
            
            timeLeft--;
            
            if (timerDisplay) {
                timerDisplay.textContent = timeLeft;
                timerDisplay.style.color = timeLeft <= 10 ? '#ef4444' : '#f59e0b';
            }
            
            if (timeLeft <= 0) {
                this.stopTimer();
                if (this.config.currentGame && !this.config.gameState.isInputBlocked && !this.config.gameState.isPaused) {
                    this.handleTimeOut();
                }
            }
        }, 1000);
    }

    handleTimeOut() {
        this.config.gameState.isInputBlocked = true;
        const question = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
        if (question) {
            const message = this.getLocalizedText('correctAnswer')
                .replace('{country}', question.country)
                .replace('{capital}', question.capital);
            this.showNotification(message, 'warning');
            
            setTimeout(() => {
                this.nextQuestion();
            }, 2000);
        }
    }

    stopTimer() {
        if (this.config.gameState.timerInterval) {
            clearInterval(this.config.gameState.timerInterval);
            this.config.gameState.timerInterval = null;
        }
    }

    endGame() {
        this.stopTimer();
        this.config.navigation.gameActive = false;
        this.showResults();
    }

    showResults() {
        const total = this.config.gameState.questions.length;
        const correct = this.config.gameState.score;
        const wrong = total - correct;
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        const time = Math.round((Date.now() - this.config.gameState.startTime) / 1000);
        
        const resultScore = document.getElementById('resultScore');
        const resultTotal = document.getElementById('resultTotal');
        const correctAnswers = document.getElementById('correctAnswers');
        const wrongAnswers = document.getElementById('wrongAnswers');
        const totalTime = document.getElementById('totalTime');
        const resultPercentage = document.getElementById('resultPercentage');
        
        if (resultScore) resultScore.textContent = correct;
        if (resultTotal) resultTotal.textContent = total;
        if (correctAnswers) correctAnswers.textContent = correct;
        if (wrongAnswers) wrongAnswers.textContent = wrong;
        if (totalTime) totalTime.textContent = time;
        if (resultPercentage) resultPercentage.textContent = `${percentage}%`;
        
        const scoreCircle = document.querySelector('.score-circle');
        if (scoreCircle && total > 0) {
            const correctDeg = (correct / total) * 360;
            scoreCircle.style.background = `conic-gradient(#4ade80 0deg ${correctDeg}deg, #ef4444 ${correctDeg}deg 360deg)`;
        }
        
        let message = '';
        if (percentage === 100) {
            message = this.getLocalizedText('perfectResult');
        } else if (percentage >= 80) {
            message = this.getLocalizedText('greatResult');
        } else if (percentage >= 60) {
            message = this.getLocalizedText('goodResult');
        } else {
            message = this.getLocalizedText('tryAgain');
        }
        
        const resultMessage = document.getElementById('resultMessage');
        if (resultMessage) resultMessage.textContent = message;
        
        this.showScreen('resultScreen');
    }

    playAgain() {
        this.resetGameStateForNewGame();
        this.generateQuestions();
        this.showScreen('gameScreen');
        this.showQuestion();
    }

    // ============================================
    // SETTINGS AND LOCALIZATION
    // ============================================

    loadSettings() {
        const savedSettings = localStorage.getItem('geoNavigatorSettings');
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                this.config.settings = { ...this.config.settings, ...parsed };
                this.applySettings();
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('geoNavigatorSettings', JSON.stringify(this.config.settings));
            console.log('Settings saved to localStorage');
        } catch (e) {
            console.error('Error saving settings:', e);
        }
    }

    applySettings() {
        this.applyLanguage(this.config.settings.language);
        this.applyTheme(this.config.settings.theme);
        this.applyVolume(this.config.settings.volume);
        this.updateActiveSettingsButtons();
    }

    applyLanguage(lang) {
        this.config.settings.language = lang;
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = this.getLocalizedText(key);
            
            if (text) {
                if (element.children.length > 0) {
                    const textNodes = Array.from(element.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
                    textNodes.forEach(node => node.textContent = text);
                } else {
                    element.textContent = text;
                }
            }
        });
        
        this.updateLanguageButtonTexts(lang);
    }

    applyTheme(theme) {
        this.config.settings.theme = theme;
        document.body.className = theme === 'dark' ? 'dark-theme' : '';
    }

    applyVolume(volume) {
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeValue = document.getElementById('volumeValue');
        
        if (volumeSlider && volumeValue) {
            volumeSlider.value = volume;
            volumeValue.textContent = `${volume}%`;
        }
    }

    updateActiveSettingsButtons() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.config.settings.language) {
                btn.classList.add('active');
            }
        });
        
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === this.config.settings.theme) {
                btn.classList.add('active');
            }
        });
    }

    updateLanguageButtonTexts(lang) {
        document.querySelectorAll('.lang-btn span').forEach(span => {
            const langBtn = span.closest('.lang-btn');
            if (langBtn) {
                if (span.hasAttribute('data-i18n-ru') && span.hasAttribute('data-i18n-en')) {
                    span.textContent = lang === 'ru' ? 
                        span.getAttribute('data-i18n-ru') : 
                        span.getAttribute('data-i18n-en');
                }
            }
        });
    }

    changeLanguage(lang, buttonElement) {
        this.config.settings.language = lang;
        this.applyLanguage(lang);
        this.saveSettings();
        
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        buttonElement.classList.add('active');
    }

    showLanguageChangeWarning(lang, buttonElement) {
        const message = this.getLocalizedText('languageChangeWarning');
        
        if (confirm(message)) {
            this.resetGameState();
            this.config.navigation.gameActive = false;
            this.changeLanguage(lang, buttonElement);
            this.showNotification(this.getLocalizedText('gameReset'), 'warning');
        }
    }

    getLocalizedText(key) {
        const lang = this.config.settings.language;
        if (typeof LOCALES !== 'undefined' && LOCALES && LOCALES[lang] && LOCALES[lang][key]) {
            return LOCALES[lang][key];
        }
        if (typeof LOCALES !== 'undefined' && LOCALES && LOCALES['ru'] && LOCALES['ru'][key]) {
            return LOCALES['ru'][key];
        }
        return key; 
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    resetGameState() {
        console.log('Resetting game state...');
        
        this.stopTimer();
        this.config.gameState.isInputBlocked = true;
        this.config.gameState.isPaused = false;
        
        this.config.gameState.score = 0;
        this.config.gameState.currentQuestionIndex = 0;
        this.config.gameState.questions = [];
        this.config.gameState.startTime = null;
        this.config.gameState.elapsedTime = 0;
        
        this.config.currentGame = null;
        
        this.config.navigation.gameActive = false;
        this.config.navigation.fromPause = false;
        this.config.navigation.previousScreen = null;
        
        this.resetCountryColors();
        
        const notification = document.getElementById('notification');
        if (notification) {
            notification.classList.remove('show');
        }
        
        console.log('Game state reset complete');
    }

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================

    setupNotifications() {
        if (!document.getElementById('notification')) {
            const notificationContainer = document.createElement('div');
            notificationContainer.id = 'notification';
            notificationContainer.className = 'notification';
            notificationContainer.innerHTML = `
                <div class="notification-content">
                    <i id="notificationIcon" class="fas fa-info-circle"></i>
                    <span id="notificationText"></span>
                </div>
            `;
            document.body.appendChild(notificationContainer);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const notificationIcon = document.getElementById('notificationIcon');
        const notificationText = document.getElementById('notificationText');
        
        if (!notification || !notificationIcon || !notificationText) return;
        
        const typeConfig = {
            success: { icon: 'fa-check-circle', color: '#4ade80' },
            error: { icon: 'fa-times-circle', color: '#ef4444' },
            warning: { icon: 'fa-exclamation-circle', color: '#f59e0b' },
            info: { icon: 'fa-info-circle', color: '#4cc9f0' }
        };
        
        const config = typeConfig[type] || typeConfig.info;
        
        notificationIcon.className = `fas ${config.icon}`;
        notification.style.borderLeftColor = config.color;
        notificationText.textContent = message;
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Initialize application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('GeoNavigator v6.0 initializing...');
    window.geoNavigator = new GeoNavigator();
});
