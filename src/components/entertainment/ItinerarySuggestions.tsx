"use client";

import { useState } from 'react';
import { Calendar, Camera, Coffee, Moon, Sun, Map, AlertCircle } from 'lucide-react';

interface ItinerarySuggestionsProps {
    destination: string;
    days: number;
}

export function ItinerarySuggestions({ destination, days }: ItinerarySuggestionsProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'daybyday'>('overview');

    // Mock data - in a real app this would come from an API or AI generator
    const attractions = [
        { name: 'Centro Histórico', type: 'History', icon: <Camera size={18} /> },
        { name: 'Parque Central', type: 'Nature', icon: <Sun size={18} /> },
        { name: 'Museu de Arte', type: 'Culture', icon: <Camera size={18} /> },
        { name: 'Vida Noturna', type: 'Nightlife', icon: <Moon size={18} /> },
        { name: 'Gastronomia Local', type: 'Food', icon: <Coffee size={18} /> },
    ];

    return (
        <div className="itinerary-section">
            <div className="section-header">
                <h3 className="title">
                    <Map className="icon" size={24} />
                    Sugestão de Roteiro
                </h3>
                <p className="subtitle">O que fazer em {destination} durante {days} dias.</p>
            </div>

            <div className="tabs">
                <button
                    className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Visão Geral
                </button>
                <button
                    className={`tab-btn ${activeTab === 'daybyday' ? 'active' : ''}`}
                    onClick={() => setActiveTab('daybyday')}
                >
                    Dia a Dia
                </button>
            </div>

            <div className="content-area">
                {activeTab === 'overview' ? (
                    <div className="attractions-grid">
                        {attractions.map((attr, index) => (
                            <div key={index} className="attraction-card">
                                <div className="icon-box">{attr.icon}</div>
                                <span className="attr-name">{attr.name}</span>
                                <span className="attr-type">{attr.type}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="timeline">
                        {Array.from({ length: Math.min(days, 5) }).map((_, i) => (
                            <div key={i} className="timeline-item">
                                <div className="day-badge">Dia {i + 1}</div>
                                <div className="day-content">
                                    <h4>Exploração da Cidade</h4>
                                    <p>Manhã: Visita aos pontos turísticos principais.</p>
                                    <p>Tarde: Almoço típico e passeio no parque.</p>
                                    <p>Noite: Jantar e caminhada no centro.</p>
                                </div>
                            </div>
                        ))}
                        {days > 5 && <div className="more-days">e mais {days - 5} dias de aventuras...</div>}
                    </div>
                )}
            </div>

            <div className="emergency-fund">
                <div className="emergency-icon">
                    <AlertCircle size={20} />
                </div>
                <div className="emergency-text">
                    <strong>Reserva de Emergência Recomendada:</strong>
                    <p>Sugerimos reservar aprox. US$ 500 para imprevistos médicos ou logísticos.</p>
                </div>
            </div>

            <style jsx>{`
        .itinerary-section {
          background: white;
          border-radius: var(--radius-md);
          padding: 2rem;
          box-shadow: var(--shadow-md);
          margin-top: 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--secondary-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: var(--text-secondary);
        }

        .tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 1px;
        }

        .tab-btn {
          background: none;
          border: none;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
        }

        .tab-btn.active {
          color: var(--primary-start);
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--primary-start);
          border-radius: 3px 3px 0 0;
        }

        .attractions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 1rem;
        }

        .attraction-card {
          background: var(--bg-light);
          padding: 1.5rem;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
          transition: transform 0.2s;
        }

        .attraction-card:hover {
          transform: translateY(-5px);
          background: #fff0e6;
        }

        .icon-box {
          color: var(--primary-start);
          background: white;
          padding: 0.75rem;
          border-radius: 50%;
          box-shadow: var(--shadow-sm);
          margin-bottom: 0.5rem;
        }

        .attr-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .attr-type {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          padding-left: 1rem;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 23px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #e5e7eb;
        }

        .timeline-item {
          display: flex;
          gap: 1.5rem;
          position: relative;
        }

        .day-badge {
          background: var(--primary-start);
          color: white;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          flex-shrink: 0;
        }

        .day-content h4 {
          font-weight: 700;
          color: var(--secondary-dark);
          margin-bottom: 0.5rem;
        }

        .day-content p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }

        .more-days {
          text-align: center;
          color: var(--text-secondary);
          font-style: italic;
          padding: 1rem;
        }

        .emergency-fund {
          margin-top: 2rem;
          background: #fef2f2;
          border: 1px solid #fee2e2;
          padding: 1rem;
          border-radius: var(--radius-sm);
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .emergency-icon {
          color: var(--error);
        }

        .emergency-text strong {
          color: #991b1b;
          display: block;
          margin-bottom: 0.25rem;
        }

        .emergency-text p {
          color: #7f1d1d;
          font-size: 0.9rem;
          margin: 0;
        }
      `}</style>
        </div>
    );
}
