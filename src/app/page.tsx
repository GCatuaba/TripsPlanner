"use client";

import { useState, useRef, useEffect } from 'react';
import { useTripPlanner } from '@/hooks/useTripPlanner';
import { TripTypeSelector } from '@/components/trip/TripTypeSelector';
import { DestinationCard } from '@/components/trip/DestinationCard';
import { TravelersSelector } from '@/components/trip/TravelersSelector';
import { CabinClassSelector } from '@/components/trip/CabinClassSelector';
import { BudgetCalculator } from '@/components/food/BudgetCalculator';
import { FlightCard } from '@/components/flights/FlightCard';
import { HotelCard } from '@/components/accommodation/HotelCard';
import { ItinerarySuggestions } from '@/components/entertainment/ItinerarySuggestions';
import { TripSummary } from '@/components/summary/TripSummary';
import { Plane, Building, ArrowRight, Calendar } from 'lucide-react';

/* Jadoo Components */
import { Hero } from '@/components/landing/Hero';
import { Services } from '@/components/landing/Services';
import { Destinations } from '@/components/landing/Destinations';
import { BookingSteps } from '@/components/landing/BookingSteps';
import { useTranslation } from '@/context/LanguageContext';
import { searchFlights, searchHotels } from '@/lib/api';
import { type Flight, type Hotel } from '@/types';

