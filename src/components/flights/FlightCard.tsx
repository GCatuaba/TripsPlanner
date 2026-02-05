"use client";

import { Clock, ArrowRight } from 'lucide-react';
import { type Flight } from '@/types';

interface FlightCardProps {
    flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
    const formatTime = (isoString: string) => {
        return new Date(isoString).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    return (
        <div className="flight-card">
            <div className="flight-header">
                <div className="airline-info">
                    {/* Placeholder for logo - using text for now */}
                    <div className="logo-placeholder">{flight.airline.substring(0, 2)}</div>
                    <span className="airline-name">{flight.airline}</span>
                </div>
                <span className="flight-number">{flight.flightNumber}</span>
            </div>

            <div className="route-info">
                <div className="point departure">
                    <time className="time">{formatTime(flight.departure.time)}</time>
                    <span className="code">{flight.departure.airport}</span>
                    <span className="city">{flight.departure.city}</span>
                </div>

                <div className="flight-path">
                    <div className="duration">
                        <Clock size={14} />
                        <span>{flight.duration}</span>
                    </div>
                    <div className="path-line">
                        <div className="dot start" />
                        <div className="line" />
                        <PlaneIcon />
                        <div className="line" />
                        <div className="dot end" />
                    </div>
                    <span className="stops">
                        {flight.stops === 0 ? 'Direto' : `${flight.stops} parada(s)`}
                    </span>
                </div>

                <div className="point arrival">
                    <time className="time">{formatTime(flight.arrival.time)}</time>
                    <span className="code">{flight.arrival.airport}</span>
                    <span className="city">{flight.arrival.city}</span>
                </div>
            </div>

            <div className="flight-footer">
                <div className="price-tag">
                    <span className="label">Por passageiro</span>
                    <span className="price">{formatPrice(flight.price)}</span>
                </div>
                <button className="select-btn">
                    Selecionar
                    <ArrowRight size={16} />
                </button>
            </div>

            <style jsx>{`
        .flight-card {
          background: white;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: transform 0.2s, box-shadow 0.2s;
          border: 1px solid transparent;
        }

        .flight-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary-start);
        }

        .flight-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .airline-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-placeholder {
          width: 32px;
          height: 32px;
          background: var(--bg-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: var(--primary-start);
          font-size: 0.875rem;
        }

        .airline-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .flight-number {
          font-size: 0.875rem;
          color: var(--text-secondary);
          background: var(--bg-light);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .route-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .point {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .point.arrival {
          text-align: right;
          align-items: flex-end;
        }

        .time {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .code {
          font-weight: 600;
          color: var(--text-secondary);
        }

        .city {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .flight-path {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 1rem;
          gap: 0.5rem;
        }

        .duration {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .path-line {
          display: flex;
          align-items: center;
          width: 100%;
          color: #d1d5db;
        }

        .line {
          height: 2px;
          background: #d1d5db;
          flex: 1;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d1d5db;
        }

        .stops {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .flight-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-top: 1px solid #f3f4f6;
          padding-top: 1rem;
        }

        .price-tag {
          display: flex;
          flex-direction: column;
        }

        .label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-start);
        }

        .select-btn {
          background: var(--bg-light);
          color: var(--text-primary);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .select-btn:hover {
          background: var(--secondary-dark);
          color: white;
        }
      `}</style>
        </div>
    );
}

function PlaneIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 4px' }}>
            <path d="M2 12h20M22 12l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
