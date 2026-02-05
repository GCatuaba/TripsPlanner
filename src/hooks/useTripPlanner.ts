import { useState } from 'react';
import type { TripType } from '@/components/trip/TripTypeSelector';
import type { TravelerCounts } from '@/components/trip/TravelersSelector';
import type { CabinClass } from '@/components/trip/CabinClassSelector';

export interface Destination {
    id: string;
    city: string;
    startDate: string;
    endDate: string;
}

export interface TripState {
    tripType?: TripType;
    destinations: Destination[];
    travelers: TravelerCounts;
    cabinClass?: CabinClass;
}

const DEFAULT_DESTINATIONS: Destination[] = [
    { id: '1', city: '', startDate: '', endDate: '' }
];

const DEFAULT_TRAVELERS: TravelerCounts = {
    adults: 1,
    children: 0,
    babies: 0
};

export function useTripPlanner() {
    const [state, setState] = useState<TripState>({
        destinations: DEFAULT_DESTINATIONS,
        travelers: DEFAULT_TRAVELERS
    });

    const updateTripType = (type: TripType) => {
        setState(prev => ({ ...prev, tripType: type }));
    };

    const updateDestinations = (destinations: Destination[]) => {
        setState(prev => ({ ...prev, destinations }));
    };

    const updateTravelers = (counts: TravelerCounts) => {
        setState(prev => ({ ...prev, travelers: counts }));
    };

    const updateCabinClass = (cabin: CabinClass) => {
        setState(prev => ({ ...prev, cabinClass: cabin }));
    };

    const isValid = () => {
        return (
            !!state.tripType &&
            state.destinations.every(d => d.city && d.startDate && d.endDate) &&
            !!state.cabinClass
        );
    };

    return {
        state,
        actions: {
            updateTripType,
            updateDestinations,
            updateTravelers,
            updateCabinClass
        },
        isValid: isValid()
    };
}