export default function Home() {
  const { state, actions, isValid } = useTripPlanner();
  const [mode, setMode] = useState<'landing' | 'planning' | 'results'>('landing');
  const plannerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [budget, setBudget] = useState({ food: 0, extras: 0, total: 0 });

  // Dynamic duration calculation
  const [displayDuration, setDisplayDuration] = useState(5);

  const totalTravelers = state.travelers.adults + state.travelers.children + state.travelers.babies;

  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return 5;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e.getTime() - s.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  // Handle Search Widget Action from Hero
  const handleStartPlanning = async (type: 'flight' | 'hotel', destinations: any[]) => {
    console.log("Starting planning from widget:", { type, destinations });

    // 1. Update global state
    actions.updateDestinations(destinations);

    // 2. Calculate duration from the first destination dates
    const first = destinations[0];
    const duration = calculateDuration(first.startDate, first.endDate);
    setDisplayDuration(duration);

    // 3. Immediate search
    await doSearchWithParams(first.city, first.startDate, duration);

    // 4. Smooth scroll
    setTimeout(() => {
      plannerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const doSearchWithParams = async (city: string, date: string, duration: number) => {
    setLoading(true);
    setSearched(true);
    setMode('results');
    setFlights([]);
    setHotels([]);

    try {
      const [flightResults, hotelResults] = await Promise.all([
        searchFlights(city, date),
        searchHotels(city, duration)
      ]);
      setFlights(flightResults);
      setHotels(hotelResults);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = async () => {
    if (!isValid) return;

    const firstDest = state.destinations[0];
    if (firstDest?.city && firstDest?.startDate) {
      const duration = calculateDuration(firstDest.startDate, firstDest.endDate);
      setDisplayDuration(duration);
      doSearchWithParams(firstDest.city, firstDest.startDate, duration);
    }
  };

  // Calculate totals for summary
  const flightPrice = flights.length > 0 ? flights[0].price : 0;
  const hotelPrice = hotels.length > 0 ? hotels[0].totalPrice : 0;
  const estimatedFlightTotal = flightPrice * totalTravelers;
  const estimatedHotelTotal = hotelPrice;

  return (
    <div className="home-container">
      {/* 1. Jadoo Hero - Always visible at top */}
      <Hero onStart={handleStartPlanning} />

      {/* 2. Services, Destinations, Booking - Hidden when in RESULTS mode to focus on search */}
      {mode === 'landing' && (
        <>
          <Services />
          <Destinations />
          <BookingSteps />
        </>
      )}

      {/* 3. Trip Planner Wizard / Results Section */}
      {(mode === 'planning' || mode === 'results') && (
        <section className="planner-section" ref={plannerRef}>
          <div className="container">
            <div className="section-header fade-up">
              <span className="subtitle">{t.booking.subtitle}</span>
              <h2 className="title">{t.hero.cta === 'Saiba mais' ? 'Planeje sua Viagem Perfeita' : 'Plan Your Perfect Trip'}</h2>
            </div>

            <div className="flow-container">
              {!searched ? (
                <div className="wizard-wrapper">
                  <section className="step-section fade-up">
                    <TripTypeSelector selected={state.tripType} onSelect={actions.updateTripType} />
                  </section>

                  {state.tripType && (
                    <>
                      <div className="connector" />
                      <section className="step-section fade-up">
                        <DestinationCard destinations={state.destinations} onChange={actions.updateDestinations} />
                      </section>
                      <div className="connector" />
                      <section className="step-section fade-up">
                        <TravelersSelector counts={state.travelers} onChange={actions.updateTravelers} />
                      </section>
                      <div className="connector" />
                      <section className="step-section fade-up">
                        <CabinClassSelector selected={state.cabinClass} onSelect={actions.updateCabinClass} />
                      </section>

                      <section className="action-section fade-up">
                        <button className="btn-primary search-btn" disabled={!isValid} onClick={handleSearchClick}>
                          <span>{t.search.btn_search}</span>
                          <ArrowRight size={20} />
                        </button>
                      </section>
                    </>
                  )}
                </div>
              ) : (
                <div className="results-container fade-up">
                  <div className="results-header">
                    <div className="results-title-group">
                      <h2 className="results-title">
                        {t.search.tab_flights} & {t.search.tab_hotels} em <span className="highlight">{state.destinations[0]?.city}</span>
                      </h2>
                      <div className="trip-period">
                        <Calendar size={16} />
                        <span>{displayDuration} {t.booking.stay_duration}</span>
                      </div>
                    </div>
                    <button className="btn-text" onClick={() => { setSearched(false); setMode('landing'); }}>
                      Nova busca
                    </button>
                  </div>

                  {loading ? (
                    <div className="loading-state">
                      <Plane className="animate-pulse" size={48} color="var(--primary-orange)" />
                      <p>Searching...</p>
                    </div>
                  ) : (
                    <>
                      <div className="results-grid">
                        <div className="results-column">
                          <h3 className="column-title"><Plane size={20} /> {t.search.tab_flights}</h3>
                          <div className="cards-list">
                            {flights.length > 0 ? (
                              flights.map(flight => <FlightCard key={flight.id} flight={flight} />)
                            ) : (
                              <p className="empty-state">No flights found.</p>
                            )}
                          </div>
                        </div>

                        <div className="results-column">
                          <h3 className="column-title"><Building size={20} /> {t.search.tab_hotels} ({displayDuration} {t.booking.stay_duration})</h3>
                          <div className="cards-list">
                            {hotels.length > 0 ? (
                              hotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)
                            ) : (
                              <p className="empty-state">No hotels found.</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="budget-section fade-up">
                        <BudgetCalculator days={displayDuration} travelers={totalTravelers} onBudgetChange={setBudget} />
                      </div>

                      <div className="itinerary-section fade-up">
                        <ItinerarySuggestions destination={state.destinations[0]?.city} days={displayDuration} />
                      </div>

                      <div className="summary-section fade-up">
                        <TripSummary
                          flightCost={estimatedFlightTotal}
                          hotelCost={estimatedHotelTotal}
                          foodCost={budget.food}
                          extrasCost={budget.extras}
                          travelers={totalTravelers}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. Secondary Landing Sections - If we want them always visible at bottom too (scrolling experience) */}
      {mode === 'results' && (
        <div className="results-footer-sections">
          <Services />
          <Destinations />
        </div>
      )}

      <style jsx>{`
        .home-container {
            width: 100%;
        }

        .planner-section {
          background: #f9f9f9;
          padding: 8rem 0;
          min-height: 80vh;
          scroll-margin-top: 50px;
        }

        .results-title-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .trip-period {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-secondary);
            font-size: 1.1rem;
            font-weight: 500;
        }

        .section-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .subtitle {
          color: var(--primary-orange);
          font-weight: 600;
          font-size: 1.1rem;
          display: block;
        }

        .title {
          font-size: 3rem;
          color: var(--text-primary);
        }

        .flow-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .wizard-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }

        .connector {
          width: 2px;
          height: 40px;
          background: #eee;
          margin: 0 auto;
        }

        .action-section {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }

        .search-btn {
          font-size: 1.25rem;
          padding: 1rem 2.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3rem;
        }

        .results-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
        }

        .highlight {
          color: var(--primary-orange);
        }

        .btn-text {
          background: none;
          border: none;
          text-decoration: underline;
          color: var(--text-secondary);
          font-size: 1rem;
          cursor: pointer;
        }

        .results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }
        
        .column-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          color: var(--text-primary);
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #eee;
        }
        
        .cards-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 5rem;
          color: var(--text-secondary);
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.5; transform: scale(0.9); }
        }
        
        @media (max-width: 1024px) {
          .results-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
