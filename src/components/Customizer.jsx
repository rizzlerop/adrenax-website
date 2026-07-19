import React, { useState } from 'react';
import { Eye, Settings, Sparkles, ShoppingBag, RotateCcw, Type, Image } from 'lucide-react';
import { useCart } from '../context/CartContext';
import TShirtSVG from './TShirtSVG';

const CUSTOM_COLORS = [
  { name: 'Core Black', value: '#12151c' },
  { name: 'Chalk White', value: '#ffffff' },
  { name: 'Acid Lime', value: '#39ff14' },
  { name: 'Volt Orange', value: '#ff5e36' },
  { name: 'Cyber Pink', value: '#f80077' },
  { name: 'Electric Cyan', value: '#00f2fe' },
  { name: 'Sage Green', value: '#768a80' },
  { name: 'Deep Violet', value: '#431c5d' }
];

const TEXT_COLORS = [
  { name: 'Core Black', value: '#000000' },
  { name: 'Pure White', value: '#ffffff' },
  { name: 'Electric Cyan', value: '#00f2fe' },
  { name: 'Acid Lime', value: '#39ff14' },
  { name: 'Volt Orange', value: '#ff5e36' },
  { name: 'Cyber Pink', value: '#f80077' }
];

const FONTS = ['Outfit', 'Inter', 'Monospace', 'Serif', 'Impact', 'Script'];

const LOGOS = [
  { id: 'none', label: 'No Graphic' },
  { id: 'adrenax-icon', label: 'AdrenaX Symbol' },
  { id: 'adrenax-cross', label: 'AdrenaX Crosshair' },
  { id: 'lightning', label: 'Lightning Bolt' },
  { id: 'shield', label: 'Athletic Shield' }
];

