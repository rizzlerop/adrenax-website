import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

const Footer = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSignedUp(true);
      setEmail('');
      setTimeout(() => setSignedUp(false), 5000);
    }
  };

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--glass-border)',
      padding: '80px 0 40px 0',
      marginTop: 'auto',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '48px',
          marginBottom: '60px',
          textAlign: 'left',
        }}>
          {/* Brand Info */}
          <div>
            <h3 style={{
              fontSize: '1.6rem',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              marginBottom: '16px',
            }}>
              ADRENA<span className="text-gradient">X</span>
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              marginBottom: '24px',
              maxWidth: '300px',
            }}>
              High-performance activewear and modern casual wear engineered for style, comfort, and custom expression.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#instagram" className="social-icon" aria-label="AdrenaX Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#twitter" className="social-icon" aria-label="AdrenaX Twitter/X">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#facebook" className="social-icon" aria-label="AdrenaX Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0 -5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Catalog Quick links */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '24px',
              color: '#fff',
            }}>
              Collections
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#oversized" onClick={(e) => { e.preventDefault(); setCurrentPage('shop'); }} className="footer-link">Oversized T-Shirts</a>
              <a href="#hoodies" onClick={(e) => { e.preventDefault(); setCurrentPage('shop'); }} className="footer-link">Technical Hoodies</a>
              <a href="#sweatshirts" onClick={(e) => { e.preventDefault(); setCurrentPage('shop'); }} className="footer-link">Performance Sweatshirts</a>
              <a href="#polos" onClick={(e) => { e.preventDefault(); setCurrentPage('shop'); }} className="footer-link">Classic Polo Shirts</a>
            </div>
          </div>

          {/* Interactive Customizer Promotion */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '24px',
              color: '#fff',
            }}>
              Custom Apparel
            </h4>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              marginBottom: '16px',
            }}>
              Unlock your creativity. Build and customize your own heavy-blend oversized cotton tee with our interactive 2D designer.
            </p>
            <button 
              onClick={() => {
                setCurrentPage('customizer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-primary" 
              style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            >
              Start Designing <ArrowRight size={14} />
            </button>
          </div>

          {/* Newsletter Form */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '24px',
              color: '#fff',
            }}>
              Stay in Motion
            </h4>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              marginBottom: '16px',
            }}>
              Subscribe to get early access to drops, activewear updates, and custom product designs.
            </p>
            
            {signedUp ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent-lime)',
                fontSize: '0.95rem',
                fontWeight: 600,
                background: 'rgba(57, 255, 20, 0.08)',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(57, 255, 20, 0.2)',
              }}>
                <CheckCircle2 size={18} />
                <span>You're on the list! Welcome to AdrenaX.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: '4px',
                border: '1px solid var(--glass-border)',
              }} className="glow-hover">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: '#fff',
                    padding: '8px 12px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                  }}
                  id="newsletter-email-input"
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--accent-gradient)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#050608',
                    transition: 'all 0.2s ease',
                  }}
                  aria-label="Subscribe"
                  id="newsletter-submit-btn"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--glass-border)',
          paddingTop: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
        }}>
          <div>
            &copy; {new Date().getFullYear()} AdrenaX. All Rights Reserved. Estimated from 2026.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#privacy" className="footer-sublink">Privacy Policy</a>
            <a href="#terms" className="footer-sublink">Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        .social-icon {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .social-icon:hover {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          background: rgba(0, 242, 254, 0.05);
          transform: translateY(-2px);
        }
        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.2s ease;
          align-self: flex-start;
        }
        .footer-link:hover {
          color: #fff;
          padding-left: 2px;
        }
        .footer-sublink {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-sublink:hover {
          color: var(--text-secondary);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
