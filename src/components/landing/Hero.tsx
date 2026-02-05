"use client";

import { Play } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import { SearchWidget } from './SearchWidget';

interface HeroProps {
    onStart: (type: 'flight' | 'hotel', destinations: any[]) => void;
}

export function Hero({ onStart }: HeroProps) {
    const { t } = useTranslation();

    return (
        <section className="hero-section">
            <div className="container hero-content">
                <div className="hero-text-col fade-up">
                    <span className="subtitle">{t.hero.subtitle}</span>
                    <h1 className="title">
                        {t.hero.title_start}
                        <span className="highlight">{t.hero.title_highlight}</span>
                        {t.hero.title_end}
                    </h1>
                    <p className="description">
                        {t.hero.description}
                    </p>
                </div>

                <div className="hero-image-col fade-up" style={{ animationDelay: '0.2s' }}>
                    <div className="image-wrapper">
                        <img
                            src="/assets/images/hero-traveler.png"
                            alt="Traveler"
                            className="hero-main-img"
                        />
                        <div className="plane-1">✈️</div>
                        <div className="plane-2">✈️</div>
                    </div>
                </div>
            </div>

            {/* Widget Overlapping Section */}
            <div className="container widget-container fade-up" style={{ animationDelay: '0.4s' }}>
                <SearchWidget onSearch={onStart} />
            </div>

            <style jsx>{`
        .hero-section {
          padding-top: 8rem;
          padding-bottom: 5rem;
          position: relative;
          overflow: visible;
          min-height: 800px;
        }

        .hero-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 10;
          margin-bottom: 2rem;
        }

        .widget-container {
            position: relative;
            z-index: 30;
            margin-top: -50px;
        }

        .hero-text-col {
          flex: 1;
          max-width: 600px;
        }

        .subtitle {
          color: var(--primary-orange);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .subtitle::before {
            content: '';
            display: inline-block;
            width: 4px;
            height: clamp(18px, 4vw, 24px);
            background: var(--primary-orange);
            border-radius: 2px;
        }

        .title {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          line-height: 1.1;
          margin-bottom: 2rem;
          letter-spacing: -2px;
          color: var(--text-primary);
        }

        .highlight {
            position: relative;
            z-index: 1;
            display: inline-block;
        }
        
        .highlight::after {
            content: '';
            position: absolute;
            bottom: 5px;
            left: -10px;
            right: -10px;
            height: 15px;
            background: var(--primary-orange);
            z-index: -1;
            opacity: 0.2;
            transform: skewX(-20deg);
        }

        .description {
            color: var(--text-secondary);
            line-height: 1.8;
            font-size: 1.1rem;
            margin-bottom: 2.5rem;
            max-width: 480px;
        }

        .hero-image-col {
            flex: 1;
            position: relative;
            display: flex;
            justify-content: flex-end;
        }
        
        .hero-main-img {
            max-width: 110%;
            height: auto;
            transform: scale(1.1) translateX(10%);
        }

        .plane-1, .plane-2 {
            position: absolute;
            font-size: 2rem;
            animation: float 3s infinite ease-in-out;
        }
        
        .plane-1 { top: 20px; right: 20px; animation-delay: 0s; transform: rotate(15deg); }
        .plane-2 { bottom: 100px; left: -20px; animation-delay: 1.5s; transform: rotate(-10deg); }
        
        @keyframes float {
            0% { transform: translateY(0px) rotate(15deg); }
            50% { transform: translateY(-15px) rotate(18deg); }
            100% { transform: translateY(0px) rotate(15deg); }
        }

        @media (max-width: 1024px) {
           .hero-content { flex-direction: column-reverse; text-align: center; }
           .hero-text-col { margin-top: 2rem; max-width: 100%; display: flex; flex-direction: column; align-items: center; }
           .hero-image-col { justify-content: center; }
           .hero-main-img { transform: scale(1) translateX(0); }
           .widget-container { margin-top: 0; }
        }
      `}</style>
        </section>
    );
}
