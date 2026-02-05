"use client";

import { CheckCircle, Share2, Download, CreditCard, DollarSign } from 'lucide-react';
import { formatCurrency, convertCurrency } from '@/lib/currency';

interface TripSummaryProps {
    flightCost: number;
    hotelCost: number;
    foodCost: number;
    extrasCost: number;
    travelers: number;
}

export function TripSummary({ flightCost, hotelCost, foodCost, extrasCost, travelers }: TripSummaryProps) {
    const totalBRL = flightCost + hotelCost + foodCost + extrasCost;
    const totalUSD = convertCurrency(totalBRL, 'USD');
    const totalEUR = convertCurrency(totalBRL, 'EUR');

    return (
        <div className="trip-summary">
            <div className="summary-header">
                <div className="icon-wrapper">
                    <CheckCircle size={32} />
                </div>
                <h2>Resumo da Sua Viagem</h2>
                <p>Tudo pronto! Confira os detalhes finais do seu planejamento.</p>
            </div>

            <div className="summary-card">
                <div className="summary-items">
                    <div className="summary-item">
                        <span className="label">Voos (x{travelers})</span>
                        <span className="value">{formatCurrency(flightCost, 'BRL')}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Hospedagem</span>
                        <span className="value">{formatCurrency(hotelCost, 'BRL')}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Alimentação</span>
                        <span className="value">{formatCurrency(foodCost, 'BRL')}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Extras & Lazer</span>
                        <span className="value">{formatCurrency(extrasCost, 'BRL')}</span>
                    </div>
                </div>

                <div className="divider" />

                <div className="total-section">
                    <div className="total-row main">
                        <span>Total Estimado (BRL)</span>
                        <span className="total-value">{formatCurrency(totalBRL, 'BRL')}</span>
                    </div>
                    <div className="conversion-row">
                        <div className="currency-tag">
                            <DollarSign size={14} />
                            USD {formatCurrency(totalUSD, 'USD')}
                        </div>
                        <div className="currency-tag">
                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>€</span>
                            EUR {formatCurrency(totalEUR, 'EUR')}
                        </div>
                    </div>
                </div>

                <div className="actions">
                    <button className="action-btn primary">
                        <Share2 size={18} />
                        Compartilhar
                    </button>
                    <button className="action-btn secondary">
                        <Download size={18} />
                        Salvar PDF
                    </button>
                </div>
            </div>

            <div className="disclaimer">
                <p>* Os valores são estimativos e podem variar de acordo com a disponibilidade e cotação do dia.</p>
            </div>

            <style jsx>{`
        .trip-summary {
          max-width: 600px;
          margin: 4rem auto 0;
          animation: fadeUp 0.6s ease-out;
        }

        .summary-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .icon-wrapper {
          width: 64px;
          height: 64px;
          background: var(--success);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }

        .summary-header h2 {
          font-size: 2rem;
          color: var(--secondary-dark);
          margin-bottom: 0.5rem;
        }

        .summary-header p {
          color: var(--text-secondary);
        }

        .summary-card {
          background: white;
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }

        .summary-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: linear-gradient(to right, var(--primary-start), var(--accent-mint));
        }

        .summary-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .summary-item .label {
          color: var(--text-secondary);
        }

        .summary-item .value {
          font-weight: 600;
        }

        .divider {
          height: 1px;
          background: #e5e7eb;
          margin: 2rem 0;
          position: relative;
        }

        .total-section {
          margin-bottom: 2rem;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .total-row.main {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--secondary-dark);
        }

        .total-value {
          color: var(--primary-start);
        }

        .conversion-row {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .currency-tag {
          background: var(--bg-light);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .action-btn.primary {
          background: var(--secondary-dark);
          color: white;
        }

        .action-btn.primary:hover {
          background: var(--secondary-light);
          transform: translateY(-2px);
        }

        .action-btn.secondary {
          background: var(--bg-light);
          color: var(--secondary-dark);
        }

        .action-btn.secondary:hover {
          background: #e5e7eb;
          transform: translateY(-2px);
        }

        .disclaimer {
          text-align: center;
          margin-top: 2rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-style: italic;
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
