import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap, Target, Award } from 'lucide-react';
import TShirtSVG from './TShirtSVG';

const Hero = ({ setCurrentPage }) => {
  const [showcaseColor, setShowcaseColor] = useState('#00f2fe');
  const colors = ['#00f2fe', '#39ff14', '#ff5e36', '#f80077', '#ffffff', '#12151c'];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowcaseColor((prev) => {
        const currentIndex = colors.indexOf(prev);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '80px 0' }}>
      {/* Background Gradients */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '50%',
        height: '50%',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.08) 0%, rgba(0,0,0,0) 70%)',
        zIndex: -1,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0',
        right: '-10%',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(248, 0, 119, 0.05) 0%, rgba(0,0,0,0) 70%)',
        zIndex: -1,
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '60px',
          alignItems: 'center',
          textAlign: 'left',
        }} className="hero-grid">
          {/* Left Column: Text & CTAs */}
          <div className="animate-fade-in" style={{ opacity: 0 }}>
            {/* Est 2026 Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0, 242, 254, 0.06)',
              border: '1px solid rgba(0, 242, 254, 0.15)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              color: 'var(--accent-cyan)',
              fontSize: '0.85rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '24px',
            }}>
              <Sparkles size={14} />
              <span>Est. 2026 // Next-Gen Activewear</span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              fontWeight: 900,
              textTransform: 'uppercase',
              marginBottom: '24px',
              letterSpacing: '-0.03em',
            }}>
              ELEVATE YOUR <br />
              <span className="text-gradient">MOTION.</span> DEFINE YOUR <span className="text-gradient-orange">STYLE.</span>
            </h1>

            {/* Sub-headline */}
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              marginBottom: '40px',
              maxWidth: '560px',
              fontWeight: 400,
              lineHeight: 1.6,
            }}>
              Engineered high-performance activewear and streetwear classics. Crafted for ultimate comfort, custom expression, and maximum endurance. Est. 2026.
            </p>

            {/* CTAs */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '56px',
            }}>
              <button
                onClick={() => setCurrentPage('shop')}
                className="btn btn-primary glow-hover"
                style={{ fontSize: '1.05rem', padding: '16px 36px' }}
                id="hero-shop-btn"
              >
                Shop Collection <ArrowRight size={18} />
              </button>
              <button
                onClick={() => setCurrentPage('customizer')}
                className="btn btn-secondary"
                style={{ fontSize: '1.05rem', padding: '16px 36px' }}
                id="hero-customize-btn"
              >
                Design Custom Tee
              </button>
            </div>

            {/* Mini Features */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '24px',
              borderTop: '1px solid var(--glass-border)',
              paddingTop: '32px',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Zap size={20} className="text-gradient" style={{ color: 'var(--accent-cyan)' }} />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Active Tech</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Moisture-wicking, breathable cuts.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Target size={20} style={{ color: 'var(--accent-orange)' }} />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Customized Print</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Design your own aesthetics.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Award size={20} style={{ color: 'var(--accent-lime)' }} />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Premium Blends</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>360gsm heavy cotton comfort.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Showcase */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            {/* Spinning background rings */}
            <div className="glowing-ring" style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              border: '2px dashed rgba(0, 242, 254, 0.1)',
              animation: 'spin 40s linear infinite',
              pointerEvents: 'none',
            }} />
            <div className="glowing-ring-secondary" style={{
              position: 'absolute',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              border: '1px solid rgba(248, 0, 119, 0.05)',
              animation: 'spin-reverse 30s linear infinite',
              pointerEvents: 'none',
            }} />

            {/* Showcase Shirt Wrapper */}
            <div style={{
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}>
              <TShirtSVG 
                color={showcaseColor} 
                view="front" 
                customText="AdrenaX"
                customTextColor={showcaseColor === '#ffffff' ? '#000000' : '#ffffff'}
                customFont="Outfit"
                textScale={0.8}
                textPosition={{ x: 50, y: 55 }}
                customLogo="adrenax-icon"
                logoScale={1}
                logoPosition={{ x: 50, y: 35 }}
              />
            </div>

            {/* Showcase Controls Hover overlay */}
            <div className="glass-panel" style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              zIndex: 3,
            }}>
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: showcaseColor,
                boxShadow: `0 0 10px ${showcaseColor}`,
                transition: 'background-color 0.3s ease',
              }} />
              <span>DYNAMIC COLOR PREVIEW</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
