// GeoNavigator v6.0 - Main Application Logic (UPDATED for Natural Earth)
// Core game engine for geography quiz with interactive map

class GeoNavigator {
    constructor() {
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
            countryNameMapping: {},
            continents: {},
            countryData: {}
        };

        this.init();
    }

    init() {
        console.log('GeoNavigator v6.0 initializing...');
        this.loadSettings();
        this.loadCountryData();
        this.setupEventListeners();
        this.showScreen('mainMenu');
        this.setupNotifications();
    }

    loadCountryData() {
        if (window.GeoCountries) {
            console.log('Loading country data from GeoCountries module...');
            this.config.countryNameMapping = window.GeoCountries.countryNameMapping || {};
            this.config.continents = window.GeoCountries.continents || {};
            this.config.countryData = window.GeoCountries.countryData || {};
        } else {
            console.error('GeoCountries module not found!');
        }
    }

    setupEventListeners() {
        this.setupMainMenuEvents();
        this.setupGameSetupEvents();
        this.setupGameScreenEvents();
        this.setupPauseMenuEvents();
        this.setupResultsScreenEvents();
        this.setupSettingsEvents();
        this.setupMapEvents();
    }

    // === UI EVENTS ===

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
            openSettingsBtn.addEventListener('click', () => this.navigateToSettings('mainMenu'));
        }
        const openAboutBtn = document.getElementById('openAboutBtn');
        if (openAboutBtn) {
            openAboutBtn.addEventListener('click', () => {
                const lang = this.config.settings.language;
                const text = LOCALES?.[lang]?.aboutText || LOCALES?.['ru']?.aboutText || 'About';
                alert(text);
            });
        }
    }

    setupGameSetupEvents() {
        const backFromSetupBtn = document.getElementById('backFromSetupBtn');
        if (backFromSetupBtn) {
            backFromSetupBtn.addEventListener('click', () => {
                if (this.config.currentGame) this.resetGameState();
                this.showScreen('mainMenu');
            });
        }
        const startGameWithParamsBtn = document.getElementById('startGameWithParamsBtn');
        if (startGameWithParamsBtn) {
            startGameWithParamsBtn.addEventListener('click', () => this.startGame());
        }
    }

    setupGameScreenEvents() {
        const pauseGameBtn = document.getElementById('pauseGameBtn');
        if (pauseGameBtn) {
            pauseGameBtn.addEventListener('click', () => {
                if (this.config.gameState.isPaused) this.resumeGame();
                else this.showPauseMenu();
            });
        }
        const skipQuestionBtn = document.getElementById('skipQuestionBtn');
        if (skipQuestionBtn) {
            skipQuestionBtn.addEventListener('click', () => this.skipQuestion());
        }
    }

    setupPauseMenuEvents() {
        const resumeGameBtn = document.getElementById('resumeGameBtn');
        if (resumeGameBtn) {
            resumeGameBtn.addEventListener('click', () => this.resumeGame());
        }
        const restartGameBtn = document.getElementById('restartGameBtn');
        if (restartGameBtn) {
            restartGameBtn.addEventListener('click', () => {
                if (confirm(this.getLocalizedText('restartConfirm'))) {
                    this.resetGameState();
                    this.showScreen('gameSetupScreen');
                }
            });
        }
        const openSettingsFromPauseBtn = document.getElementById('openSettingsFromPauseBtn');
        if (openSettingsFromPauseBtn) {
            openSettingsFromPauseBtn.addEventListener('click', () => this.navigateToSettings('pauseScreen'));
        }
        const quitToMenuFromPauseBtn = document.getElementById('quitToMenuFromPauseBtn');
        if (quitToMenuFromPauseBtn) {
            quitToMenuFromPauseBtn.addEventListener('click', () => {
                if (confirm(this.getLocalizedText('quitConfirm'))) {
                    this.resetGameState();
                    this.showScreen('mainMenu');
                }
            });
        }
    }

    setupResultsScreenEvents() {
        const playAgainBtn = document.getElementById('playAgainBtn');
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => this.playAgain());
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
            backFromSettingsBtn.addEventListener('click', () => this.returnFromSettings());
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
                const val = document.getElementById('volumeValue');
                if (val) val.textContent = `${volume}%`;
                this.saveSettings();
            });
        }
        const saveSettingsBtn = document.querySelector('.btn-save');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => this.saveSettingsAndReturn());
        }
    }

    setupMapEvents() {
        const zoomInBtn = document.getElementById('zoomInBtn');
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                if (this.config.gameState.map) this.config.gameState.map.zoomIn();
            });
        }
        const zoomOutBtn = document.getElementById('zoomOutBtn');
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                if (this.config.gameState.map) this.config.gameState.map.zoomOut();
            });
        }
        const resetViewBtn = document.getElementById('resetViewBtn');
        if (resetViewBtn) {
            resetViewBtn.addEventListener('click', () => {
                if (this.config.gameState.map) this.config.gameState.map.setView([20, 0], 2);
            });
        }
    }

    // === SCREEN MANAGEMENT ===

    showScreen(screenName) {
        this.updateGameActiveStatus(screenName);
        this.handleScreenTransition(screenName);
        this.hideAllScreens();
        
        const targetScreen = document.getElementById(screenName);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.initializeScreen(screenName);
        }
    }

    updateGameActiveStatus(screenName) {
        if (screenName === 'gameScreen') this.config.navigation.gameActive = true;
        else if (screenName === 'mainMenu' || screenName === 'resultScreen') this.config.navigation.gameActive = false;
    }

    handleScreenTransition(screenName) {
        if (screenName !== 'gameScreen' && screenName !== 'pauseScreen' && screenName !== 'resultScreen') {
            this.stopTimer();
            this.config.gameState.isInputBlocked = true;
            this.config.gameState.isPaused = false;
        }
    }

    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    }

    initializeScreen(screenName) {
        if (screenName === 'gameScreen') {
            setTimeout(() => {
                this.initMap();
                if (this.config.gameState.map) this.config.gameState.map.setView([20, 0], 2);
            }, 100);
        } else if (screenName === 'pauseScreen') {
            this.updatePauseStats();
        } else if (screenName === 'settingsScreen') {
            this.applySettingsToUI();
        } else if (screenName === 'resultScreen') {
            this.showResults();
        }
    }

    applySettingsToUI() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.config.settings.language) btn.classList.add('active');
        });
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === this.config.settings.theme) btn.classList.add('active');
        });
        const slider = document.getElementById('volumeSlider');
        const val = document.getElementById('volumeValue');
        if (slider && val) {
            slider.value = this.config.settings.volume;
            val.textContent = `${this.config.settings.volume}%`;
        }
    }

    navigateToSettings(fromScreen) {
        this.config.navigation.previousScreen = fromScreen;
        this.config.navigation.fromPause = (fromScreen === 'pauseScreen');
        this.showScreen('settingsScreen');
    }

    returnFromSettings() {
        const prev = this.config.navigation.previousScreen;
        if (prev === 'pauseScreen' || this.config.navigation.fromPause) {
            this.config.navigation.fromPause = false;
            this.showScreen('pauseScreen');
        } else if (prev === 'gameSetupScreen') {
            this.showScreen('gameSetupScreen');
        } else {
            if (this.config.currentGame) this.resetGameState();
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

    // === PAUSE SYSTEM ===

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
        const total = this.config.gameState.questions.length;
        const current = this.config.gameState.currentQuestionIndex;
        const score = this.config.gameState.score;
        if (this.config.gameState.startTime) {
            const elapsed = Date.now() - this.config.gameState.startTime;
            this.config.gameState.elapsedTime = Math.floor(elapsed / 1000);
        }
        const pauseScore = document.getElementById('pauseScore');
        if (pauseScore) pauseScore.textContent = score;
        const pauseProgress = document.getElementById('pauseProgress');
        if (pauseProgress) {
            const p = total > 0 ? Math.round((current / total) * 100) : 0;
            pauseProgress.textContent = `${p}%`;
        }
        const pauseTime = document.getElementById('pauseTime');
        if (pauseTime) pauseTime.textContent = `${this.config.gameState.elapsedTime}с`;
    }

    // === GAME LOGIC ===

    startGame() {
        const params = this.getGameParameters();
        if (!this.validateGameParameters(params)) return;
        this.config.currentGame = params;
        this.resetGameStateForNewGame();
        this.generateQuestions();
        this.showScreen('gameScreen');
        this.showQuestion();
    }

    getGameParameters() {
        const continents = Array.from(document.querySelectorAll('input[name="continent"]:checked')).map(cb => cb.value);
        const gameMode = document.querySelector('input[name="gameMode"]:checked')?.value || 'capitalByCountry';
        const questionCount = parseInt(document.querySelector('input[name="questionCount"]:checked')?.value || '10');
        const timerDuration = parseInt(document.querySelector('input[name="timer"]:checked')?.value || '5');
        return { continents, mode: gameMode, questionCount, timerDuration };
    }

    validateGameParameters(params) {
        if (!params || params.continents.length === 0) {
            this.showNotification(this.getLocalizedText('selectContinent'), 'error');
            return false;
        }
        let total = 0;
        params.continents.forEach(c => {
            if (this.config.continents[c]) total += this.config.continents[c].length;
        });
        if (total === 0) {
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
        const { continents: selected, questionCount } = this.config.currentGame;
        let all = [];
        selected.forEach(c => {
            if (this.config.continents[c]) all = [...all, ...this.config.continents[c]];
        });
        const shuffled = this.shuffleArray(all);
        const selectedCountries = shuffled.slice(0, Math.min(questionCount, shuffled.length));
        
        this.config.gameState.questions = selectedCountries.map(c => {
            const d = this.config.countryData[c];
            if (!d) return null;
            return {
                country: c,
                capital: d.capital,
                code: d.code,
                continent: d.continent,
                type: this.config.currentGame.mode
            };
        }).filter(q => q !== null);
        
        document.getElementById('totalQuestions').textContent = this.config.gameState.questions.length;
    }

    showQuestion() {
        this.config.gameState.isInputBlocked = false;
        this.resetCountryColors();
        const { currentQuestionIndex, questions } = this.config.gameState;
        if (currentQuestionIndex >= questions.length) {
            this.endGame();
            return;
        }
        const q = questions[currentQuestionIndex];
        this.updateQuestionUI(currentQuestionIndex, questions.length);
        this.startTimer();
        
        if (this.config.currentGame.mode === 'capitalByCountry') {
            this.showCapitalByCountryQuestion(q);
        } else {
            this.showCountryByCapitalQuestion(q);
        }
    }

    updateQuestionUI(idx, total) {
        document.getElementById('currentQuestion').textContent = idx + 1;
        document.getElementById('totalQuestions').textContent = total;
        document.getElementById('correctCount').textContent = this.config.gameState.score;
        const p = ((idx + 1) / total) * 100;
        document.getElementById('progressBar').style.width = `${p}%`;
    }

    showCapitalByCountryQuestion(q) {
        const qt = document.getElementById('questionText');
        if (qt) qt.textContent = this.getLocalizedText('guessCapital');
        const fc = document.getElementById('countryFlagContainer');
        if (fc) fc.style.display = 'block';
        const ch = document.getElementById('capitalHint');
        if (ch) ch.style.display = 'none';
        const ao = document.getElementById('answerOptions');
        if (ao) ao.style.display = 'grid';
        
        const fd = document.getElementById('countryFlag');
        if (fd) {
            fd.innerHTML = '';
            const img = document.createElement('img');
            img.src = `https://flagcdn.com/w320/${q.code}.png`;
            img.alt = q.country;
            img.onerror = () => { img.src = 'https://flagcdn.com/w320/un.png'; };
            fd.appendChild(img);
        }
        const cn = document.getElementById('countryName');
        if (cn) cn.textContent = q.country;
        
        this.generateAnswerOptions(q);
    }

    showCountryByCapitalQuestion(q) {
        const qt = document.getElementById('questionText');
        if (qt) {
            const hint = this.getLocalizedText('findCountry').replace('{capital}', q.capital);
            qt.textContent = hint;
        }
        const fc = document.getElementById('countryFlagContainer');
        if (fc) fc.style.display = 'none';
        const ch = document.getElementById('capitalHint');
        if (ch) ch.style.display = 'flex';
        const ao = document.getElementById('answerOptions');
        if (ao) ao.style.display = 'none';
        
        this.displayContinentHint(q.continent, q.capital);
        
        if (this.config.gameState.map) {
            this.config.gameState.map.flyTo([20, 0], 2, { duration: 1 });
        }
    }

    displayContinentHint(continent, capital) {
        const el = document.querySelector('.capital-hint span');
        if (el) {
            const names = {
                europe: this.getLocalizedText('europe'),
                asia: this.getLocalizedText('asia'),
                africa: this.getLocalizedText('africa'),
                america: this.getLocalizedText('america'),
                oceania: this.getLocalizedText('oceania')
            };
            const cName = names[continent] || '';
            const inText = this.getLocalizedText('in');
            el.innerHTML = `<strong>${capital}</strong> — ${this.getLocalizedText('clickOnCountry')}${cName ? `<br><small>${inText} ${cName}</small>` : ''}`;
        }
    }

    generateAnswerOptions(q) {
        const grid = document.getElementById('answerOptions');
        if (!grid) return;
        grid.innerHTML = '';
        
        const correct = q.capital;
        const selected = this.config.currentGame?.continents || ['europe'];
        let capitals = [];
        selected.forEach(c => {
            if (this.config.continents[c]) {
                this.config.continents[c].forEach(country => {
                    const d = this.config.countryData[country];
                    if (d && d.capital) capitals.push(d.capital);
                });
            }
        });
        capitals = [...new Set(capitals)];
        const wrong = this.shuffleArray(capitals.filter(c => c !== correct)).slice(0, 7);
        const options = this.shuffleArray([correct, ...wrong]);
        
        options.forEach(ans => {
            const btn = document.createElement('button');
            btn.className = 'answer-option';
            btn.textContent = ans;
            btn.addEventListener('click', () => {
                if (this.config.gameState.isInputBlocked || this.config.gameState.isPaused) return;
                this.handleAnswerSelection(ans, correct, q.country);
            });
            grid.appendChild(btn);
        });
    }

    handleAnswerSelection(selected, correct, country) {
        this.config.gameState.isInputBlocked = true;
        if (selected === correct) {
            this.config.gameState.score++;
            this.showNotification(this.getLocalizedText('correct'), 'success');
            document.querySelectorAll('.answer-option').forEach(b => {
                if (b.textContent === correct) b.classList.add('correct');
            });
        } else {
            this.showNotification(this.getLocalizedText('wrong'), 'error');
            document.querySelectorAll('.answer-option').forEach(b => {
                if (b.textContent === correct) b.classList.add('correct');
                else if (b.textContent === selected) b.classList.add('wrong');
            });
            const msg = this.getLocalizedText('correctAnswer').replace('{country}', country).replace('{capital}', correct);
            setTimeout(() => this.showNotification(msg, 'info'), 1000);
        }
        setTimeout(() => this.nextQuestion(), 2000);
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
        const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
        if (!q) return;
        const msg = this.getLocalizedText('correctAnswer').replace('{country}', q.country).replace('{capital}', q.capital);
        this.showNotification(msg, 'info');
        setTimeout(() => this.nextQuestion(), 2000);
    }

    // === MAP FUNCTIONS (UPDATED) ===

    initMap() {
        const container = document.getElementById('map');
        if (!container) return;
        try {
            if (this.config.gameState.map) this.config.gameState.map.remove();
            
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
                attribution: '© OpenStreetMap',
                subdomains: 'abcd',
                maxZoom: 8
            }).addTo(map);
            
            this.addCountryBoundaries(map);
            this.config.gameState.map = map;
        } catch (e) {
            console.error('Map error:', e);
        }
    }

    addCountryBoundaries(map) {
        fetch('countries.geo.json')
            .then(r => {
                if (!r.ok) throw new Error('Failed to load map');
                return r.json();
            })
            .then(data => {
                const layer = L.geoJson(data, {
                    style: () => ({
                        fillColor: 'transparent',
                        weight: 1.5,
                        opacity: 0.6,
                        color: '#4cc9f0',
                        fillOpacity: 0.1,
                        dashArray: '3, 3',
                        className: 'country-polygon'
                    }),
                    onEachFeature: (f, l) => this.setupCountryInteractivity(f, l, map)
                }).addTo(map);
                this.config.gameState.boundariesLayer = layer;
                console.log('Map loaded successfully');
            })
            .catch(e => {
                console.error('Map fetch error:', e);
                this.showNotification('Error loading countries.geo.json', 'error');
            });
    }

    setupCountryInteractivity(feature, layer, map) {
        // === FIX START: Get BOTH codes ===
        const isoCode = feature.properties.ISO_A2 || feature.properties.ISO_A2_EH;
        const adm3Code = feature.properties.ADM0_A3;
        
        let countryName = null;
        if (window.GeoCountries) {
            countryName = window.GeoCountries.getCountryNameByCode(isoCode, adm3Code);
        }

        if (!countryName) {
            layer.setStyle({ interactive: false }); 
            return;
        }
        // === FIX END ===

        layer.options.interactive = true;
        
        layer.on('mouseover', () => {
            if (this.config.gameState.isInputBlocked || this.config.gameState.isPaused) return;
            layer.setStyle({ weight: 2.5, color: '#ffffff', fillOpacity: 0.2, dashArray: '' });
            layer.bindTooltip(countryName, {
                permanent: false, direction: 'auto', className: 'country-tooltip'
            }).openTooltip();
            layer.bringToFront();
        });
        
        layer.on('mouseout', () => {
            if (this.config.gameState.isInputBlocked || this.config.gameState.isPaused) return;
            if (this.config.gameState.boundariesLayer) this.config.gameState.boundariesLayer.resetStyle(layer);
            layer.closeTooltip();
        });

        layer.on('click', (e) => {
            if (this.config.currentGame?.mode !== 'countryByCapital' || 
                this.config.gameState.isInputBlocked || 
                this.config.gameState.isPaused) return;

            L.DomEvent.stop(e);
            const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
            this.handleMapCountryClick(countryName, q);
        });
    }

    handleMapCountryClick(clickedCountry, currentQuestion) {
        this.config.gameState.isInputBlocked = true;
        if (clickedCountry === currentQuestion.country) {
            this.config.gameState.score++;
            this.showNotification(this.getLocalizedText('correct'), 'success');
            this.highlightCorrectCountry(currentQuestion.country);
        } else {
            this.showNotification(this.getLocalizedText('wrong'), 'error');
            this.highlightCorrectCountry(currentQuestion.country);
            const msg = this.getLocalizedText('correctAnswer').replace('{country}', currentQuestion.country).replace('{capital}', currentQuestion.capital);
            setTimeout(() => this.showNotification(msg, 'info'), 1000);
        }
        setTimeout(() => this.nextQuestion(), 2000);
    }

    highlightCorrectCountry(countryName) {
        if (!this.config.gameState.boundariesLayer || !this.config.gameState.map) return;
        const layerGroup = this.config.gameState.boundariesLayer;
        
        layerGroup.eachLayer(layer => {
            // === FIX: Use robust lookup to find the layer ===
            const iso = layer.feature.properties.ISO_A2 || layer.feature.properties.ISO_A2_EH;
            const adm3 = layer.feature.properties.ADM0_A3;
            
            // Resolve name from map layer
            const layerName = window.GeoCountries.getCountryNameByCode(iso, adm3);
            
            // Compare names directly (Russian to Russian)
            if (layerName === countryName) {
                layer.setStyle({
                    weight: 3, color: '#4ade80', fillColor: '#4ade80',
                    fillOpacity: 0.4, dashArray: ''
                });
                const bounds = layer.getBounds();
                if (bounds && Object.keys(bounds).length > 0) {
                    this.config.gameState.map.flyToBounds(bounds, {
                        padding: [50, 50], maxZoom: 5, duration: 1.5
                    });
                }
            }
        });
    }

    resetCountryColors() {
        if (!this.config.gameState.boundariesLayer) return;
        this.config.gameState.boundariesLayer.eachLayer(l => {
            this.config.gameState.boundariesLayer.resetStyle(l);
        });
    }

    // === TIMER ===

    startTimer() {
        this.stopTimer();
        if (!this.config.currentGame || this.config.gameState.isInputBlocked || this.config.gameState.isPaused) return;
        let left = this.config.currentGame.timerDuration;
        const display = document.getElementById('timerDisplay');
        if (display) {
            display.textContent = left;
            display.style.color = left <= 10 ? '#ef4444' : '#f59e0b';
        }
        this.config.gameState.timerInterval = setInterval(() => {
            if (!this.config.currentGame || this.config.gameState.isInputBlocked || this.config.gameState.isPaused) {
                this.stopTimer();
                return;
            }
            left--;
            if (display) {
                display.textContent = left;
                display.style.color = left <= 10 ? '#ef4444' : '#f59e0b';
            }
            if (left <= 0) {
                this.stopTimer();
                this.handleTimeOut();
            }
        }, 1000);
    }

    handleTimeOut() {
        this.config.gameState.isInputBlocked = true;
        const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
        if (q) {
            const msg = this.getLocalizedText('correctAnswer').replace('{country}', q.country).replace('{capital}', q.capital);
            this.showNotification(msg, 'warning');
            setTimeout(() => this.nextQuestion(), 2000);
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
        const p = total > 0 ? Math.round((correct / total) * 100) : 0;
        const time = Math.round((Date.now() - this.config.gameState.startTime) / 1000);
        
        const ids = { resultScore: correct, resultTotal: total, correctAnswers: correct, wrongAnswers: wrong, totalTime: time, resultPercentage: `${p}%` };
        for (const [id, val] of Object.entries(ids)) {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        }
        
        const circle = document.querySelector('.score-circle');
        if (circle && total > 0) {
            const deg = (correct / total) * 360;
            circle.style.background = `conic-gradient(#4ade80 0deg ${deg}deg, #ef4444 ${deg}deg 360deg)`;
        }
        
        let key = 'tryAgain';
        if (p === 100) key = 'perfectResult';
        else if (p >= 80) key = 'greatResult';
        else if (p >= 60) key = 'goodResult';
        
        const msgEl = document.getElementById('resultMessage');
        if (msgEl) msgEl.textContent = this.getLocalizedText(key);
        
        this.showScreen('resultScreen');
    }

    playAgain() {
        this.resetGameStateForNewGame();
        this.generateQuestions();
        this.showScreen('gameScreen');
        this.showQuestion();
    }

    // === SETTINGS ===

    loadSettings() {
        try {
            const s = localStorage.getItem('geoNavigatorSettings');
            if (s) {
                this.config.settings = { ...this.config.settings, ...JSON.parse(s) };
                this.applySettings();
            }
        } catch (e) { console.error(e); }
    }

    saveSettings() {
        try { localStorage.setItem('geoNavigatorSettings', JSON.stringify(this.config.settings)); } catch (e) {}
    }

    applySettings() {
        this.applyLanguage(this.config.settings.language);
        this.applyTheme(this.config.settings.theme);
        this.updateActiveSettingsButtons();
    }

    applyLanguage(lang) {
        this.config.settings.language = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = this.getLocalizedText(key);
            if (text) {
                if (el.children.length > 0) {
                    Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE).forEach(n => n.textContent = text);
                } else {
                    el.textContent = text;
                }
            }
        });
        this.updateLanguageButtonTexts(lang);
    }

    applyTheme(theme) {
        document.body.className = theme === 'dark' ? 'dark-theme' : '';
    }

    updateActiveSettingsButtons() {
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.remove('active');
            if (b.dataset.lang === this.config.settings.language) b.classList.add('active');
        });
        document.querySelectorAll('.theme-btn').forEach(b => {
            b.classList.remove('active');
            if (b.dataset.theme === this.config.settings.theme) b.classList.add('active');
        });
    }

    updateLanguageButtonTexts(lang) {
        document.querySelectorAll('.lang-btn span').forEach(s => {
            if (s.hasAttribute('data-i18n-ru') && s.hasAttribute('data-i18n-en')) {
                s.textContent = lang === 'ru' ? s.getAttribute('data-i18n-ru') : s.getAttribute('data-i18n-en');
            }
        });
    }

    changeLanguage(lang, btn) {
        this.config.settings.language = lang;
        this.applyLanguage(lang);
        this.saveSettings();
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    showLanguageChangeWarning(lang, btn) {
        if (confirm(this.getLocalizedText('languageChangeWarning'))) {
            this.resetGameState();
            this.config.navigation.gameActive = false;
            this.changeLanguage(lang, btn);
            this.showNotification(this.getLocalizedText('gameReset'), 'warning');
        }
    }

    getLocalizedText(key) {
        const lang = this.config.settings.language;
        return LOCALES?.[lang]?.[key] || LOCALES?.['ru']?.[key] || key;
    }

    // === UTILS ===

    shuffleArray(array) {
        const s = [...array];
        for (let i = s.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [s[i], s[j]] = [s[j], s[i]];
        }
        return s;
    }

    resetGameState() {
        this.stopTimer();
        this.config.gameState.isInputBlocked = true;
        this.config.gameState.isPaused = false;
        this.config.gameState.score = 0;
        this.config.gameState.currentQuestionIndex = 0;
        this.config.gameState.questions = [];
        this.config.gameState.startTime = null;
        this.config.currentGame = null;
        this.config.navigation.gameActive = false;
        this.config.navigation.fromPause = false;
        this.resetCountryColors();
        const n = document.getElementById('notification');
        if (n) n.classList.remove('show');
    }

    setupNotifications() {
        if (!document.getElementById('notification')) {
            const d = document.createElement('div');
            d.id = 'notification';
            d.className = 'notification';
            d.innerHTML = `<div class="notification-content"><i id="notificationIcon" class="fas fa-info-circle"></i><span id="notificationText"></span></div>`;
            document.body.appendChild(d);
        }
    }

    showNotification(msg, type = 'info') {
        const n = document.getElementById('notification');
        const icon = document.getElementById('notificationIcon');
        const text = document.getElementById('notificationText');
        if (!n || !icon || !text) return;
        
        const conf = {
            success: { i: 'fa-check-circle', c: '#4ade80' },
            error: { i: 'fa-times-circle', c: '#ef4444' },
            warning: { i: 'fa-exclamation-circle', c: '#f59e0b' },
            info: { i: 'fa-info-circle', c: '#4cc9f0' }
        }[type] || { i: 'fa-info-circle', c: '#4cc9f0' };
        
        icon.className = `fas ${conf.i}`;
        n.style.borderLeftColor = conf.c;
        text.textContent = msg;
        n.classList.add('show');
        setTimeout(() => n.classList.remove('show'), 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.geoNavigator = new GeoNavigator();
});
