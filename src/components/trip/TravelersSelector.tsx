"use client";

import { Users, User, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TravelerCounts {
    adults: number;
    children: number;
    babies: number;
}

interface TravelersSelectorProps {
    counts: TravelerCounts;
    onChange: (counts: TravelerCounts) => void;
}

export function TravelersSelector({ counts, onChange }: TravelersSelectorProps) {
    const updateCount = (type: keyof TravelerCounts, delta: number) => {
        const newVal = Math.max(0, counts[type] + delta);
        if (type === 'adults' && newVal < 1) return; // Min 1 adult
        onChange({ ...counts, [type]: newVal });
    };

    return (
        <div className="travelers-container">
            <h2 className="section-title">Quem vai nessa aventura?</h2>

            <div className="cards-grid">
                <CounterCard
                    label="Adultos"
                    sublabel="12+ anos"
                    value={counts.adults}
                    icon={User}
                    onIncrement={() => updateCount('adults', 1)}
                    onDecrement={() => updateCount('adults', -1)}
                    min={1}
                />

                <CounterCard
                    label="Crianças"
                    sublabel="2-11 anos"
                    value={counts.children}
                    icon={Users}
                    onIncrement={() => updateCount('children', 1)}
                    onDecrement={() => updateCount('children', -1)}
                    min={0}
                />

                <CounterCard
                    label="Bebês"
                    sublabel="0-23 meses"
                    value={counts.babies}
                    icon={Baby}
                    onIncrement={() => updateCount('babies', 1)}
                    onDecrement={() => updateCount('babies', -1)}
                    min={0}
                />
            </div>

            <style jsx>{`
        .travelers-container {
          padding: 2rem 0;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .cards-grid {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
      `}</style>
        </div>
    );
}

interface CounterCardProps {
    label: string;
    sublabel: string;
    value: number;
    icon: React.ElementType;
    onIncrement: () => void;
    onDecrement: () => void;
    min: number;
}

function CounterCard({ label, sublabel, value, icon: Icon, onIncrement, onDecrement, min }: CounterCardProps) {
    const canDecrement = value > min;

    return (
        <div className="counter-card">
            <div className="icon-box">
                <Icon size={24} />
            </div>
            <div className="info">
                <div className="label">{label}</div>
                <div className="sublabel">{sublabel}</div>
            </div>

            <div className="controls">
                <button
                    className={cn("ctrl-btn", !canDecrement && "disabled")}
                    onClick={onDecrement}
                    disabled={!canDecrement}
                    type="button"
                >
                    -
                </button>
                <span className="value">{value}</span>
                <button
                    className="ctrl-btn"
                    onClick={onIncrement}
                    type="button"
                >
                    +
                </button>
            </div>

            <style jsx>{`
        .counter-card {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 200px;
          gap: 1rem;
          transition: transform 0.2s;
        }
        
        .counter-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .icon-box {
          color: var(--primary-start);
          background: var(--bg-light);
          padding: 0.75rem;
          border-radius: 50%;
        }
        
        .info {
          text-align: center;
        }
        
        .label {
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .sublabel {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        
        .controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--bg-light);
          padding: 0.25rem;
          border-radius: var(--radius-lg);
        }
        
        .ctrl-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: white;
          color: var(--text-primary);
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
          transition: all 0.2s;
        }
        
        .ctrl-btn:not(:disabled):hover {
          background: var(--primary-start);
          color: white;
        }
        
        .ctrl-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: transparent;
          box-shadow: none;
        }
        
        .value {
          font-weight: 700;
          font-size: 1.125rem;
          min-width: 20px;
          text-align: center;
        }
      `}</style>
        </div>
    );
}
