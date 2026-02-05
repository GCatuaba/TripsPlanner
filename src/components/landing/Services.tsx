"use client";

import { Cloud, Plane, Mic, Settings } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export function Services() {
    const { t } = useTranslation();

    return (
        <section className="services-section">
            <div className="container">
                <div className="section-header fade-up">
                    <span className="subtitle">{t.services.subtitle}</span>
                    <h2 className="title">{t.services.title}</h2>
                </div>

                <div className="services-grid">
                    {/* Service 1 */}
                    <div className="service-card fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="icon-wrapper">
                            <Cloud size={32} color="var(--primary-orange)" />
                            <div className="bg-shape"></div>
                        </div>
                        <h3>{t.services.weather.title}</h3>
                        <p>{t.services.weather.desc}</p>
                    </div>

                    {/* Service 2 - Highlighted */}
                    <div className="service-card active fade-up" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-highlight"></div>
                        <div className="card-content">
                            <div className="icon-wrapper">
                                <Plane size={32} color="var(--primary-orange)" />
                                <div className="bg-shape"></div>
                            </div>
                            <h3>{t.services.flights.title}</h3>
                            <p>{t.services.flights.desc}</p>
                        </div>
                    </div>

                    {/* Service 3 */}
                    <div className="service-card fade-up" style={{ animationDelay: '0.3s' }}>
                        <div className="icon-wrapper">
                            <Mic size={32} color="var(--primary-orange)" />
                            <div className="bg-shape"></div>
                        </div>
                        <h3>{t.services.events.title}</h3>
                        <p>{t.services.events.desc}</p>
                    </div>

                    {/* Service 4 */}
                    <div className="service-card fade-up" style={{ animationDelay: '0.4s' }}>
                        <div className="icon-wrapper">
                            <Settings size={32} color="var(--primary-orange)" />
                            <div className="bg-shape"></div>
                        </div>
                        <h3>{t.services.custom.title}</h3>
                        <p>{t.services.custom.desc}</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .services-section {
          padding: 5rem 0;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .subtitle {
          color: var(--text-secondary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 1.1rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .title {
          font-size: 3rem;
          text-transform: capitalize;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            position: relative;
            z-index: 1;
        }
        
        .service-card {
            background: white;
            border-radius: 36px;
            padding: 3rem 2rem;
            text-align: center;
            position: relative;
            transition: all 0.3s ease;
            cursor: default;
        }
        
        .service-card:hover, .service-card.active {
            box-shadow: 0 20px 50px rgba(0,0,0,0.05);
            transform: translateY(-10px);
        }
        
        .bg-highlight {
            position: absolute;
            bottom: -30px;
            left: -30px;
            width: 100px;
            height: 100px;
            background: var(--primary-orange);
            border-radius: 30px 0 30px 0;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .service-card.active .bg-highlight {
            opacity: 1;
        }
        
        .icon-wrapper {
            position: relative;
            margin-bottom: 1.5rem;
            display: inline-block;
        }
        
        .bg-shape {
            position: absolute;
            top: -10px;
            right: -15px;
            width: 50px;
            height: 50px;
            background: #FFF1DA;
            border-radius: 18px 0 10px 0;
            z-index: -1;
        }
        
        .service-card h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
            white-space: nowrap;
        }
        
        .service-card p {
            color: var(--text-secondary);
            font-size: 0.9rem;
            line-height: 1.6;
        }
      `}</style>
        </section>
    );
}
