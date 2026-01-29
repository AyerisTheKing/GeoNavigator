/**
 * GeoGator - Главный скрипт
 * 
 * === ПРАВИЛА ВЕРСИОНИРОВАНИЯ (для разработчиков) ===
 * Major (+1.0): Глобальные изменения архитектуры, БД или полный рефакторинг.
 * Minor (+0.5): Новые крупые функции (режимы, экраны, механики).
 * Patch (+0.1): Исправления багов, мелкие правки UI/текстов.
 * 
 * === CHANGELOG ===
 */

// v9.7: Облачная синхронизация настроек (громкость, язык) через профиль игрока.
// v9.6: Динамические надписи на карте в зависимости от сложности (Hard/Extreme без надписей).
// v9.5: Система уровней сложности (Easy, Normal, Hard, Extreme) с динамическими таймерами.
// v9.3: Реализована визуальная проверка мата в реальном времени (красная рамка).
// v9.2: Добавлена поддержка Enter для входа.
// v9.1: Скрыт скроллбар во всем приложении (CSS).
// v9.0: Улучшен фильтр мата (нормализация текста перед проверкой).

const SUPABASE_URL = "https://tdlhwokrmuyxsdleepht.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkbGh3b2tybXV5eHNkbGVlcGh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MDc3ODAsImV4cCI6MjA4NDk4Mzc4MH0.RlfUmejx2ywHNcFofZM4mNE8nIw6qxaTNzqxmf4N4-4";
const APP_VERSION = "v9.7";

const DIFFICULTY_CONFIG = {
    easy: { answers: 4, timers: [30, 40, 50, 60], color: '#4ade80', showCorrect: true, zoom: true, label: 'diffEasy' },
    normal: { answers: 6, timers: [15, 20, 25, 30], color: '#4cc9f0', showCorrect: true, zoom: true, label: 'diffNormal' },
    hard: { answers: 8, timers: [5, 8, 12, 15], color: '#f59e0b', showCorrect: false, zoom: true, label: 'diffHard' },
    extreme: { answers: 8, timers: [2, 3, 4, 5], color: '#ef4444', showCorrect: false, zoom: false, label: 'diffExtreme' }
};

// Будет инициализирован в конструкторе
let supabaseClient;

