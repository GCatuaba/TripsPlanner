"use client";

import { Navigation } from 'lucide-react';

export function Destinations() {
    const destinations = [
        {
            city: "Rome, Italy",
            days: "10 Days Trip",
            price: "$5.42k",
            image: "google_generated_images/rome_coliseum.png",
            rating: "5.0"
        },
        {
            city: "London, UK",
            days: "12 Days Trip",
            price: "$4.2k",
            image: "google_generated_images/london_bigben.png",
            rating: "4.8"
        },
        {
            city: "Full Europe",
            days: "28 Days Trip",
            price: "$15k",
            image: "google_generated_images/europe_nature.png",
            rating: "4.9"
        }
    ];

    return (
        <section className="destinations-section">
            <div className="container">
                <div className="section-header fade-up">
                    <span className="subtitle">Top Selling</span>
                    <h2 className="title">Top Destinations</h2>
                </div>

                <div className="destinations-grid">
                    {destinations.map((dest, i) => (
                        <div className="dest-card fade-up" key={i} style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
                            <div className="card-image">
                                <img src={dest.image} alt={dest.city} />
                            </div>
                            <div className="card-content">
                                <div className="card-row">
                                    <span className="city-name">{dest.city}</span>
                                    <span className="price">{dest.price}</span>
                                </div>
                                <div className="card-row duration-row">
                                    <Navigation size={16} className="nav-icon" />
                                    <span className="days">{dest.days}</span>
                                </div>
                            </div>
                            <div className="bg-decor-spring"></div>
                        </div>
                    ))}

                    <div className="decor-spiral">
                        {/* Decorative spiral SVG placeholder */}
                        <svg width="96" height="252" viewBox="0 0 96 252" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 244C8 244 50 200 80 150" stroke="#8A79DF" strokeWidth="2" strokeDasharray="5 5" />
                            {/* Simplified visual */}
                        </svg>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .destinations-section {
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
        
        .destinations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2.5rem;
            position: relative;
        }
        
        .dest-card {
            background: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0,0,0,0.05);
            transition: transform 0.3s;
            cursor: pointer;
            position: relative;
            z-index: 10;
        }
        
        .dest-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }
        
        .card-image {
            height: 320px;
            width: 100%;
            overflow: hidden;
        }
        
        .card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .card-content {
            padding: 1.5rem;
        }
        
        .card-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            font-size: 1.1rem;
            font-weight: 500;
            color: var(--text-secondary);
        }
        
        .duration-row {
            margin-bottom: 0;
            justify-content: flex-start;
            gap: 0.75rem;
            font-size: 1rem;
        }
        
        .city-name, .price {
            color: var(--text-primary);
        }

        .nav-icon {
            color: var(--text-primary);
            fill: black;
        }
        
        .decor-spiral {
            position: absolute;
            right: -50px;
            bottom: 50px;
            z-index: 0;
            opacity: 0.5;
        }
        
        @media (max-width: 768px) {
            .decor-spiral { display: none; }
        }
      `}</style>
        </section>
    );
}
