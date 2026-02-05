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
import { Plane, Building, ArrowRight, Calendar, MapPin } from 'lucide-react';

/* Jadoo Components */
import { Hero } from '@/components/landing/Hero';
import { Services } from '@/components/landing/Services';
import { Destinations } from '@/components/landing/Destinations';
import { BookingSteps } from '@/components/landing/BookingSteps';
import { useTranslation } from '@/context/LanguageContext';
import { searchFlights, searchHotels } from '@/lib/api';
import { type Flight, type Hotel } from '@/types';

interface StopResult {
  city: string;
  flights: Flight[];
  hotels: Hotel[];
  duration: number;
}

export default function Home() {
  const { state, actions, isValid } = useTripPlanner();
  const [mode, setMode] = useState<'landing' | 'planning' | 'results'>('landing');
  const plannerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [itineraryResults, setItineraryResults] = useState<StopResult[]>([]);
  const [budget, setBudget] = useState({ food: 0, extras: 0, total: 0 });
  const [totalTripDuration, setTotalTripDuration] = useState(0);

  const totalTravelers = state.travelers.adults + state.travelers.children + state.travelers.babies;

  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e.getTime() - s.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const handleStartPlanning = async (type: 'flight' | 'hotel', destinations: any[]) => {
    actions.updateDestinations(destinations);
    await performFullSearch(destinations);

    setTimeout(() => {
      plannerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const performFullSearch = async (destEntries: any[]) => {
    setLoading(true);
    setSearched(true);
    setMode('results');
    setItineraryResults([]);

    try {
      const results: StopResult[] = [];
      let totalDuration = 0;

      for (const dest of destEntries) {
        const duration = calculateDuration(dest.startDate, dest.endDate);
        totalDuration += duration;

        const [flightResults, hotelResults] = await Promise.all([
          searchFlights(dest.city, dest.startDate),
          searchHotels(dest.city, duration)
        ]);

        results.push({
          city: dest.city,
          flights: flightResults,
          hotels: hotelResults,
          duration
        });
      }

      setItineraryResults(results);
      setTotalTripDuration(totalDuration);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = async () => {
    if (!isValid) return;
    performFullSearch(state.destinations);
  };

  // Calculate aggregated totals
  const totalFlightCost = itineraryResults.reduce((acc, stop) => {
    const price = stop.flights.length > 0 ? stop.flights[0].price : 0;
    return acc + (price * totalTravelers);
  }, 0);

  const totalHotelCost = itineraryResults.reduce((acc, stop) => {
    const price = stop.hotels.length > 0 ? stop.hotels[0].totalPrice : 0;
    return acc + price;
  }, 0);

  return (
    <div className="home-container">
      <Hero onStart={handleStartPlanning} />

      {mode === 'landing' && (
        <>
          <Services />
          <Destinations />
          <BookingSteps />
        </>
      )}

      {(mode === 'planning' || mode === 'results') && (
        <section className="planner-section" ref={plannerRef}>
          <div className="container">
            <div className="section-header fade-up">
              <span className="subtitle">{t.booking.subtitle}</span>
              <h2 className="title">
                {t.hero.cta === 'Saiba mais' ? 'Planeje sua Viagem Perfeita' : 'Plan Your Perfect Trip'}
              </h2>
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
                        {t.booking.multidestination}
                      </h2>
                      <div className="trip-period">
                        <Calendar size={16} />
                        <span>{totalTripDuration} {t.booking.stay_duration}</span>
                      </div>
                    </div>
                    <button className="btn-text" onClick={() => { setSearched(false); setMode('landing'); }}>
                      Nova busca
                    </button>
                  </div>

                  {loading ? (
                    <div className="loading-state">
                      <Plane className="animate-pulse" size={48} color="var(--primary-orange)" />
                      <p>Searching for all destinations...</p>
                    </div>
                  ) : (
                    <>
                      <div className="itinerary-timeline">
                        {itineraryResults.map((stop, idx) => (
                          <div className="stop-block fade-up" key={idx} style={{ animationDelay: `${idx * 0.1}s` }}>
                            <div className="stop-label">
                              <div className="stop-badge">STOP #{idx + 1}</div>
                              <h3 className="stop-city"><MapPin size={22} color="var(--primary-orange)" /> {stop.city}</h3>
                              <span className="stop-stay">({stop.duration} {t.booking.stay_duration})</span>
                            </div>

                            <div className="stop-content">
                              <div className="results-grid">
                                <div className="results-column">
                                  <h4 className="column-title-small"><Plane size={18} /> {t.search.tab_flights}</h4>
                                  <div className="cards-list">
                                    {stop.flights.length > 0 ? (
                                      <FlightCard flight={stop.flights[0]} />
                                    ) : (
                                      <p className="empty-state">No flights found.</p>
                                    )}
                                  </div>
                                </div>
                                <div className="results-column">
                                  <h4 className="column-title-small"><Building size={18} /> {t.search.tab_hotels}</h4>
                                  <div className="cards-list">
                                    {stop.hotels.length > 0 ? (
                                      <HotelCard hotel={stop.hotels[0]} />
                                    ) : (
                                      <p className="empty-state">No hotels found.</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="budget-section fade-up">
                        <BudgetCalculator days={totalTripDuration} travelers={totalTravelers} onBudgetChange={setBudget} />
                      </div>

                      <div className="itinerary-section fade-up">
                        <ItinerarySuggestions destination={state.destinations[0]?.city} days={totalTripDuration} />
                      </div>

                      <div className="summary-section fade-up">
                        <TripSummary
                          flightCost={totalFlightCost}
                          hotelCost={totalHotelCost}
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

        .itinerary-timeline {
            display: flex;
            flex-direction: column;
            gap: 3rem;
            margin-bottom: 4rem;
        }

        .stop-block {
            background: white;
            border-radius: 20px;
            padding: 2.5rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
            border: 1px solid #f0f0f0;
        }

        .stop-label {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid #eee;
            padding-bottom: 1rem;
        }

        .stop-badge {
            background: #FFF1DA;
            color: var(--primary-orange);
            font-weight: 700;
            padding: 0.4rem 1rem;
            border-radius: 8px;
            font-size: 0.8rem;
            letter-spacing: 0.05em;
        }

        .stop-city {
            font-size: 1.75rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin: 0;
            color: var(--text-primary);
        }

        .stop-stay {
            color: var(--text-secondary);
            font-weight: 500;
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

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3rem;
        }

        .results-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
        }

        .results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .column-title-small {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.25rem;
            margin-bottom: 1.25rem;
            color: var(--text-primary);
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
          .stop-label { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
        }
        
        /* Utility styles from previous */
        .subtitle { color: var(--primary-orange); font-weight: 600; font-size: 1.1rem; display: block; }
        .title { font-size: 3rem; color: var(--text-primary); }
        .section-header { text-align: center; margin-bottom: 3rem; }
        .btn-text { background: none; border: none; text-decoration: underline; color: var(--text-secondary); cursor: pointer; }
        .btn-primary.search-btn { font-size: 1.25rem; padding: 1rem 2.5rem; display: flex; align-items: center; gap: 1rem; }
        .connector { width: 2px; height: 40px; background: #eee; margin: 0 auto; }
        .flow-container { max-width: 1200px; margin: 0 auto; }
        .wizard-wrapper { max-width: 800px; margin: 0 auto; }
      `}</style>
    </div>
  );
}
