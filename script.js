// GeoNavigator v6.6 - GeoGator Edition (Stats + New Menu)

class GeoNavigator {
    constructor() {
        this.config = {
            currentGame: null,      
            settings: { language: 'ru', volume: 80, theme: 'dark' },
            gameState: {            
                score: 0, currentQuestionIndex: 0, questions: [], startTime: null,
                timerInterval: null, map: null, boundariesLayer: null,
                isInputBlocked: false, elapsedTime: 0, isPaused: false
            },
            navigation: { previousScreen: null, fromPause: false, gameActive: false },
            countryNameMapping: {}, continents: {}, countryData: {},
            // Статистика игрока
            playerStats: { totalCorrect: 0, totalQuestions: 0, bestScore: 0 }
        };

        this.continentViews = {
            'europe': { center: [50, 15], zoom: 4 },
            'asia': { center: [35, 90], zoom: 3 },
            'africa': { center: [0, 20], zoom: 3 },
            'america': { center: [15, -75], zoom: 3 },
            'oceania': { center: [-25, 135], zoom: 4 }
        };

        this.init();
    }

    init() {
        console.log('GeoGator v6.6 initialized');
        this.loadSettings();
        this.loadPlayerStats(); // Загружаем статистику
        this.loadCountryData();
        this.setupEventListeners();
        this.showScreen('mainMenu');
        this.setupNotifications();
        this.updateStatsUI(); // Обновляем цифры на экране
    }

    loadPlayerStats() {
        try {
            const stats = localStorage.getItem('geoGatorStats');
            if (stats) {
                this.config.playerStats = { ...this.config.playerStats, ...JSON.parse(stats) };
            }
        } catch (e) { console.error('Stats load error', e); }
    }

    savePlayerStats() {
        try {
            localStorage.setItem('geoGatorStats', JSON.stringify(this.config.playerStats));
            this.updateStatsUI(); // Сразу обновляем экран
        } catch (e) { console.error('Stats save error', e); }
    }

    updateStatsUI() {
        // Обновляем цифры в главном меню
        const s = this.config.playerStats;
        const totalEl = document.getElementById('statTotalCorrect');
        const bestEl = document.getElementById('statBestScore');
        const accEl = document.getElementById('statAccuracy');

        if (totalEl) totalEl.textContent = s.totalCorrect;
        if (bestEl) bestEl.textContent = s.bestScore;
        
        let acc = 0;
        if (s.totalQuestions > 0) {
            acc = Math.round((s.totalCorrect / s.totalQuestions) * 100);
        }
        if (accEl) accEl.textContent = `${acc}%`;
    }

    loadCountryData() {
        if (window.GeoCountries) {
            this.config.countryNameMapping = window.GeoCountries.countryNameMapping || {};
            this.config.continents = window.GeoCountries.continents || {};
            this.config.countryData = window.GeoCountries.countryData || {};
        }
    }

