/**
 * GeoGator Core
 * Current Version: v13.2
 * See CHANGELOG.md for full history.
 */

const SUPABASE_URL = "https://tdlhwokrmuyxsdleepht.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkbGh3b2tybXV5eHNkbGVlcGh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MDc3ODAsImV4cCI6MjA4NDk4Mzc4MH0.RlfUmejx2ywHNcFofZM4mNE8nIw6qxaTNzqxmf4N4-4";
const APP_VERSION = "v13.5";

const THE_MOST_QUESTIONS = [
    { id: '1', question: 'Самая высокая гора в мире', answer: 'Эверест', fact: 'Высота 8849 м. Находится в Гималаях.' },
    { id: '2', question: 'Самая низкая точка суши', answer: 'Мертвое море', fact: '430 м ниже уровня моря.' },
    { id: '3', question: 'Самая большая жаркая пустыня', answer: 'Сахара', fact: 'Площадь около 9.2 млн км².' },
    { id: '4', question: 'Самая полноводная река', answer: 'Амазонка', fact: 'Бассейн охватывает 7 млн км².' },
    { id: '5', question: 'Самая длинная река', answer: 'Нил', fact: 'Длина около 6650 км.' },
    { id: '6', question: 'Самый высокий водопад', answer: 'Анхель', fact: 'Высота 979 м (Венесуэла).' },
    { id: '7', question: 'Самое высокое здание', answer: 'Бурдж Халифа', fact: 'Высота 828 м (Дубай).' },
    { id: '8', question: 'Самая маленькая страна', answer: 'Ватикан', fact: 'Площадь всего 0.49 км².' },
    { id: '9', question: 'Самая большая страна', answer: 'Россия', fact: 'Площадь 17.1 млн км².' },
    { id: '10', question: 'Самое глубокое озеро', answer: 'Байкал', fact: 'Глубина 1642 м.' },
    { id: '11', question: 'Самое большое озеро (по площади)', answer: 'Каспийское море', fact: 'Площадь 371 000 км².' },
    { id: '12', question: 'Самый большой остров', answer: 'Гренландия', fact: 'Площадь 2.16 млн км².' },
    { id: '13', question: 'Самый населенный город', answer: 'Токио', fact: 'Население агломерации > 37 млн.' },
    { id: '14', question: 'Самое глубокое место океана', answer: 'Марианская впадина', fact: 'Глубина около 11 000 м.' },
    { id: '15', question: 'Самое холодное место на Земле', answer: 'Станция Восток', fact: 'Рекорд: -89.2°C (Антарктида).' },
    { id: '16', question: 'Самое сухое место (не полярное)', answer: 'Атакама', fact: 'В некоторых местах дождей не было столетиями.' },
    { id: '17', question: 'Точка, наиболее удаленная от центра Земли', answer: 'Чимборасо', fact: 'Из-за выпуклости Земли выше Эвереста.' },
    { id: '18', question: 'Самая высокая гора от основания', answer: 'Мауна-Кеа', fact: 'Более 10 000 м от дна океана.' },
    { id: '19', question: 'Самый холодный населенный пункт', answer: 'Оймякон', fact: 'Температуры опускаются ниже -60°C.' },
    { id: '20', question: 'Самый высокогорный город', answer: 'Ла-Ринконада', fact: 'Высота 5100 м (Перу).' },
    { id: '21', question: 'Самый высокий вулкан Африки', answer: 'Килиманджаро', fact: '5895 м над уровнем моря.' },
    { id: '22', question: 'Самое объёмное дерево', answer: 'Генерал Шерман', fact: 'Секвойядендрон в Калифорнии.' },
    { id: '23', question: 'Самый глубокий каньон', answer: 'Гранд-Каньон', fact: 'Глубина до 1800 м.' },
    { id: '24', question: 'Самый большой коралловый риф', answer: 'ББ Риф', fact: 'Длина более 2500 км.' },
    { id: '25', question: 'Самый изолированный архипелаг', answer: 'Гавайи', fact: 'В центре Тихого океана.' },
    { id: '26', question: 'Одно из самых жарких мест', answer: 'Эль-Азизия', fact: 'Регистрировалось +58°C.' },
    { id: '27', question: 'Самое высокогорное судоходное озеро', answer: 'Титикака', fact: 'Высота 3812 м.' },
    { id: '28', question: 'Самый широкий водопад', answer: 'Виктория', fact: 'Ширина около 1700 м.' },
    { id: '29', question: 'Самый большой солончак', answer: 'Салар-де-Уюни', fact: 'Более 10 000 км² соли.' },
    { id: '30', question: 'Первый национальный парк', answer: 'Йеллоустоун', fact: 'Основан в 1872 году.' }
];

