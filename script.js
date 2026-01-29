/**
 * GeoGator Core
 * Current Version: v11.8
 * See CHANGELOG.md for full history.
 * * === ПРАВИЛА ВЕРСИОНИРОВАНИЯ ===
 * Major (+1.0): Глобальные изменения (новая БД, архитектура).
 * Minor (+0.5): Новые фичи (режимы, экраны).
 * Patch (+0.1): Багфиксы, тексты, рефакторинг.
 */

const SUPABASE_URL = "https://tdlhwokrmuyxsdleepht.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkbGh3b2tybXV5eHNkbGVlcGh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MDc3ODAsImV4cCI6MjA4NDk4Mzc4MH0.RlfUmejx2ywHNcFofZM4mNE8nIw6qxaTNzqxmf4N4-4";
const APP_VERSION = "v11.8";

const DIFFICULTY_CONFIG = {
    easy: { answers: 4, timers: [30, 40, 50, 60], color: '#4ade80', showCorrect: true, zoom: true, label: 'diffEasy' },
    normal: { answers: 6, timers: [15, 20, 25, 30], color: '#4cc9f0', showCorrect: true, zoom: true, label: 'diffNormal' },
    hard: { answers: 8, timers: [5, 8, 12, 15], color: '#f59e0b', showCorrect: false, zoom: true, label: 'diffHard' },
    extreme: { answers: 8, timers: [2, 3, 4, 5], color: '#ef4444', showCorrect: false, zoom: false, label: 'diffExtreme' }
};

