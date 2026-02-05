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
                            <User size={16} /> 1 Person
                        </div>
                    </div>
                </div>

                <button className="btn-search" onClick={() => onSearch(activeTab, destination, date)}>
                    <Search size={20} />
                    {t.search.btn_search}
                </button>
            </div>

            <style jsx>{`
                .search-widget {
                    background: white;
                    border-radius: 16px;
                    padding: 1.5rem;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08); /* Jadoo soft shadow */
                    max-width: 800px;
                    margin-top: 2rem;
                    position: relative;
                    z-index: 20;
                }

                .tabs {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 0.5rem;
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
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    transition: all 0.2s;
                }

                .tab.active {
                    background: #FFF1DA;
                    color: var(--primary-orange);
                }

                .search-inputs {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .input-group {
                    flex: 1;
                }

                .input-group label {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                }

                .input-wrapper input {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid transparent;
                    border-radius: 8px;
                    font-family: var(--font-body);
                    font-size: 1rem;
                    background: #F8F8F8;
                    transition: all 0.2s;
                    outline: none;
                }

                .input-wrapper input:focus {
                    background: white;
                    border-color: var(--primary-orange);
                }

                .divider {
                    width: 1px;
                    height: 40px;
                    background: #E0E0E0;
                }

                .fake-select {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    padding: 0.5rem;
                    background: #F8F8F8;
                    border-radius: 8px;
                }

                .btn-search {
                    background: var(--primary-orange);
                    color: white;
                    border: none;
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    box-shadow: 0 10px 20px rgba(223, 105, 81, 0.3);
                    transition: transform 0.2s;
                    white-space: nowrap;
                }

                .btn-search:hover {
                    transform: translateY(-2px);
                }

                @media (max-width: 768px) {
                    .search-inputs {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 1.5rem;
                    }
                    .divider { display: none; }
                    .search-widget { margin: 2rem 1rem; }
                }
            `}</style>
        </div>
    );
}
