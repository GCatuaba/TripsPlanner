"use client";

import { Play } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import { SearchWidget } from './SearchWidget';

interface HeroProps {
    onStart: (type: 'flight' | 'hotel', destination: string, date: string) => void;
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

                    {/* Replaced buttons with SearchWidget for immediate action */}
                    <div className="widget-wrapper-mobile">
                        {/* Mobile view might show buttons or collapsed widget. For now, hiding buttons in favor of widget. */}
                    </div>
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

            {/* Background blobs for Jadoo effect */}
            <div className="bg-blob-right"></div>
            <div className="bg-blob-left"></div>

            <style jsx>{`
        .hero-section {
          padding-top: 8rem; /* Space for fixed header */
          padding-bottom: 5rem;
          position: relative;
          overflow: visible; /* Allow widget overlap */
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
            margin-top: -50px; /* Pull widget up slightly */
        }

        .hero-text-col {
          flex: 1;
          max-width: 550px;
        }

        .subtitle {
          color: var(--primary-orange);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 1.1rem;
          display: block;
          margin-bottom: 1.5rem;
        }

        .title {
          font-size: 4.5rem;
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
            opacity: 0.3;
            transform: skewX(-20deg);
        }

        .description {
            color: var(--text-secondary);
            line-height: 1.8;
            font-size: 1rem;
            margin-bottom: 2.5rem;
            font-family: var(--font-body);
        }

        .hero-image-col {
            flex: 1;
            position: relative;
            display: flex;
            justify-content: center;
        }
        
        .image-wrapper {
            position: relative;
        }
        
        .hero-main-img {
            max-width: 100%;
            height: auto;
            object-fit: contain;
            width: 700px; 
            transform: scale(1.1) translateY(-20px);
        }

        .bg-blob-right {
           position: absolute;
           top: 0;
           right: 0;
           width: 700px;
           height: 800px;
           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23FFF1DA' d='M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.8,34.8C59.4,46.5,47.9,56.2,35.2,64.2C22.5,72.2,8.6,78.5,-4.8,86.8C-18.2,95.1,-31.1,105.4,-42.6,101.8C-54.1,98.2,-64.2,80.7,-72.2,65.1C-80.2,49.5,-86.1,35.8,-88.4,21.5C-90.7,7.2,-89.4,-7.7,-84.4,-21.8C-79.4,-35.9,-70.7,-49.2,-59.2,-58.5C-47.7,-67.8,-33.4,-73.1,-19.1,-74.6C-4.8,-76.1,9.6,-73.8,24.7,-76.4' transform='translate(100 100)' /%3E%3C/svg%3E");
           background-size: cover;
           background-repeat: no-repeat;
           z-index: 1;
           opacity: 0.5;
           transform: translate(30%, -20%);
        }

        .bg-blob-left {
            position: absolute;
            top: 100px;
            left: -100px;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, var(--primary-orange) 0%, transparent 70%);
            opacity: 0.15;
            filter: blur(80px);
            z-index: 1;
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
           .title { font-size: 3.5rem; }
           .hero-content { flex-direction: column-reverse; text-align: center; }
           .hero-text-col { margin-top: 2rem; max-width: 100%; }
           .bg-blob-right { transform: translate(50%, -50%); }
           .widget-container { margin-top: 0; }
        }
      `}</style>
        </section>
    );
}
