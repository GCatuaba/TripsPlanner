"use client";

import { Armchair, Coffee, Wine, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CabinClass = 'economy' | 'premium_economy' | 'business' | 'first';

interface CabinOption {
    id: CabinClass;
    label: string;
    icon: React.ElementType;
    features: string[];
}

interface CabinClassSelectorProps {
    selected?: CabinClass;
    onSelect: (cabin: CabinClass) => void;
}

export function CabinClassSelector({ selected, onSelect }: CabinClassSelectorProps) {
    const options: CabinOption[] = [
        {
            id: 'economy',
            label: 'Econômica',
            icon: Armchair,
            features: ['Melhor preço', 'Bagagem de mão']
        },
        {
            id: 'premium_economy',
            label: 'Premium Economy',
            icon: Coffee,
            features: ['Mais espaço', 'Embarque prioritário']
        },
        {
            id: 'business',
            label: 'Executiva',
            icon: Wine,
            features: ['Poltrona cama', 'Lounge VIP']
        },
        {
            id: 'first',
            label: 'Primeira Classe',
            icon: Star,
            features: ['Suíte privativa', 'Gastronomia premium']
        }
    ];

    return (
        <div className="cabin-container">
            <h2 className="section-title">Como você quer voar?</h2>

            <div className="cabin-grid">
                {options.map((option) => {
                    const isSelected = selected === option.id;
                    const Icon = option.icon;

                    return (
                        <button
                            key={option.id}
                            className={cn("cabin-card", isSelected && "selected")}
                            onClick={() => onSelect(option.id)}
                            type="button"
                        >
                            <div className="cabin-icon">
                                <Icon size={28} strokeWidth={1.5} />
                            </div>
                            <div className="cabin-info">
                                <span className="cabin-label">{option.label}</span>
                                <div className="features">
                                    {option.features.map((feature, idx) => (
                                        <span key={idx} className="feature-dot">{feature}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="radio-circle">
                                {isSelected && <div className="radio-inner" />}
                            </div>
                        </button>
                    );
                })}
            </div>

            <style jsx>{`
        .cabin-container {
          padding: 2rem 0;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .cabin-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        .cabin-card {
          background: white;
          border: 1px solid #e5e7eb;
          padding: 1.5rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 1rem;
          text-align: left;
          transition: all 0.2s;
          position: relative;
        }
        
        .cabin-card:hover {
          border-color: var(--primary-start);
          background: #fafaf9;
        }
        
        .cabin-card.selected {
          border-color: var(--primary-start);
          background: #fff7ed;
          box-shadow: 0 0 0 1px var(--primary-start);
        }
        
        .cabin-icon {
          color: var(--text-secondary);
        }
        
        .cabin-card.selected .cabin-icon {
          color: var(--primary-start);
        }
        
        .cabin-info {
          flex: 1;
        }
        
        .cabin-label {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        
        .features {
          font-size: 0.75rem;
          color: var(--text-secondary);
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .feature-dot:not(:last-child)::after {
          content: "•";
          margin-left: 0.5rem;
          opacity: 0.5;
        }
        
        .radio-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #d1d5db;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .cabin-card.selected .radio-circle {
          border-color: var(--primary-start);
        }
        
        .radio-inner {
          width: 10px;
          height: 10px;
          background: var(--primary-start);
          border-radius: 50%;
        }
        
        @media (max-width: 640px) {
          .cabin-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
