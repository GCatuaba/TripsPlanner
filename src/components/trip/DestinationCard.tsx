"use client";

import { useState } from 'react';
import { MapPin, Calendar, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Destination {
    id: string;
    city: string;
    startDate: string;
    endDate: string;
}

interface DestinationCardProps {
    destinations: Destination[];
    onChange: (destinations: Destination[]) => void;
}

export function DestinationCard({ destinations, onChange }: DestinationCardProps) {
    const addDestination = () => {
        onChange([
            ...destinations,
            {
                id: crypto.randomUUID(),
                city: '',
                startDate: '',
                endDate: ''
            }
        ]);
    };

    const removeDestination = (id: string) => {
        onChange(destinations.filter(d => d.id !== id));
    };

    const updateDestination = (id: string, field: keyof Destination, value: string) => {
        onChange(destinations.map(d =>
            d.id === id ? { ...d, [field]: value } : d
        ));
    };

    return (
        <div className="destinations-container">
            <h2 className="section-title">Para onde vamos?</h2>

            <div className="destinations-list">
                {destinations.map((dest, index) => (
                    <div key={dest.id} className="destination-item fade-in">
                        <div className="destination-header">
                            <span className="destination-number">Destino {index + 1}</span>
                            {destinations.length > 1 && (
                                <button
                                    onClick={() => removeDestination(dest.id)}
                                    className="remove-btn"
                                    aria-label="Remover destino"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        <div className="inputs-grid">
                            <div className="input-group full-width">
                                <label className="input-label">Cidade / País</label>
                                <div className="input-wrapper">
                                    <MapPin size={20} className="input-icon" />
                                    <input
                                        type="text"
                                        value={dest.city}
                                        onChange={(e) => updateDestination(dest.id, 'city', e.target.value)}
                                        placeholder="Ex: Paris, França"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Ida</label>
                                <div className="input-wrapper">
                                    <Calendar size={20} className="input-icon" />
                                    <input
                                        type="date"
                                        value={dest.startDate}
                                        onChange={(e) => updateDestination(dest.id, 'startDate', e.target.value)}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Volta / Próximo Destino</label>
                                <div className="input-wrapper">
                                    <Calendar size={20} className="input-icon" />
                                    <input
                                        type="date"
                                        value={dest.endDate}
                                        onChange={(e) => updateDestination(dest.id, 'endDate', e.target.value)}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={addDestination} className="add-btn btn-primary">
                <Plus size={20} />
                <span>Adicionar Destino</span>
            </button>

            <style jsx>{`
        .destinations-container {
          padding: 2rem 0;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .destinations-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .destination-item {
          background: white;
          border-radius: var(--radius-md);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(0,0,0,0.05);
          position: relative;
        }
        
        .destination-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .destination-number {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--primary-start);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .remove-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          padding: 4px;
          border-radius: 50%;
          transition: background 0.2s, color 0.2s;
        }
        
        .remove-btn:hover {
          background: #fee2e2;
          color: var(--error);
        }
        
        .inputs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .full-width {
          grid-column: 1 / -1;
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .input-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-secondary);
          pointer-events: none;
        }
        
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.8rem;
          border: 1px solid #e5e7eb;
          border-radius: var(--radius-sm);
          font-size: 1rem;
          color: var(--text-primary);
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        
        .form-input:focus {
          border-color: var(--primary-start);
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }
        
        .add-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 auto;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        @media (max-width: 640px) {
          .inputs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
