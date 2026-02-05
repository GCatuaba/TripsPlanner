import { Flight, Hotel } from '@/types';
import { IFlightService, IHotelService } from '../interfaces';
import { DATA_SOURCE_CONFIG } from '@/config/data-source';
import puppeteer from 'puppeteer';

export class ScraperAdapter implements IFlightService, IHotelService {

    async searchFlights(origin: string, destination: string, date: string): Promise<Flight[]> {
        console.log(`[Scraper] Starting flight search from ${origin} to ${destination} on ${date}`);

        // Example: Using Puppeteer to search on a travel site (Pseudocode implementation for demo)
        // Implementing a real robust scraper for Google Flights/Skyscanner is very complex due to anti-bot.
        // We will demonstrate the capability by launching the browser and extracting a formatted mock result 
        // to prove the architecture works.

        let browser;
        try {
            browser = await puppeteer.launch({
                headless: DATA_SOURCE_CONFIG.scraper?.headless ?? true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            const page = await browser.newPage();

            // Set User Agent to avoid immediate blocking
            await page.setUserAgent(DATA_SOURCE_CONFIG.scraper?.userAgent || 'Mozilla/5.0...');

            // DEMO: We will visit a generic page or google to prove connectivity
            // In a real scenario, you would visit: `https://www.google.com/travel/flights?q=Flights+to+${destination}`
            await page.goto('https://example.com', { waitUntil: 'networkidle2' });

            const title = await page.title();
            console.log(`[Scraper] Visited page: ${title}`);

            // RETURN "SCRAPED" DATA (simulated for stability)
            // In the future, use page.evaluate() to extract real selectors

            return [
                {
                    id: 'scraped-1',
                    airline: 'Scraper Airways',
                    airlineLogo: '',
                    flightNumber: 'SCR123',
                    departure: { airport: 'GRU', city: 'São Paulo', time: `${date}T10:00:00` },
                    arrival: { airport: 'DST', city: destination, time: `${date}T18:00:00` },
                    duration: '8h 00m',
                    price: 1234,
                    currency: 'BRL',
                    stops: 0,
                    cabinClass: 'economy'
                }
            ];

        } catch (error) {
            console.error('[Scraper] Error:', error);
            throw new Error('Scraping failed');
        } finally {
            if (browser) await browser.close();
        }
    }

    async searchHotels(destination: string, nights: number): Promise<Hotel[]> {
        console.log(`[Scraper] Searching hotels in ${destination}`);
        // Similar implementation for hotels
        return [
            {
                id: 'scraped-hotel-1',
                name: `Scraped Hotel in ${destination}`,
                image: '',
                rating: 4.5,
                reviews: 100,
                pricePerNight: 500,
                totalPrice: 500 * nights,
                currency: 'BRL',
                amenities: ['Scraped Wifi', 'Realtime Data'],
                location: 'Web Scraped Location'
            }
        ];
    }
}
