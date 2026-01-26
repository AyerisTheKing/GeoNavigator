// GeoGator v7.0 - Main Logic
// Features: Split Americas, Unlimited Timer, "All" Questions mode, Smart Slider, Profile System

class GeoNavigator {
    constructor() {
        this.config = {
            answerCooldown: 1500,
            currentGame: null,
            settings: { language: 'ru', volume: 80, theme: 'dark', isMuted: false },
            gameState: {
                score: 0,
                currentQuestionIndex: 0,
                questions: [],
                startTime: null,
                gameStartTime: null,
                timerInterval: null,
                map: null,
                boundariesLayer: null,
                isInputBlocked: false,
                isPaused: false
            },
            navigation: { previousScreen: null, fromPause: false, gameActive: false },
            // Expanded Player Stats
            playerStats: {
                totalCorrect: 0,
                totalQuestions: 0,
                bestScore: 0,
                totalGames: 0,
                totalWrong: 0,
                totalTime: 0,
                regionStats: {} // { 'europe': { correct: 0, total: 0 }, ... }
            },
            user: {
                id: null,
                nickname: null, // Will be set to localized 'Guest' in init
                login: '',
                password: '' // Stored locally for auto-login
            }
        };

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
        this.updateStatsUI();
        this.initVolumeSliderVisuals();

        // Load User Profile
        // Auto-login logic would go here if we implemented full auth flow
        // For now, load local profile info
        const storedLogin = localStorage.getItem('geoGatorLogin');
        const storedNick = localStorage.getItem('geoGatorNickname');
        if (storedLogin) this.config.user.login = storedLogin;
        if (storedNick) {
            this.config.user.nickname = storedNick;
        } else {
            this.config.user.nickname = this.getLocalizedText('guest');
        }
        document.getElementById('profileName').textContent = this.config.user.nickname;

        document.addEventListener('click', () => this.manageMusic(), { once: true });
    }

    manageMusic() {
        const audio = document.getElementById('bgMusic');
        if (!audio) return;
        const vol = this.config.settings.isMuted ? 0 : this.config.settings.volume / 100;
        audio.volume = vol;
        const currentScreen = document.querySelector('.screen.active')?.id;
        if (currentScreen !== 'gameScreen' && audio.paused && vol > 0) {
            audio.play().catch(e => console.log('Autoplay prevented', e));
        } else if ((currentScreen === 'gameScreen' || vol === 0) && !audio.paused) {
            if (currentScreen === 'gameScreen') audio.pause();
        }
    }

    // === 1. DATA & SETTINGS ===

    loadSettings() {
        try { Object.assign(this.config.settings, JSON.parse(localStorage.getItem('geoNavigatorSettings'))); } catch (e) { }
        this.applySettings();
    }

    loadPlayerStats() {
        try {
            const stats = localStorage.getItem('geoGatorStats');
            if (stats) {
                const parsed = JSON.parse(stats);
                // Merge carefully to preserve new fields if old structure was used
                this.config.playerStats = { ...this.config.playerStats, ...parsed };
                // Ensure regionStats exists
                if (!this.config.playerStats.regionStats) this.config.playerStats.regionStats = {};
            }
        } catch (e) { console.error('Stats load error', e); }
    }

    updateStatsUI() {
        const s = this.config.playerStats;
        const totalEl = document.getElementById('statTotalCorrect');
        const bestEl = document.getElementById('statBestScore');
        const accEl = document.getElementById('statAccuracy');

        if (totalEl) totalEl.textContent = s.totalCorrect;
        if (bestEl) bestEl.textContent = s.bestScore;

        let acc = 0;
        if (s.totalQuestions > 0) acc = Math.round((s.totalCorrect / s.totalQuestions) * 100);
        if (accEl) accEl.textContent = `${acc}%`;
    }

