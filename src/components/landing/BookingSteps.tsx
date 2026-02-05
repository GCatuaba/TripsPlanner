"use client";

import { Map, CreditCard, Plane, Building, Leaf, Send, MapPin, Heart } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export function BookingSteps() {
    const { t } = useTranslation();

    return (
        <section className="booking-section">
            <div className="container booking-grid">
                {/* Left Column - Steps */}
                <div className="steps-content fade-up">
                    <span className="subtitle">{t.booking.subtitle}</span>
                    <h2 className="title">{t.booking.title}</h2>

                    <div className="steps-list">
                        <div className="step-item">
                            <div className="step-icon yellow">
                                <MapPin size={20} color="white" />
                            </div>
                            <div className="step-text">
                                <h3>{t.booking.step1.title}</h3>
                                <p>{t.booking.step1.desc}</p>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="step-icon orange">
                                <CreditCard size={20} color="white" />
                            </div>
                            <div className="step-text">
                                <h3>{t.booking.step2.title}</h3>
                                <p>{t.booking.step2.desc}</p>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="step-icon teal">
                                <Plane size={20} color="white" />
                            </div>
                            <div className="step-text">
                                <h3>{t.booking.step3.title}</h3>
                                <p>{t.booking.step3.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Card Mockup */}
                <div className="card-mockup-wrapper fade-up" style={{ animationDelay: '0.2s' }}>
                    <div className="trip-card-mockup">
                        <div className="mockup-image">
                            <img src="/assets/images/booking-greece.png" alt="Greece" />
                        </div>
                        <div className="mockup-content">
                            <h3>{t.booking.card_title}</h3>
                            <p className="date">14-29 June | by Robbin joseph</p>

                            <div className="mockup-icons">
                                <span className="icon-circle"><Leaf size={14} /></span>
                                <span className="icon-circle"><Map size={14} /></span>
                                <span className="icon-circle"><Send size={14} /></span>
                            </div>

                            <div className="mockup-footer">
                                <div className="people-count">
                                    <Building size={16} className="building-icon" />
                                    <span>24 people going</span>
                                </div>
                                <Heart size={20} className="heart-icon" />
                            </div>
                        </div>

                        {/* Floating Card */}
                        <div className="floating-card">
                            <div className="floating-content">
                                <div className="floating-icon">
                                    <img src="/assets/images/dest-rome.png" alt="Rome" className="floating-thumb" />
                                </div>
                                <div className="floating-text">
                                    <span className="ongoing">{t.booking.ongoing}</span>
                                    <h4>Trip to rome</h4>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: '40%' }}></div>
                                    </div>
                                    <span className="percent">40% {t.booking.completed}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blur-blue"></div>
                </div>
            </div>

            <style jsx>{`
        .booking-section {
          padding: 5rem 0;
        }
        
        .booking-grid {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 4rem;
           align-items: center;
        }
        
        .subtitle {
          color: var(--text-secondary);
          font-weight: 600;
          text-transform: capitalize;
          font-size: 1.1rem;
          display: block;
          margin-bottom: 1rem;
        }

        .title {
          font-size: 3rem;
          text-transform: capitalize;
          margin-bottom: 2.5rem;
          line-height: 1.2;
        }
        
        .steps-list {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        
        .step-item {
            display: flex;
            gap: 1.5rem;
            align-items: flex-start;
        }
        
        .step-icon {
            min-width: 50px;
            height: 50px;
            border-radius: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .step-icon.yellow { background-color: var(--accent-yellow); }
        .step-icon.orange { background-color: var(--primary-orange); }
        .step-icon.teal { background-color: #006380; }
        
        .step-text h3 {
            font-size: 1rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.25rem;
        }
        
        .step-text p {
            font-size: 0.9rem;
            color: var(--text-secondary);
            line-height: 1.5;
        }
        
        .card-mockup-wrapper {
            position: relative;
            display: flex;
            justify-content: center;
        }
        
        .trip-card-mockup {
            background: white;
            padding: 1.5rem;
            border-radius: 26px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.08);
            width: 370px;
            position: relative;
            z-index: 10;
        }
        
        .mockup-image {
            height: 160px;
            border-radius: 24px;
            overflow: hidden;
            margin-bottom: 1.5rem;
        }
        
        .mockup-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .mockup-content h3 {
            margin-bottom: 0.5rem;
            font-size: 1.25rem;
        }
        
        .mockup-content .date {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
        }
        
        .mockup-icons {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .icon-circle {
            width: 36px;
            height: 36px;
            background: #F5F5F5;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
        }
        
        .mockup-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .people-count {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        .heart-icon {
            color: #4152CA;
        }
        
        .floating-card {
            position: absolute;
            bottom: 40px;
            right: -80px;
            background: white;
            padding: 1rem;
            border-radius: 18px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            width: 260px;
            z-index: 20;
        }
        
        .floating-content {
            display: flex;
            gap: 1rem;
            align-items: flex-start;
        }
        
        .floating-thumb {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .floating-text {
            flex: 1;
        }
        
        .ongoing {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        .floating-text h4 {
            font-size: 1rem;
            margin: 0.25rem 0 0.5rem;
        }
        
        .progress-bar {
            height: 5px;
            background: #F5F5F5;
            border-radius: 10px;
            width: 100%;
            overflow: hidden;
            margin-bottom: 0.25rem;
        }
        
        .progress {
            height: 100%;
            background: #8A79DF;
        }
        
        .percent {
            font-size: 0.8rem;
            color: var(--text-primary);
            font-weight: 600;
        }
        
        .bg-blur-blue {
            position: absolute;
            top: -10%;
            right: -20%;
            width: 100%;
            height: 100%;
            background: #59B1E6;
            opacity: 0.2;
            filter: blur(100px);
            z-index: 1;
            border-radius: 50%;
        }
        
        @media (max-width: 900px) {
            .booking-grid { grid-template-columns: 1fr; }
            .card-mockup-wrapper { margin-top: 3rem; }
            .floating-card { right: 0; bottom: -50px; }
        }
      `}</style>
        </section>
    );
}
