// GeoGator v7.0 - Main Logic
// Features: Split Americas, Unlimited Timer, "All" Questions mode, Smart Slider

class GeoNavigator {
    constructor() {
        this.config = {
            currentGame: null,      
            settings: { 
                language: 'ru', 
                volume: 80, 
                theme: 'dark' // Тема всегда темная, но настройка сохранена для совместимости
            },
            gameState: {            
                score: 0, 
                currentQuestionIndex: 0, 
                questions: [], 
                startTime: null, // Время начала вопроса (для таймера)
                gameStartTime: null, // Время начала всей игры (для статистики)
                timerInterval: null, 
                map: null, 
                boundariesLayer: null,
                isInputBlocked: false, 
                isPaused: false
            },
            navigation: { 
                previousScreen: null, 
                fromPause: false, 
                gameActive: false 
            },
            
            // Статистика игрока (сохраняется в localStorage)
            playerStats: { 
                totalCorrect: 0, 
                totalQuestions: 0, 
                bestScore: 0 
            }
        };

        // Координаты центров для Умной Камеры (v7.0: Разделенная Америка)
        this.continentViews = {
            'europe': { center: [50, 15], zoom: 4 },
            'asia': { center: [35, 90], zoom: 3 },
            'africa': { center: [0, 20], zoom: 3 },
            'north_america': { center: [40, -100], zoom: 3 },
            'south_america': { center: [-15, -60], zoom: 3 },
            'oceania': { center: [-25, 135], zoom: 4 }
        };

        this.init();
    }

    init() {
        console.log('GeoGator v7.0 initialized');
        this.loadSettings();
        this.loadPlayerStats();
        this.setupEventListeners();
        this.showScreen('mainMenu');
        this.setupNotifications();
        this.updateStatsUI(); // Обновляем цифры в меню
        this.initVolumeSliderVisuals(); // Красим слайдер при старте
    }

    // === 1. ЗАГРУЗКА ДАННЫХ И НАСТРОЕК ===

    loadSettings() {
        try { 
            const saved = localStorage.getItem('geoNavigatorSettings');
            if (saved) {
                Object.assign(this.config.settings, JSON.parse(saved)); 
            }
        } catch(e) { console.error('Settings load error', e); }
        this.applySettings();
    }

    loadPlayerStats() {
        try {
            const stats = localStorage.getItem('geoGatorStats');
            if (stats) {
                this.config.playerStats = { ...this.config.playerStats, ...JSON.parse(stats) };
            }
        } catch (e) { console.error('Stats load error', e); }
    }