const Customizer = () => {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('apparel'); // apparel, text, graphics

  // Design Settings State
  const [shirtColor, setShirtColor] = useState(CUSTOM_COLORS[1]); // Chalk White default
  const [shirtSize, setShirtSize] = useState('L');
  const [viewMode, setViewMode] = useState('front'); // front, back

  // Custom Text State
  const [text, setText] = useState('ADRENAX');
  const [textColor, setTextColor] = useState(TEXT_COLORS[0]); // Black default
  const [textFont, setTextFont] = useState(FONTS[0]);
  const [textScale, setTextScale] = useState(1);
  const [textPos, setTextPos] = useState({ x: 50, y: 55 });

  // Custom Logo State
  const [selectedLogo, setSelectedLogo] = useState('adrenax-icon');
  const [logoScale, setLogoScale] = useState(1.2);
  const [logoPos, setLogoPos] = useState({ x: 50, y: 35 });

  // Reset Customizations
  const handleReset = () => {
    setShirtColor(CUSTOM_COLORS[1]);
    setShirtSize('L');
    setText('ADRENAX');
    setTextColor(TEXT_COLORS[0]);
    setTextFont(FONTS[0]);
    setTextScale(1);
    setTextPos({ x: 50, y: 55 });
    setSelectedLogo('adrenax-icon');
    setLogoScale(1.2);
    setLogoPos({ x: 50, y: 35 });
  };

  const handleAddToCart = () => {
    addToCart({
      id: 'custom-oversized-tee',
      name: 'Custom AdrenaX Oversized Tee',
      price: 45,
      size: shirtSize,
      color: shirtColor.value,
      colorName: shirtColor.name,
      isCustom: true,
      customText: text,
      customTextColor: textColor.value,
      customTextColorName: textColor.name,
      customFont: textFont,
      customLogo: selectedLogo !== 'none' ? selectedLogo : null,
      customLogoName: selectedLogo !== 'none' ? LOGOS.find(l => l.id === selectedLogo)?.label : null,
      textScale,
      logoScale,
      quantity: 1
    });
  };

  return (
    <div style={{ padding: '60px 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--accent-cyan)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.85rem',
            marginBottom: '12px',
          }}>
            <Sparkles size={14} />
            <span>Interactive Custom Design Studio</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            LAB <span className="text-gradient">DESIGNER</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '600px', marginInline: 'auto' }}>
            Engineer your custom oversized activewear template. Add decals, place high-performance typography, and preview in real-time.
          </p>
        </div>

        {/* Workspace Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          alignItems: 'start',
        }} className="customizer-grid">
          
          {/* LEFT COLUMN: Visual SVG Canvas */}
          <div className="glass-panel" style={{
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}>
            {/* Safe zone label */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <Eye size={12} />
              <span>ACTIVE PREVIEW CANVAS</span>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-secondary)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
              className="glow-hover"
              title="Reset Design"
              id="customizer-reset-btn"
            >
              <RotateCcw size={12} /> Reset
            </button>

            {/* Outer Box with SVG Canvas */}
            <div style={{
              width: '100%',
              maxWidth: '380px',
              height: '380px',
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TShirtSVG
                color={shirtColor.value}
                view={viewMode}
                customText={text}
                customTextColor={textColor.value}
                customFont={textFont}
                customLogo={selectedLogo !== 'none' ? selectedLogo : null}
                textScale={textScale}
                textPosition={textPos}
                logoScale={logoScale}
                logoPosition={logoPos}
              />
            </div>

            {/* View Toggle Controls (Front / Back) */}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '20px',
              background: 'var(--bg-tertiary)',
              padding: '4px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--glass-border)',
            }}>
              <button
                onClick={() => setViewMode('front')}
                style={{
                  background: viewMode === 'front' ? 'var(--accent-gradient)' : 'transparent',
                  color: viewMode === 'front' ? '#050608' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                id="customizer-view-front-btn"
              >
                Front View
              </button>
              <button
                onClick={() => setViewMode('back')}
                style={{
                  background: viewMode === 'back' ? 'var(--accent-gradient)' : 'transparent',
                  color: viewMode === 'back' ? '#050608' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                id="customizer-view-back-btn"
              >
                Back View
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Design Customizer Controls */}
          <div className="glass-panel" style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Control Tab Buttons */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid var(--glass-border)',
            }}>
              <button
                onClick={() => setActiveTab('apparel')}
                style={{
                  flex: 1,
                  background: activeTab === 'apparel' ? 'rgba(255,255,255,0.03)' : 'none',
                  border: 'none',
                  borderBottom: activeTab === 'apparel' ? '2px solid var(--accent-cyan)' : 'none',
                  color: activeTab === 'apparel' ? '#fff' : 'var(--text-secondary)',
                  padding: '16px 8px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                id="customizer-tab-apparel"
              >
                <Settings size={16} /> Apparel
              </button>
              <button
                onClick={() => setActiveTab('text')}
                style={{
                  flex: 1,
                  background: activeTab === 'text' ? 'rgba(255,255,255,0.03)' : 'none',
                  border: 'none',
                  borderBottom: activeTab === 'text' ? '2px solid var(--accent-cyan)' : 'none',
                  color: activeTab === 'text' ? '#fff' : 'var(--text-secondary)',
                  padding: '16px 8px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                id="customizer-tab-text"
              >
                <Type size={16} /> Decal Text
              </button>
              <button
                onClick={() => setActiveTab('graphics')}
                style={{
                  flex: 1,
                  background: activeTab === 'graphics' ? 'rgba(255,255,255,0.03)' : 'none',
                  border: 'none',
                  borderBottom: activeTab === 'graphics' ? '2px solid var(--accent-cyan)' : 'none',
                  color: activeTab === 'graphics' ? '#fff' : 'var(--text-secondary)',
                  padding: '16px 8px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                id="customizer-tab-graphics"
              >
                <Image size={16} /> Decal Graphics
              </button>
            </div>

            {/* Control Settings Forms */}
            <div style={{ padding: '30px', textAlign: 'left', minHeight: '320px' }}>
              
              {/* TAB 1: APPAREL DETAILS */}
              {activeTab === 'apparel' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Color selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#fff', fontWeight: 600, marginBottom: '12px' }}>
                      Fabric Base Color: <span className="text-gradient" style={{ fontWeight: 'bold' }}>{shirtColor.name}</span>
                    </label>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {CUSTOM_COLORS.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => setShirtColor(col)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: col.value,
                            border: shirtColor.name === col.name ? '3px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                            cursor: 'pointer',
                            outline: 'none',
                            padding: 0,
                            boxShadow: shirtColor.name === col.name ? '0 0 12px rgba(0,242,254,0.6)' : 'none',
                            transition: 'all 0.2s ease',
                          }}
                          title={col.name}
                          aria-label={`Select shirt color ${col.name}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#fff', fontWeight: 600, marginBottom: '12px' }}>
                      Select Loose Fit Size:
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setShirtSize(sz)}
                          style={{
                            flex: 1,
                            background: shirtSize === sz ? 'var(--accent-gradient)' : 'var(--bg-tertiary)',
                            color: shirtSize === sz ? '#050608' : 'var(--text-secondary)',
                            border: shirtSize === sz ? 'none' : '1px solid var(--glass-border)',
                            padding: '12px 0',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                      * Fits drop-shoulder loose-fit. Order true size.
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 2: DECAL TEXT */}
              {activeTab === 'text' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* TextInput */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>
                      Print Text:
                    </label>
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      maxLength={15}
                      style={{
                        width: '100%',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--glass-border)',
                        color: '#fff',
                        borderRadius: 'var(--radius-md)',
                        padding: '12px 16px',
                        outline: 'none',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.95rem',
                      }}
                      className="glow-hover"
                      placeholder="Type custom text..."
                      id="customizer-decal-text-input"
                    />
                  </div>

                  {/* Font Face Selection */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>
                      Typography Style:
                    </label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                    }}>
                      {FONTS.map((font) => (
                        <button
                          key={font}
                          onClick={() => setTextFont(font)}
                          style={{
                            background: textFont === font ? 'rgba(255, 255, 255, 0.08)' : 'var(--bg-tertiary)',
                            color: textFont === font ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                            border: textFont === font ? '1px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                            padding: '8px 0',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontFamily: font === 'Script' ? 'cursive' : 'sans-serif',
                          }}
                        >
                          {font}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Color Swatches */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>
                      Print Color:
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {TEXT_COLORS.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => setTextColor(col)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: col.value,
                            border: textColor.value === col.value ? '2px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                            cursor: 'pointer',
                            outline: 'none',
                            padding: 0,
                            boxShadow: textColor.value === col.value ? '0 0 6px var(--accent-cyan)' : 'none',
                          }}
                          title={col.name}
                          aria-label={`Select text color ${col.name}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Range Sliders for Placement */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Size scale:</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{textScale.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={textScale}
                      onChange={(e) => setTextScale(parseFloat(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                      aria-label="Text size scale slider"
                    />

                    <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Vertical position (Y):</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{textPos.y}%</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="85"
                      value={textPos.y}
                      onChange={(e) => setTextPos(prev => ({ ...prev, y: parseInt(e.target.value) }))}
                      style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                      aria-label="Text vertical position slider"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: DECAL GRAPHICS */}
              {activeTab === 'graphics' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Select Preset Graphic */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>
                      Select Tech Graphic:
                    </label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      gap: '8px',
                    }}>
                      {LOGOS.map((logo) => (
                        <button
                          key={logo.id}
                          onClick={() => setSelectedLogo(logo.id)}
                          style={{
                            background: selectedLogo === logo.id ? 'rgba(255,255,255,0.04)' : 'var(--bg-tertiary)',
                            color: selectedLogo === logo.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                            border: selectedLogo === logo.id ? '1px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-md)',
                            textAlign: 'left',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {logo.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Graphics Sliders (Only if logo selected) */}
                  {selectedLogo !== 'none' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Graphic size:</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{logoScale.toFixed(2)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="2.0"
                        step="0.1"
                        value={logoScale}
                        onChange={(e) => setLogoScale(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                        aria-label="Logo size scale slider"
                      />

                      <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Vertical position (Y):</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{logoPos.y}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="80"
                        value={logoPos.y}
                        onChange={(e) => setLogoPos(prev => ({ ...prev, y: parseInt(e.target.value) }))}
                        style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                        aria-label="Logo vertical position slider"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Lower Summary & Add to Cart */}
            <div style={{
              borderTop: '1px solid var(--glass-border)',
              padding: '30px',
              background: 'rgba(0,0,0,0.1)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '1.25rem', color: '#fff' }}>Summary Price</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Includes custom processing fee</span>
                </div>
                <span style={{
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: 'var(--accent-cyan)',
                  fontFamily: 'var(--font-heading)'
                }}>
                  $45.00
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px 0', fontSize: '1.05rem' }}
                id="customizer-add-to-cart-btn"
              >
                <ShoppingBag size={18} /> Add Custom Design to Cart
              </button>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .customizer-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Customizer;
