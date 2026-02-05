export const EXCHANGE_RATES = {
    BRL: 1,
    USD: 0.20, // 1 BRL = 0.20 USD (Approx R$ 5.00)
    EUR: 0.18, // 1 BRL = 0.18 EUR (Approx R$ 5.50)
};

export function convertCurrency(amountInBrl: number, targetCurrency: 'USD' | 'EUR' | 'BRL'): number {
    return amountInBrl * EXCHANGE_RATES[targetCurrency];
}

export function formatCurrency(amount: number, currency: 'USD' | 'EUR' | 'BRL'): string {
    return new Intl.NumberFormat(currency === 'BRL' ? 'pt-BR' : 'en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
}
