const currencyConfig = {
    BRL: { locale: 'pt-BR', currency: 'BRL' },
    EUR: { locale: 'de-DE', currency: 'EUR' },
    USD: { locale: 'en-US', currency: 'USD' },
    ARS: { locale: 'es-AR', currency: 'ARS' },
};

export default {
    formatCurrency(value, currency = 'BRL') {
        if (isNaN(value)) return this.getDefaultFormat(currency);

        const config = currencyConfig[currency] || currencyConfig.BRL;

        return new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: config.currency,
            minimumFractionDigits: 2,
        }).format(value);
    },

    getDefaultFormat(currency = 'BRL') {
        const defaults = {
            BRL: 'R$ 0,00',
            EUR: '€ 0,00',
            USD: '$ 0.00',
            ARS: '$ 0,00',
        };
        return defaults[currency] || defaults.BRL;
    },

    // Backward compatibility - deprecated
    formatCurrencyBR(value) {
        return this.formatCurrency(value, 'BRL');
    }
}
