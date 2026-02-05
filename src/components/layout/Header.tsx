"use client";

import Link from 'next/link';
import { Plane } from 'lucide-react';

export function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo">
          Jadoo
        </Link>
        <nav className="nav">
          <Link href="/" className="nav-link">Destinations</Link>
          <Link href="/" className="nav-link">Hotels</Link>
          <Link href="/" className="nav-link">Flights</Link>
          <Link href="/" className="nav-link">Bookings</Link>

          <Link href="/login" className="nav-link">Login</Link>
          <button className="btn-signup">Sign up</button>

          <div className="lang-selector">
            EN <span className="arrow">▼</span>
          </div>
        </nav>
      </div>

      <style jsx>{`
        .header {
          background: transparent;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding-top: 2rem;
        }
        
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 50px;
        }
        
        .logo {
          text-decoration: none;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 2rem;
          letter-spacing: -1px;
        }
        
        .nav {
          display: flex;
          align-items: center;
          gap: 3rem;
        }
        
        .nav-link {
          text-decoration: none;
          color: #212832;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        
        .nav-link:hover {
          color: var(--primary-orange);
        }
        
        .btn-signup {
            background: transparent;
            border: 1px solid var(--text-primary);
            padding: 0.5rem 1.2rem;
            border-radius: 5px;
            font-family: var(--font-body);
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .btn-signup:hover {
            background: var(--primary-orange);
            border-color: var(--primary-orange);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(223, 105, 81, 0.2);
        }
        
        .lang-selector {
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }
        
        .arrow {
            font-size: 0.6rem;
        }

        @media (max-width: 768px) {
            .nav { display: none; } /* Mobile menu TODO */
        }
      `}</style>
    </header>
  );
}
