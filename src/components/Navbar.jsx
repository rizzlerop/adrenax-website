import React, { useState } from 'react';
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  ShoppingBag,
  UserRound,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { currentUser, isAdmin, logout } = useAuth();
  const { siteContent } = useStore();

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

  const handleLogout = () => {
    logout();
    handleNavClick('home');
  };

  const accountLabel = currentUser ? currentUser.name.split(' ')[0] : 'Login';

  return (
    <nav
      className="glass-panel"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderRadius: '0',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        padding: '0',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          borderBottom: '1px solid var(--glass-border)',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingTop: '10px',
            paddingBottom: '10px',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent-lime)',
                boxShadow: '0 0 10px rgba(57,255,20,0.6)',
              }}
            />
            Admin-ready storefront
          </span>
          <span style={{ textAlign: 'right' }}>{siteContent.announcement}</span>
        </div>
      </div>

      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          paddingBottom: '16px',
          gap: '16px',
        }}
      >
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            handleNavClick('home');
          }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.8rem',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            textDecoration: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ADRENA<span className="text-gradient" style={{ fontWeight: 900 }}>X</span>
        </a>

        <div
          style={{
            display: 'none',
            gap: '28px',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
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
              onMouseEnter={(event) => {
                if (currentPage !== link.id) {
                  event.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={(event) => {
                if (currentPage !== link.id) {
                  event.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {link.label}
              {currentPage === link.id ? (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: 'var(--accent-gradient)',
                    borderRadius: '2px',
                  }}
                />
              ) : null}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'none', alignItems: 'center', gap: '10px' }} className="desktop-auth">
            <button
              onClick={() => handleNavClick(isAdmin ? 'admin' : 'login')}
              className="btn btn-secondary"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              {isAdmin ? <LayoutDashboard size={16} /> : <UserRound size={16} />}
              {isAdmin ? 'Admin Panel' : accountLabel}
            </button>
            {currentUser ? (
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                }}
              >
                <LogOut size={15} />
                Logout
              </button>
            ) : null}
          </div>

          {!currentUser ? (
            <button
              onClick={() => handleNavClick('login')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
              }}
              className="mobile-login"
            >
              <LogIn size={16} />
            </button>
          ) : null}

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
            {totalItems > 0 ? (
              <span
                style={{
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
                }}
              >
                {totalItems}
              </span>
            ) : null}
          </button>

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

      {mobileMenuOpen ? (
        <div
          className="glass-panel"
          style={{
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
          }}
        >
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

          <button
            onClick={() => handleNavClick(isAdmin ? 'admin' : 'login')}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              color: '#fff',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 600,
              padding: '8px 0',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {isAdmin ? <LayoutDashboard size={18} /> : <UserRound size={18} />}
            {isAdmin ? 'Admin Panel' : currentUser ? 'Account' : 'Login'}
          </button>

          {currentUser ? (
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 600,
                padding: '8px 0',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : null}
        </div>
      ) : null}

      <style>{`
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }

          .desktop-auth {
            display: flex !important;
          }

          .mobile-toggle,
          .mobile-login {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          nav .container span:last-child {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
