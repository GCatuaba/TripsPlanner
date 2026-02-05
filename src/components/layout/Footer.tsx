"use client";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3 className="footer-title">TripPlanner</h3>
          <p className="footer-text">Seu planejador de viagens premium.</p>
        </div>
        <div className="footer-section">
          <p className="copyright">&copy; 2026 TripPlanner. Todos os direitos reservados.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--secondary-dark);
          color: white;
          padding: 4rem 0;
          margin-top: auto;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .footer-title {
          color: white;
          margin: 0 0 0.5rem 0;
        }
        
        .footer-text {
          color: rgba(255,255,255,0.7);
          margin: 0;
        }
        
        .copyright {
          color: rgba(255,255,255,0.5);
          font-size: 0.875rem;
        }
      `}</style>
    </footer>
  );
}
