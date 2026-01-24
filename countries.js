// countries.js - Data module for GeoNavigator v6.0 (Updated for Natural Earth Map)

const GeoCountries = {
    // Полный список 195 стран (Русский -> Английский)
    countryNameMapping: {
        // Европа (44 страны)
        "Австрия": "Austria",
        "Албания": "Albania",
        "Андорра": "Andorra",
        "Белоруссия": "Belarus",
        "Бельгия": "Belgium",
        "Болгария": "Bulgaria",
        "Босния и Герцеговина": "Bosnia and Herzegovina",
        "Ватикан": "Vatican City",
        "Великобритания": "United Kingdom",
        "Венгрия": "Hungary",
        "Германия": "Germany",
        "Греция": "Greece",
        "Дания": "Denmark",
        "Ирландия": "Ireland",
        "Исландия": "Iceland",
        "Испания": "Spain",
        "Италия": "Italy",
        "Латвия": "Latvia",
        "Литва": "Lithuania",
        "Лихтенштейн": "Liechtenstein",
        "Люксембург": "Luxembourg",
        "Мальта": "Malta",
        "Молдавия": "Moldova",
        "Монако": "Monaco",
        "Нидерланды": "Netherlands",
        "Норвегия": "Norway",
        "Польша": "Poland",
        "Португалия": "Portugal",
        "Россия": "Russia",
        "Румыния": "Romania",
        "Сан-Марино": "San Marino",
        "Северная Македония": "North Macedonia",
        "Сербия": "Serbia",
        "Словакия": "Slovakia",
        "Словения": "Slovenia",
        "Украина": "Ukraine",
        "Финляндия": "Finland",
        "Франция": "France",
        "Хорватия": "Croatia",
        "Черногория": "Montenegro",
        "Чехия": "Czech Republic",
        "Швейцария": "Switzerland",
        "Швеция": "Sweden",
        "Эстония": "Estonia",
        
        // Азия (48 стран)
        "Азербайджан": "Azerbaijan",
        "Армения": "Armenia",
        "Афганистан": "Afghanistan",
        "Бангладеш": "Bangladesh",
        "Бахрейн": "Bahrain",
        "Бруней": "Brunei",
        "Бутан": "Bhutan",
        "Вьетнам": "Vietnam",
        "Грузия": "Georgia",
        "Израиль": "Israel",
        "Индия": "India",
        "Индонезия": "Indonesia",
        "Иордания": "Jordan",
        "Ирак": "Iraq",
        "Иран": "Iran",
        "Йемен": "Yemen",
        "Казахстан": "Kazakhstan",
        "Камбоджа": "Cambodia",
        "Катар": "Qatar",
        "Кипр": "Cyprus",
        "Киргизия": "Kyrgyzstan",
        "Китай": "China",
        "Кувейт": "Kuwait",
        "Лаос": "Laos",
        "Ливан": "Lebanon",
        "Малайзия": "Malaysia",
        "Мальдивы": "Maldives",
        "Монголия": "Mongolia",
        "Мьянма": "Myanmar",
        "Непал": "Nepal",
        "Объединённые Арабские Эмираты": "United Arab Emirates",
        "Оман": "Oman",
        "Пакистан": "Pakistan",
        "Палестина": "Palestine",
        "Саудовская Аравия": "Saudi Arabia",
        "Сингапур": "Singapore",
        "Сирия": "Syria",
        "Таджикистан": "Tajikistan",
        "Таиланд": "Thailand",
        "Туркменистан": "Turkmenistan",
        "Турция": "Turkey",
        "Узбекистан": "Uzbekistan",
        "Филиппины": "Philippines",
        "Шри-Ланка": "Sri Lanka",
        "Южная Корея": "South Korea",
        "Япония": "Japan",
        "Восточный Тимор": "East Timor",
        "КНДР": "North Korea",
        
        // Африка (54 страны)
        "Алжир": "Algeria",
        "Ангола": "Angola",
        "Бенин": "Benin",
        "Ботсвана": "Botswana",
        "Буркина-Фасо": "Burkina Faso",
        "Бурунди": "Burundi",
        "Габон": "Gabon",
        "Гамбия": "Gambia",
        "Гана": "Ghana",
        "Гвинея": "Guinea",
        "Гвинея-Бисау": "Guinea-Bissau",
        "Джибути": "Djibouti",
        "Египет": "Egypt",
        "Замбия": "Zambia",
        "Зимбабве": "Zimbabwe",
        "Кабо-Верде": "Cape Verde",
        "Камерун": "Cameroon",
        "Кения": "Kenya",
        "Коморы": "Comoros",
        "Конго, Демократическая Республика": "Democratic Republic of the Congo",
        "Конго, Республика": "Republic of the Congo",
        "Кот-д'Ивуар": "Ivory Coast",
        "Лесото": "Lesotho",
        "Либерия": "Liberia",
        "Ливия": "Libya",
        "Маврикий": "Mauritius",
        "Мавритания": "Mauritania",
        "Мадагаскар": "Madagascar",
        "Малawi": "Malawi",
        "Мали": "Mali",
        "Марокко": "Morocco",
        "Мозамбик": "Mozambique",
        "Намибия": "Namibia",
        "Нигер": "Niger",
        "Нигерия": "Nigeria",
        "Руанда": "Rwanda",
        "Сан-Томе и Принсипи": "Sao Tome and Principe",
        "Сейшельские Острова": "Seychelles",
        "Сенегал": "Senegal",
        "Сомали": "Somalia",
        "Судан": "Sudan",
        "Сьерра-Леоне": "Sierra Leone",
        "Танзания": "Tanzania",
        "Того": "Togo",
        "Тунис": "Tunisia",
        "Уганда": "Uganda",
        "Центральноафриканская Республика": "Central African Republic",
        "Чад": "Chad",
        "Экваториальная Гвинея": "Equatorial Guinea",
        "Эритрея": "Eritrea",
        "Эсватини": "Eswatini",
        "Эфиопия": "Ethiopia",
        "ЮАР": "South Africa",
        "Южный Судан": "South Sudan",
        
        // Америка (35 стран)
        "Антигуа и Барбуда": "Antigua and Barbuda",
        "Аргентина": "Argentina",
        "Багамские Острова": "Bahamas",
        "Барбадос": "Barbados",
        "Белиз": "Belize",
        "Боливия": "Bolivia",
        "Бразилия": "Brazil",
        "Венесуэла": "Venezuela",
        "Гаити": "Haiti",
        "Гайана": "Guyana",
        "Гватемала": "Guatemala",
        "Гондурас": "Honduras",
        "Гренада": "Grenada",
        "Доминика": "Dominica",
        "Доминиканская Республика": "Dominican Republic",
        "Канада": "Canada",
        "Колумбия": "Colombia",
        "Коста-Рика": "Costa Rica",
        "Куба": "Cuba",
        "Мексика": "Mexico",
        "Никарагуа": "Nicaragua",
        "Панама": "Panama",
        "Парагвай": "Paraguay",
        "Перу": "Peru",
        "Сальвадор": "El Salvador",
        "Сент-Винсент и Гренадины": "Saint Vincent and the Grenadines",
        "Сент-Китс и Невис": "Saint Kitts and Nevis",
        "Сент-Люсия": "Saint Lucia",
        "США": "United States",
        "Суринам": "Suriname",
        "Тринидад и Тобаго": "Trinidad and Tobago",
        "Уругвай": "Uruguay",
        "Чили": "Chile",
        "Эквадор": "Ecuador",
        "Ямайка": "Jamaica",
        
        // Океания (14 стран)
        "Австралия": "Australia",
        "Вануату": "Vanuatu",
        "Кирибати": "Kiribati",
        "Маршалловы Острова": "Marshall Islands",
        "Микронезия": "Micronesia",
        "Науру": "Nauru",
        "Новая Зеландия": "New Zealand",
        "Палау": "Palau",
        "Папуа — Новая Гвинея": "Papua New Guinea",
        "Самоа": "Samoa",
        "Соломоновы Острова": "Solomon Islands",
        "Тонга": "Tonga",
        "Тувалу": "Tuvalu",
        "Фиджи": "Fiji"
    },

    // Континенты
    continents: {
        europe: [
            "Австрия", "Албания", "Андорра", "Белоруссия", "Бельгия", "Болгария", 
            "Босния и Герцеговина", "Ватикан", "Великобритания", "Венгрия", 
            "Германия", "Греция", "Дания", "Ирландия", "Исландия", "Испания", 
            "Италия", "Латвия", "Литва", "Лихтенштейн", "Люксембург", "Мальта", 
            "Молдавия", "Монако", "Нидерланды", "Норвегия", "Польша", "Португалия", 
            "Россия", "Румыния", "Сан-Марино", "Северная Македония", "Сербия", 
            "Словакия", "Словения", "Украина", "Финляндия", "Франция", "Хорватия", 
            "Черногория", "Чехия", "Швейцария", "Швеция", "Эстония"
        ],
        asia: [
            "Азербайджан", "Армения", "Афганистан", "Бангладеш", "Бахрейн", 
            "Бруней", "Бутан", "Вьетнам", "Грузия", "Израиль", "Индия", 
            "Индонезия", "Иордания", "Ирак", "Иран", "Йемен", "Казахстан", 
            "Камбоджа", "Катар", "Кипр", "Киргизия", "Китай", "Кувейт", 
            "Лаос", "Ливан", "Малайзия", "Мальдивы", "Монголия", "Мьянма", 
            "Непал", "Объединённые Арабские Эмираты", "Оман", "Пакистан", 
            "Палестина", "Саудовская Аравия", "Сингапур", "Сирия", "Таджикистан", 
            "Таиланд", "Туркменистан", "Турция", "Узбекистан", "Филиппины", 
            "Шри-Ланка", "Южная Корея", "Япония", "Восточный Тимор", "КНДР"
        ],
        africa: [
            "Алжир", "Ангола", "Бенин", "Ботсвана", "Буркина-Фасо", "Бурунди", 
            "Габон", "Гамбия", "Гана", "Гвинея", "Гвинея-Бисау", "Джибути", 
            "Египет", "Замбия", "Зимбабве", "Кабо-Верде", "Камерун", "Кения", 
            "Коморы", "Конго, Демократическая Республика", "Конго, Республика", 
            "Кот-д'Ивуар", "Лесото", "Либерия", "Ливия", "Маврикий", "Мавритания", 
            "Мадагаскар", "Малawi", "Мали", "Марокко", "Мозамбик", "Намибия", 
            "Нигер", "Нигерия", "Руанда", "Сан-Томе и Принсипи", "Сейшельские Острова", 
            "Сенегал", "Сомали", "Судан", "Сьерра-Леоне", "Танзания", "Того", 
            "Тунис", "Уганда", "Центральноафриканская Республика", "Чад", 
            "Экваториальная Гвинея", "Эритрея", "Эсватини", "Эфиопия", 
            "ЮАР", "Южный Судан"
        ],
        america: [
            "Антигуа и Барбуда", "Аргентина", "Багамские Острова", "Барбадос", 
            "Белиз", "Боливия", "Бразилия", "Венесуэла", "Гаити", "Гайана", 
            "Гватемала", "Гондурас", "Гренада", "Доминика", "Доминиканская Республика", 
            "Канада", "Колумбия", "Коста-Рика", "Куба", "Мексика", "Никарагуа", 
            "Панама", "Парагвай", "Перу", "Сальвадор", "Сент-Винсент и Гренадины", 
            "Сент-Китс и Невис", "Сент-Люсия", "США", "Суринам", 
            "Тринидад и Тобаго", "Уругвай", "Чили", "Эквадор", "Ямайка"
        ],
        oceania: [
            "Австралия", "Вануату", "Кирибати", "Маршалловы Острова", "Микронезия", 
            "Науру", "Новая Зеландия", "Палау", "Папуа — Новая Гвинея", "Самоа", 
            "Соломоновы Острова", "Тонга", "Тувалу", "Фиджи"
        ]
    },

    // Данные стран: столица, код (ISO alpha-2), континент
    countryData: {
        // Европа (44 страны)
        "Австрия": { capital: "Вена", code: "at", continent: "europe" },
        "Албания": { capital: "Тирана", code: "al", continent: "europe" },
        "Андорра": { capital: "Андорра-ла-Велья", code: "ad", continent: "europe" },
        "Белоруссия": { capital: "Минск", code: "by", continent: "europe" },
        "Бельгия": { capital: "Брюссель", code: "be", continent: "europe" },
        "Болгария": { capital: "София", code: "bg", continent: "europe" },
        "Босния и Герцеговина": { capital: "Сараево", code: "ba", continent: "europe" },
        "Ватикан": { capital: "Ватикан", code: "va", continent: "europe" },
        "Великобритания": { capital: "Лондон", code: "gb", continent: "europe" },
        "Венгрия": { capital: "Будапешт", code: "hu", continent: "europe" },
        "Германия": { capital: "Берлин", code: "de", continent: "europe" },
        "Греция": { capital: "Афины", code: "gr", continent: "europe" },
        "Дания": { capital: "Копенгаген", code: "dk", continent: "europe" },
        "Ирландия": { capital: "Дублин", code: "ie", continent: "europe" },
        "Исландия": { capital: "Рейкьявик", code: "is", continent: "europe" },
        "Испания": { capital: "Мадрид", code: "es", continent: "europe" },
        "Италия": { capital: "Рим", code: "it", continent: "europe" },
        "Латвия": { capital: "Рига", code: "lv", continent: "europe" },
        "Литва": { capital: "Вильнюс", code: "lt", continent: "europe" },
        "Лихтенштейн": { capital: "Вадуц", code: "li", continent: "europe" },
        "Люксембург": { capital: "Люксембург", code: "lu", continent: "europe" },
        "Мальта": { capital: "Валетта", code: "mt", continent: "europe" },
        "Молдавия": { capital: "Кишинёв", code: "md", continent: "europe" },
        "Монако": { capital: "Монако", code: "mc", continent: "europe" },
        "Нидерланды": { capital: "Амстердам", code: "nl", continent: "europe" },
        "Норвегия": { capital: "Осло", code: "no", continent: "europe" },
        "Польша": { capital: "Варшава", code: "pl", continent: "europe" },
        "Португалия": { capital: "Лиссабон", code: "pt", continent: "europe" },
        "Россия": { capital: "Москва", code: "ru", continent: "europe" },
        "Румыния": { capital: "Бухарест", code: "ro", continent: "europe" },
        "Сан-Марино": { capital: "Сан-Марино", code: "sm", continent: "europe" },
        "Северная Македония": { capital: "Скопье", code: "mk", continent: "europe" },
        "Сербия": { capital: "Белград", code: "rs", continent: "europe" },
        "Словакия": { capital: "Братислава", code: "sk", continent: "europe" },
        "Словения": { capital: "Любляна", code: "si", continent: "europe" },
        "Украина": { capital: "Киев", code: "ua", continent: "europe" },
        "Финляндия": { capital: "Хельсинки", code: "fi", continent: "europe" },
        "Франция": { capital: "Париж", code: "fr", continent: "europe" },
        "Хорватия": { capital: "Загреб", code: "hr", continent: "europe" },
        "Черногория": { capital: "Подгорица", code: "me", continent: "europe" },
        "Чехия": { capital: "Прага", code: "cz", continent: "europe" },
        "Швейцария": { capital: "Берн", code: "ch", continent: "europe" },
        "Швеция": { capital: "Стокгольм", code: "se", continent: "europe" },
        "Эстония": { capital: "Таллин", code: "ee", continent: "europe" },
        
        // Азия (48 стран)
        "Азербайджан": { capital: "Баку", code: "az", continent: "asia" },
        "Армения": { capital: "Ереван", code: "am", continent: "asia" },
        "Афганистан": { capital: "Кабул", code: "af", continent: "asia" },
        "Бангладеш": { capital: "Дакка", code: "bd", continent: "asia" },
        "Бахрейн": { capital: "Манама", code: "bh", continent: "asia" },
        "Бруней": { capital: "Бандар-Сери-Бегаван", code: "bn", continent: "asia" },
        "Бутан": { capital: "Тхимпху", code: "bt", continent: "asia" },
        "Вьетнам": { capital: "Ханой", code: "vn", continent: "asia" },
        "Грузия": { capital: "Тбилиси", code: "ge", continent: "asia" },
        "Израиль": { capital: "Иерусалим", code: "il", continent: "asia" },
        "Индия": { capital: "Нью-Дели", code: "in", continent: "asia" },
        "Индонезия": { capital: "Джакарта", code: "id", continent: "asia" },
        "Иордания": { capital: "Амман", code: "jo", continent: "asia" },
        "Ирак": { capital: "Багдад", code: "iq", continent: "asia" },
        "Иран": { capital: "Тегеран", code: "ir", continent: "asia" },
        "Йемен": { capital: "Санаа", code: "ye", continent: "asia" },
        "Казахстан": { capital: "Астана", code: "kz", continent: "asia" },
        "Камбоджа": { capital: "Пномпень", code: "kh", continent: "asia" },
        "Катар": { capital: "Доха", code: "qa", continent: "asia" },
        "Кипр": { capital: "Никосия", code: "cy", continent: "asia" },
        "Киргизия": { capital: "Бишкек", code: "kg", continent: "asia" },
        "Китай": { capital: "Пекин", code: "cn", continent: "asia" },
        "Кувейт": { capital: "Кувейт", code: "kw", continent: "asia" },
        "Лаос": { capital: "Вьентьян", code: "la", continent: "asia" },
        "Ливан": { capital: "Бейрут", code: "lb", continent: "asia" },
        "Малайзия": { capital: "Куала-Лумпур", code: "my", continent: "asia" },
        "Мальдивы": { capital: "Мале", code: "mv", continent: "asia" },
        "Монголия": { capital: "Улан-Батор", code: "mn", continent: "asia" },
        "Мьянма": { capital: "Нейпьидо", code: "mm", continent: "asia" },
        "Непал": { capital: "Катманду", code: "np", continent: "asia" },
        "Объединённые Арабские Эмираты": { capital: "Абу-Даби", code: "ae", continent: "asia" },
        "Оман": { capital: "Маскат", code: "om", continent: "asia" },
        "Пакистан": { capital: "Исламабад", code: "pk", continent: "asia" },
        "Палестина": { capital: "Рамалла", code: "ps", continent: "asia" },
        "Саудовская Аравия": { capital: "Эр-Рияд", code: "sa", continent: "asia" },
        "Сингапур": { capital: "Сингапур", code: "sg", continent: "asia" },
        "Сирия": { capital: "Дамаск", code: "sy", continent: "asia" },
        "Таджикистан": { capital: "Душанбе", code: "tj", continent: "asia" },
        "Таиланд": { capital: "Бангкок", code: "th", continent: "asia" },
        "Туркменистан": { capital: "Ашхабад", code: "tm", continent: "asia" },
        "Турция": { capital: "Анкара", code: "tr", continent: "asia" },
        "Узбекистан": { capital: "Ташкент", code: "uz", continent: "asia" },
        "Филиппины": { capital: "Манила", code: "ph", continent: "asia" },
        "Шри-Ланка": { capital: "Коломбо", code: "lk", continent: "asia" },
        "Южная Корея": { capital: "Сеул", code: "kr", continent: "asia" },
        "Япония": { capital: "Токио", code: "jp", continent: "asia" },
        "Восточный Тимор": { capital: "Дили", code: "tl", continent: "asia" },
        "КНДР": { capital: "Пхеньян", code: "kp", continent: "asia" },
        
        // Африка (54 страны)
        "Алжир": { capital: "Алжир", code: "dz", continent: "africa" },
        "Ангола": { capital: "Луанда", code: "ao", continent: "africa" },
        "Бенин": { capital: "Порто-Ново", code: "bj", continent: "africa" },
        "Ботсвана": { capital: "Габороне", code: "bw", continent: "africa" },
        "Буркина-Фасо": { capital: "Уагадугу", code: "bf", continent: "africa" },
        "Бурунди": { capital: "Гитега", code: "bi", continent: "africa" },
        "Габон": { capital: "Либревиль", code: "ga", continent: "africa" },
        "Гамбия": { capital: "Банжул", code: "gm", continent: "africa" },
        "Гана": { capital: "Аккра", code: "gh", continent: "africa" },
        "Гвинея": { capital: "Конакри", code: "gn", continent: "africa" },
        "Гвинея-Бисау": { capital: "Бисау", code: "gw", continent: "africa" },
        "Джибути": { capital: "Джибути", code: "dj", continent: "africa" },
        "Египет": { capital: "Каир", code: "eg", continent: "africa" },
        "Замбия": { capital: "Лусака", code: "zm", continent: "africa" },
        "Зимбабве": { capital: "Хараре", code: "zw", continent: "africa" },
        "Кабо-Верде": { capital: "Прая", code: "cv", continent: "africa" },
        "Камерун": { capital: "Яунде", code: "cm", continent: "africa" },
        "Кения": { capital: "Найроби", code: "ke", continent: "africa" },
        "Коморы": { capital: "Морони", code: "km", continent: "africa" },
        "Конго, Демократическая Республика": { capital: "Киншаса", code: "cd", continent: "africa" },
        "Конго, Республика": { capital: "Браззавиль", code: "cg", continent: "africa" },
        "Кот-д'Ивуар": { capital: "Ямусукро", code: "ci", continent: "africa" },
        "Лесото": { capital: "Масеру", code: "ls", continent: "africa" },
        "Либерия": { capital: "Монровия", code: "lr", continent: "africa" },
        "Ливия": { capital: "Триполи", code: "ly", continent: "africa" },
        "Маврикий": { capital: "Порт-Луи", code: "mu", continent: "africa" },
        "Мавритания": { capital: "Нуакшот", code: "mr", continent: "africa" },
        "Мадагаскар": { capital: "Антананариву", code: "mg", continent: "africa" },
        "Малawi": { capital: "Лилонгве", code: "mw", continent: "africa" },
        "Мали": { capital: "Бамако", code: "ml", continent: "africa" },
        "Марокко": { capital: "Рабат", code: "ma", continent: "africa" },
        "Мозамбик": { capital: "Мапуту", code: "mz", continent: "africa" },
        "Намибия": { capital: "Виндхук", code: "na", continent: "africa" },
        "Нигер": { capital: "Ниамей", code: "ne", continent: "africa" },
        "Нигерия": { capital: "Абуджа", code: "ng", continent: "africa" },
        "Руанда": { capital: "Кигали", code: "rw", continent: "africa" },
        "Сан-Томе и Принсипи": { capital: "Сан-Томе", code: "st", continent: "africa" },
        "Сейшельские Острова": { capital: "Виктория", code: "sc", continent: "africa" },
        "Сенегал": { capital: "Дакар", code: "sn", continent: "africa" },
        "Сомали": { capital: "Могадишо", code: "so", continent: "africa" },
        "Судан": { capital: "Хартум", code: "sd", continent: "africa" },
        "Сьерра-Леоне": { capital: "Фритаун", code: "sl", continent: "africa" },
        "Танзания": { capital: "Додома", code: "tz", continent: "africa" },
        "Того": { capital: "Ломе", code: "tg", continent: "africa" },
        "Тунис": { capital: "Тунис", code: "tn", continent: "africa" },
        "Уганда": { capital: "Кампала", code: "ug", continent: "africa" },
        "Центральноафриканская Республика": { capital: "Банги", code: "cf", continent: "africa" },
        "Чад": { capital: "Нджамена", code: "td", continent: "africa" },
        "Экваториальная Гвинея": { capital: "Малабо", code: "gq", continent: "africa" },
        "Эритрея": { capital: "Асмэра", code: "er", continent: "africa" },
        "Эсватини": { capital: "Мбабане", code: "sz", continent: "africa" },
        "Эфиопия": { capital: "Аддис-Абеба", code: "et", continent: "africa" },
        "ЮАР": { capital: "Претория", code: "za", continent: "africa" },
        "Южный Судан": { capital: "Джуба", code: "ss", continent: "africa" },
        
        // Америка (35 стран)
        "Антигуа и Барбуда": { capital: "Сент-Джонс", code: "ag", continent: "america" },
        "Аргентина": { capital: "Буэнос-Айрес", code: "ar", continent: "america" },
        "Багамские Острова": { capital: "Нассау", code: "bs", continent: "america" },
        "Барбадос": { capital: "Бриджтаун", code: "bb", continent: "america" },
        "Белиз": { capital: "Бelmopan", code: "bz", continent: "america" },
        "Боливия": { capital: "Ла-Пас", code: "bo", continent: "america" },
        "Бразилия": { capital: "Бразилиа", code: "br", continent: "america" },
        "Венесуэла": { capital: "Каракас", code: "ve", continent: "america" },
        "Гаити": { capital: "Порт-о-Пренс", code: "ht", continent: "america" },
        "Гайана": { capital: "Джорджтаун", code: "gy", continent: "america" },
        "Гватемала": { capital: "Гватемала-Сити", code: "gt", continent: "america" },
        "Гондурас": { capital: "Тегусигальпа", code: "hn", continent: "america" },
        "Гренада": { capital: "Сент-Джорджес", code: "gd", continent: "america" },
        "Доминика": { capital: "Розо", code: "dm", continent: "america" },
        "Доминиканская Республика": { capital: "Санто-Доминго", code: "do", continent: "america" },
        "Канада": { capital: "Оттава", code: "ca", continent: "america" },
        "Колумбия": { capital: "Богота", code: "co", continent: "america" },
        "Коста-Рика": { capital: "Сан-Хосе", code: "cr", continent: "america" },
        "Куба": { capital: "Гавана", code: "cu", continent: "america" },
        "Мексика": { capital: "Мехико", code: "mx", continent: "america" },
        "Никарагуа": { capital: "Манагуа", code: "ni", continent: "america" },
        "Панама": { capital: "Панама", code: "pa", continent: "america" },
        "Парагвай": { capital: "Асунсьон", code: "py", continent: "america" },
        "Перу": { capital: "Лима", code: "pe", continent: "america" },
        "Сальвадор": { capital: "Сан-Сальвадор", code: "sv", continent: "america" },
        "Сент-Винсент и Гренадины": { capital: "Кингстаун", code: "vc", continent: "america" },
        "Сент-Китс и Невис": { capital: "Бастер", code: "kn", continent: "america" },
        "Сент-Люсия": { capital: "Кастри", code: "lc", continent: "america" },
        "США": { capital: "Вашингтон", code: "us", continent: "america" },
        "Суринам": { capital: "Парамарибо", code: "sr", continent: "america" },
        "Тринидад и Тобаго": { capital: "Порт-оф-Спейн", code: "tt", continent: "america" },
        "Уругвай": { capital: "Монтевидео", code: "uy", continent: "america" },
        "Чили": { capital: "Сантьяго", code: "cl", continent: "america" },
        "Эквадор": { capital: "Кито", code: "ec", continent: "america" },
        "Ямайка": { capital: "Кингстон", code: "jm", continent: "america" },
        
        // Океания (14 стран)
        "Австралия": { capital: "Канберра", code: "au", continent: "oceania" },
        "Вануату": { capital: "Порт-Вила", code: "vu", continent: "oceania" },
        "Кирибати": { capital: "Тарава", code: "ki", continent: "oceania" },
        "Маршалловы Острова": { capital: "Маджуро", code: "mh", continent: "oceania" },
        "Микронезия": { capital: "Паликир", code: "fm", continent: "oceania" },
        "Науру": { capital: "Ярен", code: "nr", continent: "oceania" },
        "Новая Зеландия": { capital: "Веллингтон", code: "nz", continent: "oceania" },
        "Палау": { capital: "Нгерулмуд", code: "pw", continent: "oceania" },
        "Папуа — Новая Гвинея": { capital: "Порт-Морсби", code: "pg", continent: "oceania" },
        "Самоа": { capital: "Апиа", code: "ws", continent: "oceania" },
        "Соломоновы Острова": { capital: "Хониара", code: "sb", continent: "oceania" },
        "Тонга": { capital: "Нукуалофа", code: "to", continent: "oceania" },
        "Тувалу": { capital: "Фунафути", code: "tv", continent: "oceania" },
        "Фиджи": { capital: "Сува", code: "fj", continent: "oceania" }
    },

    // Utility methods for country data access
    
    // === НОВЫЕ МЕТОДЫ ДЛЯ ПОДДЕРЖКИ КАРТЫ NATURAL EARTH ===
    
    // Получить русское название страны по ISO коду из GeoJSON (например, "US" -> "США")
    getCountryNameByCode: function(isoCode) {
        if (!isoCode) return null;
        
        // В базе Natural Earth код может быть в верхнем регистре (US), у нас в нижнем (us)
        const searchCode = isoCode.toLowerCase();
        
        // Ищем страну в нашей базе, у которой код совпадает
        for (const [countryName, data] of Object.entries(this.countryData)) {
            // Проверка на undefined на случай ошибок в данных
            if (data && data.code && data.code.toLowerCase() === searchCode) {
                return countryName;
            }
        }
        return null;
    },

    // Получить ISO код по русскому названию (для подсветки правильного ответа)
    getCodeByCountryName: function(countryName) {
        const data = this.countryData[countryName];
        return data ? data.code : null;
    },
    // =======================================================

    getEnglishName: function(russianName) {
        return this.countryNameMapping[russianName] || russianName;
    },

    getRussianName: function(englishName) {
        // Старый метод поиска по имени (менее надежный теперь, но оставляем)
        for (const [rus, eng] of Object.entries(this.countryNameMapping)) {
            if (eng.toLowerCase() === englishName.toLowerCase()) return rus;
        }
        return englishName;
    },

    getContinentForCountry: function(countryName) {
        for (const [continent, countries] of Object.entries(this.continents)) {
            if (countries.includes(countryName)) {
                return continent;
            }
        }
        return 'unknown';
    },

    getCountryData: function(countryName) {
        return this.countryData[countryName] || null;
    },

    getAllCountriesByContinent: function(continent) {
        return this.continents[continent] || [];
    },

    getAllCapitalsByContinent: function(continent) {
        const countries = this.continents[continent] || [];
        const capitals = [];
        countries.forEach(country => {
            const data = this.countryData[country];
            if (data && data.capital) {
                capitals.push(data.capital);
            }
        });
        return [...new Set(capitals)]; // Remove duplicates
    }
};

// Export for use in browser (global variable)
if (typeof window !== 'undefined') {
    window.GeoCountries = GeoCountries;
}
