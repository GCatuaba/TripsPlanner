import { IFlightService, IHotelService } from './interfaces';
import { DATA_SOURCE_CONFIG, DataSourceMode } from '@/config/data-source';
import { MockAdapter } from './adapters/MockAdapter';
import { ScraperAdapter } from './adapters/ScraperAdapter';

// We could add an API Adapter later
// import { ApiAdapter } from './adapters/ApiAdapter';

class DataFactory {
    private mockAdapter = new MockAdapter();
    private scraperAdapter = new ScraperAdapter();

    getService(mode: DataSourceMode = DATA_SOURCE_CONFIG.mode): IFlightService & IHotelService {
        switch (mode) {
            case 'SCRAPER':
                return this.scraperAdapter;
            case 'API':
                // return new ApiAdapter();
                throw new Error("API Adapter not implemented yet");
            case 'MOCK':
            default:
                return this.mockAdapter;
        }
    }
}

export const dataFactory = new DataFactory();
