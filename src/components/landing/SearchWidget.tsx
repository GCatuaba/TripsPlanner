"use client";

import { useState } from 'react';
import { useTranslation } from '@/context/LanguageContext';
import { Plane, Building, Search, User } from 'lucide-react';

interface SearchWidgetProps {
    onSearch: (type: 'flight' | 'hotel', destination: string, date: string) => void;
}

export function SearchWidget({ onSearch }: SearchWidgetProps) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'flight' | 'hotel'>('flight');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');

    return (
        <div className="search-widget fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'flight' ? 'active' : ''}`}
                    onClick={() => setActiveTab('flight')}
                >
                    <Plane size={18} />
                    {t.search.tab_flights}
                </button>
                <button
                    className={`tab ${activeTab === 'hotel' ? 'active' : ''}`}
                    onClick={() => setActiveTab('hotel')}
                >
                    <Building size={18} />
                    {t.search.tab_hotels}
                </button>
            </div>

            <div className="search-inputs">
                <div className="input-group">
                    <label>{t.search.label_destination}</label>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder={t.search.placeholder_destination}
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>
                </div>

                <div className="divider"></div>

                <div className="input-group">
                    <label>{t.search.label_date}</label>
                    <div className="input-wrapper">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="divider"></div>

                <div className="input-group">
                    <label>{t.search.label_guests}</label>
                    <div className="input-wrapper">
                        <div className="fake-select">
                            <User size={16} /> {t.search.placeholder_guests}
                        </div>
                    </div>
                </div>

                <button className="btn-search" onClick={() => onSearch(activeTab, destination, date)}>
                    <Search size={20} />
                    <span>{t.search.btn_search}</span>
                </button>
            </div>

            <style jsx>{`
                .search-widget {
                    background: white;
                    border-radius: 16px;
                    padding: 1.5rem 2rem;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.06);
                    max-width: 1000px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 20;
                }

                .tabs {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 1rem;
                }

                .tab {
                    background: none;
                    border: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1rem;
                    font-weight: 500;
                    color: var(--text-secondary);
                    cursor: pointer;
                    padding: 0.6rem 1.2rem;
                    border-radius: 8px;
                    transition: all 0.2s;
                }

                .tab.active {
                    background: #FFF1DA;
                    color: var(--primary-orange);
                    box-shadow: 0 4px 14px rgba(223, 105, 81, 0.1);
                }

                .search-inputs {
                    display: flex;
                    align-items: flex-end;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }

                .input-group {
                    flex: 1;
                    min-width: 180px;
                }

                .input-group label {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                }

                .input-wrapper input {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    font-family: var(--font-body);
                    font-size: 0.95rem;
                    background: #F8F8F8;
                    transition: all 0.22s;
                    outline: none;
                }

                .input-wrapper input:focus {
                    background: white;
                    border-color: var(--primary-orange);
                    box-shadow: 0 0 0 4px rgba(223, 105, 81, 0.05);
                }

                .divider {
                    width: 1px;
                    height: 45px;
                    background: #eee;
                    margin-bottom: 5px;
                }

                .fake-select {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    padding: 0.75rem;
                    background: #F8F8F8;
                    border: 1px solid #eee;
                    border-radius: 8px;
                }

                .btn-search {
                    background: var(--primary-orange);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    box-shadow: 0 15px 30px rgba(223, 105, 81, 0.25);
                    transition: all 0.22s;
                    white-space: nowrap;
                    min-width: 180px;
                }

                .btn-search:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 20px 40px rgba(223, 105, 81, 0.35);
                    background: #e65a3d;
                }

                @media (max-width: 1024px) {
                    .divider { display: none; }
                }

                @media (max-width: 768px) {
                    .search-inputs {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .input-group { min-width: 100%; }
                    .btn-search { width: 100%; margin-top: 1rem; }
                }
            `}</style>
        </div>
    );
}
