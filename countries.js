// countries.js - Модуль данных для GeoGator v7.0
// Содержит базу данных 195 стран, их столицы, коды ISO, и регионы.
// Используется для валидации и генерации вопросов.

const GeoCountries = {
    // 1. Полный список имен (Русский -> Английский)
    countryNameMapping: {
        // Европа
        "Австрия": "Austria", "Албания": "Albania", "Андорра": "Andorra", "Белоруссия": "Belarus",
        "Бельгия": "Belgium", "Болгария": "Bulgaria", "Босния и Герцеговина": "Bosnia and Herzegovina",
        "Ватикан": "Vatican City", "Великобритания": "United Kingdom", "Венгрия": "Hungary",
        "Германия": "Germany", "Греция": "Greece", "Дания": "Denmark", "Ирландия": "Ireland",
        "Исландия": "Iceland", "Испания": "Spain", "Италия": "Italy", "Латвия": "Latvia",
        "Литва": "Lithuania", "Лихтенштейн": "Liechtenstein", "Люксембург": "Luxembourg",
        "Мальта": "Malta", "Молдавия": "Moldova", "Монако": "Monaco", "Нидерланды": "Netherlands",
        "Норвегия": "Norway", "Польша": "Poland", "Португалия": "Portugal", "Россия": "Russia",
        "Румыния": "Romania", "Сан-Марино": "San Marino", "Северная Македония": "North Macedonia",
        "Сербия": "Serbia", "Словакия": "Slovakia", "Словения": "Slovenia", "Украина": "Ukraine",
        "Финляндия": "Finland", "Франция": "France", "Хорватия": "Croatia", "Черногория": "Montenegro",
        "Чехия": "Czech Republic", "Швейцария": "Switzerland", "Швеция": "Sweden", "Эстония": "Estonia",

        // Азия
        "Азербайджан": "Azerbaijan", "Армения": "Armenia", "Афганистан": "Afghanistan", "Бангладеш": "Bangladesh",
        "Бахрейн": "Bahrain", "Бруней": "Brunei", "Бутан": "Bhutan", "Вьетнам": "Vietnam", "Грузия": "Georgia",
        "Израиль": "Israel", "Индия": "India", "Индонезия": "Indonesia", "Иордания": "Jordan", "Ирак": "Iraq",
        "Иран": "Iran", "Йемен": "Yemen", "Казахстан": "Kazakhstan", "Камбоджа": "Cambodia", "Катар": "Qatar",
        "Кипр": "Cyprus", "Киргизия": "Kyrgyzstan", "Китай": "China", "Кувейт": "Kuwait", "Лаос": "Laos",
        "Ливан": "Lebanon", "Малайзия": "Malaysia", "Мальдивы": "Maldives", "Монголия": "Mongolia",
        "Мьянма": "Myanmar", "Непал": "Nepal", "Объединённые Арабские Эмираты": "United Arab Emirates",
        "Оман": "Oman", "Пакистан": "Pakistan", "Палестина": "Palestine", "Саудовская Аравия": "Saudi Arabia",
        "Сингапур": "Singapore", "Сирия": "Syria", "Таджикистан": "Tajikistan", "Таиланд": "Thailand",
        "Туркменистан": "Turkmenistan", "Турция": "Turkey", "Узбекистан": "Uzbekistan", "Филиппины": "Philippines",
        "Шри-Ланка": "Sri Lanka", "Южная Корея": "South Korea", "Япония": "Japan", "Восточный Тимор": "East Timor",
        "КНДР": "North Korea",

        // Африка
        "Алжир": "Algeria", "Ангола": "Angola", "Бенин": "Benin", "Ботсвана": "Botswana", "Буркина-Фасо": "Burkina Faso",
        "Бурунди": "Burundi", "Габон": "Gabon", "Гамбия": "Gambia", "Гана": "Ghana", "Гвинея": "Guinea",
        "Гвинея-Бисау": "Guinea-Bissau", "Джибути": "Djibouti", "Египет": "Egypt", "Замбия": "Zambia",
        "Зимбабве": "Zimbabwe", "Кабо-Верде": "Cape Verde", "Камерун": "Cameroon", "Кения": "Kenya",
        "Коморы": "Comoros", "Конго, Демократическая Республика": "Democratic Republic of the Congo",
        "Конго, Республика": "Republic of the Congo", "Кот-д'Ивуар": "Ivory Coast", "Лесото": "Lesotho",
        "Либерия": "Liberia", "Ливия": "Libya", "Маврикий": "Mauritius", "Мавритания": "Mauritania",
        "Мадагаскар": "Madagascar", "Малawi": "Malawi", "Мали": "Mali", "Марокко": "Morocco", "Мозамбик": "Mozambique",
        "Намибия": "Namibia", "Нигер": "Niger", "Нигерия": "Nigeria", "Руанда": "Rwanda", "Сан-Томе и Принсипи": "Sao Tome and Principe",
        "Сейшельские Острова": "Seychelles", "Сенегал": "Senegal", "Сомали": "Somalia", "Судан": "Sudan",
        "Сьерра-Леоне": "Sierra Leone", "Танзания": "Tanzania", "Того": "Togo", "Тунис": "Tunisia", "Уганда": "Uganda",
        "Центральноафриканская Республика": "Central African Republic", "Чад": "Chad", "Экваториальная Гвинея": "Equatorial Guinea",
        "Эритрея": "Eritrea", "Эсватини": "Eswatini", "Эфиопия": "Ethiopia", "ЮАР": "South Africa", "Южный Судан": "South Sudan",

        // Северная Америка (включая Центр. Америку и Карибы)
        "Антигуа и Барбуда": "Antigua and Barbuda", "Багамские Острова": "Bahamas", "Барбадос": "Barbados",
        "Белиз": "Belize", "Гаити": "Haiti", "Гватемала": "Guatemala", "Гондурас": "Honduras", "Гренада": "Grenada",
        "Доминика": "Dominica", "Доминиканская Республика": "Dominican Republic", "Канада": "Canada",
        "Коста-Рика": "Costa Rica", "Куба": "Cuba", "Мексика": "Mexico", "Никарагуа": "Nicaragua", "Панама": "Panama",
        "Сальвадор": "El Salvador", "Сент-Винсент и Гренадины": "Saint Vincent and the Grenadines",
        "Сент-Китс и Невис": "Saint Kitts and Nevis", "Сент-Люсия": "Saint Lucia", "США": "United States",
        "Тринидад и Тобаго": "Trinidad and Tobago", "Ямайка": "Jamaica",

        // Южная Америка
        "Аргентина": "Argentina", "Боливия": "Bolivia", "Бразилия": "Brazil", "Венесуэла": "Venezuela",
        "Гайана": "Guyana", "Колумбия": "Colombia", "Парагвай": "Paraguay", "Перу": "Peru", "Суринам": "Suriname",
        "Уругвай": "Uruguay", "Чили": "Chile", "Эквадор": "Ecuador",

        // Океания
        "Австралия": "Australia", "Вануату": "Vanuatu", "Кирибати": "Kiribati", "Маршалловы Острова": "Marshall Islands",
        "Микронезия": "Micronesia", "Науру": "Nauru", "Новая Зеландия": "New Zealand", "Палау": "Palau",
        "Папуа — Новая Гвинея": "Papua New Guinea", "Самоа": "Samoa", "Соломоновы Острова": "Solomon Islands",
        "Тонга": "Tonga", "Тувалу": "Tuvalu", "Фиджи": "Fiji"
    },

    // 2. Списки для генерации вопросов (Америка разделена)
    continents: {
        europe: [
            "Австрия", "Албания", "Андорра", "Белоруссия", "Бельгия", "Болгария", "Босния и Герцеговина",
            "Ватикан", "Великобритания", "Венгрия", "Германия", "Греция", "Дания", "Ирландия", "Исландия",
            "Испания", "Италия", "Латвия", "Литва", "Лихтенштейн", "Люксембург", "Мальта", "Молдавия",
            "Монако", "Нидерланды", "Норвегия", "Польша", "Португалия", "Россия", "Румыния", "Сан-Марино",
            "Северная Македония", "Сербия", "Словакия", "Словения", "Украина", "Финляндия", "Франция",
            "Хорватия", "Черногория", "Чехия", "Швейцария", "Швеция", "Эстония"
        ],
        asia: [
            "Азербайджан", "Армения", "Афганистан", "Бангладеш", "Бахрейн", "Бруней", "Бутан", "Вьетнам",
            "Грузия", "Израиль", "Индия", "Индонезия", "Иордания", "Ирак", "Иран", "Йемен", "Казахстан",
            "Камбоджа", "Катар", "Кипр", "Киргизия", "Китай", "Кувейт", "Лаос", "Ливан", "Малайзия",
            "Мальдивы", "Монголия", "Мьянма", "Непал", "Объединённые Арабские Эмираты", "Оман", "Пакистан",
            "Палестина", "Саудовская Аравия", "Сингапур", "Сирия", "Таджикистан", "Таиланд", "Туркменистан",
            "Турция", "Узбекистан", "Филиппины", "Шри-Ланка", "Южная Корея", "Япония", "Восточный Тимор", "КНДР"
        ],
        africa: [
            "Алжир", "Ангола", "Бенин", "Ботсвана", "Буркина-Фасо", "Бурунди", "Габон", "Гамбия", "Гана",
            "Гвинея", "Гвинея-Бисау", "Джибути", "Египет", "Замбия", "Зимбабве", "Кабо-Верде", "Камерун",
            "Кения", "Коморы", "Конго, Демократическая Республика", "Конго, Республика", "Кот-д'Ивуар",
            "Лесото", "Либерия", "Ливия", "Маврикий", "Мавритания", "Мадагаскар", "Малawi", "Мали",
            "Марокко", "Мозамбик", "Намибия", "Нигер", "Нигерия", "Руанда", "Сан-Томе и Принсипи",
            "Сейшельские Острова", "Сенегал", "Сомали", "Судан", "Сьерра-Леоне", "Танзания", "Того",
            "Тунис", "Уганда", "Центральноафриканская Республика", "Чад", "Экваториальная Гвинея",
            "Эритрея", "Эсватини", "Эфиопия", "ЮАР", "Южный Судан"
        ],
        north_america: [
            "Антигуа и Барбуда", "Багамские Острова", "Барбадос", "Белиз", "Гаити", "Гватемала", "Гондурас",
            "Гренада", "Доминика", "Доминиканская Республика", "Канада", "Коста-Рика", "Куба", "Мексика",
            "Никарагуа", "Панама", "Сальвадор", "Сент-Винсент и Гренадины", "Сент-Китс и Невис",
            "Сент-Люсия", "США", "Ямайка"
        ],
        south_america: [
            "Аргентина", "Боливия", "Бразилия", "Венесуэла", "Гайана", "Колумбия", "Парагвай", "Перу",
            "Суринам", "Тринидад и Тобаго", "Уругвай", "Чили", "Эквадор"
        ],
        oceania: [
            "Австралия", "Вануату", "Кирибати", "Маршалловы Острова", "Микронезия", "Науру",
            "Новая Зеландия", "Палау", "Папуа — Новая Гвинея", "Самоа", "Соломоновы Острова",
            "Тонга", "Тувалу", "Фиджи"
        ]
    },

    // 2. Маппирование столиц (Русский -> Английский)
    capitalMapping: {
        // Европа
        "Вена": "Vienna", "Тирана": "Tirana", "Андорра-ла-Велья": "Andorra la Vella", "Минск": "Minsk",
        "Брюссель": "Brussels", "София": "Sofia", "Сараево": "Sarajevo", "Ватикан": "Vatican City",
        "Лондон": "London", "Будапешт": "Budapest", "Берлин": "Berlin", "Афины": "Athens",
        "Копенгаген": "Copenhagen", "Дублин": "Dublin", "Рейкьявик": "Reykjavik", "Мадрид": "Madrid",
        "Рим": "Rome", "Рига": "Riga", "Вильнюс": "Vilnius", "Вадуц": "Vaduz",
        "Люксембург": "Luxembourg City", "Валетта": "Valletta", "Кишинёв": "Chișinău", "Монако": "Monaco",
        "Амстердам": "Amsterdam", "Осло": "Oslo", "Варшава": "Warsaw", "Лиссабон": "Lisbon",
        "Москва": "Moscow", "Бухарест": "Bucharest", "Сан-Марино": "San Marino", "Скопье": "Skopje",
        "Белград": "Belgrade", "Братислава": "Bratislava", "Любляна": "Ljubljana", "Киев": "Kyiv",
        "Хельсинки": "Helsinki", "Париж": "Paris", "Загреб": "Zagreb", "Подгорица": "Podgorica",
        "Прага": "Prague", "Берн": "Bern", "Стокгольм": "Stockholm", "Таллин": "Tallinn",
        
        // Азия
        "Баку": "Baku", "Ереван": "Yerevan", "Кабул": "Kabul", "Дакка": "Dhaka",
        "Манама": "Manama", "Бандар-Сери-Бегаван": "Bandar Seri Begawan", "Тхимпху": "Thimphu", "Ханой": "Hanoi",
        "Тбилиси": "Tbilisi", "Иерусалим": "Jerusalem", "Нью-Дели": "New Delhi", "Джакарта": "Jakarta",
        "Амман": "Amman", "Багдад": "Baghdad", "Тегеран": "Tehran", "Санаа": "Sana'a",
        "Астана": "Astana", "Пномпень": "Phnom Penh", "Доха": "Doha", "Никосия": "Nicosia",
        "Бишкек": "Bishkek", "Пекин": "Beijing", "Кувейт": "Kuwait City", "Вьентьян": "Vientiane",
        "Бейрут": "Beirut", "Куала-Лумпур": "Kuala Lumpur", "Мале": "Malé", "Улан-Батор": "Ulaanbaatar",
        "Нейпьидо": "Naypyidaw", "Катманду": "Kathmandu", "Абу-Даби": "Abu Dhabi", "Маскат": "Muscat",
        "Исламабад": "Islamabad", "Рамалла": "Ramallah", "Эр-Рияд": "Riyadh", "Сингапур": "Singapore",
        "Дамаск": "Damascus", "Душанбе": "Dushanbe", "Бангкок": "Bangkok", "Ашхабад": "Ashgabat",
        "Анкара": "Ankara", "Ташкент": "Tashkent", "Манила": "Manila", "Коломбо": "Colombo",
        "Сеул": "Seoul", "Восточный Тимор": "Dili", "Пхеньян": "Pyongyang",
        
        // Африка
        "Алжир": "Algiers", "Луанда": "Luanda", "Порто-Ново": "Porto-Novo", "Габороне": "Gaborone",
        "Уагадугу": "Ouagadougou", "Гитега": "Gitega", "Яунде": "Yaoundé", "Прая": "Praia",
        "Банги": "Bangui", "Коморос": "Moroni", "Киншаса": "Kinshasa", "Браззавиль": "Brazzaville",
        "Ямусукро": "Yamoussoukro", "Масеру": "Maseru", "Монровия": "Monrovia", "Триполи": "Tripoli",
        "Порт-Луи": "Port Louis", "Нуакшот": "Nouakchott", "Антананариву": "Antananarivo", "Лилонгве": "Lilongwe",
        "Бамако": "Bamako", "Рабат": "Rabat", "Мапуту": "Maputo", "Виндхук": "Windhoek",
        "Нигер": "Niamey", "Абуджа": "Abuja", "Кигали": "Kigali", "Сан-Томе": "São Tomé",
        "Виктория": "Victoria", "Дакар": "Dakar", "Могадишо": "Mogadishu", "Хартум": "Khartoum",
        "Фритаун": "Freetown", "Додома": "Dodoma", "Ломе": "Lomé", "Тунис": "Tunis",
        "Кампала": "Kampala", "Банги": "Bangui", "Нджамена": "N'Djamena", "Малабо": "Malabo",
        "Асмэра": "Asmara", "Мбабане": "Mbabane", "Аддис-Абеба": "Addis Ababa", "Претория": "Pretoria",
        "Джуба": "Juba",
        
        // Северная Америка
        "Сент-Джонс": "St. John's", "Нассау": "Nassau", "Бриджтаун": "Bridgetown",
        "Бельмопан": "Belmopan", "Порт-о-Пренс": "Port-au-Prince", "Гватемала": "Guatemala City",
        "Тегусигальпа": "Tegucigalpa", "Сент-Джорджес": "St. George's", "Оттава": "Ottawa",
        "Сан-Хосе": "San José", "Гавана": "Havana", "Мехико": "Mexico City", "Манагуа": "Managua",
        "Панама": "Panama City", "Сан-Сальвадор": "San Salvador", "Кингстаун": "Kingstown",
        "Бастер": "Basseterre", "Кастри": "Castries", "Вашингтон": "Washington, D.C.",
        "Порт-оф-Спейн": "Port of Spain", "Кингстон": "Kingston",
        
        // Южная Америка
        "Буэнос-Айрес": "Buenos Aires", "Сукре": "Sucre", "Бразилиа": "Brasília", "Сантьяго": "Santiago",
        "Богота": "Bogotá", "Кито": "Quito", "Парамарибо": "Paramaribo", "Монтевидео": "Montevideo",
        "Каракас": "Caracas", "Джорджтаун": "Georgetown", "Лима": "Lima",
        
        // Океания
        "Канберра": "Canberra", "Порт-Вила": "Port Vila", "Тарава": "Tarawa", "Колония": "Ngerulmud",
        "Паликир": "Palikir", "Яренн": "Yaren", "Веллингтон": "Wellington", "Корор": "Koror",
        "Порт-Морсби": "Port Moresby", "Апиа": "Apia", "Хониара": "Honiara",
        "Нукуалофа": "Nuku'alofa", "Фунафути": "Funafuti", "Сува": "Suva"
    },

    // 3. Полная база данных стран (Коды + Столицы + Регионы)
    countryData: {
        // --- ЕВРОПА ---
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

        // --- АЗИЯ ---
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

        // --- АФРИКА ---
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

        // --- СЕВЕРНАЯ АМЕРИКА ---
        "Антигуа и Барбуда": { capital: "Сент-Джонс", code: "ag", continent: "north_america" },
        "Багамские Острова": { capital: "Нассау", code: "bs", continent: "north_america" },
        "Барбадос": { capital: "Бриджтаун", code: "bb", continent: "north_america" },
        "Белиз": { capital: "Бельмопан", code: "bz", continent: "north_america" },
        "Гаити": { capital: "Порт-о-Пренс", code: "ht", continent: "north_america" },
        "Гватемала": { capital: "Гватемала-Сити", code: "gt", continent: "north_america" },
        "Гондурас": { capital: "Тегусигальпа", code: "hn", continent: "north_america" },
        "Гренада": { capital: "Сент-Джорджес", code: "gd", continent: "north_america" },
        "Доминика": { capital: "Розо", code: "dm", continent: "north_america" },
        "Доминиканская Республика": { capital: "Санто-Доминго", code: "do", continent: "north_america" },
        "Канада": { capital: "Оттава", code: "ca", continent: "north_america" },

        "Коста-Рика": { capital: "Сан-Хосе", code: "cr", continent: "north_america" },
        "Куба": { capital: "Гавана", code: "cu", continent: "north_america" },
        "Мексика": { capital: "Мехико", code: "mx", continent: "north_america" },
        "Никарагуа": { capital: "Манагуа", code: "ni", continent: "north_america" },
        "Панама": { capital: "Панама", code: "pa", continent: "north_america" },
        "Сальвадор": { capital: "Сан-Сальвадор", code: "sv", continent: "north_america" },
        "Сент-Винсент и Гренадины": { capital: "Кингстаун", code: "vc", continent: "north_america" },
        "Сент-Китс и Невис": { capital: "Бастер", code: "kn", continent: "north_america" },
        "Сент-Люсия": { capital: "Кастри", code: "lc", continent: "north_america" },
        "США": { capital: "Вашингтон", code: "us", continent: "north_america" },
        "Ямайка": { capital: "Кингстон", code: "jm", continent: "north_america" },

        // --- ЮЖНАЯ АМЕРИКА ---
        "Аргентина": { capital: "Буэнос-Айрес", code: "ar", continent: "south_america" },
        "Боливия": { capital: "Ла-Пас", code: "bo", continent: "south_america" },
        "Бразилия": { capital: "Бразилиа", code: "br", continent: "south_america" },
        "Венесуэла": { capital: "Каракас", code: "ve", continent: "south_america" },
        "Гайана": { capital: "Джорджтаун", code: "gy", continent: "south_america" },
        "Колумбия": { capital: "Богота", code: "co", continent: "south_america" },
        "Парагвай": { capital: "Асунсьон", code: "py", continent: "south_america" },
        "Перу": { capital: "Лима", code: "pe", continent: "south_america" },
        "Суринам": { capital: "Парамарибо", code: "sr", continent: "south_america" },
        "Тринидад и Тобаго": { capital: "Порт-оф-Спейн", code: "tt", continent: "south_america" },
        "Уругвай": { capital: "Монтевидео", code: "uy", continent: "south_america" },
        "Чили": { capital: "Сантьяго", code: "cl", continent: "south_america" },
        "Эквадор": { capital: "Кито", code: "ec", continent: "south_america" },

        // --- ОКЕАНИЯ ---
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

    // 4. Методы и фиксы (НЕ УДАЛЯТЬ!)
    codeFixes: {
        "fra": "fr", "nor": "no", "somaliland": "so", "kos": "xk", "cyp": "cy",
        "prt": "pt", "ncy": "cy"
    },

    getCountryNameByCode: function (isoCode, adm3Code) {
        if (isoCode && isoCode !== '-99') {
            const searchCode = isoCode.toLowerCase();
            for (const [countryName, data] of Object.entries(this.countryData)) {
                if (data && data.code && data.code.toLowerCase() === searchCode) {
                    return countryName;
                }
            }
        }
        if (adm3Code) {
            const search3 = adm3Code.toLowerCase();
            if (this.codeFixes[search3]) {
                const fixedCode = this.codeFixes[search3];
                for (const [countryName, data] of Object.entries(this.countryData)) {
                    if (data.code === fixedCode) return countryName;
                }
            }
        }
        return null;
    },

    getEnglishName: function (russianName) {
        return this.countryNameMapping[russianName] || russianName;
    },

    getEnglishCapital: function (russianCapital) {
        return this.capitalMapping[russianCapital] || russianCapital;
    },

    getContinentForCountry: function (countryName) {
        const data = this.countryData[countryName];
        return data ? data.continent : 'unknown';
    }
};

// Export for use in browser
if (typeof window !== 'undefined') {
    window.GeoCountries = GeoCountries;
}
