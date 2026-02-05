"use client";

import { Star, MapPin, Check, ArrowRight } from 'lucide-react';
import { type Hotel } from '@/types';

interface HotelCardProps {
    hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    return (
        <div className="hotel-card">
            <div className="image-container">
                {/* Placeholder gradient instead of image for now */}
                <div className="placeholder-image" />
                <div className="rating-badge">
                    <Star size={14} fill="currentColor" />
                    <span>{hotel.rating}</span>
                </div>
            </div>

            <div className="content">
                <div className="header">
                    <h3 className="hotel-name">{hotel.name}</h3>
                    <div className="contact-link">
                        <span className="reviews">({hotel.reviews} avaliações)</span>
                    </div>
                </div>

                <div className="location">
                    <MapPin size={16} />
                    <span>{hotel.location}</span>
                </div>

                <div className="amenities">
                    {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                        <span key={idx} className="amenity">
                            <Check size={12} />
                            {amenity}
                        </span>
                    ))}
                    {hotel.amenities.length > 4 && (
                        <span className="more-amenities">+{hotel.amenities.length - 4}</span>
                    )}
                </div>

                <div className="footer">
                    <div className="price-info">
                        <span className="price-label">Preço total</span>
                        <span className="total-price">{formatPrice(hotel.totalPrice)}</span>
                        <span className="night-price">{formatPrice(hotel.pricePerNight)}/noite</span>
                    </div>

                    <button className="select-btn">
                        Ver Detalhes
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            <style jsx>{`
        .hotel-card {
          background: white;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          display: flex;
          margin-bottom: 1.5rem;
          height: 220px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .hotel-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .image-container {
          width: 280px;
          background: #e5e7eb;
          position: relative;
        }
        
        .placeholder-image {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #e5e7eb, #d1d5db);
        }

        .rating-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: white;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--warning);
          box-shadow: var(--shadow-sm);
        }

        .content {
          flex: 1;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .hotel-name {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
          color: var(--text-primary);
        }

        .reviews {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .amenities {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: auto;
        }

        .amenity {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--success);
          background: #ecfdf5;
          padding: 0.25rem 0.5rem;
          border-radius: 99px;
        }
        
        .more-amenities {
          font-size: 0.75rem;
          color: var(--text-secondary);
          padding: 0.25rem 0;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 1rem;
        }

        .price-info {
          display: flex;
          flex-direction: column;
        }

        .price-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .total-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-start);
        }

        .night-price {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .select-btn {
          background: var(--text-primary);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .select-btn:hover {
          background: black;
        }
        
        @media (max-width: 768px) {
          .hotel-card {
            flex-direction: column;
            height: auto;
          }
          
          .image-container {
            width: 100%;
            height: 200px;
          }
        }
      `}</style>
        </div>
    );
}
