"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plane, Calendar, MapPin, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Define a type for the trip history item match the DB schema we planned
interface TripHistory {
    id: string;
    created_at: string;
    destination: string;
    trip_type: string;
    travelers: number;
    total_budget: number;
    currency: string;
}

export default function HistoryPage() {
    const [history, setHistory] = useState<TripHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isConfigured, setIsConfigured] = useState(true);

    useEffect(() => {
        async function fetchHistory() {
            if (!supabase) {
                setIsConfigured(false);
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('search_history')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setHistory(data || []);
            } catch (err) {
                console.error('Error fetching history:', err);
                setError('Não foi possível carregar o histórico. Verifique a conexão.');
            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, []);

    return (
        <div className="history-container container">
            <div className="history-header">
                <h1>Meus Planos</h1>
                <p>Histórico das suas últimas pesquisas e planejamentos.</p>
            </div>

            {!isConfigured ? (
                <div className="not-configured-card">
                    <AlertCircle size={48} className="icon-warning" />
                    <h3>Banco de Dados Não Conectado</h3>
                    <p>
                        Para salvar e visualizar seus planos, é necessário configurar o Supabase.
                        Adicione as chaves <code>NEXT_PUBLIC_SUPABASE_URL</code> e <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> no seu arquivo <code>.env.local</code>.
                    </p>
                    <Link href="/" className="btn-primary">
                        Voltar para Planejamento
                    </Link>
                </div>
            ) : loading ? (
                <div className="loading-state">
                    <Plane className="animate-pulse" size={48} />
                    <p>Carregando histórico...</p>
                </div>
            ) : error ? (
                <div className="error-state">
                    <p>{error}</p>
                </div>
            ) : history.length === 0 ? (
                <div className="empty-state">
                    <MapPin size={48} color="var(--text-secondary)" />
                    <h3>Nenhum plano encontrado</h3>
                    <p>Você ainda não realizou nenhum planejamento. Que tal começar agora?</p>
                    <Link href="/" className="btn-primary">
                        Criar Novo Plano
                    </Link>
                </div>
            ) : (
                <div className="history-grid">
                    {history.map((trip) => (
                        <div key={trip.id} className="trip-card">
                            <div className="card-header">
                                <span className="trip-type">{trip.trip_type}</span>
                                <span className="trip-date">
                                    {new Date(trip.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="trip-dest">{trip.destination}</h3>
                            <div className="trip-details">
                                <div className="detail-item">
                                    <Calendar size={16} />
                                    <span>5 dias (Est.)</span>
                                </div>
                                <div className="detail-item">
                                    <span>👥 {trip.travelers} viajantes</span>
                                </div>
                            </div>
                            <div className="trip-budget">
                                <span>Orçamento Estimado</span>
                                <strong>
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: trip.currency || 'BRL'
                                    }).format(trip.total_budget || 0)}
                                </strong>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
        .history-container {
          padding-top: 4rem;
          padding-bottom: 4rem;
          min-height: 80vh;
        }

        .history-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .history-header h1 {
          font-size: 2.5rem;
          color: var(--secondary-dark);
          margin-bottom: 0.5rem;
        }

        .not-configured-card, .empty-state {
          background: white;
          padding: 3rem;
          border-radius: var(--radius-lg);
          text-align: center;
          box-shadow: var(--shadow-md);
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .icon-warning {
          color: var(--warning);
        }

        .btn-primary {
          background: var(--primary-start);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          font-weight: 600;
          transition: opacity 0.2s;
        }

        .btn-primary:hover {
          opacity: 0.9;
        }
        
        .history-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .trip-card {
          background: white;
          border-radius: var(--radius-md);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid #f3f4f6;
          transition: transform 0.2s;
        }

        .trip-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-size: 0.85rem;
        }

        .trip-type {
          background: var(--bg-light);
          color: var(--primary-start);
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .trip-date {
          color: var(--text-secondary);
        }

        .trip-dest {
          font-size: 1.5rem;
          color: var(--secondary-dark);
          margin-bottom: 1rem;
        }

        .trip-details {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .trip-budget {
          border-top: 1px solid #e5e7eb;
          padding-top: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .trip-budget span {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .trip-budget strong {
          color: var(--success);
          font-size: 1.1rem;
        }
        
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-secondary);
          padding: 4rem;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
        </div>
    );
}
