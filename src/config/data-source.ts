export type DataSourceMode = 'MOCK' | 'SCRAPER' | 'API';

interface DataSourceConfig {
    mode: DataSourceMode;
    api?: {
        baseUrl: string;
        apiKey: string;
    };
    scraper?: {
        headless: boolean;
        timeout: number;
        userAgent: string;
    };
}

export const DATA_SOURCE_CONFIG: DataSourceConfig = {
    // Alterar aqui para trocar a estratégia globalmente
    mode: 'SCRAPER', // Options: 'MOCK', 'SCRAPER', 'API'

    // Configuração para futura integração oficial
    api: {
        baseUrl: process.env.API_BASE_URL || '',
        apiKey: process.env.API_KEY || '',
    },

    // Configuração do Puppeteer
    scraper: {
        headless: true, // false para ver o navegador abrindo (debug)
        timeout: 30000,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
};