    setupEventListeners() {
        // Меню
        document.getElementById('startGameBtn')?.addEventListener('click', () => {
            this.config.navigation.previousScreen = 'mainMenu';
            this.showScreen('gameSetupScreen');
        });
        document.getElementById('openSettingsBtn')?.addEventListener('click', () => this.navigateToSettings('mainMenu'));

        // Остальные обработчики (стандартные)
        document.getElementById('backFromSetupBtn')?.addEventListener('click', () => this.showScreen('mainMenu'));
        document.getElementById('startGameWithParamsBtn')?.addEventListener('click', () => this.startGame());
        document.getElementById('pauseGameBtn')?.addEventListener('click', () => this.showPauseMenu());
        document.getElementById('skipQuestionBtn')?.addEventListener('click', () => this.skipQuestion());
        document.getElementById('resumeGameBtn')?.addEventListener('click', () => this.resumeGame());
        document.getElementById('restartGameBtn')?.addEventListener('click', () => {
            if(confirm(this.getLocalizedText('restartConfirm'))) { this.resetGameState(); this.showScreen('gameSetupScreen'); }
        });
        document.getElementById('quitToMenuFromPauseBtn')?.addEventListener('click', () => {
            if(confirm(this.getLocalizedText('quitConfirm'))) { this.resetGameState(); this.showScreen('mainMenu'); }
        });
        document.getElementById('playAgainBtn')?.addEventListener('click', () => this.playAgain());
        document.getElementById('backToMenuFromResultBtn')?.addEventListener('click', () => {
            this.resetGameState(); this.showScreen('mainMenu');
        });
        document.getElementById('backFromSettingsBtn')?.addEventListener('click', () => this.returnFromSettings());
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if(this.config.navigation.gameActive) this.showLanguageChangeWarning(btn.dataset.lang, btn);
                else this.changeLanguage(btn.dataset.lang, btn);
            });
        });
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.applyTheme(btn.dataset.theme);
                this.saveSettings();
                this.updateActiveSettingsButtons();
            });
        });
    }

    startGame() {
        const params = this.getGameParameters();
        if (!this.validateGameParameters(params)) return;
        this.config.currentGame = params;
        this.resetGameStateForNewGame();
        
        const gameScreen = document.getElementById('gameScreen');
        if (params.mode === 'countryByCapitalText') gameScreen.classList.add('mode-text-country');
        else gameScreen.classList.remove('mode-text-country');

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
        return true;
    }

    resetGameStateForNewGame() {
        this.config.gameState.score = 0;
        this.config.gameState.currentQuestionIndex = 0;
        this.config.gameState.startTime = Date.now();
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
            return { country: c, capital: d.capital, code: d.code, continent: d.continent };
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
        
        const mode = this.config.currentGame.mode;
        if (mode === 'capitalByCountry') this.showCapitalByCountryQuestion(q);
        else if (mode === 'countryByCapital') this.showCountryByCapitalQuestion(q);
        else if (mode === 'countryByCapitalText') this.showCountryByCapitalTextQuestion(q);
    }

    updateQuestionUI(idx, total) {
        document.getElementById('currentQuestion').textContent = idx + 1;
        document.getElementById('totalQuestions').textContent = total;
        document.getElementById('correctCount').textContent = this.config.gameState.score;
        document.getElementById('progressBar').style.width = `${((idx + 1) / total) * 100}%`;
    }

    showCapitalByCountryQuestion(q) {
        this.toggleUIElements({ flag: true, options: true, hint: false });
        document.getElementById('questionText').textContent = this.getLocalizedText('guessCapital');
        document.getElementById('countryName').textContent = q.country;
        document.getElementById('countryFlag').innerHTML = `<img src="https://flagcdn.com/w320/${q.code}.png" alt="flag">`;
        this.generateAnswerOptions(q, 'capital');
    }

    showCountryByCapitalQuestion(q) {
        this.toggleUIElements({ flag: false, options: false, hint: true });
        document.getElementById('questionText').textContent = this.getLocalizedText('findCountry').replace('{capital}', q.capital);
        this.displayContinentHint(q.continent, q.capital);
    }

    showCountryByCapitalTextQuestion(q) {
        this.toggleUIElements({ flag: false, options: true, hint: true });
        document.getElementById('questionText').textContent = this.getLocalizedText('guessCountry');
        document.querySelector('.capital-hint span').innerHTML = `<strong>${q.capital}</strong>`;
        if (this.config.gameState.map && this.continentViews[q.continent]) {
            const view = this.continentViews[q.continent];
            this.config.gameState.map.flyTo(view.center, view.zoom, { duration: 0.3, easeLinearity: 0.5 });
        }
        this.generateAnswerOptions(q, 'country');
    }

    toggleUIElements({ flag, options, hint }) {
        document.getElementById('countryFlagContainer').style.display = flag ? 'block' : 'none';
        document.getElementById('capitalHint').style.display = hint ? 'flex' : 'none';
        document.getElementById('answerOptions').style.display = options ? 'grid' : 'none';
    }

    displayContinentHint(continent, capital) {
        const el = document.querySelector('.capital-hint span');
        const cName = this.getLocalizedText(continent);
        const inText = this.getLocalizedText('in');
        el.innerHTML = `<strong>${capital}</strong> — ${this.getLocalizedText('clickOnCountry')}<br><small>${inText} ${cName}</small>`;
    }

    generateAnswerOptions(q, type) {
        const grid = document.getElementById('answerOptions');
        grid.innerHTML = '';
        let correct = (type === 'capital') ? q.capital : q.country;
        let pool = [];
        const selected = this.config.currentGame.continents;
        selected.forEach(c => {
            this.config.continents[c]?.forEach(countryName => {
                const d = this.config.countryData[countryName];
                if (type === 'capital') pool.push(d.capital); else pool.push(countryName);
            });
        });
        pool = [...new Set(pool)].filter(i => i !== correct);
        const wrong = this.shuffleArray(pool).slice(0, 3);
        const options = this.shuffleArray([correct, ...wrong]);
        options.forEach(ans => {
            const btn = document.createElement('button');
            btn.className = 'answer-option';
            btn.textContent = ans;
            btn.addEventListener('click', () => { if(!this.config.gameState.isInputBlocked) this.handleAnswerSelection(ans, correct, q); });
            grid.appendChild(btn);
        });
    }

    handleAnswerSelection(selected, correct, q) {
        this.config.gameState.isInputBlocked = true;
        if (this.config.currentGame.mode === 'countryByCapitalText') this.highlightCorrectCountry(q.country);
        
        if (selected === correct) {
            this.config.gameState.score++;
            this.showNotification(this.getLocalizedText('correct'), 'success');
            this.markButtons(correct, selected);
        } else {
            this.showNotification(this.getLocalizedText('wrong'), 'error');
            this.markButtons(correct, selected);
            setTimeout(() => this.showNotification(this.getLocalizedText('correctAnswer').replace('{country}', q.country).replace('{capital}', q.capital), 'info'), 1000);
        }
        setTimeout(() => this.nextQuestion(), 1500);
    }

    markButtons(correct, selected) {
        document.querySelectorAll('.answer-option').forEach(btn => {
            if (btn.textContent === correct) btn.classList.add('correct');
            else if (btn.textContent === selected) btn.classList.add('wrong');
        });
    }

    nextQuestion() {
        this.config.gameState.isInputBlocked = false;
        this.config.gameState.currentQuestionIndex++;
        this.resetCountryColors();
        this.showQuestion();
    }

    skipQuestion() {
        if(this.config.gameState.isInputBlocked) return;
        this.config.gameState.isInputBlocked = true;
        const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
        if (this.config.currentGame.mode === 'countryByCapitalText') this.highlightCorrectCountry(q.country);
        const msg = this.getLocalizedText('correctAnswer').replace('{country}', q.country).replace('{capital}', q.capital);
        this.showNotification(msg, 'info');
        setTimeout(() => this.nextQuestion(), 1500);
    }

    initMap() {
        if (!document.getElementById('map')) return;
        if (this.config.gameState.map) this.config.gameState.map.remove();
        const map = L.map('map', { zoomControl: false, attributionControl: false, center: [20, 0], zoom: 2, minZoom: 2, maxZoom: 8, worldCopyJump: true, maxBoundsViscosity: 1.0 });
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { subdomains: 'abcd', maxZoom: 8 }).addTo(map);
        this.addCountryBoundaries(map);
        this.config.gameState.map = map;
    }

    addCountryBoundaries(map) {
        fetch('countries.geo.json').then(r => r.json()).then(data => {
            const layer = L.geoJson(data, {
                style: { fillColor: 'transparent', weight: 1.5, opacity: 0.6, color: '#4cc9f0', fillOpacity: 0.1, dashArray: '3, 3' },
                onEachFeature: (f, l) => this.setupCountryInteractivity(f, l, map)
            }).addTo(map);
            this.config.gameState.boundariesLayer = layer;
        }).catch(e => console.error('Map load error', e));
    }

    setupCountryInteractivity(feature, layer, map) {
        const iso = feature.properties.ISO_A2 || feature.properties.ISO_A2_EH;
        const adm3 = feature.properties.ADM0_A3;
        const name = window.GeoCountries?.getCountryNameByCode(iso, adm3);
        if (!name) { layer.setStyle({ interactive: false }); return; }
        if (this.config.currentGame?.mode === 'countryByCapitalText') { layer.options.interactive = false; return; }
        layer.options.interactive = true;
        layer.on('mouseover', () => {
            if(this.config.gameState.isInputBlocked) return;
            layer.setStyle({ weight: 2.5, color: '#fff', fillOpacity: 0.2, dashArray: '' });
            layer.bindTooltip(name, { direction: 'auto', className: 'country-tooltip' }).openTooltip();
            layer.bringToFront();
        });
        layer.on('mouseout', () => {
            if(this.config.gameState.isInputBlocked) return;
            this.config.gameState.boundariesLayer.resetStyle(layer);
            layer.closeTooltip();
        });
        layer.on('click', (e) => {
            if (this.config.currentGame?.mode === 'countryByCapital') {
                L.DomEvent.stop(e);
                const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
                this.handleMapCountryClick(name, q);
            }
        });
    }

    handleMapCountryClick(clicked, q) {
        this.config.gameState.isInputBlocked = true;
        if (clicked === q.country) {
            this.config.gameState.score++;
            this.showNotification(this.getLocalizedText('correct'), 'success');
            this.highlightCorrectCountry(q.country);
        } else {
            this.showNotification(this.getLocalizedText('wrong'), 'error');
            this.highlightCorrectCountry(q.country);
            setTimeout(() => this.showNotification(this.getLocalizedText('correctAnswer').replace('{country}', q.country).replace('{capital}', q.capital), 'info'), 1000);
        }
        setTimeout(() => this.nextQuestion(), 1500);
    }

    highlightCorrectCountry(name) {
        if (!this.config.gameState.boundariesLayer) return;
        this.config.gameState.boundariesLayer.eachLayer(layer => {
            const iso = layer.feature.properties.ISO_A2 || layer.feature.properties.ISO_A2_EH;
            const adm3 = layer.feature.properties.ADM0_A3;
            if (window.GeoCountries?.getCountryNameByCode(iso, adm3) === name) {
                layer.setStyle({ weight: 3, color: '#4ade80', fillColor: '#4ade80', fillOpacity: 0.4, dashArray: '' });
                if (this.config.currentGame.mode !== 'countryByCapitalText') {
                    const bounds = layer.getBounds();
                    if(bounds.isValid()) this.config.gameState.map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 5, duration: 1.5 });
                }
            }
        });
    }

    resetCountryColors() { this.config.gameState.boundariesLayer?.eachLayer(l => this.config.gameState.boundariesLayer.resetStyle(l)); }
    startTimer() {
        this.stopTimer();
        let left = this.config.currentGame.timerDuration;
        const disp = document.getElementById('timerDisplay');
        if(disp) { disp.textContent = left; disp.style.color = left<=10?'#ef4444':'#f59e0b'; }
        this.config.gameState.timerInterval = setInterval(() => {
            if(this.config.gameState.isPaused) return;
            left--;
            if(disp) { disp.textContent = left; disp.style.color = left<=10?'#ef4444':'#f59e0b'; }
            if(left<=0) { this.stopTimer(); this.handleTimeOut(); }
        }, 1000);
    }
    stopTimer() { clearInterval(this.config.gameState.timerInterval); }
    handleTimeOut() {
        this.config.gameState.isInputBlocked = true;
        if (this.config.currentGame.mode === 'countryByCapitalText') {
            const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
            this.highlightCorrectCountry(q.country);
        }
        this.showNotification('Время вышло!', 'warning');
        setTimeout(() => this.nextQuestion(), 1500);
    }

    endGame() {
        this.stopTimer();
        this.config.navigation.gameActive = false;
        document.getElementById('gameScreen').classList.remove('mode-text-country');
        
        // ОБНОВЛЕНИЕ СТАТИСТИКИ
        const score = this.config.gameState.score;
        const total = this.config.gameState.questions.length;
        
        this.config.playerStats.totalCorrect += score;
        this.config.playerStats.totalQuestions += total;
        if (score > this.config.playerStats.bestScore) this.config.playerStats.bestScore = score;
        this.savePlayerStats(); // Сохраняем в localStorage

        this.showResults();
    }

    showResults() {
        const { score, questions, startTime } = this.config.gameState;
        const total = questions.length;
        document.getElementById('resultScore').textContent = score;
        document.getElementById('resultTotal').textContent = total;
        document.getElementById('totalTime').textContent = Math.round((Date.now() - startTime)/1000);
        const p = total > 0 ? Math.round((score/total)*100) : 0;
        document.getElementById('resultPercentage').textContent = `${p}%`;
        document.getElementById('resultMessage').textContent = this.getLocalizedText(p==100?'perfectResult':p>=80?'greatResult':'tryAgain');
        const circle = document.querySelector('.score-circle');
        if(circle) circle.style.background = `conic-gradient(#4ade80 0deg ${p*3.6}deg, #ef4444 ${p*3.6}deg 360deg)`;
        this.showScreen('resultScreen');
    }

    getLocalizedText(key) { return LOCALES?.[this.config.settings.language]?.[key] || key; }
    loadSettings() { try { Object.assign(this.config.settings, JSON.parse(localStorage.getItem('geoNavigatorSettings'))); } catch(e){} this.applySettings(); }
    saveSettings() { localStorage.setItem('geoNavigatorSettings', JSON.stringify(this.config.settings)); }
    applySettings() { this.applyTheme(this.config.settings.theme); this.applyLanguage(this.config.settings.language); }
    applyTheme(t) { document.body.className = t==='dark'?'dark-theme':''; }
    applyLanguage(l) { document.querySelectorAll('[data-i18n]').forEach(e => e.textContent = this.getLocalizedText(e.getAttribute('data-i18n'))); }
    updateActiveSettingsButtons() { 
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === this.config.settings.language));
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === this.config.settings.theme));
    }
    playAgain() { this.startGame(); }
    showPauseMenu() { this.config.gameState.isPaused = true; this.stopTimer(); this.showScreen('pauseScreen'); }
    resumeGame() { this.config.gameState.isPaused = false; this.startTimer(); this.showScreen('gameScreen'); }
    setupNotifications() { 
        if (!document.getElementById('notification')) {
            const d = document.createElement('div'); d.id = 'notification'; d.className = 'notification';
            d.innerHTML = `<div class="notification-content"><i id="notificationIcon" class="fas fa-info-circle"></i><span id="notificationText"></span></div>`;
            document.body.appendChild(d);
        }
    }
    showNotification(msg, type) {
        const n = document.getElementById('notification');
        if(n) { 
            const icon = document.getElementById('notificationIcon');
            icon.className = type === 'success' ? 'fas fa-check-circle' : type === 'error' ? 'fas fa-times-circle' : 'fas fa-info-circle';
            n.style.borderLeftColor = type === 'success' ? '#4ade80' : type === 'error' ? '#ef4444' : '#4cc9f0';
            document.getElementById('notificationText').textContent = msg; 
            n.classList.add('show'); 
            setTimeout(()=>n.classList.remove('show'), 3000); 
        }
    }
    returnFromSettings() {
        const prev = this.config.navigation.previousScreen;
        if (prev === 'pauseScreen') this.showScreen('pauseScreen');
        else if (prev === 'gameSetupScreen') this.showScreen('gameSetupScreen');
        else this.showScreen('mainMenu');
    }
    changeLanguage(lang, btn) {
        this.config.settings.language = lang;
        this.applyLanguage(lang);
        this.saveSettings();
        this.updateActiveSettingsButtons();
    }
    showLanguageChangeWarning(lang, btn) {
        if(confirm(this.getLocalizedText('languageChangeWarning'))) {
            this.resetGameState();
            this.changeLanguage(lang, btn);
        }
    }
    navigateToSettings(from) {
        this.config.navigation.previousScreen = from;
        this.showScreen('settingsScreen');
    }
    shuffleArray(arr) { return arr.sort(() => Math.random() - 0.5); }
    showScreen(name) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(name).classList.add('active');
        this.config.navigation.gameActive = (name === 'gameScreen');
        if (name === 'gameScreen') setTimeout(() => this.initMap(), 100);
        if (name === 'resultScreen') this.showResults();
        if (name === 'mainMenu') this.updateStatsUI(); // Обновляем статистику при выходе в меню
    }
}

document.addEventListener('DOMContentLoaded', () => window.geoNavigator = new GeoNavigator());
