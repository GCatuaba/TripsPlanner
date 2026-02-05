import { Flight, Hotel } from "@/types";

export async function searchFlights(destination: string, date: string): Promise<Flight[]> {
    try {
        const params = new URLSearchParams({
            destination,
            date
        });

        const response = await fetch(`/api/flights?${params}`);
        if (!response.ok) throw new Error('Failed to fetch flights');

        return await response.json();
    } catch (error) {
        console.error('Error fetching flights:', error);
        return [];
    }
}

export async function searchHotels(destination: string, nights: number): Promise<Hotel[]> {
    try {
        const params = new URLSearchParams({
            destination,
            nights: nights.toString()
        });

        const response = await fetch(`/api/hotels?${params}`);
        if (!response.ok) throw new Error('Failed to fetch hotels');

        return await response.json();
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return [];
    }
}