    updateStatsUI() {
        // Обновляем плашки статистики в главном меню
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

    // === 2. СОБЫТИЯ И UI ===

    setupEventListeners() {
        // --- ГЛАВНОЕ МЕНЮ ---
        document.getElementById('startGameBtn')?.addEventListener('click', () => {
            this.config.navigation.previousScreen = 'mainMenu';
            this.showScreen('gameSetupScreen');
        });
        document.getElementById('openSettingsBtn')?.addEventListener('click', () => this.navigateToSettings('mainMenu'));

        // --- ЭКРАН НАСТРОЙКИ ИГРЫ ---
        document.getElementById('backFromSetupBtn')?.addEventListener('click', () => this.showScreen('mainMenu'));
        document.getElementById('startGameWithParamsBtn')?.addEventListener('click', () => this.startGame());

        // --- ГЕЙМПЛЕЙ ---
        document.getElementById('pauseGameBtn')?.addEventListener('click', () => this.showPauseMenu());
        document.getElementById('skipQuestionBtn')?.addEventListener('click', () => this.skipQuestion());
        
        // --- ЭКРАН ПАУЗЫ ---
        document.getElementById('resumeGameBtn')?.addEventListener('click', () => this.resumeGame());
        
        document.getElementById('restartGameBtn')?.addEventListener('click', () => {
            if(confirm(this.getLocalizedText('restartConfirm'))) { 
                this.resetGameState(); 
                this.showScreen('gameSetupScreen'); 
            }
        });
        
        document.getElementById('openSettingsFromPauseBtn')?.addEventListener('click', () => this.navigateToSettings('pauseScreen'));
        
        document.getElementById('quitToMenuFromPauseBtn')?.addEventListener('click', () => {
            if(confirm(this.getLocalizedText('quitConfirm'))) { 
                this.resetGameState(); 
                this.showScreen('mainMenu'); 
            }
        });

        // --- ЭКРАН РЕЗУЛЬТАТОВ ---
        document.getElementById('playAgainBtn')?.addEventListener('click', () => this.playAgain());
        document.getElementById('backToMenuFromResultBtn')?.addEventListener('click', () => {
            this.resetGameState(); 
            this.showScreen('mainMenu');
        });

        // --- НАСТРОЙКИ ПРИЛОЖЕНИЯ ---
        document.getElementById('backFromSettingsBtn')?.addEventListener('click', () => this.returnFromSettings());
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => this.changeLanguage(btn.dataset.lang));
        });

        // Слайдер громкости (Визуализация + Логика)
        const slider = document.getElementById('volumeSlider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const val = e.target.value;
                this.config.settings.volume = parseInt(val);
                document.getElementById('volumeValue').textContent = `${val}%`;
                this.updateSliderVisual(e.target);
                this.saveSettings();
            });
        }
        
        // Кнопки зума карты
        document.getElementById('zoomInBtn')?.addEventListener('click', () => {
            if (this.config.gameState.map) this.config.gameState.map.zoomIn();
        });
        document.getElementById('zoomOutBtn')?.addEventListener('click', () => {
            if (this.config.gameState.map) this.config.gameState.map.zoomOut();
        });
        document.getElementById('resetViewBtn')?.addEventListener('click', () => {
            if (this.config.gameState.map) this.config.gameState.map.setView([20, 0], 2);
        });
    }

    initVolumeSliderVisuals() {
        const slider = document.getElementById('volumeSlider');
        if (slider) {
            slider.value = this.config.settings.volume;
            document.getElementById('volumeValue').textContent = `${slider.value}%`;
            this.updateSliderVisual(slider);
        }
    }

    updateSliderVisual(slider) {
        // CSS-трюк: меняем background-size чтобы закрасить часть до ползунка синим, а после - серым
        const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${val}%, #334155 ${val}%, #334155 100%)`;
    }

    // === 3. ЛОГИКА ИГРЫ ===

    startGame() {
        const params = this.getGameParameters();
        if (!this.validateGameParameters(params)) return;
        
        this.config.currentGame = params;
        this.resetGameStateForNewGame();
        
        // CSS для режима "Угадай страну" (ТВ) - скрываем карту, показываем текст крупно
        const gameScreen = document.getElementById('gameScreen');
        if (params.mode === 'countryByCapitalText') {
            gameScreen.classList.add('mode-text-country');
        } else {
            gameScreen.classList.remove('mode-text-country');
        }

        this.generateQuestions();
        this.config.gameState.gameStartTime = Date.now(); // Засекаем общее время игры
        
        this.showScreen('gameScreen');
        this.showQuestion();
    }

    getGameParameters() {
        const continents = Array.from(document.querySelectorAll('input[name="continent"]:checked')).map(cb => cb.value);
        const gameMode = document.querySelector('input[name="gameMode"]:checked')?.value || 'capitalByCountry';
        
        // Обработка "Все вопросы"
        let qVal = document.querySelector('input[name="questionCount"]:checked')?.value || '10';
        const questionCount = (qVal === 'all') ? 'all' : parseInt(qVal);
        
        // Обработка "Без времени"
        let tVal = document.querySelector('input[name="timer"]:checked')?.value || '10';
        const timerDuration = (tVal === 'unlimited') ? 'unlimited' : parseInt(tVal);
        
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
        this.config.gameState.questions = [];
        this.config.gameState.isInputBlocked = false;
        this.config.gameState.isPaused = false;
        document.getElementById('correctCount').textContent = '0';
        document.getElementById('progressBar').style.width = '0%';
    }

    generateQuestions() {
        const { continents: selected, questionCount } = this.config.currentGame;
        let allCountries = [];
        
        // Собираем страны из выбранных регионов (включая новые Америки)
        selected.forEach(c => {
            if (window.GeoCountries && window.GeoCountries.continents[c]) {
                allCountries = [...allCountries, ...window.GeoCountries.continents[c]];
            }
        });

        // Перемешиваем
        const shuffled = this.shuffleArray(allCountries);
        
        // Если "Все" - берем весь список, иначе обрезаем
        let finalSelection = [];
        if (questionCount === 'all') {
            finalSelection = shuffled;
        } else {
            finalSelection = shuffled.slice(0, Math.min(questionCount, shuffled.length));
        }
        
        // Формируем объекты вопросов
        this.config.gameState.questions = finalSelection.map(c => {
            const d = window.GeoCountries.countryData[c];
            if (!d) return null;
            return { 
                country: c, 
                capital: d.capital, 
                code: d.code, 
                continent: d.continent 
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
        this.startTimer(); // Запуск таймера для вопроса

        // Рендер в зависимости от режима
        const mode = this.config.currentGame.mode;
        if (mode === 'capitalByCountry') {
            this.showCapitalByCountryQuestion(q);
        } else if (mode === 'countryByCapital') {
            this.showCountryByCapitalQuestion(q);
        } else if (mode === 'countryByCapitalText') {
            this.showCountryByCapitalTextQuestion(q);
        }
    }

    updateQuestionUI(idx, total) {
        document.getElementById('currentQuestion').textContent = idx + 1;
        document.getElementById('totalQuestions').textContent = total;
        document.getElementById('correctCount').textContent = this.config.gameState.score;
        const p = ((idx) / total) * 100; // Прогресс бар
        document.getElementById('progressBar').style.width = `${p}%`;
    }

    // --- РЕЖИМЫ ИГРЫ ---

    showCapitalByCountryQuestion(q) {
        this.toggleUIElements({ flag: true, options: true, hint: false });
        document.getElementById('questionText').textContent = this.getLocalizedText('guessCapital');
        document.getElementById('countryName').textContent = q.country;
        
        const flagDiv = document.getElementById('countryFlag');
        flagDiv.innerHTML = `<img src="https://flagcdn.com/w320/${q.code}.png" alt="flag">`;
        
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

        // Умная камера: полет к региону (если режим требует карты)
        if (this.config.gameState.map && this.continentViews[q.continent]) {
            const view = this.continentViews[q.continent];
            this.config.gameState.map.flyTo(view.center, view.zoom, { duration: 0.5 });
        }
        this.generateAnswerOptions(q, 'country');
    }

    // --- ОБЩИЕ ФУНКЦИИ ГЕЙМПЛЕЯ ---

    toggleUIElements({ flag, options, hint }) {
        document.getElementById('countryFlagContainer').style.display = flag ? 'block' : 'none';
        document.getElementById('capitalHint').style.display = hint ? 'flex' : 'none';
        document.getElementById('answerOptions').style.display = options ? 'grid' : 'none';
    }

    displayContinentHint(continent, capital) {
        const el = document.querySelector('.capital-hint span');
        // Берем локализованное название континента (европа, азия и т.д.)
        const cNameKey = continent; 
        const cName = this.getLocalizedText(cNameKey);
        const inText = this.getLocalizedText('in');
        
        el.innerHTML = `<strong>${capital}</strong> — ${this.getLocalizedText('clickOnCountry')}<br><small>${inText} ${cName}</small>`;
    }

    generateAnswerOptions(q, type) {
        const grid = document.getElementById('answerOptions');
        grid.innerHTML = '';
        
        let correct = (type === 'capital') ? q.capital : q.country;
        let pool = [];

        // Берем варианты ответов со всех доступных стран выбранных континентов
        const selected = this.config.currentGame.continents;
        selected.forEach(c => {
            if (window.GeoCountries.continents[c]) {
                window.GeoCountries.continents[c].forEach(countryName => {
                    const d = window.GeoCountries.countryData[countryName];
                    if (d) {
                        if (type === 'capital') pool.push(d.capital); 
                        else pool.push(countryName);
                    }
                });
            }
        });

        // Исключаем правильный ответ и перемешиваем
        pool = [...new Set(pool)].filter(i => i !== correct);
        const wrong = this.shuffleArray(pool).slice(0, 3);
        const options = this.shuffleArray([correct, ...wrong]);

        options.forEach(ans => {
            const btn = document.createElement('button');
            btn.className = 'answer-option';
            btn.textContent = ans;
            btn.addEventListener('click', () => { 
                if(!this.config.gameState.isInputBlocked) this.handleAnswerSelection(ans, correct, q); 
            });
            grid.appendChild(btn);
        });
    }

    handleAnswerSelection(selected, correct, q) {
        this.config.gameState.isInputBlocked = true;
        this.stopTimer(); // Остановить таймер при ответе
        
        if (this.config.currentGame.mode === 'countryByCapitalText') this.highlightCorrectCountry(q.country);

        if (selected === correct) {
            this.config.gameState.score++;
            this.showNotification(this.getLocalizedText('correct'), 'success');
            this.markButtons(correct, selected);
        } else {
            this.showNotification(this.getLocalizedText('wrong'), 'error');
            this.markButtons(correct, selected);
            // Показать правильный ответ
            setTimeout(() => this.showNotification(
                this.getLocalizedText('correctAnswer').replace('{country}', q.country).replace('{capital}', q.capital), 
                'info'
            ), 1000);
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
        this.stopTimer();
        
        const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
        if (this.config.currentGame.mode === 'countryByCapitalText') this.highlightCorrectCountry(q.country);
        
        const msg = this.getLocalizedText('correctAnswer').replace('{country}', q.country).replace('{capital}', q.capital);
        this.showNotification(msg, 'info');
        setTimeout(() => this.nextQuestion(), 1500);
    }

    // === КАРТА (Leaflet) ===

    initMap() {
        if (!document.getElementById('map')) return;
        if (this.config.gameState.map) this.config.gameState.map.remove();

        const map = L.map('map', { 
            zoomControl: false, 
            attributionControl: false, 
            center: [20, 0], 
            zoom: 2, 
            minZoom: 2, 
            maxZoom: 8, 
            worldCopyJump: true, 
            maxBoundsViscosity: 1.0 
        });
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { 
            subdomains: 'abcd', 
            maxZoom: 8 
        }).addTo(map);
        
        this.addCountryBoundaries(map);
        this.config.gameState.map = map;
    }

    addCountryBoundaries(map) {
        fetch('countries.geo.json')
            .then(r => r.json())
            .then(data => {
                const layer = L.geoJson(data, {
                    style: { 
                        fillColor: 'transparent', 
                        weight: 1.5, 
                        opacity: 0.6, 
                        color: '#4cc9f0', 
                        fillOpacity: 0.1, 
                        dashArray: '3, 3' 
                    },
                    onEachFeature: (f, l) => this.setupCountryInteractivity(f, l, map)
                }).addTo(map);
                this.config.gameState.boundariesLayer = layer;
            })
            .catch(e => console.error('Map error', e));
    }

    setupCountryInteractivity(feature, layer, map) {
        const iso = feature.properties.ISO_A2 || feature.properties.ISO_A2_EH;
        const adm3 = feature.properties.ADM0_A3;
        const name = window.GeoCountries?.getCountryNameByCode(iso, adm3);

        if (!name) { layer.setStyle({ interactive: false }); return; }

        // Если режим ТВ (Угадай страну по столице) - отключаем клики
        if (this.config.currentGame?.mode === 'countryByCapitalText') { 
            layer.options.interactive = false; 
            return; 
        }

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
            // Клик работает только в режиме поиска на карте
            if (this.config.currentGame?.mode === 'countryByCapital') {
                L.DomEvent.stop(e);
                const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
                this.handleMapCountryClick(name, q);
            }
        });
    }

    handleMapCountryClick(clicked, q) {
        this.config.gameState.isInputBlocked = true;
        this.stopTimer();
        
        if (clicked === q.country) {
            this.config.gameState.score++;
            this.showNotification(this.getLocalizedText('correct'), 'success');
            this.highlightCorrectCountry(q.country);
        } else {
            this.showNotification(this.getLocalizedText('wrong'), 'error');
            this.highlightCorrectCountry(q.country);
            setTimeout(() => this.showNotification(
                this.getLocalizedText('correctAnswer').replace('{country}', q.country).replace('{capital}', q.capital), 
                'info'
            ), 1000);
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
                // Если режим карты - летим к стране
                if (this.config.currentGame.mode !== 'countryByCapitalText') {
                    const bounds = layer.getBounds();
                    if(bounds.isValid()) this.config.gameState.map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 5, duration: 1.5 });
                }
            }
        });
    }

    resetCountryColors() { this.config.gameState.boundariesLayer?.eachLayer(l => this.config.gameState.boundariesLayer.resetStyle(l)); }

    // === ТАЙМЕР v7.0 (Unlimited Support) ===

    startTimer() {
        this.stopTimer();
        const duration = this.config.currentGame.timerDuration;
        const disp = document.getElementById('timerDisplay');
        
        // Режим "Без времени"
        if (duration === 'unlimited') {
            if(disp) { 
                disp.textContent = '∞'; 
                disp.style.color = '#f59e0b'; 
            }
            return;
        }

        // Обычный режим
        let left = duration;
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
        const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
        
        // Подсвечиваем ответ при таймауте
        if (this.config.currentGame.mode === 'countryByCapitalText') {
            this.highlightCorrectCountry(q.country);
        }
        
        this.showNotification('Время вышло!', 'warning');
        setTimeout(() => this.nextQuestion(), 1500);
    }

    // === КОНЕЦ ИГРЫ ===

    endGame() {
        this.stopTimer();
        this.config.navigation.gameActive = false;
        document.getElementById('gameScreen').classList.remove('mode-text-country');
        
        // Обновляем статистику
        const score = this.config.gameState.score;
        const total = this.config.gameState.questions.length;
        
        this.config.playerStats.totalCorrect += score;
        this.config.playerStats.totalQuestions += total;
        if (score > this.config.playerStats.bestScore) this.config.playerStats.bestScore = score;
        
        localStorage.setItem('geoGatorStats', JSON.stringify(this.config.playerStats));

        this.showResults();
    }

    showResults() {
        const { score, questions, gameStartTime } = this.config.gameState;
        const total = questions.length;
        
        // Считаем общее время
        const totalTimeSeconds = Math.round((Date.now() - gameStartTime) / 1000);
        
        document.getElementById('resultScore').textContent = score;
        document.getElementById('resultTotal').textContent = total;
        document.getElementById('totalTime').textContent = totalTimeSeconds;
        
        const p = total > 0 ? Math.round((score/total)*100) : 0;
        document.getElementById('resultPercentage').textContent = `${p}%`;
        document.getElementById('resultMessage').textContent = this.getLocalizedText(p==100?'perfectResult':p>=80?'greatResult':'tryAgain');
        
        const circle = document.querySelector('.score-circle');
        if(circle) circle.style.background = `conic-gradient(#4ade80 0deg ${p*3.6}deg, #ef4444 ${p*3.6}deg 360deg)`;
        
        this.showScreen('resultScreen');
    }

    // === УТИЛИТЫ ===

    getLocalizedText(key) { return LOCALES?.[this.config.settings.language]?.[key] || key; }
    
    saveSettings() { localStorage.setItem('geoNavigatorSettings', JSON.stringify(this.config.settings)); }
    
    applySettings() {
        // Перевод текстов
        document.querySelectorAll('[data-i18n]').forEach(e => {
            const key = e.getAttribute('data-i18n');
            e.textContent = this.getLocalizedText(key);
        });
        
        // Активность кнопок языка
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.lang === this.config.settings.language);
        });
        
        // Обновляем слайдер
        this.initVolumeSliderVisuals();
    }

    changeLanguage(lang) {
        if(this.config.navigation.gameActive) {
            if(confirm(this.getLocalizedText('languageChangeWarning'))) {
                this.resetGameState();
                this.config.settings.language = lang;
                this.applySettings();
                this.saveSettings();
                this.showScreen('mainMenu');
            }
        } else {
            this.config.settings.language = lang;
            this.applySettings();
            this.saveSettings();
            this.updateStatsUI(); // Перерисовываем заголовки статистики
        }
    }
    
    playAgain() { this.startGame(); }
    
    showPauseMenu() { 
        this.config.gameState.isPaused = true; 
        this.stopTimer(); 
        
        // Обновляем данные паузы
        document.getElementById('pauseScore').textContent = this.config.gameState.score;
        const totalTime = Math.round((Date.now() - this.config.gameState.gameStartTime) / 1000);
        document.getElementById('pauseTime').textContent = `${totalTime}c`;
        
        const current = this.config.gameState.currentQuestionIndex;
        const total = this.config.gameState.questions.length;
        const progress = total > 0 ? Math.round((current / total) * 100) : 0;
        const progressEl = document.getElementById('pauseProgress');
        if(progressEl) progressEl.textContent = `${progress}%`;

        this.showScreen('pauseScreen'); 
    }
    
    resumeGame() { 
        this.config.gameState.isPaused = false; 
        this.startTimer(); 
        this.showScreen('gameScreen'); 
    }
    
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
        if (name === 'mainMenu') this.updateStatsUI();
    }
}

document.addEventListener('DOMContentLoaded', () => window.geoNavigator = new GeoNavigator());
