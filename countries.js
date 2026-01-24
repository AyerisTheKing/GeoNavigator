// ... (весь огромный объект countryData выше оставляем без изменений) ...

    // === НОВЫЕ МЕТОДЫ (Вставьте это в конец объекта GeoCountries) ===

    // Получить русское название страны по ISO коду из GeoJSON (например, "US" -> "США")
    getCountryNameByCode: function(isoCode) {
        if (!isoCode) return null;
        
        // В базе Natural Earth код "US", у нас "us". Приводим к нижнему регистру.
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

    // Вспомогательные методы (оставляем для совместимости)
    getEnglishName: function(russianName) {
        return this.countryNameMapping[russianName] || russianName;
    },

    getRussianName: function(englishName) {
        // Этот метод теперь запасной
        for (const [rus, eng] of Object.entries(this.countryNameMapping)) {
            if (eng.toLowerCase() === englishName.toLowerCase()) return rus;
        }
        return englishName;
    },
    
    // Старые методы тоже оставляем
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
        return [...new Set(capitals)];
    }
};

// Экспорт (не меняем)
if (typeof window !== 'undefined') {
    window.GeoCountries = GeoCountries;
}