// Данные режима "Самый-самый" (The Most) — обновлённый список точек.
// id: строка-идентификатор (совпадает с feature.properties.id в GeoJSON)
const THE_MOST_QUESTIONS = [
    { id: '1', question: 'Укажите самую высокую гору', answer: 'Эверест', fact: '8849 м. Гималаи, Азия.' },
    { id: '2', question: 'Укажите самый глубокий океан', answer: 'Тихий океан', fact: 'Средняя глубина 3984 м, содержит Марианскую впадину.' },
    { id: '3', question: 'Укажите самую длинную реку', answer: 'Нил', fact: 'Около 6650 км. Африка.' },
    { id: '4', question: 'Укажите самую полноводную реку', answer: 'Амазонка', fact: 'Южная Америка.' },
    { id: '5', question: 'Укажите самое глубокое озеро', answer: 'Байкал', fact: 'Глубина 1642 м. Россия, Сибирь.' },
    { id: '6', question: 'Укажите самое большое озеро', answer: 'Каспийское море', fact: '371 000 км². Евразия.' },
    { id: '7', question: 'Укажите самый большой остров', answer: 'Гренландия', fact: '2,1 млн км². Северная Америка.' },
    { id: '8', question: 'Укажите самый большой материк', answer: 'Евразия', fact: '54,8 млн км².' },
    { id: '9', question: 'Укажите самый маленький материк', answer: 'Австралия', fact: '7,7 млн км².' },
    { id: '10', question: 'Укажите самую большую жаркую пустыню', answer: 'Сахара', fact: 'Около 9,2 млн км². Африка.' },
    { id: '11', question: 'Укажите самый высокий водопад', answer: 'Анхель', fact: '979 м. Венесуэла.' },
    { id: '12', question: 'Укажите самый мощный водопад', answer: 'Игуасу', fact: 'Средний расход ~1750 м³/с. Бразилия/Аргентина.' },
    { id: '13', question: 'Укажите самый большой коралловый риф', answer: 'Большой Барьерный риф', fact: 'Более 2300 км. Австралия.' },
    { id: '14', question: 'Укажите самую глубокую точку Земли', answer: 'Марианская впадина', fact: '≈11 км. Тихий океан.' },
    { id: '15', question: 'Укажите самое холодное место', answer: 'Станция «Восток»', fact: 'Рекорд -89,2°C. Антарктида.' },
    { id: '16', question: 'Укажите самое жаркое место', answer: 'Долина Смерти', fact: 'Рекорд +56,7°C. Калифорния, США.' },
    { id: '17', question: 'Укажите самое влажное место', answer: 'Черапунджи/Мавсинрам', fact: 'Около 12 000 мм осадков в год. Индия.' },
    { id: '18', question: 'Укажите самое солёное море', answer: 'Красное море', fact: 'Солёность около 41‰.' },
    { id: '19', question: 'Укажите самый знаменитый вулкан с идеальным конусом', answer: 'Фудзияма', fact: '3776 м. Япония.' },
    { id: '20', question: 'Укажите самый знаменитый каньон', answer: 'Гранд-Каньон', fact: 'Река Колорадо, Аризона, США.' },
    { id: '21', question: 'Укажите самую длинную горную цепь', answer: 'Анды', fact: '≈9000 км. Южная Америка.' },
    { id: '22', question: 'Укажите самую большую страну', answer: 'Россия', fact: '17,1 млн км².' },
    { id: '23', question: 'Укажите самую маленькую страну', answer: 'Ватикан', fact: '0,49 км². Внутри Рима.' },
    { id: '24', question: 'Укажите самую густонаселённую страну (по плотности)', answer: 'Монако', fact: 'Плотность населения ~19 000 чел./км².' },
    { id: '25', question: 'Укажите самый известный разлом', answer: 'Сан-Андреас', fact: 'Калифорния, США.' },
    { id: '26', question: 'Укажите самый знаменитый гейзер', answer: '«Старый служака»', fact: 'Йеллоустон, США.' },
    { id: '27', question: 'Укажите самый большой солончак', answer: 'Солончак Уюни', fact: '10 582 км². Боливия.' },
    { id: '28', question: 'Укажите самый известный водопад Африки', answer: 'Водопад Виктория', fact: 'Река Замбези.' },
    { id: '29', question: 'Укажите самую низкую точку на суше', answer: 'Побережье Мёртвого моря', fact: '-430 м. Израиль/Иордания.' },
    { id: '30', question: 'Укажите самый удалённый от суши остров', answer: 'Остров Пасхи (Рапануи)', fact: 'Тихий океан. Принадлежит Чили.' }
];

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
                wrong: 0,
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

            gameStats: {
                easy: { score: 0, time: 0, correct: 0 },
                normal: { score: 0, time: 0, correct: 0 },
                hard: { score: 0, time: 0, correct: 0 },
                extreme: { score: 0, time: 0, correct: 0 }
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

        // 1. СНАЧАЛА вешаем обработчики (чтобы интерфейс ожил)
        this.setupEventListeners();
        this.initModalSystem();

        this.showScreen('mainMenu');
        this.setupNotifications();
        this.updateStatsUI();
        this.initVolumeSliderVisuals();
        this.initDifficultySystem();

        // Display Version
        const verEl = document.getElementById('appVersionDisplay');
        if (verEl) verEl.textContent = `GeoGator ${APP_VERSION}`;

        // 2. Инициализируем карту (безопасно)
        await this.initMap();

        document.addEventListener('click', () => this.manageMusic(), { once: true });

        // 3. Только ПОТОМ лезем в сеть (Auth)
        try {
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (session) await this.handleAuthSession(session);
            else {
                this.config.user.nickname = this.getLocalizedText('guest');
                const pName = document.getElementById('profileName');
                if (pName) pName.textContent = this.config.user.nickname;
            }

            supabaseClient.auth.onAuthStateChange((_event, session) => {
                if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') {
                    this.handleAuthSession(session);
                }
            });
        } catch (e) {
            console.error("Auth init error (Non-critical):", e);
            this.updateProfileUI();
        }
    }

    /**
     * Обработка активной сессии пользователя.
     * Загружает данные профиля из таблицы 'profiles' в базе данных Supabase.
     * @param {Object} session - Объект сессии Supabase
     */
    async handleAuthSession(session) {
        if (!session?.user) return;
        
        const uid = session.user.id;
        
        // 1. Запрашиваем профиль
        const { data: profile, error } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', uid)
            .single();

        // 2. ЕСЛИ ОШИБКА ИЛИ ПРОФИЛЯ НЕТ -> ВЫХОДИМ (Logout)
        // Это исправляет баг "Зомби-аккаунта" и TypeError
        if (error || !profile) {
            console.warn("Профиль не найден в базе. Выполняем выход.");
            await supabaseClient.auth.signOut();
            alert("Ошибка доступа: Ваш профиль не найден. Пожалуйста, зарегистрируйтесь заново.");
            this.updateProfileUI();
            return;
        }

        // 3. ЕСЛИ ВСЁ ОК -> ЗАГРУЖАЕМ
        this.config.user = { 
            id: profile.id, 
            login: profile.login, 
            nickname: profile.nickname,
            recent_games: profile.recent_games || []
        };
        
        // Загружаем статистику с защитой от пустых полей
        this.config.game_stats = {
            global: {
                total_correct: profile.total_correct || 0,
                best_score: profile.best_score || 0,
                total_games: profile.total_games || 0,
                total_time: profile.total_time || 0
            },
            easy: profile.stats_easy || {},
            normal: profile.stats_normal || {},
            hard: profile.stats_hard || {},
            extreme: profile.stats_extreme || {}
        };

        this.updateProfileUI();
        this.updateProfileStatsUI();

         // Sync Settings from Cloud
         if (profile.settings) {
            this.config.settings = { ...this.config.settings, ...profile.settings };
            this.applySettings();
            this.manageMusic();
            this.initVolumeSliderVisuals();
            localStorage.setItem('geoGatorSettings', JSON.stringify(this.config.settings));
        }
        
        // Локальный кеш
        localStorage.setItem('geoGatorLogin', this.config.user.login);
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
        // Fix Name Display Priority: Nickname -> Login -> Guest
        const profileNameEl = document.getElementById('profileDisplayNickname');
        const menuNameEl = document.getElementById('profileName'); // Button in menu

        const guestText = this.getLocalizedText('guest');
        const displayName = this.config.user.nickname || this.config.user.login || guestText || "Игрок";

        if (profileNameEl) profileNameEl.textContent = displayName;
        if (menuNameEl) menuNameEl.textContent = displayName;

        // Stats Logic
        const s = this.config.playerStats;
        const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

        // --- Statistics Modal (Detailed) ---
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

        // --- Безопасная проверка кнопки Профиля ---
        const btnProfile = document.getElementById('profileBtn');
        if (btnProfile) {
            btnProfile.addEventListener('click', () => {
                this.handleProfileClick();
            });
        } else {
            console.warn("Warning: Button 'profileBtn' not found in HTML");
        }

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
            alert(error.message); // Explicit Alert as requested
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
     * Helper: Validates input against security rules.
     */
    validateInput(text, type) {
        if (type === 'login') {
            // 5-30 chars, letters, numbers, underscore
            return /^[a-zA-Z0-9_]{5,30}$/.test(text);
        }
        if (type === 'nickname') {
            // 3-15 chars, cyrillic/latin/numbers/spaces
            return /^[a-zA-Zа-яА-Я0-9 ]{3,15}$/.test(text);
        }
        return false;
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

        // Валидация (Security Hardening v11.8)
        if (!nick || !login || !pass || !confirmPass) {
            this.showError(errorDiv, this.getLocalizedText('fillAllFields'));
            return;
        }

        // Strict Validation Check
        if (!this.validateInput(login, 'login')) {
            alert("Ошибка: Логин должен содержать от 5 до 30 символов (только латиница, цифры и '_').");
            return;
        }
        if (!this.validateInput(nick, 'nickname')) {
            alert("Ошибка: Никнейм должен содержать от 3 до 15 символов (буквы, цифры, пробелы).");
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

        // 1. Создание Auth User с передачей login в metadata для триггера
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: pass,
            options: {
                data: {
                    login: login // ВАЖНО: передаем login в raw_user_meta_data
                }
            }
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
                    { id: data.user.id, login: login, nickname: nick }
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
        const isLoggedIn = !!this.config.user.id;
        let nick = this.config.user.nickname;
        
        // Fallback if empty or guest
        if (!nick || !isLoggedIn) {
             nick = this.getLocalizedText('guest');
        }

        // 1. Button in Menu
        const pName = document.getElementById('profileName');
        if (pName) pName.textContent = nick;

        // 2. Profile Modal Headers
        const dNick = document.getElementById('profileDisplayNickname');
        const dLogin = document.getElementById('profileDisplayLogin');
        
        if (dNick) dNick.textContent = nick;
        if (dLogin) {
            dLogin.textContent = isLoggedIn ? ('@' + this.config.user.login) : '@guest';
        }
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

    // === MODAL SYSTEM ===
    initModalSystem() {
        // 1. Open Triggers
        const triggers = [
            { id: 'profileBtn', action: () => this.handleProfileClick() },
            { id: 'openStatisticsBtn', action: () => this.openStatisticsModal() },
            { id: 'openSettingsBtn', action: () => this.navigateToSettings('mainMenu') },
            { id: 'feedbackBtn', action: () => this.openFeedbackModal() },
            { id: 'openFeedbackFromProfileBtn', action: () => this.openFeedbackModal() },
            { id: 'openLeaderboardBtn', action: () => this.openLeaderboard() },
            { id: 'btnHistory', action: () => this.showHistory() },
            { id: 'refreshLeaderboardBtn', action: () => this.openLeaderboard() }
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
            'closeStatisticsModal': 'statisticsModal',
            'closeFeedbackModal': 'feedbackModal',
            'closeFeedbackModal': 'feedbackModal',
            'closeLeaderboardModal': 'leaderboardModal',
            'closeHistoryModal': 'historyModal'
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
        this.updateProfileUI(); // Ensure text is correct
        this.updateProfileStatsUI(); // Ensure stats are correct
    }
    closeStatsModal() { this.closeModal('profileModal'); }
    openStatisticsModal() {
        this.updateProfileStatsUI();
        this.openModal('statisticsModal');
    }
    closeStatisticsModal() { this.closeModal('statisticsModal'); }

    closeAllModals() {
        ['loginModal', 'registerModal', 'profileModal', 'statisticsModal', 'feedbackModal', 'leaderboardModal'].forEach(id => this.closeModal(id));
    }

    // === FEEDBACK SYSTEM ===
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
        const map = this.config.gameState.map;
        const isMostMode = (this.config.currentGame.mode === 'theMost');
        // Enable/disable interactivity for Most points
        if (this.config.gameState.mostLayer) {
            this.config.gameState.mostLayer.eachLayer(l => l.options.interactive = isMostMode);
        }
        // In 'theMost' mode hide country boundaries and disable map interactions so players control zoom/pan themselves
        if (isMostMode) {
            if (this.config.gameState.boundariesLayer && map && map.hasLayer && map.hasLayer(this.config.gameState.boundariesLayer)) {
                try { map.removeLayer(this.config.gameState.boundariesLayer); } catch (e) { }
            }
            if (map) {
                map.dragging?.disable();
                map.touchZoom?.disable();
                map.doubleClickZoom?.disable();
                map.scrollWheelZoom?.disable();
                map.boxZoom?.disable();
                try { if (map.keyboard) map.keyboard.disable(); } catch(e) { }
            }
        } else {
            if (this.config.gameState.boundariesLayer && map && map.addLayer && !map.hasLayer(this.config.gameState.boundariesLayer)) {
                try { map.addLayer(this.config.gameState.boundariesLayer); } catch (e) { }
                // ensure polygons are interactive again
                this.config.gameState.boundariesLayer.eachLayer(l => l.options.interactive = true);
            }
            if (map) {
                map.dragging?.enable();
                map.touchZoom?.enable();
                map.doubleClickZoom?.enable();
                map.scrollWheelZoom?.enable();
                map.boxZoom?.enable();
                try { if (map.keyboard) map.keyboard.enable(); } catch(e) { }
            }
        }
        this.config.gameState.gameStartTime = Date.now();
        this.config.gameState.sessionStart = Date.now();
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

        // Special mode: The Most
        if (this.config.currentGame.mode === 'theMost') {
            const pool = this.shuffleArray(THE_MOST_QUESTIONS.slice());
            let finalSelection;
            if (questionCount === 'all') finalSelection = pool;
            else finalSelection = pool.slice(0, Math.min(questionCount, pool.length));
            // Map to internal question format
            this.config.gameState.questions = finalSelection.map(q => ({
                id: q.id,
                question: q.question,
                answer: q.answer,
                fact: q.fact
            }));
            document.getElementById('totalQuestions').textContent = this.config.gameState.questions.length;
            return;
        }

        // Default behavior: country-based questions
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
        
        // Fix undefined reading 'continent'
        const q = questions[currentQuestionIndex];
        if (!q) {
            console.error("Вопрос не найден! Завершаем игру.");
            this.endGame();
            return;
        }

        if (currentQuestionIndex >= questions.length) {
            this.endGame();
            return;
        }

        // q is already defined above
        this.updateQuestionUI(currentQuestionIndex, questions.length);
        this.startTimer();

        const mode = this.config.currentGame.mode;
        if (mode === 'capitalByCountry') this.showCapitalByCountryQuestion(q);
        else if (mode === 'countryByCapital') this.showCountryByCapitalQuestion(q);
        else if (mode === 'countryByCapitalText') this.showCountryByCapitalTextQuestion(q);
        else if (mode === 'theMost') this.showTheMostQuestion(q);
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
        const view = this.continentViews[q.continent];
        // ДОБАВИТЬ ЭТУ ПРОВЕРКУ:
        if (view && view.center && !isNaN(view.center[0])) {
            this.config.gameState.map.flyTo(view.center, view.zoom, { duration: 1.5 });
        } else {
            // Если координат нет, просто игнорируем анимацию, чтобы не крашнуть игру
            console.log("Skipping map animation: invalid coordinates");
        }
        this.generateAnswerOptions(q, 'country');
    }

    // Режим "Самый-самый": показывает текст и инструкцию к клику по карте
    showTheMostQuestion(q) {
        this.toggleUIElements({ flag: false, options: false, hint: true });
        // Use provided question text directly
        document.getElementById('questionText').textContent = q.question;
        document.querySelector('.capital-hint span').textContent = 'Кликните по крупной точке на карте. После ответа вы увидите короткий факт.';
        // No automatic centering/zoom in this mode — players control the map themselves
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
        this.config.gameState.wrong = (this.config.gameState.wrong || 0) + 1;
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
    async initMap() {
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
        this.config.gameState.map = map;

        // Защита загрузки GeoJSON
        try {
            const response = await fetch('countries.geo.json');
            if (!response.ok) throw new Error("Failed to load GeoJSON");
            const data = await response.json();
            this.addCountryBoundaries(data);
        } catch (error) {
            console.warn("GeoJSON error: границы стран не загружены, но игра продолжается.", error);
        }

        // Load "The Most" objects layer (points/lines/polygons) if available
        try {
            const resp = await fetch('the_most.geo.json');
            if (resp.ok) {
                const mostData = await resp.json();
                this.addMostObjects(mostData);
            }
        } catch (e) {
            console.warn('The Most layer not loaded (optional)', e);
        }
    }

    addCountryBoundaries(data) {
        const map = this.config.gameState.map;
        if (!map) return;
        
        const layer = L.geoJson(data, {
            style: { fillColor: 'transparent', weight: 1.5, opacity: 0.6, color: '#4cc9f0', fillOpacity: 0.1, dashArray: '3, 3' },
            onEachFeature: (f, l) => this.setupCountryInteractivity(f, l, map)
        });
        // Keep reference to the layer, but do not add it to the map if we're in 'theMost' mode.
        // It will be added when a non-theMost game starts.
        this.config.gameState.boundariesLayer = layer;
        try {
            if (this.config.currentGame?.mode !== 'theMost') layer.addTo(map);
        } catch (e) {
            // If currentGame undefined (during init) it's safe to add by default
            try { layer.addTo(map); } catch (err) { }
        }
    }

    // Добавляет слой с объектами режима "Самый-самый" (точки/сегменты). 
    addMostObjects(data) {
        const map = this.config.gameState.map;
        if (!map || !data) return;
        const layer = L.geoJson(data, {
            pointToLayer: (feature, latlng) => L.circleMarker(latlng, { radius: 12, color: '#ff8a3d', weight: 2, fillColor: '#ffb86b', fillOpacity: 0.95 }),
            onEachFeature: (f, l) => this.setupMostInteractivity(f, l)
        }).addTo(map);
        this.config.gameState.mostLayer = layer;
        // Ensure points drawn above country fills
        if (map && map.eachLayer) {
            layer.bringToFront?.();
        }
        // Initially non-interactive until mode selected
        layer.eachLayer(l => l.options.interactive = (this.config.currentGame?.mode === 'theMost'));
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
        this.config.gameState.wrong = (this.config.gameState.wrong || 0) + 1;
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

    // Настройка интерактивности для объектов режима "Самый-самый"
    setupMostInteractivity(feature, layer) {
        const name = feature.properties && (feature.properties.name || feature.properties.id || 'Объект');
        // Ensure only large points are interactive in this mode
        layer.options.interactive = (this.config.currentGame?.mode === 'theMost');
        layer.on('mouseover', () => {
            if (this.config.gameState.isInputBlocked) return;
            if (layer.setStyle) layer.setStyle({ radius: 15, color: '#fff', weight: 2, fillColor: '#ffdb9b' });
            layer.bindTooltip(name, { direction: 'auto', className: 'country-tooltip' }).openTooltip();
            if (layer.bringToFront) layer.bringToFront();
        });
        layer.on('mouseout', () => {
            if (this.config.gameState.isInputBlocked) return;
            if (this.config.gameState.mostLayer) this.config.gameState.mostLayer.resetStyle(layer);
            layer.closeTooltip();
        });
        layer.on('click', (e) => {
            if (this.config.currentGame?.mode === 'theMost') {
                L.DomEvent.stop(e);
                const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
                this.handleMostObjectClick(String(layer.feature.properties.id), q);
            }
        });
    }

    handleMostObjectClick(clickedId, q) {
        this.config.gameState.isInputBlocked = true;
        this.stopTimer();

        // Update stats (generic world region)
        const region = 'world';
        if (!this.config.playerStats.regionStats[region]) this.config.playerStats.regionStats[region] = { correct: 0, total: 0 };
        this.config.playerStats.regionStats[region].total++;

        if (clickedId === q.id) {
            this.config.gameState.score++;
            this.config.playerStats.totalCorrect++;
            this.config.playerStats.regionStats[region].correct++;
            this.showNotification(this.getLocalizedText('correct'), 'success');
            this.highlightCorrectMostObject(q.id);
            setTimeout(() => this.showNotification(q.fact || '', 'info'), 800);
        } else {
            this.config.playerStats.totalWrong = (this.config.playerStats.totalWrong || 0) + 1;
            this.config.gameState.wrong = (this.config.gameState.wrong || 0) + 1;
            this.showNotification(this.getLocalizedText('wrong'), 'error');
            this.highlightCorrectMostObject(q.id);
            // Показываем правильный ответ: центрируем и увеличиваем карту на правильной точке
            try {
                const map = this.config.gameState.map;
                if (this.config.gameState.mostLayer && map) {
                    this.config.gameState.mostLayer.eachLayer(layer => {
                        if (String(layer.feature?.properties?.id) === String(q.id)) {
                            const latlng = (layer.getLatLng && layer.getLatLng()) || (layer.getBounds && layer.getBounds().getCenter && layer.getBounds().getCenter());
                            if (latlng) map.flyTo(latlng, 6, { duration: 1.2 });
                        }
                    });
                }
            } catch (e) { }
            setTimeout(() => this.showNotification(q.fact || '', 'info'), 800);
        }
        this.saveStats();
        setTimeout(() => this.nextQuestion(), 1500);
    }

    highlightCorrectMostObject(answerId) {
        if (!this.config.gameState.mostLayer) return;
        this.config.gameState.mostLayer.eachLayer(layer => {
            if (layer.feature && layer.feature.properties && String(layer.feature.properties.id) === String(answerId)) {
                if (layer.setStyle) layer.setStyle({ radius: 14, color: '#4ade80', fillColor: '#4ade80', fillOpacity: 0.95, weight: 2 });
                if (layer.bringToFront) layer.bringToFront();
            }
        });
    }

    resetCountryColors() {
        if (this.config.gameState.boundariesLayer) {
            this.config.gameState.boundariesLayer.eachLayer(l => this.config.gameState.boundariesLayer.resetStyle(l));
        }
        if (this.config.gameState.mostLayer) {
            this.config.gameState.mostLayer.eachLayer(l => {
                // Reset circle markers to default style
                if (l.setStyle) l.setStyle({ radius: 7, color: '#ffb86b', weight: 1, fillColor: '#ffb86b', fillOpacity: 0.9 });
            });
        }
    }

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
        this.config.gameState.wrong = (this.config.gameState.wrong || 0) + 1;
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
        const duration = Math.round((Date.now() - this.config.gameState.sessionStart) / 1000);

        this.saveStats(duration, true);
        this.showResults();
    }

    /**
     * Сохраняет статистику игрока.

     */
    async saveStats(sessionDuration = 0, isFinal = false) {
        if (sessionDuration > 0) {
            this.config.playerStats.totalTime = (this.config.playerStats.totalTime || 0) + sessionDuration;
        }
        localStorage.setItem('geoGatorStats', JSON.stringify(this.config.playerStats));

        if (!this.config.user.id) return;
        
        // Use loaded config stats as BASE
        if (!this.config.game_stats) return;

        // Current game Deltas
        const gameCorrect = this.config.gameState.score || 0;
        const totalQs = this.config.gameState.questions.length || 0; // Total planned (usually 10/20)
        // If game is not finished, we might want to use current index? 
        // But logic says totalQs is total questions available in the game
        
        // Actually for HISTORY "Total" we usually mean "Total questions answered so far" or "Total questions in match"?
        // The prompt says "t: totalQuestions". Let's use config.gameState.totalQuestions (which needs to be set properly) or questions.length
        
        const currentQIndex = this.config.gameState.currentQuestionIndex || 0;
        const gameWrong = (this.config.gameState.wrong || 0); // Need to ensure 'wrong' is tracked in gameState if we use it directly, but earlier code used playerStats.totalWrong accumulation. 
        // Wait, the prompt says "w: this.config.gameState.wrong". 
        // In my current code config.gameState does usually NOT have 'wrong'. 
        // I should check where 'wrong' is updated. 
        // In handleAnswerSelection: this.config.playerStats.totalWrong++;
        // But for *this specific game*, I need to track it locally if I want 'match' stats.
        // Let's assume for now I should use 'gameWrong' calculated or from a new property.
        // The prompt says "w: this.config.gameState.wrong". I must ensure this property is populated!
        
        // Let's add 'wrong' to gameState in init or update it.
        // Or calculate it: gameWrong = (currentQIndex + 1) - gameCorrect (approx).
        // Safest is to follow prompt instruction "w: this.config.gameState.wrong". 
        // I will assume I need to update 'wrong' in handleAnswerSelection too? 
        // Actually, looking at handleAnswerSelection, it doesn't update config.gameState.wrong.
        // I should add it there or just calculate it here implicitly.
        // But the user Code Prompt explicitly says: "w: this.config.gameState.wrong".
        // I will fix this by calculating it if it's undefined, OR better, I will check if I can add it to handleAnswerSelection.
        // However, I am replacing saveStats here. I can't easily change handleAnswerSelection in the same replace block if they are far apart.
        // I'll calculate it: const wrong = (this.config.gameState.wrong !== undefined) ? this.config.gameState.wrong : (sessionDuration > 0 ? (totalQs - gameCorrect) : 0); 
        // Wait, if not final, wrong might be undefined.
        // Let's look at `this.config.playerStats.totalWrong`. This is global.
        
        // I will use a local calculation:
        // totalQuestions in match so far = currentQuestionIndex + (finished ? 0 : 1? no).
        // Let's rely on what the user PROMPT said: "this.config.gameState.wrong".
        // If it's missing, it will be undefined.
        // I will add: this.config.gameState.wrong = (this.config.gameState.wrong || 0); in the method to be safe.
        
        const diffKey = this.config.currentDifficulty; 
        
        // 1. Берем текущий JSON сложности из конфига (Base)
        let diffStats = this.config.game_stats[diffKey] || { best_score:0, total_correct:0, total_games:0, total_time:0 };

        // 2. Обновляем цифры в памяти (Create updated copy for DB)
        const updatedDiffStats = {
            ...diffStats,
            total_correct: diffStats.total_correct + gameCorrect,
            total_games: diffStats.total_games + (isFinal ? 1 : 0),
            total_time: diffStats.total_time + sessionDuration,
            best_score: Math.max(diffStats.best_score, gameCorrect)
        };

        // HISTORY LOGIC
        let history = this.config.user.recent_games || [];
        
        // Only add to history if it's a "Final" save (end of game) or maybe user wants it every time?
        // Usually history is one entry per game. 
        // The prompt says "In saveStats... Form matchRecord... unshift... slice...".
        // If I call saveStats after every question, I'll flood the history with the SAME game.
        // I should ONLY add to history if (isFinal).
        
        if (isFinal) {
            const matchRecord = {
                d: this.config.currentDifficulty,
                s: this.config.gameState.score,
                w: this.config.gameState.wrong || 0, // Fallback if not tracked
                t: this.config.gameState.questions.length,
                ts: Date.now()
            };
            history.unshift(matchRecord);
            history = history.slice(0, 10);
            this.config.user.recent_games = history;
        }

        // Global Stats Updates
        const globalBase = this.config.game_stats.global;
        const updates = {
            total_correct: globalBase.total_correct + gameCorrect,
            total_wrong: (this.config.user_profile?.total_wrong || 0) + (this.config.gameState.wrong || 0),
            total_games: globalBase.total_games + (isFinal ? 1 : 0),
            total_time: globalBase.total_time + sessionDuration,
            best_score: Math.max(globalBase.best_score, gameCorrect),
            [`stats_${diffKey}`]: updatedDiffStats,
            recent_games: history // Send history
        };

        // 3. Отправляем в БД
        const { error } = await supabaseClient
            .from('profiles')
            .update(updates)
            .eq('id', this.config.user.id);
            
        if (error) {
            console.error('SaveStats Error:', error);
        } else if (isFinal) {
            this.config.game_stats[diffKey] = updatedDiffStats;
            this.config.game_stats.global = {
                total_correct: updates.total_correct,
                best_score: updates.best_score,
                total_games: updates.total_games,
                total_time: updates.total_time
            };
        }
    }

    formatTime(seconds) {
        if (!seconds) return '0с';
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        if (m > 0) return `${m}м ${s}с`;
        return `${s}с`;
    }

    // === v10.0 LEADERBOARD ===
    async openLeaderboard() {
        if (!this.config.user.id) {
            this.showNotification(this.getLocalizedText('leaderboardLoginReq') || "Войдите для просмотра", "info");
            this.openLoginModal();
            return;
        }

        this.openModal('leaderboardModal');
        const table = document.getElementById('leaderboardTable');
        const loader = document.getElementById('leaderboardLoading');
        const footer = document.getElementById('leaderboardFooter');
        
        table.innerHTML = '';
        loader.classList.remove('hidden');
        footer.classList.add('hidden');
        document.querySelector('.leaderboard-tabs').style.display = 'none';

        // Запрос: .select('nickname, login, total_correct, total_time, best_score, total_games')
        const { data, error } = await supabaseClient
            .from('profiles')
            .select('nickname, login, total_correct, total_time, best_score, total_games')
            .order('total_correct', { ascending: false })
            .limit(100);

        loader.classList.add('hidden');

        if (error) {
            table.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#ef4444;">Ошибка загрузки</td></tr>`;
            return;
        }

        // Setup Header columns match
        const headerRow = document.querySelector('.leaderboard-header-row');
        if (headerRow) {
            headerRow.style.gridTemplateColumns = '0.5fr 2fr 1fr 1fr 1fr 1fr';
            headerRow.innerHTML = `
                <div class="lb-col">#</div>
                <div class="lb-col" data-i18n="player">Игрок</div>
                <div class="lb-col" data-i18n="correctShort">Верно</div>
                <div class="lb-col" data-i18n="time">Время</div>
                <div class="lb-col" data-i18n="bestScore">Рекорд</div>
                <div class="lb-col" data-i18n="totalGames">Игры</div>
            `;
        }
        
        // ... (existing leaderboard logic) ...
        // Secure Rendering (prevent XSS)
        data.forEach((entry, idx) => {
            const tr = document.createElement('tr');
            
            // Rank
            let rankClass = 'rank-other';
            let iconText = (idx + 1).toString();
            if (idx === 0) { rankClass = 'rank-1'; iconText = '👑'; }
            else if (idx === 1) { rankClass = 'rank-2'; iconText = '🥈'; }
            else if (idx === 2) { rankClass = 'rank-3'; iconText = '🥉'; }

            const isMe = (entry.login === this.config.user.login);
            if (isMe) {
                tr.classList.add('my-rank');
                if (footer) {
                    footer.classList.remove('hidden');
                    document.getElementById('myRank').textContent = '#' + (idx + 1);
                    document.getElementById('myScore').textContent = entry.best_score;
                    document.getElementById('myCorrect').textContent = entry.total_correct;
                    document.getElementById('myNickname').textContent = entry.nickname || entry.login;
                    document.getElementById('myLogin').textContent = '@' + entry.login;
                }
            }

            // --- Safe Cell Creation ---
            const createCell = (cls, content, isHtml = false) => {
                const td = document.createElement('td');
                td.className = `lb-col ${cls}`;
                if (isHtml) td.innerHTML = content; else td.textContent = content;
                return td;
            };

            // Rank Cell
            const tdRank = createCell(`rank ${rankClass}`, iconText); // Icon is safe unicode
            tr.appendChild(tdRank);

            // Player Cell
            const tdPlayer = document.createElement('td');
            tdPlayer.className = 'lb-col player';
            const spanName = document.createElement('span');
            spanName.className = 'lb-name';
            spanName.textContent = entry.nickname || entry.login;
            const smallLogin = document.createElement('small');
            smallLogin.className = 'lb-login';
            smallLogin.textContent = '@' + entry.login;
            
            tdPlayer.appendChild(spanName);
            tdPlayer.appendChild(smallLogin);
            tr.appendChild(tdPlayer);

            // Other Cells
            tr.appendChild(createCell('score', entry.best_score));
            tr.appendChild(createCell('time', this.formatTime(entry.total_time)));
            tr.appendChild(createCell('answers', entry.total_correct));
            tr.appendChild(createCell('answers', entry.total_games));

            table.appendChild(tr);
        });
    }

    // === v11.1 HISTORY UI ===
    showHistory() {
        this.openModal('historyModal');
        const container = document.getElementById('historyList');
        container.innerHTML = '';

        const history = this.config.user.recent_games || [];

        if (history.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding: 20px; color: #64748b;">Нет сыгранных матчей</div>`;
            return;
        }

        history.forEach(game => {
            const date = new Date(game.ts).toLocaleDateString();
            const wrong = game.w !== undefined ? game.w : '-';
            
            const diffColors = {
                easy: '#4ade80',
                normal: '#4cc9f0',
                hard: '#f59e0b',
                extreme: '#ef4444'
            };
            const color = diffColors[game.d] || '#ccc';

            const div = document.createElement('div');
            div.className = 'history-item';
            
            // Safe DOM Construction
            const infoDiv = document.createElement('div');
            infoDiv.className = 'history-info';

            const dot = document.createElement('span');
            dot.className = 'diff-dot';
            dot.style.background = color;
            dot.style.boxShadow = `0 0 5px ${color}`;
            
            const textSpan = document.createElement('span');
            // Using textContent for mixed content carefully, or constructing children
            // "Верно: X | Ошибок: Y"
            textSpan.appendChild(document.createTextNode(`Верно: ${game.s} | Ошибок: `));
            
            const wrongSpan = document.createElement('span');
            wrongSpan.className = 'stat-wrong';
            wrongSpan.textContent = wrong;
            textSpan.appendChild(wrongSpan);

            infoDiv.appendChild(dot);
            infoDiv.appendChild(textSpan);

            const dateDiv = document.createElement('div');
            dateDiv.className = 'history-date';
            dateDiv.textContent = date;

            div.appendChild(infoDiv);
            div.appendChild(dateDiv);

            container.appendChild(div);
        });

        const closeBtn = document.getElementById('closeHistoryBtn');
        if (closeBtn) {
            closeBtn.onclick = () => {
                this.closeModal('historyModal');
                this.openStatsModal(); // Back to profile
            };
        }
    }



    loadLeaderboard(diffKey) {
        // Deprecated in v10.1, redirection to openLeaderboard handled by openLeaderboard() logic
    }

    updateStickyFooter(rank, diffKey) {
        const footer = document.getElementById('leaderboardFooter');
        footer.classList.remove('hidden');
        
        const myRankEl = document.getElementById('myRank');
        const myNickEl = document.getElementById('myNickname');
        const myLoginEl = document.getElementById('myLogin');
        const myScoreEl = document.getElementById('myScore');
        const myCorrectEl = document.getElementById('myCorrect');
        
        // Get my stats for this difficulty
        const myStats = this.config.gameStats?.[diffKey] || { score: 0, time: 0, correct: 0 };
        
        myNickEl.textContent = this.config.user.nickname;
        myLoginEl.textContent = '@' + this.config.user.login;
        myScoreEl.textContent = myStats.score;
        myCorrectEl.textContent = myStats.correct || '0'; // Or Time? Using correct column for now.
        
        if (rank && rank > 0) {
            myRankEl.textContent = rank;
            myRankEl.style.color = '#4ade80';
        } else {
            myRankEl.textContent = '>100';
            myRankEl.style.color = '#64748b';
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
