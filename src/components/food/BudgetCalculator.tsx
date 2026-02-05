"use client";

import { useState, useEffect } from 'react';
import { Utensils, Coins, Wallet } from 'lucide-react';

interface BudgetCalculatorProps {
  days: number;
  travelers: number;
  onBudgetChange: (budget: { food: number; extras: number; total: number }) => void;
}

type FoodStyle = 'economic' | 'comfortable' | 'tourist';

const FOOD_COSTS = {
  economic: 80, // BRL per day per person
  comfortable: 150,
  tourist: 300
};

export function BudgetCalculator({ days, travelers, onBudgetChange }: BudgetCalculatorProps) {
  const [foodStyle, setFoodStyle] = useState<FoodStyle>('comfortable');
  const [beverages, setBeverages] = useState(0); // Daily extra
  const [extras, setExtras] = useState(0); // One-time extra

  const calculateTotal = () => {
    const dailyFooCost = FOOD_COSTS[foodStyle];
    const totalFood = dailyFooCost * days * travelers;
    const totalBeverages = beverages * days * travelers;
    const totalExtras = extras * travelers; // Assuming per person or total? Let's say per person usually or total?
    // Let's assume extras is Total for the trip to be simple, OR per person.
    // Usually "money for shopping" is per person.
    // "Emergency fund" is usually total.
    // Let's stick to "Daily Extras per Person" (beverages/snacks) + "Trip Extras Total" (shopping/tours not included).
    // To simplify: Daily Per Person (food+beverage) and Total Trip Extras.

    // Actually, prompt says: "Beverage and entertainment fields".
    return {
      food: totalFood,
      extras: totalBeverages + totalExtras,
      total: totalFood + totalBeverages + totalExtras
    };
  };

  useEffect(() => {
    onBudgetChange(calculateTotal());
  }, [foodStyle, beverages, extras, days, travelers]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="budget-calculator">
      <div className="calculator-header">
        <h3 className="title">
          <Wallet className="icon" size={24} />
          Calculadora de Gastos
        </h3>
        <p className="subtitle">Estime seus gastos com alimentação e extras para {days} dias e {travelers} pessoas.</p>
      </div>

      <div className="calculator-grid">
        {/* Food Style Section */}
        <div className="section">
          <label className="section-label">Estilo de Alimentação</label>
          <div className="toggle-group">
            <button
              className={`toggle-btn ${foodStyle === 'economic' ? 'active' : ''}`}
              onClick={() => setFoodStyle('economic')}
            >
              <span>Econômico</span>
              <span className="cost">R$ 80/dia</span>
            </button>
            <button
              className={`toggle-btn ${foodStyle === 'comfortable' ? 'active' : ''}`}
              onClick={() => setFoodStyle('comfortable')}
            >
              <span>Confortável</span>
              <span className="cost">R$ 150/dia</span>
            </button>
            <button
              className={`toggle-btn ${foodStyle === 'tourist' ? 'active' : ''}`}
              onClick={() => setFoodStyle('tourist')}
            >
              <span>Turista</span>
              <span className="cost">R$ 300/dia</span>
            </button>
          </div>
        </div>

        {/* Extras Inputs */}
        <div className="section inputs-row">
          <div className="input-group">
            <label>Bebidas e Lanches (diário/pessoa)</label>
            <div className="input-wrapper">
              <span className="prefix">R$</span>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={beverages === 0 ? '' : beverages}
                onChange={(e) => setBeverages(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Extras e Compras (total)</label>
            <div className="input-wrapper">
              <span className="prefix">R$</span>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={extras === 0 ? '' : extras}
                onChange={(e) => setExtras(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="budget-summary">
          <div className="summary-row">
            <span>Alimentação Total</span>
            <span className="value">{formatCurrency(calculateTotal().food)}</span>
          </div>
          <div className="summary-row">
            <span>Extras Total</span>
            <span className="value">{formatCurrency(calculateTotal().extras)}</span>
          </div>
          <div className="summary-row total">
            <span>Estimativa Total</span>
            <span className="value total-value">{formatCurrency(calculateTotal().total)}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .budget-calculator {
          background: white;
          border-radius: var(--radius-md);
          padding: 2rem;
          box-shadow: var(--shadow-md);
          margin-top: 3rem;
        }

        .calculator-header {
          margin-bottom: 2rem;
          text-align: center;
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

        .calculator-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .section-label {
          display: block;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .toggle-group {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
          background: var(--bg-light);
          padding: 0.5rem;
          border-radius: var(--radius-md);
        }

        .toggle-btn {
          background: transparent;
          border: 2px solid transparent;
          padding: 1rem;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .toggle-btn.active {
          background: white;
          border-color: var(--primary-start);
          box-shadow: var(--shadow-sm);
        }

        .toggle-btn span {
          font-weight: 600;
          color: var(--text-secondary);
        }

        .toggle-btn.active span {
          color: var(--primary-start);
        }

        .toggle-btn .cost {
          font-size: 0.875rem;
          font-weight: 400;
        }

        .inputs-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: var(--radius-sm);
          padding: 0 1rem;
          height: 48px;
          focus-within: ring 2px var(--primary-start);
        }

        .prefix {
          color: var(--text-secondary);
          margin-right: 0.5rem;
        }

        .input-wrapper input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .budget-summary {
          background: var(--secondary-dark);
          color: white;
          padding: 1.5rem;
          border-radius: var(--radius-md);
          margin-top: 1rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .summary-row.total {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 0;
          font-size: 1.25rem;
          font-weight: 700;
          opacity: 1;
        }

        .total-value {
          color: var(--accent-mint);
        }
        
        @media (max-width: 640px) {
          .toggle-group {
            grid-template-columns: 1fr;
          }
          .inputs-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