    updateProfileStatsUI() {
        const s = this.config.playerStats;

        // Basic Stats
        document.getElementById('statTotalGames').textContent = s.totalGames || 0;
        document.getElementById('statTotalCorrect').textContent = s.totalCorrect || 0;
        document.getElementById('statTotalWrong').textContent = s.totalWrong || 0;
        document.getElementById('statTotalTime').textContent = `${s.totalTime || 0}s`;

        // Overall Success
        const totalAnswers = (s.totalCorrect || 0) + (s.totalWrong || 0);
        const overall = totalAnswers > 0 ? Math.round((s.totalCorrect / totalAnswers) * 100) : 0;
        document.getElementById('statOverallSuccess').textContent = `${overall}%`;

        // Region Table
        const tbody = document.querySelector('#regionStatsTable tbody');
        if (tbody) {
            tbody.innerHTML = '';
            for (const [region, data] of Object.entries(s.regionStats)) {
                if (data.total > 0) {
                    const mk = this.getLocalizedText(region) || region;
                    const perc = Math.round((data.correct / data.total) * 100);
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${mk}</td><td>${perc}% (${data.correct}/${data.total})</td>`;
                    tbody.appendChild(tr);
                }
            }
            if (tbody.innerHTML === '') {
                tbody.innerHTML = '<tr><td colspan="2" style="text-align:center; color:#64748b;">Нет данных</td></tr>';
            }
        }
    }

    // === 2. EVENTS & UI ===

    setupEventListeners() {
        // Profile & Auth
        document.getElementById('profileBtn')?.addEventListener('click', () => this.handleProfileClick());

        // Login Modal
        document.getElementById('closeLoginModal')?.addEventListener('click', () => this.closeLoginModal());
        document.getElementById('performLoginBtn')?.addEventListener('click', () => this.performLogin());
        document.getElementById('openRegisterLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openRegisterModal();
        });
        document.getElementById('toggleLoginPassword')?.addEventListener('click', (e) => this.togglePasswordVisibility(e, 'loginPasswordInput'));

        // Register Modal
        document.getElementById('closeRegisterModal')?.addEventListener('click', () => this.closeRegisterModal());
        document.getElementById('performRegisterBtn')?.addEventListener('click', () => this.performRegister());
        document.getElementById('toggleRegPassword')?.addEventListener('click', (e) => this.togglePasswordVisibility(e, 'regPasswordInput'));

        // Profile Stats Modal (Authorized)
        document.getElementById('closeProfileModal')?.addEventListener('click', () => this.closeStatsModal());
        document.getElementById('logoutBtn')?.addEventListener('click', () => this.performLogout());

        document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'modalOverlay') this.closeAllModals();
        });

        // Menu
        document.getElementById('startGameBtn')?.addEventListener('click', () => {
            this.config.navigation.previousScreen = 'mainMenu';
            this.showScreen('gameSetupScreen');
        });
        document.getElementById('openSettingsBtn')?.addEventListener('click', () => this.navigateToSettings('mainMenu'));

        // Game Setup
        document.getElementById('backFromSetupBtn')?.addEventListener('click', () => this.showScreen('mainMenu'));
        document.getElementById('startGameWithParamsBtn')?.addEventListener('click', () => this.startGame());

        // Gameplay
        document.getElementById('pauseGameBtn')?.addEventListener('click', () => this.showPauseMenu());
        document.getElementById('skipQuestionBtn')?.addEventListener('click', () => this.skipQuestion());
        document.getElementById('resumeGameBtn')?.addEventListener('click', () => this.resumeGame());

        document.getElementById('restartGameBtn')?.addEventListener('click', () => {
            if (confirm(this.getLocalizedText('restartConfirm'))) { this.resetGameState(); this.showScreen('gameSetupScreen'); }
        });
        document.getElementById('quitToMenuFromPauseBtn')?.addEventListener('click', () => {
            if (confirm(this.getLocalizedText('quitConfirm'))) { this.resetGameState(); this.showScreen('mainMenu'); }
        });

        // Results
        document.getElementById('playAgainBtn')?.addEventListener('click', () => this.playAgain());
        document.getElementById('backToMenuFromResultBtn')?.addEventListener('click', () => {
            this.resetGameState(); this.showScreen('mainMenu');
        });

        // App Settings
        document.getElementById('backFromSettingsBtn')?.addEventListener('click', () => this.returnFromSettings());
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => this.changeLanguage(btn.dataset.lang));
        });

        // Volume
        const slider = document.getElementById('volumeSlider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const val = e.target.value;
                this.config.settings.volume = parseInt(val);
                document.getElementById('volumeValue').textContent = `${val}%`;
                this.updateSliderVisual(e.target);
                const audio = document.getElementById('bgMusic');
                if (audio) {
                    const vol = this.config.settings.isMuted ? 0 : this.config.settings.volume / 100;
                    audio.volume = vol;
                }
                if (this.config.settings.isMuted) this.toggleMute();
                this.saveSettings();
            });
        }
        document.getElementById('btnMute')?.addEventListener('click', () => this.toggleMute());
    }

    // === PROFILES & AUTH ===

    // 1. Logic for Profile Button
    handleProfileClick() {
        // Check local storage for auth
        const login = localStorage.getItem('geoGatorLogin');
        if (login) {
            this.openStatsModal(); // User is authorized -> open stats
        } else {
            this.openLoginModal(); // User is guest -> open login
        }
    }

    // 2. Login Modal Logic
    openLoginModal() {
        this.closeAllModals();
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        }
    }

    closeLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.add('hidden');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    }

    performLogin() {
        const login = document.getElementById('loginUsernameInput').value.trim();
        const pass = document.getElementById('loginPasswordInput').value;
        const errorDiv = document.getElementById('loginError');

        if (!login || !pass) {
            this.showError(errorDiv, "Заполните все поля");
            return;
        }

        fetch('login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: login, password: pass })
        })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    // Success
                    this.showError(errorDiv, "", false); // clear error
                    this.config.user.login = data.username;
                    this.config.user.nickname = data.nickname || data.username;
                    this.config.user.id = data.id;

                    // Save to local storage
                    localStorage.setItem('geoGatorLogin', data.username);
                    localStorage.setItem('geoGatorNickname', this.config.user.nickname);

                    // Load stats
                    if (data.stats) {
                        // Map backend stats to frontend structure if needed or just merge
                        // Assuming backend sends correct structure or we adapt
                        // For now, let's create a local stats object merging current with server
                        const s = data.stats;
                        this.config.playerStats.bestScore = parseInt(s.bestScore) || 0;
                        this.config.playerStats.totalCorrect = parseInt(s.totalCorrect) || 0;
                        this.config.playerStats.totalGames = parseInt(s.totalGames) || 0;
                        this.config.playerStats.totalWrong = parseInt(s.totalWrong) || 0;
                        this.config.playerStats.totalTime = parseInt(s.totalTime) || 0;
                        this.config.playerStats.totalQuestions = this.config.playerStats.totalCorrect + this.config.playerStats.totalWrong;
                        this.config.playerStats.regionStats = s.regionStats || {};

                        this.saveStats(); // Save synced stats to local
                    }

                    // Update UI
                    this.updateProfileUI();
                    this.closeLoginModal();
                    this.showNotification(`Добро пожаловать, ${this.config.user.nickname}!`, 'success');
                } else {
                    this.showError(errorDiv, data.message || "Ошибка входа");
                }
            })
            .catch(e => this.showError(errorDiv, "Ошибка сети"));
    }

    // 3. Registration Modal Logic
    openRegisterModal() {
        this.closeAllModals();
        const modal = document.getElementById('registerModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        }
    }

    closeRegisterModal() {
        const modal = document.getElementById('registerModal');
        if (modal) {
            modal.classList.add('hidden');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    }

    performRegister() {
        const nick = document.getElementById('regNicknameInput').value.trim();
        const login = document.getElementById('regLoginInput').value.trim();
        const pass = document.getElementById('regPasswordInput').value;
        const confirmPass = document.getElementById('regPasswordConfirmInput').value;
        const errorDiv = document.getElementById('registerError');

        // Validation
        if (!nick || !login || !pass || !confirmPass) {
            this.showError(errorDiv, "Заполните все поля");
            return;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(login)) {
            this.showError(errorDiv, "Логин может содержать только латинские буквы, цифры и _");
            return;
        }
        if (pass !== confirmPass) {
            this.showError(errorDiv, "Пароли не совпадают");
            return;
        }

        fetch('register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Ensure backend supports 'nickname'
            body: JSON.stringify({ username: login, password: pass, nickname: nick })
        })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    // Determine if we auto-login or ask to login.
                    // Simpler flow: Auto-login or just tell user to login?
                    // Request says: "Window registration...". User likely expects to be able to login or auto-login.
                    // Let's just forward to login screen with prefilled data or just auto-login logic if we want to be fancy.
                    // For safety/simplicity, let's switch to login modal.
                    this.showNotification("Регистрация успешна! Теперь войдите.", "success");
                    this.closeRegisterModal();
                    this.openLoginModal();
                    document.getElementById('loginUsernameInput').value = login; // Prefill
                } else {
                    this.showError(errorDiv, data.message || "Ошибка регистрации");
                }
            })
            .catch(e => this.showError(errorDiv, "Ошибка сети"));
    }

    // 4. Authorized Profile/Stats Logic
    openStatsModal() {
        this.closeAllModals();
        const modal = document.getElementById('profileModal'); // This is now the "Authorized" modal
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';

            // Update Headers
            document.getElementById('profileDisplayNickname').textContent = this.config.user.nickname;
            document.getElementById('profileDisplayLogin').textContent = '@' + this.config.user.login;

            this.updateProfileStatsUI();
        }
    }

    closeStatsModal() {
        const modal = document.getElementById('profileModal');
        if (modal) {
            modal.classList.add('hidden');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    }

    performLogout() {
        if (confirm(this.getLocalizedText('quitConfirm') || "Выйти из аккаунта?")) {
            // Clear Local Storage
            localStorage.removeItem('geoGatorLogin');
            localStorage.removeItem('geoGatorNickname');
            localStorage.removeItem('geoGatorStats'); // Optional: clear stats on logout or keep local? usually clear to avoid mixing

            // Reset Config
            this.config.user.login = '';
            this.config.user.nickname = 'guest';
            this.config.user.id = null;
            this.resetGameStateForNewGame(); // Reset game state too

            // Reset Stats to zero visually? Or keep until new game?
            // Safer to reset stats object
            this.config.playerStats = { totalCorrect: 0, totalQuestions: 0, bestScore: 0, totalGames: 0, totalWrong: 0, totalTime: 0, regionStats: {} };

            this.updateProfileUI(); // Set UI back to guest
            this.closeStatsModal();
            this.showNotification("Вы вышли из системы", "info");
        }
    }

    // Helpers
    closeAllModals() {
        document.querySelectorAll('.modal').forEach(m => {
            m.classList.add('hidden');
            m.style.display = 'none'; // Force hide immediately to prevent overlaps in logic
        });
    }

    showError(element, msg, show = true) {
        if (!element) return;
        element.textContent = msg;
        if (show) {
            element.classList.remove('hidden');
            element.style.display = 'block';
        } else {
            element.classList.add('hidden');
            element.style.display = 'none';
        }
    }

    updateProfileUI() {
        const nick = this.config.user.nickname || 'guest';
        document.getElementById('profileName').textContent = nick;
    }

    // ... (music and other settings methods same as before)
    initVolumeSliderVisuals() {
        const slider = document.getElementById('volumeSlider');
        if (slider) {
            slider.value = this.config.settings.volume;
            document.getElementById('volumeValue').textContent = `${slider.value}%`;
            this.updateSliderVisual(slider);
        }
        if (this.config.settings.isMuted === undefined) this.config.settings.isMuted = false;
        this.updateMuteUI();
    }

    toggleMute() {
        this.config.settings.isMuted = !this.config.settings.isMuted;
        this.updateMuteUI();
        this.manageMusic();
        this.saveSettings();
    }

    updateMuteUI() {
        const btn = document.getElementById('btnMute');
        if (!btn) return;
        const icon = btn.querySelector('i');
        const isMuted = this.config.settings.isMuted;
        icon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        if (isMuted) btn.classList.add('muted'); else btn.classList.remove('muted');
    }

    updateSliderVisual(slider) {
        const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${val}%, #334155 ${val}%, #334155 100%)`;
    }

    // === 3. GAME LOGIC ===

    startGame() {
        const params = this.getGameParameters();
        if (!this.validateGameParameters(params)) return;

        this.config.currentGame = params;
        this.resetGameStateForNewGame();

        // Increment Total Games
        this.config.playerStats.totalGames = (this.config.playerStats.totalGames || 0) + 1;
        this.saveStats(); // Save immediately

        const gameScreen = document.getElementById('gameScreen');
        if (params.mode === 'countryByCapitalText') {
            gameScreen.classList.add('mode-text-country');
        } else {
            gameScreen.classList.remove('mode-text-country');
        }

        this.generateQuestions();
        this.config.gameState.gameStartTime = Date.now();
        this.showScreen('gameScreen');
        this.showQuestion();
    }

    getGameParameters() {
        const continents = Array.from(document.querySelectorAll('input[name="continent"]:checked')).map(cb => cb.value);
        const gameMode = document.querySelector('input[name="gameMode"]:checked')?.value || 'capitalByCountry';
        let qVal = document.querySelector('input[name="questionCount"]:checked')?.value || '10';
        const questionCount = (qVal === 'all') ? 'all' : parseInt(qVal);
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
        selected.forEach(c => {
            if (window.GeoCountries && window.GeoCountries.continents[c]) {
                allCountries = [...allCountries, ...window.GeoCountries.continents[c]];
            }
        });
        const shuffled = this.shuffleArray(allCountries);
        let finalSelection = [];
        if (questionCount === 'all') {
            finalSelection = shuffled;
        } else {
            finalSelection = shuffled.slice(0, Math.min(questionCount, shuffled.length));
        }
        this.config.gameState.questions = finalSelection.map(c => {
            const d = window.GeoCountries.countryData[c];
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

    // --- Answer Logic ---

    // ... (showCapitalByCountryQuestion, etc. same as before) ...
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
            this.config.gameState.map.flyTo(view.center, view.zoom, { duration: 0.5 });
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
            if (window.GeoCountries.continents[c]) {
                window.GeoCountries.continents[c].forEach(countryName => {
                    const d = window.GeoCountries.countryData[countryName];
                    if (type === 'capital') pool.push(d.capital); else pool.push(countryName);
                });
            }
        });
        pool = [...new Set(pool)].filter(i => i !== correct);
        const wrong = this.shuffleArray(pool).slice(0, 5);
        const options = this.shuffleArray([correct, ...wrong]);
        options.forEach(ans => {
            const btn = document.createElement('button');
            btn.className = 'answer-option';
            btn.textContent = ans;
            btn.addEventListener('click', () => {
                if (!this.config.gameState.isInputBlocked) this.handleAnswerSelection(ans, correct, q);
            });
            grid.appendChild(btn);
        });
    }

    handleAnswerSelection(selected, correct, q) {
        this.config.gameState.isInputBlocked = true;
        this.stopTimer();

        // Stats Update
        const region = q.continent;
        if (!this.config.playerStats.regionStats) this.config.playerStats.regionStats = {};
        if (!this.config.playerStats.regionStats[region]) this.config.playerStats.regionStats[region] = { correct: 0, total: 0 };
        this.config.playerStats.regionStats[region].total++;

        if (this.config.currentGame.mode === 'countryByCapitalText') this.highlightCorrectCountry(q.country);

        if (selected === correct) {
            this.config.gameState.score++;
            this.config.playerStats.totalCorrect++;
            this.config.playerStats.regionStats[region].correct++;

            this.showNotification(this.getLocalizedText('correct'), 'success');
            this.markButtons(correct, selected);
        } else {
            this.config.playerStats.totalWrong = (this.config.playerStats.totalWrong || 0) + 1;
            this.showNotification(this.getLocalizedText('wrong'), 'error');
            this.markButtons(correct, selected);
            setTimeout(() => this.showNotification(
                this.getLocalizedText('correctAnswer').replace('{country}', q.country).replace('{capital}', q.capital),
                'info'
            ), 1000);
        }

        this.saveStats(); // Save stats after every answer for reliability
        setTimeout(() => this.nextQuestion(), this.config.answerCooldown);
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
        if (this.config.gameState.isInputBlocked) return;
        this.config.gameState.isInputBlocked = true;
        this.stopTimer();

        // Update stats for skipped (counts as wrong/unanswered?)
        // User asked for "total wrong" and "success %". Skipped usually counts as not correct, so wrong or separate?
        // Let's count as wrong for simplicity and stricter stats
        this.config.playerStats.totalWrong = (this.config.playerStats.totalWrong || 0) + 1;
        const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
        const region = q.continent;
        if (!this.config.playerStats.regionStats[region]) this.config.playerStats.regionStats[region] = { correct: 0, total: 0 };
        this.config.playerStats.regionStats[region].total++;

        if (this.config.currentGame.mode === 'countryByCapitalText') this.highlightCorrectCountry(q.country);
        this.showNotification(this.getLocalizedText('correctAnswer').replace('{country}', q.country).replace('{capital}', q.capital), 'info');

        this.saveStats();
        setTimeout(() => this.nextQuestion(), 1500);
    }

    // === CART & MAP LOGIC ===
    initMap() {
        if (!document.getElementById('map')) return;
        if (this.config.gameState.map) this.config.gameState.map.remove();
        const map = L.map('map', {
            zoomControl: false, attributionControl: false, center: [20, 0], zoom: 2,
            minZoom: 2, maxZoom: 8, worldCopyJump: true, maxBoundsViscosity: 1.0
        });
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
        }).catch(e => console.error('Map error', e));
    }

    setupCountryInteractivity(feature, layer, map) {
        const iso = feature.properties.ISO_A2 || feature.properties.ISO_A2_EH;
        const adm3 = feature.properties.ADM0_A3;
        const name = window.GeoCountries?.getCountryNameByCode(iso, adm3);
        if (!name) { layer.setStyle({ interactive: false }); return; }
        if (this.config.currentGame?.mode === 'countryByCapitalText') { layer.options.interactive = false; return; }
        layer.options.interactive = true;
        layer.on('mouseover', () => {
            if (this.config.gameState.isInputBlocked) return;
            layer.setStyle({ weight: 2.5, color: '#fff', fillOpacity: 0.2, dashArray: '' });
            layer.bindTooltip(name, { direction: 'auto', className: 'country-tooltip' }).openTooltip();
            layer.bringToFront();
        });
        layer.on('mouseout', () => {
            if (this.config.gameState.isInputBlocked) return;
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
        this.stopTimer();

        // Update stats
        const region = q.continent;
        if (!this.config.playerStats.regionStats[region]) this.config.playerStats.regionStats[region] = { correct: 0, total: 0 };
        this.config.playerStats.regionStats[region].total++;

        if (clicked === q.country) {
            this.config.gameState.score++;
            this.config.playerStats.totalCorrect++;
            this.config.playerStats.regionStats[region].correct++;

            this.showNotification(this.getLocalizedText('correct'), 'success');
            this.highlightCorrectCountry(q.country);
        } else {
            this.config.playerStats.totalWrong = (this.config.playerStats.totalWrong || 0) + 1;
            this.showNotification(this.getLocalizedText('wrong'), 'error');
            this.highlightCorrectCountry(q.country);
            setTimeout(() => this.showNotification(
                this.getLocalizedText('correctAnswer').replace('{country}', q.country).replace('{capital}', q.capital),
                'info'
            ), 1000);
        }
        this.saveStats();
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
                    if (bounds.isValid()) this.config.gameState.map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 5, duration: 1.5 });
                }
            }
        });
    }
    resetCountryColors() { this.config.gameState.boundariesLayer?.eachLayer(l => this.config.gameState.boundariesLayer.resetStyle(l)); }

    // === TIMER ===
    startTimer() {
        this.stopTimer();
        const duration = this.config.currentGame.timerDuration;
        const disp = document.getElementById('timerDisplay');
        if (duration === 'unlimited') {
            if (disp) { disp.textContent = '∞'; disp.style.color = '#f59e0b'; }
            return;
        }
        let left = duration;
        if (disp) { disp.textContent = left; disp.style.color = left <= 10 ? '#ef4444' : '#f59e0b'; }
        this.config.gameState.timerInterval = setInterval(() => {
            if (this.config.gameState.isPaused) return;
            left--;
            if (disp) { disp.textContent = left; disp.style.color = left <= 10 ? '#ef4444' : '#f59e0b'; }
            if (left <= 0) { this.stopTimer(); this.handleTimeOut(); }
        }, 1000);
    }
    stopTimer() { clearInterval(this.config.gameState.timerInterval); }
    handleTimeOut() {
        this.config.gameState.isInputBlocked = true;
        // Count as wrong/timeout
        this.config.playerStats.totalWrong = (this.config.playerStats.totalWrong || 0) + 1;
        const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
        const region = q.continent;
        if (!this.config.playerStats.regionStats[region]) this.config.playerStats.regionStats[region] = { correct: 0, total: 0 };
        this.config.playerStats.regionStats[region].total++;

        if (this.config.currentGame.mode === 'countryByCapitalText') {
            const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
            this.highlightCorrectCountry(q.country);
        }
        this.showNotification('Время вышло!', 'warning');
        this.saveStats();
        setTimeout(() => this.nextQuestion(), 1500);
    }

    // === END GAME ===
    endGame() {
        this.stopTimer();
        this.config.navigation.gameActive = false;
        document.getElementById('gameScreen').classList.remove('mode-text-country');

        const score = this.config.gameState.score;
        const total = this.config.gameState.questions.length;
        if (score > this.config.playerStats.bestScore) this.config.playerStats.bestScore = score;

        // Total Time
        const elapsed = Math.round((Date.now() - this.config.gameState.gameStartTime) / 1000);
        this.config.playerStats.totalTime = (this.config.playerStats.totalTime || 0) + elapsed;

        this.saveStats();
        this.showResults();
    }

    saveStats() {
        localStorage.setItem('geoGatorStats', JSON.stringify(this.config.playerStats));
        // Server Sync
        if (this.config.user.login) {
            fetch('save_stats.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.config.user.login, // Send login as username
                    bestScore: this.config.playerStats.bestScore,
                    totalCorrect: this.config.playerStats.totalCorrect,
                    // Additional Stats
                    totalGames: this.config.playerStats.totalGames,
                    totalWrong: this.config.playerStats.totalWrong,
                    totalTime: this.config.playerStats.totalTime,
                    regionStats: this.config.playerStats.regionStats
                })
            }).catch(console.error);
        }
    }

    togglePasswordVisibility(e, inputId) {
        const input = document.getElementById(inputId);
        const icon = e.target;
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }

    showResults() {
        const { score, questions, gameStartTime } = this.config.gameState;
        const total = questions.length;
        const totalTimeSeconds = Math.round((Date.now() - gameStartTime) / 1000);
        document.getElementById('resultScore').textContent = score;
        document.getElementById('resultTotal').textContent = total;
        document.getElementById('totalTime').textContent = totalTimeSeconds;
        const p = total > 0 ? Math.round((score / total) * 100) : 0;
        document.getElementById('resultPercentage').textContent = `${p}%`;
        document.getElementById('resultMessage').textContent = this.getLocalizedText(p == 100 ? 'perfectResult' : p >= 80 ? 'greatResult' : 'tryAgain');
        const circle = document.querySelector('.score-circle');
        if (circle) circle.style.background = `conic-gradient(#4ade80 0deg ${p * 3.6}deg, #ef4444 ${p * 3.6}deg 360deg)`;
        this.showScreen('resultScreen');
    }

    getLocalizedText(key) { return LOCALES?.[this.config.settings.language]?.[key] || key; }
    saveSettings() { localStorage.setItem('geoNavigatorSettings', JSON.stringify(this.config.settings)); }
    applySettings() {
        document.querySelectorAll('[data-i18n]').forEach(e => { e.textContent = this.getLocalizedText(e.getAttribute('data-i18n')); });
        document.querySelectorAll('.lang-btn').forEach(b => { b.classList.toggle('active', b.dataset.lang === this.config.settings.language); });

        // Translate placeholders
        const loginPh = this.getLocalizedText('login');
        const nickPh = this.getLocalizedText('nickname');
        const passPh = this.getLocalizedText('password');

        document.getElementById('loginUsernameInput').placeholder = loginPh;
        document.getElementById('regLoginInput').placeholder = loginPh;
        document.getElementById('regNicknameInput').placeholder = nickPh;
    }
    changeLanguage(lang) {
        if (this.config.navigation.gameActive && confirm(this.getLocalizedText('languageChangeWarning'))) {
            this.resetGameState();
            this.config.settings.language = lang;
            this.applySettings();
            this.saveSettings();

            // Update Guest name if not logged in
            if (!this.config.user.id && !localStorage.getItem('geoGatorLogin')) {
                this.config.user.nickname = this.getLocalizedText('guest');
                this.updateProfileUI();
            }

            this.showScreen('mainMenu');
        } else if (!this.config.navigation.gameActive) {
            this.config.settings.language = lang;
            this.applySettings();
            this.saveSettings();

            // Update Guest name if not logged in
            if (!this.config.user.id && !localStorage.getItem('geoGatorLogin')) {
                this.config.user.nickname = this.getLocalizedText('guest');
                this.updateProfileUI();
            }

            this.updateStatsUI();
        }
    }
    playAgain() { this.startGame(); }
    showPauseMenu() {
        this.config.gameState.isPaused = true;
        this.stopTimer();
        if (document.getElementById('pauseScore')) document.getElementById('pauseScore').textContent = this.config.gameState.score;
        if (this.config.gameState.gameStartTime) {
            const elapsed = Math.round((Date.now() - this.config.gameState.gameStartTime) / 1000);
            if (document.getElementById('pauseTime')) document.getElementById('pauseTime').textContent = `${elapsed}s`;
        }
        const total = this.config.gameState.questions.length;
        const current = this.config.gameState.currentQuestionIndex;
        let percent = 0; if (total > 0) percent = Math.round((current / total) * 100);
        if (document.getElementById('pauseProgress')) document.getElementById('pauseProgress').textContent = `${percent}%`;
        this.showScreen('pauseScreen');
    }
    resetGameState() { this.resetGameStateForNewGame(); }
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
        if (n) {
            const icon = document.getElementById('notificationIcon');
            icon.className = type === 'success' ? 'fas fa-check-circle' : type === 'error' ? 'fas fa-times-circle' : 'fas fa-info-circle';
            n.style.borderLeftColor = type === 'success' ? '#4ade80' : type === 'error' ? '#ef4444' : '#4cc9f0';
            document.getElementById('notificationText').textContent = msg;
            n.classList.add('show');
            setTimeout(() => n.classList.remove('show'), 3000);
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
        if (name === 'gameScreen') {
            setTimeout(() => this.initMap(), 100);
            const audio = document.getElementById('bgMusic');
            if (audio && !audio.paused) audio.pause();
        } else {
            const audio = document.getElementById('bgMusic');
            if (audio && audio.paused) {
                audio.volume = this.config.settings.volume / 100;
                audio.play().catch(() => { });
            }
        }
        if (name === 'mainMenu') {
            this.updateStatsUI();
            this.updateProfileStatsUI(); // Ensure profile stats are fresh also in menu
        }
    }
}

document.addEventListener('DOMContentLoaded', () => window.geoNavigator = new GeoNavigator());
