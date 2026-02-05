import { Flight, Hotel } from '@/types';
import { IFlightService, IHotelService } from '../interfaces';

// Helper functions (copied from original route)
function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const AIRLINES = [
    { name: 'Latam', logo: '/images/latam.png' },
    { name: 'Azul', logo: '/images/azul.png' },
    { name: 'Gol', logo: '/images/gol.png' },
    { name: 'Emirates', logo: '/images/emirates.png' },
    { name: 'American Airlines', logo: '/images/aa.png' },
];

const AMENITIES_POOL = ['Wi-Fi Grátis', 'Piscina', 'Café da Manhã', 'Academia', 'Spa', 'Estacionamento', 'Bar', 'Restaurante'];

export class MockAdapter implements IFlightService, IHotelService {

    async searchFlights(origin: string, destination: string, date: string): Promise<Flight[]> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const flights: Flight[] = [];
        const count = getRandomInt(3, 6);

        for (let i = 0; i < count; i++) {
            const airline = AIRLINES[getRandomInt(0, AIRLINES.length - 1)];
            const priceBase = 500 + getRandomInt(0, 2000);
            const stops = getRandomInt(0, 2);

            const departureTime = new Date(date);
            departureTime.setHours(getRandomInt(6, 22), getRandomInt(0, 59));

            const arrivalTime = new Date(departureTime);
            arrivalTime.setHours(arrivalTime.getHours() + getRandomInt(2, 14));

            flights.push({
                id: crypto.randomUUID(),
                airline: airline.name,
                airlineLogo: airline.logo,
                flightNumber: `${airline.name.substring(0, 2).toUpperCase()}${getRandomInt(100, 999)}`,
                departure: {
                    airport: 'GRU',
                    city: 'São Paulo',
                    time: departureTime.toISOString()
                },
                arrival: {
                    airport: destination.substring(0, 3).toUpperCase(),
                    city: destination, // Simplified
                    time: arrivalTime.toISOString()
                },
                duration: `${getRandomInt(2, 14)}h ${getRandomInt(0, 59)}m`,
                price: priceBase + (stops * -100),
                currency: 'BRL',
                stops,
                cabinClass: 'economy'
            });
        }
        return flights.sort((a, b) => a.price - b.price);
    }

    async searchHotels(destination: string, nights: number = 1): Promise<Hotel[]> { // Note: interface signature change needed or careful with args
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const hotels: Hotel[] = [];
        const count = getRandomInt(3, 5);

        for (let i = 0; i < count; i++) {
            const pricePerNight = 200 + getRandomInt(0, 800);
            const rating = (3.5 + Math.random() * 1.5).toFixed(1);

            hotels.push({
                id: crypto.randomUUID(),
                name: `Hotel ${destination} ${['Plaza', 'Resort', 'Suites', 'Palace', 'Boutique'][getRandomInt(0, 4)]}`,
                image: `/images/placeholder-hotel.jpg`,
                rating: parseFloat(rating),
                reviews: getRandomInt(50, 2000),
                pricePerNight,
                totalPrice: pricePerNight * nights,
                currency: 'BRL',
                amenities: AMENITIES_POOL.sort(() => 0.5 - Math.random()).slice(0, getRandomInt(3, 6)),
                location: `Centro, ${destination}`
            });
        }
        return hotels.sort((a, b) => a.totalPrice - b.totalPrice);
    }
}