class GeoGator {
    /**
     * Конструктор инициализирует клиент Supabase и начальное состояние игры.
     */
    constructor() {
        // Инициализация Supabase Client
        if (window.supabase) {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        } else {
            console.error("Supabase SDK not loaded!");
        }

        this.config = {
            currentDifficulty: 'normal',
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

        // Настройки отображения карты для разных континентов
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

    /**
     * Основная инициализация: загрузка настроек, статистики, слушателей событий
     * и проверка сессии пользователя в Supabase.
     */
    async init() {
        console.log(`GeoGator ${APP_VERSION} initialized with Supabase`);
        this.loadSettings();
        // Load local stats first as fallback
        this.loadPlayerStats();

        this.setupEventListeners();
        this.initModalSystem(); // v8.0 New Modal System
        this.showScreen('mainMenu');
        this.setupNotifications();
        this.updateStatsUI();
        this.initVolumeSliderVisuals();
        this.initDifficultySystem();

        // Display Version
        const verEl = document.getElementById('appVersionDisplay');
        if (verEl) verEl.textContent = `GeoGator ${APP_VERSION}`;

        // Проверка существующей сессии (Supabase Auth)
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
            this.handleAuthSession(session);
        } else {
            this.config.user.nickname = this.getLocalizedText('guest');
            document.getElementById('profileName').textContent = this.config.user.nickname;
        }

        document.addEventListener('click', () => this.manageMusic(), { once: true });
    }

    /**
     * Обработка активной сессии пользователя.
     * Загружает данные профиля из таблицы 'profiles' в базе данных Supabase.
     * @param {Object} session - Объект сессии Supabase
     */
    async handleAuthSession(session) {
        this.config.user.id = session.user.id;
        // Запрос данных профиля
        const { data: profile, error } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', this.config.user.id)
            .single();

        if (profile && !error) {
            this.config.user.login = profile.username;
            this.config.user.nickname = profile.nickname;

            // Sync Settings from Cloud
            if (profile.settings) {
                this.config.settings = { ...this.config.settings, ...profile.settings };
                this.applySettings();
                this.manageMusic();
                this.initVolumeSliderVisuals();
                localStorage.setItem('geoGatorSettings', JSON.stringify(this.config.settings));
            }

            // Explicitly update DOM elements
            const pName = document.getElementById('profileName');
            const dNick = document.getElementById('profileDisplayNickname');
            const dLogin = document.getElementById('profileDisplayLogin');

            if (pName) pName.textContent = this.config.user.nickname;
            if (dNick) dNick.textContent = this.config.user.nickname;
            if (dLogin) dLogin.textContent = '@' + this.config.user.login;

            // Синхронизация статистики из БД
            this.config.playerStats = {
                bestScore: profile.best_score || 0,
                totalCorrect: profile.total_correct || 0,
                totalGames: profile.total_games || 0,
                totalWrong: profile.total_wrong || 0,
                totalTime: profile.total_time || 0,
                totalQuestions: (profile.total_correct || 0) + (profile.total_wrong || 0),
                regionStats: profile.region_stats || {}
            };
            this.updateProfileStatsUI();
            this.updateStatsUI();

            // Локальный кеш для оффлайн логики (если нужно)
            localStorage.setItem('geoGatorLogin', profile.username);
        }
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

    initDifficultySystem() {
        const difficulties = ['easy', 'normal', 'hard', 'extreme'];
        const prevBtn = document.getElementById('diffPrevBtn');
        const nextBtn = document.getElementById('diffNextBtn');

        if (prevBtn) prevBtn.addEventListener('click', () => {
            let idx = difficulties.indexOf(this.config.currentDifficulty);
            // Fix modulo for negative numbers
            idx = (idx - 1 + difficulties.length) % difficulties.length;
            this.config.currentDifficulty = difficulties[idx];
            this.updateDifficultyUI();
        });

        if (nextBtn) nextBtn.addEventListener('click', () => {
            let idx = difficulties.indexOf(this.config.currentDifficulty);
            idx = (idx + 1) % difficulties.length;
            this.config.currentDifficulty = difficulties[idx];
            this.updateDifficultyUI();
        });

        this.updateDifficultyUI();
    }

    updateDifficultyUI() {
        const diff = this.config.currentDifficulty;
        const cfg = DIFFICULTY_CONFIG[diff];
        const label = document.getElementById('difficultyLabel');
        const timerContainer = document.getElementById('timerContainer');

        if (label) {
            label.textContent = this.getLocalizedText(cfg.label);
            label.style.color = cfg.color;
            label.setAttribute('data-i18n', cfg.label);
        }

        if (timerContainer) {
            timerContainer.innerHTML = '';
            cfg.timers.forEach((t, i) => {
                const label = document.createElement('label');
                label.className = 'timer-option';
                label.innerHTML = `
                <input type="radio" name="timer" value="${t}" ${i === 0 ? 'checked' : ''}>
                <span>${t}s</span>`;
                timerContainer.appendChild(label);
            });
        }
    }

    // === 1. DATA & SETTINGS ===

    loadSettings() {
        try { Object.assign(this.config.settings, JSON.parse(localStorage.getItem('geoGatorSettings'))); } catch (e) { }
        this.applySettings();
    }

    loadPlayerStats() {
        try {
            const stats = localStorage.getItem('geoGatorStats');
            if (stats) {
                const parsed = JSON.parse(stats);
                this.config.playerStats = { ...this.config.playerStats, ...parsed };
                if (!this.config.playerStats.regionStats) this.config.playerStats.regionStats = {};
            }
        } catch (e) { console.error('Stats load error', e); }
    }

    updateStatsUI() {
        const s = this.config.playerStats;
        const totalEl = document.getElementById('statTotalCorrect');
        const bestEl = document.getElementById('statBestScore');
        const accEl = document.getElementById('statAccuracy');

        if (totalEl) totalEl.textContent = s.totalCorrect || 0;
        if (bestEl) bestEl.textContent = s.bestScore || 0;

        let acc = 0;
        if (s.totalQuestions > 0) acc = Math.round((s.totalCorrect / s.totalQuestions) * 100);
        if (accEl) accEl.textContent = `${acc}%`;
    }

    updateProfileStatsUI() {
        const s = this.config.playerStats;
        const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

        // --- 1. Profile Modal (Brief) - REMOVED v8.8

        // --- 2. Statistics Modal (Detailed) ---

        // --- 2. Statistics Modal (Detailed) ---
        setText('statFullGames', s.totalGames || 0);
        setText('statFullCorrect', s.totalCorrect || 0);
        setText('statFullWrong', s.totalWrong || 0);

        // Region Table (Only if Statistics Modal is open or prepared)
        const tbody = document.querySelector('#regionStatsTable tbody');
        if (tbody) {
            tbody.innerHTML = '';
            // Only show regions with data
            const regions = Object.entries(s.regionStats).filter(([_, d]) => d.total > 0);

            if (regions.length > 0) {
                for (const [region, data] of regions) {
                    const mk = this.getLocalizedText(region) || region;
                    const perc = Math.round((data.correct / data.total) * 100);
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${mk}</td><td>${perc}% (${data.correct}/${data.total})</td>`;
                    tbody.appendChild(tr);
                }
            } else {
                tbody.innerHTML = `<tr><td colspan="2" style="text-align:center; color:#64748b;">${this.getLocalizedText('noData')}</td></tr>`;
            }
        }
    }

    // === 2. EVENTS & UI ===

    setupEventListeners() {
        if (this.listenersAttached) return;
        this.listenersAttached = true;

        // Profile & Auth (Listeners handled by initModalSystem now for opening)

        // Menu
        document.getElementById('startGameBtn')?.addEventListener('click', () => {
            this.resetSetupUI(); // Reset to defaults for fresh game setup
            this.config.navigation.previousScreen = 'mainMenu';
            this.showScreen('gameSetupScreen');
        });
        document.getElementById('quickStartBtn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.quickStartGame();
        }); // New Quick Start Listener
        // Settings via initModalSystem

        // Game Setup
        document.getElementById('backFromSetupBtn')?.addEventListener('click', () => this.showScreen('mainMenu'));

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
        document.getElementById('openSettingsFromPauseBtn')?.addEventListener('click', () => this.navigateToSettings('pauseScreen'));
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
        if (this.config.user.id) {
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

    /**
     * Выполняет попытку входа пользователя через Supabase Auth.
     * Использует email (сформированный из логина) и пароль.
     */
    async performLogin() {
        const login = document.getElementById('loginUsernameInput').value.trim();
        const pass = document.getElementById('loginPasswordInput').value;
        const errorDiv = document.getElementById('loginError');

        if (!login || !pass) {
            this.showError(errorDiv, this.getLocalizedText('fillAllFields'));
            return;
        }

        // Формируем email из логина, так как Supabase требует email
        const email = `${login}@geogator.game`;

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: pass,
        });

        if (error) {
            this.showError(errorDiv, this.getLocalizedText('loginErrorPrefix') + error.message);
        } else {
            this.showError(errorDiv, "", false);
            this.closeLoginModal();
            this.showNotification(this.getLocalizedText('loginSuccess'), 'success');
            // Обновляем сессию и UI
            await this.handleAuthSession(data.session);
        }
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

    /**
     * Регистрация нового пользователя.
     * 1. Создает пользователя в Supabase Auth (signUp).
     * 2. Создает запись в таблице 'profiles' (insert).
     */
    async performRegister() {
        const nick = document.getElementById('regNicknameInput').value.trim();
        const login = document.getElementById('regLoginInput').value.trim();
        const pass = document.getElementById('regPasswordInput').value;
        const confirmPass = document.getElementById('regPasswordConfirmInput').value;
        const errorDiv = document.getElementById('registerError');

        // Валидация
        if (!nick || !login || !pass || !confirmPass) {
            this.showError(errorDiv, this.getLocalizedText('fillAllFields'));
            return;
        }
        if (nick.length > 10) {
            this.showError(errorDiv, this.getLocalizedText('nameTooLong'));
            return;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(login)) {
            this.showError(errorDiv, this.getLocalizedText('loginCharError'));
            return;
        }
        if (pass !== confirmPass) {
            this.showError(errorDiv, this.getLocalizedText('passwordMismatch'));
            return;
        }

        // Profanity Check
        if (this.containsProfanity(nick) || this.containsProfanity(login)) {
            this.showError(errorDiv, this.getLocalizedText('profanityError') || "Недопустимое имя или логин");
            return;
        }

        const email = `${login}@geogator.game`;

        // 1. Создание Auth User
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: pass,
        });

        if (error) {
            this.showError(errorDiv, error.message);
            return;
        }

        if (data.user) {
            // 2. Создание профиля в БД
            const { error: profileError } = await supabaseClient
                .from('profiles')
                .insert([
                    { id: data.user.id, username: login, nickname: nick }
                ]);

            if (profileError) {
                this.showError(errorDiv, this.getLocalizedText('profileCreationError') + profileError.message);
            } else {
                this.showNotification(this.getLocalizedText('registerSuccess'), "success");
                this.closeRegisterModal();
                this.openLoginModal();
                document.getElementById('loginUsernameInput').value = login;
            }
        }
    }

    // 4. Authorized Profile (Simplified)
    openStatsModal() {
        this.closeAllModals();
        const modal = document.getElementById('profileModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';

            const dNick = document.getElementById('profileDisplayNickname');
            const dLogin = document.getElementById('profileDisplayLogin');
            if (dNick) dNick.textContent = this.config.user.nickname;
            if (dLogin) dLogin.textContent = '@' + this.config.user.login;

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

    async performLogout() {
        if (confirm(this.getLocalizedText('quitConfirm') || "Выйти из аккаунта?")) {
            await supabaseClient.auth.signOut();

            // Clear Local Storage
            localStorage.removeItem('geoGatorLogin');
            localStorage.removeItem('geoGatorNickname');
            localStorage.removeItem('geoGatorStats');

            // Reset Config
            this.config.user.login = '';
            this.config.user.nickname = this.getLocalizedText('guest');
            this.config.user.id = null;
            this.resetGameStateForNewGame();

            this.config.playerStats = { totalCorrect: 0, totalQuestions: 0, bestScore: 0, totalGames: 0, totalWrong: 0, totalTime: 0, regionStats: {} };

            this.updateProfileUI(); // Set UI back to guest
            this.closeStatsModal();
            this.showNotification(this.getLocalizedText('loggedOut'), "info");
        }
    }

    // Helpers
    openStatisticsModal() {
        this.closeAllModals();
        const modal = document.getElementById('statisticsModal');
        if (modal) {
            this.updateProfileStatsUI(); // Ensure fresh data
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        }
    }

    closeStatisticsModal() {
        const modal = document.getElementById('statisticsModal');
        if (modal) {
            modal.classList.add('hidden');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    }

    closeAllModals() {
        this.closeLoginModal();
        this.closeRegisterModal();
        this.closeStatsModal();
        this.closeStatisticsModal();
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

    // === v8.0 MODAL SYSTEM REWRITE ===
    initModalSystem() {
        // 1. Open Triggers
        const triggers = [
            { id: 'profileBtn', action: () => this.handleProfileClick() },
            { id: 'openStatisticsBtn', action: () => this.openStatisticsModal() },
            { id: 'openStatisticsBtn', action: () => this.openStatisticsModal() },
            { id: 'openSettingsBtn', action: () => this.navigateToSettings('mainMenu') },
            { id: 'feedbackBtn', action: () => this.openFeedbackModal() },
            { id: 'openFeedbackFromProfileBtn', action: () => this.openFeedbackModal() }
        ];

        triggers.forEach(({ id, action }) => {
            const btn = document.getElementById(id);
            if (btn) {
                // Remove old listeners to be safe (clone node trick could be used, but let's just add new stable one)
                btn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    action();
                };
            }
        });

        // 2. Close Triggers (X buttons)
        const closeMap = {
            'closeLoginModal': 'loginModal',
            'closeRegisterModal': 'registerModal',
            'closeProfileModal': 'profileModal',
            'closeProfileModal': 'profileModal',
            'closeStatisticsModal': 'statisticsModal',
            'closeFeedbackModal': 'feedbackModal'
        };

        Object.entries(closeMap).forEach(([btnId, modalId]) => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    this.closeModal(modalId);
                };
            }
        });

        // 3. Background Close (Strict)
        document.querySelectorAll('.modal').forEach(modal => {
            modal.onclick = (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            };
        });

        // 4. Form Actions inside Modals
        const formActions = [
            { id: 'performLoginBtn', action: () => this.performLogin() },
            { id: 'performRegisterBtn', action: () => this.performRegister() },
            { id: 'openRegisterLink', action: (e) => { e.preventDefault(); this.openRegisterModal(); } },
            { id: 'toggleLoginPassword', action: (e) => this.togglePasswordVisibility(e, 'loginPasswordInput') },
            { id: 'toggleRegPassword', action: (e) => this.togglePasswordVisibility(e, 'regPasswordInput') },
            { id: 'toggleRegPassword', action: (e) => this.togglePasswordVisibility(e, 'regPasswordInput') },
            { id: 'logoutBtn', action: () => this.performLogout() },
            { id: 'sendFeedbackBtn', action: () => this.sendFeedback() }
        ];

        formActions.forEach(({ id, action }) => {
            const el = document.getElementById(id);
            if (el) el.onclick = action;
        });

        // 5. Enter Key Support for Login
        ['loginUsernameInput', 'loginPasswordInput'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') this.performLogin();
                });
            }
        });

        // 6. Real-time Profanity Check
        ['regNicknameInput', 'regLoginInput', 'feedbackMessageInput'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', () => {
                    const isBad = this.containsProfanity(el.value);
                    el.style.borderColor = isBad ? '#ef4444' : '#334155';
                });
            }
        });
    }

    openModal(id) {
        this.closeAllModals(); // Ensure single modal policy
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        }
    }

    closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('hidden');
            setTimeout(() => { if (modal.classList.contains('hidden')) modal.style.display = 'none'; }, 300);
        }
    }

    // Overwrite old methods to use new system
    openLoginModal() { this.openModal('loginModal'); }
    closeLoginModal() { this.closeModal('loginModal'); }
    openRegisterModal() { this.openModal('registerModal'); }
    closeRegisterModal() { this.closeModal('registerModal'); }
    openStatsModal() {
        this.openModal('profileModal');
        // Logic to populate data
        const dNick = document.getElementById('profileDisplayNickname');
        const dLogin = document.getElementById('profileDisplayLogin');
        if (dNick) dNick.textContent = this.config.user.nickname;
        if (dLogin) dLogin.textContent = '@' + this.config.user.login;
        this.updateProfileStatsUI();
    }
    closeStatsModal() { this.closeModal('profileModal'); }
    openStatisticsModal() {
        this.updateProfileStatsUI();
        this.openModal('statisticsModal');
    }
    closeStatisticsModal() { this.closeModal('statisticsModal'); }

    closeAllModals() {
        ['loginModal', 'registerModal', 'profileModal', 'statisticsModal', 'feedbackModal'].forEach(id => this.closeModal(id));
    }

    // === FEEDBACK SYSTEM (v8.5) ===
    // === FEEDBACK SYSTEM (v8.5) ===
    openFeedbackModal() {
        if (!this.config.user.id) {
            this.showNotification(this.getLocalizedText('feedbackLoginReq'), "info");
            this.openLoginModal();
            return;
        }
        document.getElementById('feedbackMessageInput').value = '';
        this.showError(document.getElementById('feedbackError'), '', false);
        this.openModal('feedbackModal');
    }

    async sendFeedback() {
        const text = document.getElementById('feedbackMessageInput').value.trim();
        const errorDiv = document.getElementById('feedbackError');

        if (!text) {
            this.showError(errorDiv, this.getLocalizedText('enterMessage'));
            return;
        }

        if (text.length < 5) {
            this.showError(errorDiv, this.getLocalizedText('messageTooShort'));
            return;
        }

        // Profanity Check
        if (this.containsProfanity(text)) {
            this.showError(errorDiv, this.getLocalizedText('profanityError') || "Сообщение содержит недопустимые слова. Пожалуйста, будьте вежливы.");
            return;
        }

        const payload = {
            username: this.config.user.login,
            message: text,
            app_version: APP_VERSION
        };

        const { error } = await supabaseClient
            .from('user_feedback')
            .insert([payload]);

        if (error) {
            this.showError(errorDiv, this.getLocalizedText('sendErrorPrefix') + error.message);
        } else {
            this.showNotification(this.getLocalizedText('messageSent'), "success");
            this.closeModal('feedbackModal');
        }
    }

    containsProfanity(text) {
        // 1. Проверка загрузки базы
        if (!window.BANNED_WORDS_DATA) {
            console.error("CRITICAL: BANNED_WORDS_DATA not found!");
            return false;
        }

        // 2. Нормализация: оставляем только буквы
        // Это превратит "с.у.к.а" в "сука", а "f.u_c k" в "fuck"
        const normalizedText = text.toLowerCase().replace(/[^a-zа-яё]/g, '');
        console.log(`Profanity check: "${text}" -> "${normalizedText}"`);

        // 3. Проверка
        const lists = [
            window.BANNED_WORDS_DATA.ru || [],
            window.BANNED_WORDS_DATA.en || [],
            window.BANNED_WORDS_DATA.mixed || []
        ];

        for (const list of lists) {
            for (const word of list) {
                // Ищем запрещенный корень внутри сплошного текста
                if (normalizedText.includes(word.toLowerCase())) {
                    console.log(`Filter caught: "${word}" inside "${normalizedText}"`);
                    return true;
                }
            }
        }
        return false;
    }

    // === 3. ИГРОВАЯ ЛОГИКА ===
    /*
     * Запуск новой игры.
     * Считывает параметры, сбрасывает состояние, генерирует вопросы и показывает экран игры.
     * Также сохраняет конфиг для Быстрого Старта.
     */
    async startGame(existingConfig = null) {
        let params;
        if (existingConfig) {
            params = existingConfig;
            this.config.currentGame = params;
            // Validate? Assume valid if loaded from DB/Storage
        } else {
            params = this.getGameParameters();
            if (!this.validateGameParameters(params)) return;
            this.config.currentGame = params;
        }

        this.resetGameStateForNewGame();

        // Save Config for Quick Start (Async, don't wait)
        this.saveLastGameConfig(params);

        // Увеличиваем счетчик игр
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

    async saveLastGameConfig(config) {
        // Local
        localStorage.setItem('geoGatorLastConfig', JSON.stringify(config));

        // Server
        if (this.config.user.id) {
            await supabaseClient.from('profiles').update({ last_game_config: config }).eq('id', this.config.user.id);
        }
    }

    async quickStartGame() {
        let config = null;

        // Try Server First (if logged in)
        if (this.config.user.id) {
            const { data } = await supabaseClient.from('profiles').select('last_game_config').eq('id', this.config.user.id).single();
            if (data && data.last_game_config) config = data.last_game_config;
        }

        // Try Local Fallback
        if (!config) {
            try { config = JSON.parse(localStorage.getItem('geoGatorLastConfig')); } catch (e) { }
        }

        if (config) {
            this.startGame(config);
        } else {
            this.showNotification(this.getLocalizedText('noQuickStart') || "Нет сохраненной конфигурации", 'error');
            this.resetSetupUI();
            this.showScreen('gameSetupScreen');
        }
    }

    resetSetupUI() {
        // Reset to defaults: 10 Qs, 15s Timer, All Continents, Capital by Country
        // This is purely visual reset for the "New Game" screen
        document.querySelectorAll('input[name="continent"]').forEach(cb => cb.checked = true);
        const modeRadio = document.querySelector('input[name="gameMode"][value="capitalByCountry"]');
        if (modeRadio) modeRadio.checked = true;
        const qRadio = document.querySelector('input[name="questionCount"][value="10"]');
        if (qRadio) qRadio.checked = true;

        // Reset Difficulty to Normal
        this.config.currentDifficulty = 'normal';
        this.updateDifficultyUI();

        // Now select the default timer (which exists in Normal mode)
        setTimeout(() => {
            const tRadio = document.querySelector('input[name="timer"][value="15"]');
            if (tRadio) tRadio.checked = true;
        }, 0);
    }

    getGameParameters() {
        const continents = Array.from(document.querySelectorAll('input[name="continent"]:checked')).map(cb => cb.value);
        const gameMode = document.querySelector('input[name="gameMode"]:checked')?.value || 'capitalByCountry';
        let qVal = document.querySelector('input[name="questionCount"]:checked')?.value || '10';
        const questionCount = (qVal === 'all') ? 'all' : parseInt(qVal);
        let tVal = document.querySelector('input[name="timer"]:checked')?.value || '10';
        const timerDuration = (tVal === 'unlimited') ? 'unlimited' : parseInt(tVal);
        return { continents, mode: gameMode, questionCount, timerDuration, difficulty: this.config.currentDifficulty };
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

    /*
     * Генерация пула вопросов на основе выбранных континентов.
     * Использует window.GeoCountries для получения списка стран.
     */
    generateQuestions() {
        const { continents: selected, questionCount } = this.config.currentGame;
        let allCountries = [];
        selected.forEach(c => {
            if (window.GeoCountries && window.GeoCountries.continents[c]) {
                allCountries = [...allCountries, ...window.GeoCountries.continents[c]];
            }
        });

        // Исключить страны, которых нет на карте для режима countryByCapital
        const excludedCountries = ['Сан-Марино', 'Андорра', 'Ватикан', 'Монако', 'Лихтенштейн'];
        if (this.config.currentGame.mode === 'countryByCapital') {
            allCountries = allCountries.filter(country => !excludedCountries.includes(country));
        }

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

    /*
     * Отображение текущего вопроса.
     * Настраивает UI в зависимости от режима игры (флаги, карта, текст).
     */
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
        document.getElementById('countryName').textContent = this.getLocalizedCountry(q.country);
        document.getElementById('countryFlag').innerHTML = `<img src="https://flagcdn.com/w320/${q.code}.png" alt="flag">`;
        this.generateAnswerOptions(q, 'capital');
    }
    showCountryByCapitalQuestion(q) {
        this.toggleUIElements({ flag: false, options: false, hint: true });
        document.getElementById('questionText').textContent = this.getLocalizedText('findCountry').replace('{capital}', this.getLocalizedCapital(q.capital));
        this.displayContinentHint(q.continent, q.capital);
    }
    showCountryByCapitalTextQuestion(q) {
        this.toggleUIElements({ flag: false, options: true, hint: true });
        document.getElementById('questionText').textContent = this.getLocalizedText('guessCountry');
        document.querySelector('.capital-hint span').innerHTML = `<strong>${this.getLocalizedCapital(q.capital)}</strong>`;
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
        el.innerHTML = `<strong>${this.getLocalizedCapital(capital)}</strong> — ${this.getLocalizedText('clickOnCountry')}<br><small>${inText} ${cName}</small>`;
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
        
        const difficulty = this.config.currentGame?.difficulty || 'normal';
        const diffCfg = DIFFICULTY_CONFIG[difficulty];
        const totalOptions = diffCfg ? diffCfg.answers : 6;
        
        const wrong = this.shuffleArray(pool).slice(0, totalOptions - 1);
        const options = this.shuffleArray([correct, ...wrong]);
        options.forEach(ans => {
            const btn = document.createElement('button');
            btn.className = 'answer-option';

            // Localize text for display
            const displayText = (type === 'capital')
                ? this.getLocalizedCapital(ans)
                : this.getLocalizedCountry(ans);

            btn.textContent = displayText;
            btn.dataset.val = ans; // Store original value for logic

            btn.addEventListener('click', () => {
                if (!this.config.gameState.isInputBlocked) this.handleAnswerSelection(ans, correct, q);
            });
            grid.appendChild(btn);
        });
    }

    /*
     * Обработка выбора ответа (клик по кнопке).
     * Проверяет правильность, обновляет статистику и запускает переход к следующему вопросу.
     */
    handleAnswerSelection(selected, correct, q) {
        this.config.gameState.isInputBlocked = true;
        this.stopTimer();

        // Обновление статистики (Регионы)
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

            // Format notification with localized names
            const correctCountry = this.getLocalizedCountry(q.country);
            const correctCapital = this.getLocalizedCapital(q.capital);

            const difficulty = this.config.currentGame?.difficulty || 'normal';
            if (DIFFICULTY_CONFIG[difficulty]?.showCorrect !== false) {
                setTimeout(() => this.showNotification(
                    this.getLocalizedText('correctAnswer').replace('{country}', correctCountry).replace('{capital}', correctCapital),
                    'info'
                ), 1000);
            }
        }

        this.saveStats(); // Сохраняем статистику после каждого ответа
        setTimeout(() => this.nextQuestion(), this.config.answerCooldown);
    }

    markButtons(correct, selected) {
        document.querySelectorAll('.answer-option').forEach(btn => {
            // Check dataset.val for original value match
            if (btn.dataset.val === correct) btn.classList.add('correct');
            else if (btn.dataset.val === selected) btn.classList.add('wrong');
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

    // === КАРТА И ЛОГИКА ===
    /*
     * Инициализация карты Leaflet.
     * Загружает карту, устанавливает границы (тайлы) и добавляет слой границ стран из GeoJSON.
     */
    initMap() {
        if (!document.getElementById('map')) return;
        if (this.config.gameState.map) this.config.gameState.map.remove();
        const map = L.map('map', {
            zoomControl: false, attributionControl: false, center: [20, 0], zoom: 2,
            minZoom: 2, maxZoom: 8, worldCopyJump: true, maxBoundsViscosity: 1.0
        });
        const isHardcore = ['hard', 'extreme'].includes(this.config.currentDifficulty);
        const tileUrl = isHardcore
            ? 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

        L.tileLayer(tileUrl, { subdomains: 'abcd', maxZoom: 8 }).addTo(map);
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

    /*
     * Настройка интерактивности для каждого слоя страны.
     * Обрабатывает наведение (подсветка, тултип) и клик (выбор страны в режиме "Найти на карте").
     */
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

            const correctCountry = this.getLocalizedCountry(q.country);
            const correctCapital = this.getLocalizedCapital(q.capital);

            setTimeout(() => this.showNotification(
                this.getLocalizedText('correctAnswer').replace('{country}', correctCountry).replace('{capital}', correctCapital),
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
                    const difficulty = this.config.currentGame?.difficulty || 'normal';
                    if (DIFFICULTY_CONFIG[difficulty]?.zoom !== false) {
                        const bounds = layer.getBounds();
                        if (bounds.isValid()) this.config.gameState.map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 5, duration: 1.5 });
                    }
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
        this.showNotification(this.getLocalizedText('timeOut'), 'warning');
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

    /**
     * Сохраняет статистику игрока.
     * Сначала в localStorage, затем синхронизирует с Supabase (если пользователь авторизован).
     */
    async saveStats() {
        localStorage.setItem('geoGatorStats', JSON.stringify(this.config.playerStats));

        // Серверная синхронизация через Supabase
        if (this.config.user.id) {
            const updates = {
                best_score: this.config.playerStats.bestScore,
                total_correct: this.config.playerStats.totalCorrect,
                total_games: this.config.playerStats.totalGames,
                total_wrong: this.config.playerStats.totalWrong,
                total_time: this.config.playerStats.totalTime,
                region_stats: this.config.playerStats.regionStats
            };

            const { error } = await supabaseClient
                .from('profiles')
                .update(updates)
                .eq('id', this.config.user.id);

            if (error) {
                console.error('Error saving stats to Supabase:', error);
            }
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
        const wrong = total - score; // Simple calculation for game over

        document.getElementById('resultScore').textContent = score;
        document.getElementById('resultTotal').textContent = total;
        document.getElementById('totalTime').textContent = totalTimeSeconds;

        // FIX: Update correct/wrong specific counters
        document.getElementById('correctAnswers').textContent = score;
        document.getElementById('wrongAnswers').textContent = wrong;

        const p = total > 0 ? Math.round((score / total) * 100) : 0;
        document.getElementById('resultPercentage').textContent = `${p}%`;
        document.getElementById('resultMessage').textContent = this.getLocalizedText(p == 100 ? 'perfectResult' : p >= 80 ? 'greatResult' : 'tryAgain');
        const circle = document.querySelector('.score-circle');
        if (circle) circle.style.background = `conic-gradient(#4ade80 0deg ${p * 3.6}deg, #ef4444 ${p * 3.6}deg 360deg)`;
        this.showScreen('resultScreen');
    }

    getLocalizedCountry(name) {
        if (this.config.settings.language === 'en') {
            return window.GeoCountries?.getEnglishName(name) || name;
        }
        return name;
    }

    getLocalizedCapital(capital) {
        if (this.config.settings.language === 'en') {
            return window.GeoCountries?.getEnglishCapital(capital) || capital;
        }
        return capital;
    }

    getLocalizedText(key) { return LOCALES?.[this.config.settings.language]?.[key] || key; }
        saveSettings() {
        localStorage.setItem('geoGatorSettings', JSON.stringify(this.config.settings));

        // Cloud Sync with Debounce
        if (this.config.user.id) {
            if (this.settingsSyncTimeout) clearTimeout(this.settingsSyncTimeout);
            this.settingsSyncTimeout = setTimeout(async () => {
                const { error } = await supabaseClient
                    .from('profiles')
                    .update({ settings: this.config.settings })
                    .eq('id', this.config.user.id);
                if (error) console.error('Settings sync error:', error);
            }, 1500);
        }
    }
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
        
        // Localize Feedback Placeholder
        const msgPh = this.getLocalizedText('messagePlaceholder');
        const feedbackInput = document.getElementById('feedbackMessageInput');
        if (feedbackInput) feedbackInput.placeholder = msgPh;

        // Update Guest text if not logged in
        if (!this.config.user.id && !localStorage.getItem('geoGatorLogin')) {
            this.config.user.nickname = this.getLocalizedText('guest');
            this.updateProfileUI();
        }
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

document.addEventListener('DOMContentLoaded', () => window.geoGator = new GeoGator());
