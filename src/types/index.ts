export interface Flight {
    id: string;
    airline: string;
    airlineLogo: string;
    flightNumber: string;
    departure: {
        airport: string;
        city: string;
        time: string; // ISO string
    };
    arrival: {
        airport: string;
        city: string;
        time: string; // ISO string
    };
    duration: string;
    price: number;
    currency: string;
    stops: number;
    cabinClass: string;
}

export interface Hotel {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviews: number;
    pricePerNight: number;
    totalPrice: number;
    currency: string;
    amenities: string[];
    location: string;
}

export interface SearchParams {
    origin?: string;
    destination: string;
    startDate: string;
    endDate: string;
    travelers: {
        adults: number;
        children: number;
        babies: number;
    };
    cabinClass: string;
}
