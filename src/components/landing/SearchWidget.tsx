"use client";

import { useState } from 'react';
import { useTranslation } from '@/context/LanguageContext';
import { Plane, Building, Search, User, Plus, Trash2, Calendar } from 'lucide-react';

interface DestinationEntry {
    id: string;
    city: string;
    startDate: string;
    endDate: string;
}

interface SearchWidgetProps {
    onSearch: (type: 'flight' | 'hotel', destinations: DestinationEntry[]) => void;
}

export function SearchWidget({ onSearch }: SearchWidgetProps) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'flight' | 'hotel'>('flight');

    const [destinations, setDestinations] = useState<DestinationEntry[]>([
        { id: crypto.randomUUID(), city: '', startDate: '', endDate: '' }
    ]);

    const addDestination = () => {
        setDestinations([...destinations, { id: crypto.randomUUID(), city: '', startDate: '', endDate: '' }]);
    };

    const removeDestination = (id: string) => {
        if (destinations.length > 1) {
            setDestinations(destinations.filter(d => d.id !== id));
        }
    };

    const updateDestination = (id: string, field: keyof DestinationEntry, value: string) => {
        setDestinations(destinations.map(d => d.id === id ? { ...d, [field]: value } : d));
    };

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

            <div className="destinations-list">
                {destinations.map((dest, index) => (
                    <div className="search-inputs-row" key={dest.id}>
                        <div className="input-group main-input">
                            <label>{t.search.label_destination} {destinations.length > 1 ? `#${index + 1}` : ''}</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    placeholder={t.search.placeholder_destination}
                                    value={dest.city}
                                    onChange={(e) => updateDestination(dest.id, 'city', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="input-group date-input">
                            <label>{t.search.label_date_start}</label>
                            <div className="input-wrapper">
                                <input
                                    type="date"
                                    value={dest.startDate}
                                    onChange={(e) => updateDestination(dest.id, 'startDate', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="input-group date-input">
                            <label>{t.search.label_date_end}</label>
                            <div className="input-wrapper">
                                <input
                                    type="date"
                                    value={dest.endDate}
                                    onChange={(e) => updateDestination(dest.id, 'endDate', e.target.value)}
                                />
                            </div>
                        </div>

                        {destinations.length > 1 && (
                            <button className="btn-remove" onClick={() => removeDestination(dest.id)}>
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="widget-footer">
                <div className="footer-left">
                    <button className="btn-secondary" onClick={addDestination}>
                        <Plus size={18} />
                        {t.search.btn_add_destination}
                    </button>

                    <div className="input-group guests-group">
                        <div className="fake-select">
                            <User size={16} /> {t.search.placeholder_guests}
                        </div>
                    </div>
                </div>

                <button className="btn-search" onClick={() => onSearch(activeTab, destinations)}>
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
                    max-width: 1100px;
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

                .destinations-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .search-inputs-row {
                    display: flex;
                    align-items: flex-end;
                    gap: 1rem;
                    flex-wrap: wrap;
                    padding-bottom: 1rem;
                    border-bottom: 1px dashed #eee;
                }

                .search-inputs-row:last-child {
                    border-bottom: none;
                }

                .input-group {
                    flex: 1;
                    min-width: 150px;
                }

                .input-group.main-input {
                    flex: 2;
                    min-width: 250px;
                }

                .input-group label {
                    display: block;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
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
                    height: 40px;
                    background: #eee;
                    margin-bottom: 5px;
                }

                .btn-remove {
                    background: #fee2e2;
                    color: #ef4444;
                    border: none;
                    width: 42px;
                    height: 42px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-remove:hover {
                    background: #fecaca;
                }

                .widget-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1rem;
                    border-top: 1px solid #eee;
                    margin-top: 0.5rem;
                    gap: 2rem;
                }

                .footer-left {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .btn-secondary {
                    background: #F8F8F8;
                    color: var(--text-primary);
                    border: 1px solid #eee;
                    padding: 0.75rem 1.25rem;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.2s;
                }

                .btn-secondary:hover {
                    background: #eee;
                }

                .fake-select {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    padding: 0.75rem 1rem;
                    background: #F8F8F8;
                    border: 1px solid #eee;
                    border-radius: 8px;
                }

                .btn-search {
                    background: var(--primary-orange);
                    color: white;
                    border: none;
                    padding: 1rem 2.5rem;
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
                }

                .btn-search:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 20px 40px rgba(223, 105, 81, 0.35);
                    background: #e65a3d;
                }

                @media (max-width: 1024px) {
                    .divider { display: none; }
                    .search-inputs-row { flex-direction: column; align-items: stretch; gap: 0.75rem; }
                    .input-group.main-input { min-width: 100%; }
                    .input-group { min-width: 100%; }
                    .widget-footer { flex-direction: column; align-items: stretch; }
                    .footer-left { flex-direction: column; align-items: stretch; gap: 1rem; }
                    .btn-search { width: 100%; }
                }
            `}</style>
        </div>
    );
}
