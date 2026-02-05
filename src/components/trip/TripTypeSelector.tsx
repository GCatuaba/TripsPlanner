"use client";

import { useMemo } from 'react';
import { Briefcase, Wallet, Map, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TripType = 'economic' | 'business' | 'standard' | 'tourist';

interface TripTypeOption {
    id: TripType;
    label: string;
    description: string;
    icon: React.ElementType;
    gradient: string;
}

interface TripTypeSelectorProps {
    selected?: TripType;
    onSelect: (type: TripType) => void;
}

export function TripTypeSelector({ selected, onSelect }: TripTypeSelectorProps) {
    const options = useMemo<TripTypeOption[]>(() => [
        {
            id: 'economic',
            label: 'Econômica',
            description: 'Foco no menor custo possível',
            icon: Wallet,
            gradient: 'linear-gradient(135deg, #10b981, #34d399)'
        },
        {
            id: 'business',
            label: 'Empresa',
            description: 'Conforto e eficiência para trabalho',
            icon: Briefcase,
            gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)'
        },
        {
            id: 'standard',
            label: 'Custo Normal',
            description: 'Equilíbrio entre custo e conforto',
            icon: Map,
            gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)'
        },
        {
            id: 'tourist',
            label: 'Turistando',
            description: 'Experiência completa e lazer',
            icon: Rocket,
            gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)'
        }
    ], []);

    return (
        <div className="trip-type-container">
            <h2 className="section-title">Qual o estilo da sua viagem?</h2>
            <div className="grid">
                {options.map((option) => {
                    const isSelected = selected === option.id;
                    const Icon = option.icon;

                    return (
                        <button
                            key={option.id}
                            className={cn("type-card", isSelected && "selected")}
                            onClick={() => onSelect(option.id)}
                            type="button"
                        >
                            <div
                                className="icon-wrapper"
                                style={{ background: option.gradient }}
                            >
                                <Icon color="white" size={24} />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{option.label}</h3>
                                <p className="card-desc">{option.description}</p>
                            </div>
                        </button>
                    );
                })}
            </div>

            <style jsx>{`
        .trip-type-container {
          padding: 2rem 0;
        }

        .section-title {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .type-card {
          background: var(--bg-card);
          border: 2px solid transparent;
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--shadow-sm);
        }

        .type-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .type-card.selected {
          border-color: var(--primary-start);
          background: #fff9f5; /* Very subtle orange tint */
          box-shadow: var(--shadow-lg);
          transform: scale(1.02);
        }

        .icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .card-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .card-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0.25rem 0 0;
          line-height: 1.4;
        }
      `}</style>
        </div>
    );
}