const DIFFICULTY_CONFIG = {
    easy: { answers: 4, timers: [30, 40, 50, 60], color: '#4ade80', showCorrect: true, zoom: true, showLabels: true, label: 'diffEasy' },
    normal: { answers: 6, timers: [15, 20, 25, 30], color: '#4cc9f0', showCorrect: true, zoom: true, showLabels: true, label: 'diffNormal' },
    hard: { answers: 8, timers: [5, 8, 12, 15], color: '#f59e0b', showCorrect: false, zoom: true, showLabels: false, label: 'diffHard' },
    extreme: { answers: 8, timers: [2, 3, 4, 5], color: '#ef4444', showCorrect: false, zoom: false, showLabels: false, label: 'diffExtreme' }
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
                wrong: 0,
                currentQuestionIndex: 0,
                questions: [],
                startTime: null,
                gameStartTime: null,
                timerInterval: null,
                map: null,
                tileLayer: null,
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
        // console.log(`GeoGator ${APP_VERSION} initialized with Supabase`); // Clean up
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

        // 3. ПРОВЕРКА БАНА (Feature: Ban System)
        if (profile.is_banned === true) {
            alert("Ваш аккаунт заблокирован администратором.");
            await supabaseClient.auth.signOut();
            localStorage.clear();
            location.reload();
            return;
        }

        // 4. ЕСЛИ ВСЁ ОК -> ЗАГРУЖАЕМ
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
            easy: profile.stat_easy || {},
            normal: profile.stat_normal || {},
            hard: profile.stat_hard || {},
            extreme: profile.stat_extreme || {}
        };

        // 5. ROLE CHECK (v13.3 Audit Fix: Safe Check)
        // 5. ROLE CHECK (v13.3)
        const roleBtn = document.getElementById('rightMenuBtn');
        if (roleBtn) {
            // Check if role exists and is NOT 'user' (default)
            if (profile.role && typeof profile.role === 'string' && profile.role !== 'user') {
                roleBtn.classList.remove('hidden');
                roleBtn.style.display = 'flex';
            } else {
                roleBtn.classList.add('hidden');
                roleBtn.style.display = 'none';
            }
        }

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
        this.config.settings.language = 'ru'; // Force Russian language default
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

        // --- ROLE MENU (v13.2) ---
        // --- RIGHT MENU (v13.3) ---
        const rightMenuBtn = document.getElementById('rightMenuBtn');
        const rightMenuDropdown = document.getElementById('rightMenuDropdown');
        
        if (rightMenuBtn && rightMenuDropdown) {
            rightMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                rightMenuDropdown.classList.toggle('hidden');
            });

            // Hide menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!rightMenuBtn.contains(e.target) && !rightMenuDropdown.contains(e.target)) {
                    rightMenuDropdown.classList.add('hidden');
                }
            });

            // Handlers for menu items
            rightMenuDropdown.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', () => {
                    rightMenuDropdown.classList.add('hidden');
                    const action = btn.dataset.action;
                    
                    if (action === 'admin' || action === 'teacher' || action === 'tester') {
                        this.openRoleDashboard(action);
                    }
                });
            });
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

        // 1. Создание Auth User с передачей login И nickname в metadata для триггера
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: pass,
            options: {
                data: {
                data: {
                    login: login,    // Login for logic (unique)
                    nickname: nick,   // Nickname for display (max 15 chars)
                    class_name: null // Init val
                }
            }
        }});

        if (error) {
            this.showError(errorDiv, error.message);
            return;
        }

        if (data.user) {
            // v13.3 Fix: Strict Class/Letter Validation & formatting
            const classNum = document.getElementById('regClassNumber').value;
            const classLet = document.getElementById('regClassLetter').value;
            let fullClass = null;

            // Only form string if BOTH are selected to avoid "5-undefined" or "null-A"
            if (classNum && classLet && classNum !== "" && classLet !== "") {
                 fullClass = `${classNum}-${classLet}`; // e.g., "5-A"
            } 
            // If only one is selected, we might want to warn, but for now we'll just ignore partials 
            // or we could force user to select both. Current UI doesn't force it, so null is safer than bad data.

            if (fullClass) {
                await supabaseClient
                    .from('profiles')
                    .update({ class_name: fullClass })
                    .eq('id', data.user.id);
            }

            // 2. Создание профиля делегировано DB Trigger (handle_new_user)
            // Мы больше не делаем ручной insert, чтобы избежать Race Condition/Error 500
            
            this.showNotification(this.getLocalizedText('registerSuccess'), "success");
            this.closeRegisterModal();
            this.openLoginModal();
            document.getElementById('loginUsernameInput').value = login;
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

    /**
     * Viewer Mode (v13.2)
     * Opens a read-only view of another user's profile.
     * @param {string} targetUserId 
     */
    async viewUserProfile(targetUserId) {
        // 1. Fetch Target Profile
        const { data: profile, error } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', targetUserId)
            .single();

        if (error || !profile) {
            alert("Ошибка загрузки профиля: " + (error?.message || "Не найден"));
            return;
        }

        // 2. Prepare Data (Without breaking current session)
        // We temporarily hijack the config for UI Update, but strictly for the modal
        // Ideally, we should refactor updateProfileStatsUI to accept a data object,
        // but to save time/complexity, we'll manually populate the modal elements.

        this.closeAllModals();
        const modal = document.getElementById('profileModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            modal.classList.add('viewer-mode-indicator'); // Add visual cue

            const dNick = document.getElementById('profileDisplayNickname');
            const dLogin = document.getElementById('profileDisplayLogin');
            
            // Set Text
            if (dNick) dNick.textContent = profile.nickname || "Unknown";
            if (dLogin) dLogin.textContent = `(Просмотр: ${profile.login || '?'})`;

            // Hide Logout, Show Deep Stats
            document.getElementById('logoutBtn')?.classList.add('hidden');
            document.getElementById('viewDeepStatsBtn')?.classList.remove('hidden');

            // Populate Stats (Manually, since updateProfileStatsUI uses this.config.user)
            // Or better: Create a temporary stats viewer logic here
            const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
            
            // We use the same IDs as the real profile, which is fine since the modal is open
            // But we must be careful not to persist this in this.config
            
            // Full Stats (Use what's available in profile)
            setText('statFullGames', profile.total_games || 0);
            setText('statFullCorrect', profile.total_correct || 0);
            setText('statFullWrong', (profile.total_games * 20) - (profile.total_correct || 0)); // Approx validation

             // Handle "Deep Stats" button click for THIS user
             const dsBtn = document.getElementById('viewDeepStatsBtn');
             // Clear previous listeners to avoid stacking
             const newDsBtn = dsBtn.cloneNode(true);
             dsBtn.parentNode.replaceChild(newDsBtn, dsBtn);
             
             newDsBtn.onclick = () => {
                 alert("Детальная статистика этого пользователя (TBD)");
             };
             
             // Ensure Logout is HIDDEN in viewer mode
             document.getElementById('logoutBtn')?.classList.add('hidden');
        }
    }

    closeStatsModal() {
        const modal = document.getElementById('profileModal');
        if (modal) {
            modal.classList.add('hidden');
            
            // v13.3 Audit Fix: Reset viewer mode correctly
            modal.classList.remove('viewer-mode-indicator'); 
            
            // Reset Buttons: 
            // "Deep Stats" -> ALWAYS Hidden (it's only for viewer)
            document.getElementById('viewDeepStatsBtn')?.classList.add('hidden');

            // "Logout" -> VISIBLE ONLY IF I AM LOGGED IN!
            // Do NOT show logout if I am a guest viewing a profile.
            const logoutBtn = document.getElementById('logoutBtn');
            if (this.config.user.id) {
                logoutBtn?.classList.remove('hidden');
            } else {
                logoutBtn?.classList.add('hidden');
            }
            
            // Reset Text to Current User (if logged in, otherwise Guest default)
             if (this.config.user.id) {
                const dNick = document.getElementById('profileDisplayNickname');
                const dLogin = document.getElementById('profileDisplayLogin');
                if (dNick) dNick.textContent = this.config.user.nickname;
                if (dLogin) dLogin.textContent = '@' + this.config.user.login;
            } else {
                 // Reset to Guest if we were viewing someone as a Guest
                const dNick = document.getElementById('profileDisplayNickname');
                const dLogin = document.getElementById('profileDisplayLogin');
                const guestText = this.getLocalizedText('guest');
                if (dNick) dNick.textContent = guestText;
                if (dLogin) dLogin.textContent = '@guest';
            }

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
            'closeLeaderboardModal': 'leaderboardModal',
            'closeHistoryModal': 'historyModal',
            'closeRoleModal': 'roleModal'
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

        // Обновляем стиль карты
        this.updateMapTiles();

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
        this.config.gameState.sessionStart = Date.now();
        this.showScreen('gameScreen');
        this.showScreen('gameScreen');
        
        // LAYER MANAGEMENT
        // LAYER MANAGEMENT handled in initMap -> addCountryBoundaries flow to avoid race conditions
        
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
        
        if (this.config.currentGame.mode === 'theMost') {
            // "The Most" mode logic
            const shuffled = this.shuffleArray(THE_MOST_QUESTIONS);
            this.config.gameState.questions = shuffled.slice(0, 30); // Use all or limit? Prompt says 30 items total. Game usually 10/20.
            // Adjust to user setting if 'all' or specific count?
            // Prompt says: "new mode... 30 objects... If mode 'theMost', use questions from array".
            // Let's fallback to user count limiting
            if (questionCount !== 'all') {
                 this.config.gameState.questions = this.config.gameState.questions.slice(0, questionCount);
            }
        } else {
            // Standard country logic
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
        }
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

    showTheMostQuestion(q) {
        this.toggleUIElements({ flag: false, options: false, hint: false });
        document.getElementById('questionText').textContent = q.question;
        // No auto-zoom
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

            // v13.5 Debug Highlight
            if (this.config.debugMode && ans === correct) {
                btn.classList.add('debug-correct');
            }

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

        this.highlightCorrectCountry(q.country);

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

    updateMapTiles() {
        if (!this.config.gameState.map) return;
        
        const currentDiff = this.config.currentDifficulty;
        // Default to showing labels if config is missing (safety), but follow config if present
        const showLabels = DIFFICULTY_CONFIG[currentDiff]?.showLabels; 
        
        const type = showLabels ? 'dark_all' : 'dark_nolabels';
        const tileUrl = `https://{s}.basemaps.cartocdn.com/${type}/{z}/{x}/{y}{r}.png`;

        if (this.config.gameState.tileLayer) {
            this.config.gameState.map.removeLayer(this.config.gameState.tileLayer);
        }

        this.config.gameState.tileLayer = L.tileLayer(tileUrl, { subdomains: 'abcd', maxZoom: 8 });
        this.config.gameState.tileLayer.addTo(this.config.gameState.map);
        this.config.gameState.tileLayer.bringToBack(); // Ensure tiles are background
    }

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

        this.config.gameState.map = map;
        this.updateMapTiles();

        // Защита загрузки GeoJSON
        try {
            const response = await fetch('countries.geo.json');
            if (!response.ok) throw new Error("Failed to load GeoJSON");
            const data = await response.json();
            this.addCountryBoundaries(data);
        } catch (error) {
            console.warn("GeoJSON error: границы стран не загружены, но игра продолжается.", error);
        }
    }

    addCountryBoundaries(data) {
        const map = this.config.gameState.map;
        if (!map) return;
        
        const layer = L.geoJson(data, {
            style: { fillColor: 'transparent', weight: 1.5, opacity: 0.6, color: '#4cc9f0', fillOpacity: 0.1, dashArray: '3, 3' },
            onEachFeature: (f, l) => this.setupCountryInteractivity(f, l, map)
        });
        
        this.config.gameState.boundariesLayer = layer;

        // Condition: Only add boundaries if NOT in 'The Most' mode
        if (this.config.currentGame?.mode !== 'theMost') {
            layer.addTo(map);
        }

        // Try to load 'The Most' layer
        this.loadMostLayer();
    }

    async loadMostLayer() {
        try {
            const response = await fetch('./the_most.geo.json');
            if (!response.ok) return;
            const data = await response.json();
            this.addMostObjects(data);
        } catch (e) {
            console.warn("The Most layer load failed", e);
        }
    }

    addMostObjects(data) {
        if (!this.config.gameState.map) return;

        const layer = L.geoJson(data, {
             pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, {
                    radius: 12,
                    fillColor: '#FFD700', // Gold
                    color: '#fff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.9
                });
            },
            onEachFeature: (feature, layer) => {
                layer.bindTooltip(feature.properties.name, { direction: 'top', offset: [0, -10] });
                // Hover effect
                // Hover effect
                layer.on('mouseover', () => { 
                    if (this.config.currentGame?.mode === 'theMost') layer.setRadius(16); 
                });
                layer.on('mouseout', () => { 
                    if (this.config.currentGame?.mode === 'theMost') layer.setRadius(12); 
                });
                // Click
                layer.on('click', (e) => {
                    if (this.config.currentGame?.mode === 'theMost') {
                         L.DomEvent.stop(e);
                         this.handleMostObjectClick(feature.properties.id, layer);
                     }
                });
            }
        });
        
        this.config.gameState.mostLayer = layer;

        // Condition: Add IMMEDIATELY if in 'The Most' mode
        if (this.config.currentGame?.mode === 'theMost') {
            layer.addTo(this.config.gameState.map);
            console.log("The Most layer added to map");
        }
    }

    handleMostObjectClick(id, layer) {
        if (this.config.gameState.isInputBlocked) return;
        this.config.gameState.isInputBlocked = true;
        this.stopTimer();

        const q = this.config.gameState.questions[this.config.gameState.currentQuestionIndex];
        const correctId = q.id;

        if (id === correctId) {
            // Correct
            layer.setStyle({ fillColor: '#4ade80', color: '#fff' });
            this.config.gameState.score++;
            this.config.playerStats.totalCorrect++;
            this.showNotification(this.getLocalizedText('correct'), 'success');
        } else {
             // Wrong
            layer.setStyle({ fillColor: '#ef4444', color: '#fff' });
            this.config.playerStats.totalWrong = (this.config.playerStats.totalWrong || 0) + 1;
            this.showNotification(this.getLocalizedText('wrong'), 'error');

            // Find correct layer to fly to
            this.config.gameState.mostLayer.eachLayer(l => {
                if (l.feature.properties.id === correctId) {
                     l.setStyle({ fillColor: '#4ade80', radius: 18 });
                     // Fly to correct
                     this.config.gameState.map.flyTo(l.getLatLng(), 5, { duration: 1.5 });
                }
            });
            
            if (q.fact) {
                 setTimeout(() => this.showNotification(q.fact, 'info'), 1500);
            }
        }

        this.saveLocalProgress();
        setTimeout(() => {
            // Reset styles
            this.config.gameState.mostLayer.eachLayer(l => {
                l.setStyle({ fillColor: '#FFD700', radius: 12 });
            });
            this.nextQuestion();
        }, 3000); // Longer delay to read fact
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
        this.saveLocalProgress();
        setTimeout(() => this.nextQuestion(), 1500);
    }

    highlightCorrectCountry(name) {
        // Блокируем зум для режима "Самый-самый"
        if (this.config.currentGame.mode === 'theMost') return;

        if (!this.config.gameState.boundariesLayer) return;
        this.config.gameState.boundariesLayer.eachLayer(layer => {
            const iso = layer.feature.properties.ISO_A2 || layer.feature.properties.ISO_A2_EH;
            const adm3 = layer.feature.properties.ADM0_A3;
            if (window.GeoCountries?.getCountryNameByCode(iso, adm3) === name) {
                layer.setStyle({ weight: 3, color: '#4ade80', fillColor: '#4ade80', fillOpacity: 0.4, dashArray: '' });
                
                const difficulty = this.config.currentGame?.difficulty || 'normal';
                if (DIFFICULTY_CONFIG[difficulty]?.zoom !== false) {
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
        this.saveLocalProgress();
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

        // Map internal modes to DB Keys
        const modeMap = {
            'capitalByCountry': 'GuessCapital',
            'countryByCapital': 'FoundOnMap',
            'countryByCapitalText': 'GuessCountry',
            'theMost': 'MostMost'
        };
        const dbMode = modeMap[this.config.currentGame.mode] || this.config.currentGame.mode;
        
        // Calculate correct/wrong for this session
        // Note: gameState.score is usually correct count.
        const correct = this.config.gameState.score;
        // wrong is calculated as (Questions Passed - Correct)
        const wrong = (this.config.gameState.currentQuestionIndex + 1) - correct;

        this.saveGameStats(dbMode, this.config.currentDifficulty, correct, wrong, duration);
        this.saveLocalProgress(duration);
        this.showResults();
    }

    /**
     * Alias for saving progress (Backward Compatibility v12.1)
     */
    saveStats() {
        this.saveLocalProgress();
    }

    /**
     * Сохраняет локальный прогресс (localStorage) для восстановления при сбое.
     */
    saveLocalProgress(duration = 0) {
        if (duration > 0) {
            this.config.playerStats.totalTime = (this.config.playerStats.totalTime || 0) + duration;
        }
        localStorage.setItem('geoGatorStats', JSON.stringify(this.config.playerStats));
    }

    /**
     * Основная логика сохранения (v12.0)
     * Входные параметры: mode, difficulty, correct, wrong, timeSpent
     */
    async saveGameStats(mode, difficulty, correct, wrong, timeSpent) {
        if (!this.config.user.id) return;

        console.log(`Saving Stats: ${mode} (${difficulty}) C:${correct} W:${wrong} T:${timeSpent}`);

        // 1. Определение целевой колонки (targetColumn)
        // Если режим MostMost -> всегда пишем в stat_normal
        const targetDiff = (mode === 'MostMost') ? 'normal' : difficulty;
        const colName = `stat_${targetDiff}`;

        // 2. Обновление JSON (Read -> Modify -> Write)
        // Получаем текущий объект сложности
        const baseStats = this.config.game_stats[targetDiff] || {};
        
        // Внутри JSON находим объект режима или создаем
        const modeStats = baseStats[mode] || { correct: 0, wrong: 0, time: 0 };

        // Инкрементируем значения (Delta Logic)
        modeStats.correct += correct;
        modeStats.wrong += wrong;
        modeStats.time += timeSpent;

        // Сохраняем обновленный объект режима обратно в структуру
        baseStats[mode] = modeStats;
        this.config.game_stats[targetDiff] = baseStats;

        // Глобальный счетчик (Optional but requested)
        this.config.game_stats.global.total_correct = (this.config.game_stats.global.total_correct || 0) + correct;

        // 3. История (recent_games)
        const newGame = {
            mode: mode,
            difficulty: targetDiff, // Store the difficulty it was saved under? Or original? Prompt says "difficulty".
            correct: correct,
            wrong: wrong,
            time: timeSpent,
            date: new Date()
        };

        const recent = this.config.user.recent_games || [];
        recent.unshift(newGame);
        // Обрежь массив, чтобы хранить только последние 50 игр
        const trimmedRecent = recent.slice(0, 50);
        this.config.user.recent_games = trimmedRecent;

        // 4. Отправка в Supabase
        const updates = {
            [colName]: baseStats, // Обновляем всю колонку JSONB
            recent_games: trimmedRecent,
            total_correct: this.config.game_stats.global.total_correct
        };

        const { error } = await supabaseClient
            .from('profiles')
            .update(updates)
            .eq('id', this.config.user.id);

        if (error) {
            console.error('DATABASE ERROR:', error.message);
            this.showNotification('Ошибка сохранения: ' + error.message, 'error');
        } else {
            console.log('Stats saved successfully');
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
    /**
     * @param {string|null} classNameFilter - If set (e.g. "5-A"), filters by class_name
     */
    async openLeaderboard(classNameFilter = null) {
        if (!this.config.user.id) {
            this.showNotification(this.getLocalizedText('leaderboardLoginReq') || "Войдите для просмотра", "info");
            this.openLoginModal();
            return;
        }

        this.openModal('leaderboardModal');
        const table = document.getElementById('leaderboardTable');
        const loader = document.getElementById('leaderboardLoading');
        const footer = document.getElementById('leaderboardFooter');
        
        // Update Title dynamically
        const titleEl = document.querySelector('.leaderboard-title span');
        if (titleEl) {
            if (classNameFilter) {
                titleEl.innerText = `Класс ${classNameFilter}`;
                // Hide tabs when filtering by class (optional, but logical since tabs are for global difficulty)
                // But user might want to see who is best in class at "Hard"... 
                // For now, let's keep tabs but strictly filter the query.
            } else {
                titleEl.innerText = this.getLocalizedText('globalLeaderboard') || "Таблица лидеров";
            }
        }

        table.innerHTML = '';
        loader.classList.remove('hidden');
        footer.classList.add('hidden');
        
        // Hide difficulty tabs if showing class specific leaderboard (simplification for "Teacher" view)
        const tabs = document.querySelector('.leaderboard-tabs');
        if (classNameFilter) {
             if(tabs) tabs.style.display = 'none';
        } else {
             if(tabs) tabs.style.display = 'flex';
        }

        let query = supabaseClient
            .from('profiles')
            .select('nickname, login, total_correct, total_time, best_score, total_games, class_name') // added class_name
            .eq('is_banned', false);
            
        if (classNameFilter) {
            query = query.eq('class_name', classNameFilter);
        }

        // Default sorting (can be improved to respect active tab difficulty if not class filtered)
        // For Class Leaderboard, usually "Best Score" or "Total Correct" matters most.
        query = query
            .order('total_correct', { ascending: false })
            .limit(100);

        const { data, error } = await query;

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

        // Apply Theme
        if (this.config.settings.theme) {
            this.changeTheme(this.config.settings.theme);
        } else {
            this.changeTheme('dark'); // Default
        }
    }

    changeTheme(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
        this.config.settings.theme = themeName;
        
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeName);
        });

        // Dynamic CSS Variables
        const root = document.documentElement.style;
        if (themeName === 'light') {
            root.setProperty('--bg-color', '#f8fafc');
            root.setProperty('--card-bg-color', '#ffffff');
            root.setProperty('--text-color', '#0f172a');
            root.setProperty('--primary-color', '#4f46e5');
            root.setProperty('--accent-color', '#0ea5e9');
        } else {
            // Dark / Default (Deep Blue)
            root.removeProperty('--bg-color');
            root.removeProperty('--card-bg-color');
            root.removeProperty('--text-color');
            root.removeProperty('--primary-color');
            root.removeProperty('--accent-color');
        }
        this.saveSettings();
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

    // === ROLE DASHBOARDS (v13.5) ===
    openRoleDashboard(role) {
        this.openModal('roleModal');
        const content = document.getElementById('roleModalContent');
        const title = document.getElementById('roleModalTitle');
        content.innerHTML = ''; // Clear previous

        if (role === 'tester') {
            title.textContent = "Панель Тестера";
            title.style.color = "#a855f7"; // Purple

            // 1. Debug Mode Toggle
            const toggleBlock = document.createElement('div');
            toggleBlock.className = 'role-block';
            toggleBlock.innerHTML = `
                <div class="toggle-container">
                    <span class="toggle-label">Подсветка ответов</span>
                    <input type="checkbox" id="debugToggle" class="toggle-switch" ${this.config.debugMode ? 'checked' : ''}>
                </div>
                <div class="toggle-container" style="margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
                    <span class="toggle-label">Расширить настройки</span>
                    <input type="checkbox" id="settingsToggle" class="toggle-switch">
                </div>
            `;
            content.appendChild(toggleBlock);

            setTimeout(() => {
                // Debug Toggle
                document.getElementById('debugToggle')?.addEventListener('change', (e) => {
                    this.config.debugMode = e.target.checked;
                    this.showNotification(`Debug Mode: ${e.target.checked ? 'ON' : 'OFF'}`, 'info');
                });

                // Settings Toggle
                const sToggle = document.getElementById('settingsToggle');
                // Check if already unlocked (naive check: is first section visible?)
                const langSection = document.querySelector('.settings-section');
                if (langSection && langSection.style.display !== 'none') {
                    sToggle.checked = true;
                }

                sToggle?.addEventListener('change', (e) => {
                    // Target the hidden Language section and Theme section
                    const sections = document.querySelectorAll('.settings-section');
                    // Usually Lang is 0, Vol is 2 (index 1 is now Theme if inserted). 
                    // Let's just toggle ALL sections that are initially hidden or all except the always-visible ones?
                    // Simpler: Just toggle all 'settings-section' display.
                    // But wait, volume might be visible? 
                    // Let's rely on the fact that standard user only sees some. 
                    // Actually, Language was hidden by default in previous chats? 
                    // Let's just toggle them all for now as "Extended" implies showing everything.
                    
                    sections.forEach(s => {
                         s.style.display = e.target.checked ? 'block' : 'none';
                    });
                     
                    this.showNotification(e.target.checked ? "Расширенные настройки включены" : "Настройки скрыты", "success");
                });
            }, 0);
        
        } else if (role === 'teacher') {
            title.textContent = "Мои Классы";
            title.style.color = "#4ade80"; // Green

            const createClassSection = (label, start, end) => {
                const section = document.createElement('div');
                section.className = 'role-block';
                section.innerHTML = `<div class="role-section-title"><i class="fas fa-users"></i> ${label}</div>`;
                
                const grid = document.createElement('div');
                grid.className = 'class-grid';
                
                const letters = ['А', 'Б', 'В', 'Г', 'Д', 'И'];
                for (let i = start; i <= end; i++) {
                    letters.forEach(letter => {
                        const btn = document.createElement('button');
                        btn.className = 'class-btn';
                        btn.textContent = `${i}-${letter}`;
                        btn.onclick = () => {
                            this.closeModal('roleModal');
                            this.openLeaderboard(`${i}-${letter}`);
                        };
                        grid.appendChild(btn);
                    });
                }
                section.appendChild(grid);
                return section;
            };

            content.appendChild(createClassSection("Средняя школа", 5, 9));
            content.appendChild(createClassSection("Старшая школа", 10, 11));

        } else if (role === 'admin') {
            title.textContent = "Панель Администратора";
            title.style.color = "#ef4444"; // Red
            content.innerHTML = `
                <div class="role-block" style="text-align:center; padding: 40px;">
                    <i class="fas fa-tools" style="font-size: 3rem; color: #64748b; margin-bottom: 20px;"></i>
                    <p style="color: #94a3b8;">Этот раздел находится в разработке.</p>
                </div>
            `;
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
