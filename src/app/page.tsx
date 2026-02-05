"use client";

import { useState, useRef } from 'react';
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
import { Plane, Building, ArrowRight } from 'lucide-react';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [mode, setMode] = useState<'landing' | 'planning' | 'results'>('landing');
  const plannerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [budget, setBudget] = useState({ food: 0, extras: 0, total: 0 });

  const totalTravelers = state.travelers.adults + state.travelers.children + state.travelers.babies;
  const duration = 5;

  const handleStartPlanning = (type: 'flight' | 'hotel', destination: string, date: string) => {
    // Updates state from Widget
    const newDestinations = [{
      id: crypto.randomUUID(),
      city: destination,
      startDate: date,
      endDate: '' // Default empty for now
    }];
    actions.updateDestinations(newDestinations);

    // Immediate search with params
    doSearchWithParams(destination, date);

    setTimeout(() => {
      plannerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const doSearchWithParams = async (city: string, date: string) => {
    setLoading(true);
    setSearched(true);
    setMode('results');
    setFlights([]);
    setHotels([]);

    try {
      const [flightResults, hotelResults] = await Promise.all([
        searchFlights(city, date),
        // searchHotels needs duration (nights), defaulting to 5
        searchHotels(city, 5)
      ]);
      setFlights(flightResults);
      setHotels(hotelResults);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!isValid) return;  // Wizard validation

    setLoading(true);
    setSearched(true);
    setMode('results');
    setFlights([]);
    setHotels([]);

    const firstDest = state.destinations[0];

    try {
      if (firstDest && firstDest.city && firstDest.startDate) {
        const [flightResults, hotelResults] = await Promise.all([
          searchFlights(firstDest.city, firstDest.startDate),
          searchHotels(firstDest.city, duration)
        ]);
        setFlights(flightResults);
        setHotels(hotelResults);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals for summary (Mock)
  const flightPrice = flights.length > 0 ? flights[0].price : 0;
  const hotelPrice = hotels.length > 0 ? hotels[0].totalPrice : 0;
  const estimatedFlightTotal = flightPrice * totalTravelers;
  const estimatedHotelTotal = hotelPrice;

  return (
    <div className="home-container">
      {/* Jadoo Landing Page Sections */}
      <Hero onStart={handleStartPlanning} />
      <Services />
      <Destinations />
      <BookingSteps />

      {/* Trip Planner Wizard Section */}
      {(mode === 'planning' || mode === 'results') && (
        <section className="planner-section" ref={plannerRef}>
          <div className="container">
            <div className="section-header fade-up">
              <span className="subtitle">Easy & Fast</span>
              <h2 className="title">Plan Your Perfect Trip</h2>
            </div>

            <div className="flow-container">
              {!searched ? (
                <div className="wizard-wrapper">
                  <section className="step-section fade-up" style={{ '--delay': '0.1s' } as any}>
                    <TripTypeSelector
                      selected={state.tripType}
                      onSelect={actions.updateTripType}
                    />
                  </section>

                  {state.tripType && (
                    <>
                      <section className="step-section fade-up" style={{ '--delay': '0.2s' } as any}>
                        <div className="connector" />
                        <DestinationCard
                          destinations={state.destinations}
                          onChange={actions.updateDestinations}
                        />
                      </section>

                      <section className="step-section fade-up" style={{ '--delay': '0.3s' } as any}>
                        <div className="connector" />
                        <TravelersSelector
                          counts={state.travelers}
                          onChange={actions.updateTravelers}
                        />
                      </section>

                      <section className="step-section fade-up" style={{ '--delay': '0.4s' } as any}>
                        <div className="connector" />
                        <CabinClassSelector
                          selected={state.cabinClass}
                          onSelect={actions.updateCabinClass}
                        />
                      </section>

                      <section className="action-section fade-up" style={{ '--delay': '0.5s' } as any}>
                        <button
                          className="btn-primary search-btn"
                          disabled={!isValid}
                          onClick={handleSearch}
                        >
                          <span>Buscar Melhores Opções</span>
                          <ArrowRight size={20} />
                        </button>
                      </section>
                    </>
                  )}
                </div>
              ) : (
                <div className="results-container fade-up">
                  <div className="results-header">
                    <h2 className="results-title">
                      Opções para <span className="highlight">{state.destinations[0]?.city}</span>
                    </h2>
                    <button className="btn-text" onClick={() => { setSearched(false); setMode('planning'); }}>
                      Nova busca
                    </button>
                  </div>

                  {loading ? (
                    <div className="loading-state">
                      <Plane className="animate-pulse" size={48} color="var(--primary-start)" />
                      <p>Pesquisando voos e hotéis...</p>
                    </div>
                  ) : (
                    <>
                      <div className="results-grid">
                        <div className="results-column">
                          <h3 className="column-title">
                            <Plane size={20} />
                            Voos Disponíveis
                          </h3>
                          <div className="cards-list">
                            {flights.length > 0 ? (
                              flights.map(flight => (
                                <FlightCard key={flight.id} flight={flight} />
                              ))
                            ) : (
                              <p className="empty-state">Nenhum voo encontrado.</p>
                            )}
                          </div>
                        </div>

                        <div className="results-column">
                          <h3 className="column-title">
                            <Building size={20} />
                            Sugestões de Hospedagem ({duration} noites)
                          </h3>
                          <div className="cards-list">
                            {hotels.length > 0 ? (
                              hotels.map(hotel => (
                                <HotelCard key={hotel.id} hotel={hotel} />
                              ))
                            ) : (
                              <p className="empty-state">Nenhuma opção de hospedagem.</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="budget-section fade-up" style={{ animationDelay: '0.2s' }}>
                        <BudgetCalculator
                          days={duration}
                          travelers={totalTravelers}
                          onBudgetChange={setBudget}
                        />
                      </div>

                      <div className="itinerary-section fade-up" style={{ animationDelay: '0.3s' }}>
                        <ItinerarySuggestions
                          destination={state.destinations[0]?.city}
                          days={duration}
                        />
                      </div>

                      <div className="summary-section fade-up" style={{ animationDelay: '0.4s' }}>
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

      {/* Default Landing Sections (Always visible or hidden on results? Keeping visible as per single page design) */}
      <div className={mode === 'results' ? 'dimmed' : ''}>
        <Services />
        <Destinations />
        <BookingSteps />
      </div>

      <style jsx>{`
        .home-container {
            width: 100%;
            overflow-x: hidden;
        }

        .planner-section {
          background: #f9f9f9;
          padding: 5rem 0;
          min-height: 80vh;
          scroll-margin-top: 50px;
        }

        .section-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .subtitle {
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 1.1rem;
          display: block;
        }

        .title {
          font-size: 2.5rem;
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
        
        .step-section {
          position: relative;
          margin-bottom: 1rem;
        }

        .connector {
          width: 2px;
          height: 30px; /* Shorter for tighter feel */
          background: linear-gradient(to bottom, transparent, var(--primary-start));
          margin: 0 auto;
          opacity: 0.3;
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
          // keeping btn-primary style from globals
        }

        .search-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #d1d5db;
          box-shadow: none;
        }

        .results-container {
          animation: fadeUp 0.5s ease-out;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          max-width: 900px;
          margin-inline: auto;
        }

        .results-title {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .highlight {
          color: var(--primary-start);
          text-decoration: underline;
        }

        .btn-text {
          background: none;
          border: none;
          text-decoration: underline;
          color: var(--text-secondary);
          font-size: 0.875rem;
          cursor: pointer;
        }

        .results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .budget-section, .itinerary-section, .summary-section {
          max-width: 900px;
          margin: 2rem auto 0;
        }
        
        .column-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
          color: var(--secondary-dark);
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #eee;
        }
        
        .cards-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 4rem;
          color: var(--text-secondary);
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }

        .empty-state {
            color: var(--text-secondary);
            font-style: italic;
        }

        .dimmed {
            filter: grayscale(0.5) opacity(0.7);
            pointer-events: none;
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.5; transform: scale(0.9); }
        }
        
        @media (max-width: 1024px) {
          .results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
