import React, { useState } from 'react';
import {
  ArrowRight,
  Gauge,
  Palette,
  Ruler,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { toCategoryLabel } from '../data/storeDefaults';
import TShirtSVG from './TShirtSVG';

const HoodieSVG = ({ color }) => (
  <svg
    viewBox="0 0 100 100"
    width="100%"
    height="100%"
    style={{ filter: 'drop-shadow(0 12px 18px rgba(0,0,0,0.3))' }}
  >
    <path
      d="M25,25 C35,23 65,23 75,25 L88,42 C90,45 80,52 75,48 L72,36 L72,82 C72,86 68,88 65,88 L35,88 C32,88 28,86 28,82 L28,36 L25,48 C20,52 10,45 12,42 Z"
      fill={color}
    />
    <path d="M35,24 C35,12 65,12 65,24 C58,28 42,28 35,24 Z" fill="#000" opacity="0.3" />
    <path
      d="M45,26 C43,35 44,45 42,48"
      fill="none"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    <rect x="28" y="82" width="44" height="6" fill="#000" opacity="0.15" />
    <path
      d="M36,65 L64,65 L60,82 L40,82 Z"
      fill="#000"
      opacity="0.1"
      stroke="rgba(255,255,255,0.08)"
      strokeWidth="0.8"
    />
  </svg>
);

const SweatshirtSVG = ({ color }) => (
  <svg
    viewBox="0 0 100 100"
    width="100%"
    height="100%"
    style={{ filter: 'drop-shadow(0 12px 18px rgba(0,0,0,0.3))' }}
  >
    <path
      d="M25,22 C35,20 65,20 75,22 L88,40 C90,43 80,50 76,46 L72,34 L72,82 C72,86 68,88 65,88 L35,88 C32,88 28,86 28,82 L28,34 L24,46 C20,50 10,43 12,40 Z"
      fill={color}
    />
    <path d="M38,21 C45,25 55,25 62,21 C58,19 42,19 38,21 Z" fill="#000" opacity="0.2" />
    <rect x="28" y="82" width="44" height="6" fill="#000" opacity="0.15" />
  </svg>
);

const PoloSVG = ({ color }) => (
  <svg
    viewBox="0 0 100 100"
    width="100%"
    height="100%"
    style={{ filter: 'drop-shadow(0 12px 18px rgba(0,0,0,0.3))' }}
  >
    <path
      d="M25,24 C35,21 65,21 75,24 L85,42 C87,45 78,50 75,46 L72,36 L72,84 C72,88 68,90 65,90 L35,90 C32,90 28,88 28,84 L28,36 L25,46 C22,50 13,45 15,42 Z"
      fill={color}
    />
    <path d="M35,23 L50,38 L38,23 Z" fill="#000" opacity="0.25" />
    <path d="M65,23 L50,38 L62,23 Z" fill="#000" opacity="0.25" />
    <rect x="47" y="32" width="6" height="14" fill="#000" opacity="0.1" />
  </svg>
);

const hexToRgb = (hex) => {
  const sanitized = hex.replace('#', '');
  const normalized =
    sanitized.length === 3
      ? sanitized
          .split('')
          .map((character) => character + character)
          .join('')
      : sanitized;

  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

const withOpacity = (hex, opacity) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const renderProductGraphic = (product, colorHex) => {
  if (product.type === 'hoodie') {
    return (
      <div style={{ width: '100%', height: '220px', padding: '25px' }}>
        <HoodieSVG color={colorHex} />
      </div>
    );
  }

  if (product.type === 'sweatshirt') {
    return (
      <div style={{ width: '100%', height: '220px', padding: '25px' }}>
        <SweatshirtSVG color={colorHex} />
      </div>
    );
  }

  if (product.type === 'polo') {
    return (
      <div style={{ width: '100%', height: '220px', padding: '25px' }}>
        <PoloSVG color={colorHex} />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '220px', padding: '10px' }}>
      <TShirtSVG color={colorHex} />
    </div>
  );
};

const Products = ({ setCurrentPage }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const { addToCart } = useCart();
  const { products } = useStore();

  const categories = [
    { id: 'all', label: 'All Gear' },
    ...Array.from(new Set(products.map((product) => product.category))).map((category) => ({
      id: category,
      label: toCategoryLabel(category),
    })),
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.category === activeCategory);

  const getSelectedSize = (productId, sizes) => selectedSizes[productId] || sizes[0];
  const getSelectedColor = (productId, colors) => selectedColors[productId] || colors[0];

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((current) => ({
      ...current,
      [productId]: size,
    }));
  };

  const handleColorChange = (productId, color) => {
    setSelectedColors((current) => ({
      ...current,
      [productId]: color,
    }));
  };

  const handleAddToCart = (product) => {
    const size = getSelectedSize(product.id, product.sizes);
    const colorObj = getSelectedColor(product.id, product.colors);

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      color: colorObj.value,
      colorName: colorObj.name,
      isCustom: false,
      quantity: 1,
    });
  };

  return (
    <section style={{ padding: '80px 0', position: 'relative' }} id="catalog-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '46px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--accent-orange)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.85rem',
              marginBottom: '12px',
            }}
          >
            <SlidersHorizontal size={14} />
            <span>AdrenaX Labs</span>
          </div>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            Distinct <span className="text-gradient">Product Tiles</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              marginTop: '10px',
              maxWidth: '650px',
              marginInline: 'auto',
            }}
          >
            Each drop now carries its own badge, accent glow, stock signal, and premium visual
            stage so the catalog feels more like a real performance brand launch.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                background:
                  activeCategory === category.id
                    ? 'var(--accent-gradient)'
                    : 'rgba(255,255,255,0.02)',
                color: activeCategory === category.id ? '#050608' : 'var(--text-secondary)',
                border: activeCategory === category.id ? 'none' : '1px solid var(--glass-border)',
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              className={activeCategory !== category.id ? 'glow-hover' : ''}
            >
              {category.label}
            </button>
          ))}
        </div>

        {filteredProducts.length ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
            }}
          >
            {filteredProducts.map((product, index) => {
              const currentSize = getSelectedSize(product.id, product.sizes);
              const currentColor = getSelectedColor(product.id, product.colors);
              const accent = product.accentColor || '#00f2fe';
              const stockLabel =
                product.stock === 999
                  ? 'Made to order'
                  : product.stock < 20
                    ? `Low stock / ${product.stock} left`
                    : `${product.stock} ready to ship`;

              return (
                <article
                  key={product.id}
                  className="catalog-tile animate-fade-in"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '18px',
                    padding: '22px',
                    borderRadius: '26px',
                    border: `1px solid ${withOpacity(accent, 0.22)}`,
                    background: `
                      radial-gradient(circle at top right, ${withOpacity(accent, 0.18)}, transparent 38%),
                      linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))
                    `,
                    boxShadow: `0 18px 40px ${withOpacity(accent, 0.08)}`,
                    position: 'relative',
                    overflow: 'hidden',
                    animationDelay: `${index * 70}ms`,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 'auto -35% -38% auto',
                      width: '220px',
                      height: '220px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${withOpacity(accent, 0.18)}, transparent 70%)`,
                      pointerEvents: 'none',
                    }}
                  />

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '16px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        borderRadius: '999px',
                        background: withOpacity(accent, 0.12),
                        border: `1px solid ${withOpacity(accent, 0.2)}`,
                        color: '#fff',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {product.isCustomizable ? <Sparkles size={13} /> : <Gauge size={13} />}
                      <span>{product.badge}</span>
                    </div>
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.78rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {product.dropLabel}
                    </span>
                  </div>

                  <div
                    style={{
                      minHeight: '245px',
                      borderRadius: '22px',
                      padding: '18px',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `
                        radial-gradient(circle at center, ${withOpacity(currentColor.value, 0.2)}, transparent 48%),
                        rgba(255,255,255,0.03)
                      `,
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 10px',
                        borderRadius: '999px',
                        background: 'rgba(10,11,14,0.66)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        fontSize: '0.72rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <span
                        style={{
                          width: '9px',
                          height: '9px',
                          borderRadius: '50%',
                          background: currentColor.value,
                          boxShadow: `0 0 10px ${withOpacity(currentColor.value, 0.9)}`,
                        }}
                      />
                      {currentColor.name}
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        right: '14px',
                        bottom: '14px',
                        color: product.stock < 20 && product.stock !== 999 ? 'var(--accent-orange)' : 'var(--text-secondary)',
                        fontSize: '0.74rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        padding: '6px 10px',
                        borderRadius: '999px',
                        background: 'rgba(10,11,14,0.66)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {stockLabel}
                    </div>

                    {renderProductGraphic(product, currentColor.value)}
                  </div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '16px',
                        alignItems: 'flex-start',
                        marginBottom: '10px',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.78rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            marginBottom: '6px',
                          }}
                        >
                          {toCategoryLabel(product.category)}
                        </div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{product.name}</h3>
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.4rem',
                          fontWeight: 900,
                          color: accent,
                        }}
                      >
                        ${product.price}
                      </span>
                    </div>

                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.92rem',
                        lineHeight: 1.6,
                        marginBottom: '14px',
                      }}
                    >
                      {product.story || product.description}
                    </p>

                    <div
                      style={{
                        display: 'grid',
                        gap: '10px',
                        marginBottom: '18px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.84rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <Gauge size={14} style={{ color: accent }} />
                        <span>{product.performanceNote || product.description}</span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.84rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <Palette size={14} style={{ color: accent }} />
                        <span>{product.fabric}</span>
                      </div>
                    </div>

                    <div
                      style={{
                        borderTop: '1px solid rgba(255,255,255,0.07)',
                        paddingTop: '16px',
                        display: 'grid',
                        gap: '14px',
                        marginBottom: '18px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '12px',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--text-secondary)',
                            fontSize: '0.82rem',
                          }}
                        >
                          <Palette size={13} />
                          <span>Color</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {product.colors.map((color) => (
                            <button
                              key={color.name}
                              onClick={() => handleColorChange(product.id, color)}
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: color.value,
                                border:
                                  currentColor.name === color.name
                                    ? `2px solid ${accent}`
                                    : '1px solid rgba(255,255,255,0.1)',
                                cursor: 'pointer',
                                padding: 0,
                                boxShadow:
                                  currentColor.name === color.name
                                    ? `0 0 12px ${withOpacity(accent, 0.45)}`
                                    : 'none',
                              }}
                              aria-label={`Select color ${color.name}`}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '12px',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--text-secondary)',
                            fontSize: '0.82rem',
                          }}
                        >
                          <Ruler size={13} />
                          <span>Size</span>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => handleSizeChange(product.id, size)}
                              style={{
                                minWidth: '34px',
                                height: '28px',
                                borderRadius: '999px',
                                background:
                                  currentSize === size ? withOpacity(accent, 0.16) : 'transparent',
                                color: currentSize === size ? '#fff' : 'var(--text-secondary)',
                                border:
                                  currentSize === size
                                    ? `1px solid ${withOpacity(accent, 0.5)}`
                                    : '1px solid rgba(255,255,255,0.08)',
                                fontSize: '0.76rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                padding: '0 10px',
                              }}
                              aria-label={`Select size ${size}`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {product.isCustomizable ? (
                      <button
                        onClick={() => {
                          setCurrentPage('customizer');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="btn btn-accent"
                        style={{ width: '100%' }}
                        id={`customize-product-btn-${product.id}`}
                      >
                        <Sparkles size={16} /> Open Lab Designer <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        id={`add-to-cart-btn-${product.id}`}
                      >
                        <ShoppingBag size={16} /> Add to Cart
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>No products in this category yet</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Use the admin panel to publish a new item into this collection.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
