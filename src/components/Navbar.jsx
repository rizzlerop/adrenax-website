import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ShieldAlert } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Catalog' },
    { id: 'customizer', label: 'AdrenaX Customizer' },
    { id: 'about', label: 'Our Brand' },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderRadius: '0',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      padding: '16px 0',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: '1.8rem',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            textDecoration: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          ADRENA<span className="text-gradient" style={{ fontWeight: 900 }}>X</span>
        </a>

        {/* Desktop Links */}
        <div style={{
          display: 'none',
          gap: '32px',
          alignItems: 'center',
        }} className="desktop-nav">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === link.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
                position: 'relative',
                padding: '4px 0',
              }}
              onMouseEnter={(e) => {
                if (currentPage !== link.id) e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                if (currentPage !== link.id) e.target.style.color = 'var(--text-secondary)';
              }}
            >
              {link.label}
              {currentPage === link.id && (
                <span style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'var(--accent-gradient)',
                  borderRadius: '2px',
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--glass-border)',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              position: 'relative',
              transition: 'all 0.2s ease',
            }}
            className="glow-hover"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--orange-gradient)',
                color: '#fff',
                borderRadius: '50%',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                minWidth: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--bg-primary)',
                animation: 'pulseGlow 1.5s infinite',
              }}>
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="mobile-toggle"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide Down */}
      {mobileMenuOpen && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          borderRadius: 0,
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: '1px solid var(--glass-border)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          animation: 'fadeIn 0.3s ease forwards',
        }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                color: currentPage === link.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 600,
                padding: '8px 0',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* Inline styles for media query since we don't have separate files for simple queries */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
