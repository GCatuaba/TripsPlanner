import { Flight, Hotel } from '@/types';

export interface IFlightService {
    searchFlights(origin: string, destination: string, date: string): Promise<Flight[]>;
}

export interface IHotelService {
    searchHotels(destination: string, nights: number): Promise<Hotel[]>;
}
