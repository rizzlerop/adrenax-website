import React, { useState } from 'react';
import { ShoppingBag, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import TShirtSVG from './TShirtSVG';

// Mock Product Data
const PRODUCTS_DATA = [
  {
    id: 'heavy-tee',
    name: 'Heavy Oversized Tee',
    price: 39,
    category: 'tshirts',
    description: '360gsm heavy-blend organic cotton, dropped shoulders, boxy fit.',
    fabric: '100% Organic Cotton',
    colors: [
      { name: 'Core Black', value: '#12151c' },
      { name: 'Chalk White', value: '#ffffff' },
      { name: 'Acid Lime', value: '#39ff14' },
      { name: 'Volt Orange', value: '#ff5e36' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isCustomizable: false,
    type: 'tshirt'
  },
  {
    id: 'stealth-hoodie',
    name: 'Stealth Tech Hoodie',
    price: 65,
    category: 'hoodies',
    description: 'Technical fleece hood, waterproof seams, concealed pockets, ergonomic cuffs.',
    fabric: '80% Cotton / 20% Polyester Tech Fleece',
    colors: [
      { name: 'Stealth Black', value: '#0a0b0e' },
      { name: 'Cobalt Blue', value: '#4facfe' },
      { name: 'Cyber Pink', value: '#f80077' }
    ],
    sizes: ['M', 'L', 'XL'],
    isCustomizable: false,
    type: 'hoodie'
  },
  {
    id: 'apex-sweatshirt',
    name: 'Apex Athletic Sweatshirt',
    price: 55,
    category: 'sweatshirts',
    description: 'Relaxed athletic crewneck, raglan sleeves, ribbed trims.',
    fabric: '90% Cotton Loopback Fleece',
    colors: [
      { name: 'Heather Gray', value: '#9ca3af' },
      { name: 'Obsidian Black', value: '#12151c' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isCustomizable: false,
    type: 'sweatshirt'
  },
  {
    id: 'vanguard-polo',
    name: 'Vanguard Court Polo',
    price: 45,
    category: 'polos',
    description: 'Piqué knit structure, contrast collar, breathable moisture-wicking technology.',
    fabric: '100% Recycled Poly-blend Piqué',
    colors: [
      { name: 'Chalk White', value: '#ffffff' },
      { name: 'Core Black', value: '#12151c' },
      { name: 'Electric Cyan', value: '#00f2fe' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isCustomizable: false,
    type: 'polo'
  },
  {
    id: 'custom-tee',
    name: 'Design-Your-Own Oversized Tee',
    price: 45,
    category: 'customizable',
    description: 'Our signature heavy organic tee, open for your custom graphics, text, and aesthetics.',
    fabric: '360gsm Heavyweight Organic Cotton',
    colors: [
      { name: 'Chalk White', value: '#ffffff' },
      { name: 'Core Black', value: '#12151c' },
      { name: 'Acid Lime', value: '#39ff14' },
      { name: 'Electric Cyan', value: '#00f2fe' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isCustomizable: true,
    type: 'tshirt'
  }
];

// Helper SVGs for non-tshirt items to render natively and beautifully
const HoodieSVG = ({ color }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}>
    {/* Body & Hood base */}
    <path d="M25,25 C35,23 65,23 75,25 L88,42 C90,45 80,52 75,48 L72,36 L72,82 C72,86 68,88 65,88 L35,88 C32,88 28,86 28,82 L28,36 L25,48 C20,52 10,45 12,42 Z" fill={color} />
    {/* Inner hood */}
    <path d="M35,24 C35,12 65,12 65,24 C58,28 42,28 35,24 Z" fill="#000" opacity="0.3" />
    {/* Hood drawstrings */}
    <path d="M45,26 C43,35 44,45 42,48" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    {/* Ribbed hem & cuffs */}
    <rect x="28" y="82" width="44" height="6" fill="#000" opacity="0.15" />
    {/* Front pocket */}
    <path d="M36,65 L64,65 L60,82 L40,82 Z" fill="#000" opacity="0.1" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
  </svg>
);

const SweatshirtSVG = ({ color }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}>
    {/* Body & sleeves */}
    <path d="M25,22 C35,20 65,20 75,22 L88,40 C90,43 80,50 76,46 L72,34 L72,82 C72,86 68,88 65,88 L35,88 C32,88 28,86 28,82 L28,34 L24,46 C20,50 10,43 12,40 Z" fill={color} />
    {/* Collar neck rim */}
    <path d="M38,21 C45,25 55,25 62,21 C58,19 42,19 38,21 Z" fill="#000" opacity="0.2" />
    {/* Ribbed Hem */}
    <rect x="28" y="82" width="44" height="6" fill="#000" opacity="0.15" />
  </svg>
);

const PoloSVG = ({ color }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}>
    {/* Body & sleeves */}
    <path d="M25,24 C35,21 65,21 75,24 L85,42 C87,45 78,50 75,46 L72,36 L72,84 C72,88 68,90 65,90 L35,90 C32,90 28,88 28,84 L28,36 L25,46 C22,50 13,45 15,42 Z" fill={color} />
    {/* Collar flap */}
    <path d="M35,23 L50,38 L38,23 Z" fill="#000" opacity="0.25" />
    <path d="M65,23 L50,38 L62,23 Z" fill="#000" opacity="0.25" />
    {/* Placket */}
    <rect x="47" y="32" width="6" height="14" fill="#000" opacity="0.1" />
  </svg>
);

const Products = ({ setCurrentPage }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart } = useCart();
  
  // Custom states for size & color selections on catalog card preview
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});

  const categories = [
    { id: 'all', label: 'All Gear' },
    { id: 'tshirts', label: 'T-Shirts' },
    { id: 'hoodies', label: 'Hoodies' },
    { id: 'sweatshirts', label: 'Sweatshirts' },
    { id: 'polos', label: 'Polos' },
    { id: 'customizable', label: 'Custom' }
  ];

  // Filter products
  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === activeCategory);

  // Initialize selection defaults for a card if not set
  const getSelectedSize = (productId, sizes) => {
    return selectedSizes[productId] || sizes[0];
  };

  const getSelectedColor = (productId, colors) => {
    return selectedColors[productId] || colors[0];
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleColorChange = (productId, color) => {
    setSelectedColors(prev => ({ ...prev, [productId]: color }));
  };

  const handleAddToCart = (product) => {
    const size = getSelectedSize(product.id, product.sizes);
    const colorObj = getSelectedColor(product.id, product.colors);
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: size,
      color: colorObj.value,
      colorName: colorObj.name,
      isCustom: false,
      quantity: 1
    });
  };

  const renderProductGraphic = (product, colorHex) => {
    if (product.type === 'tshirt') {
      return (
        <div style={{ width: '100%', height: '220px', padding: '10px' }}>
          <TShirtSVG color={colorHex} />
        </div>
      );
    } else if (product.type === 'hoodie') {
      return (
        <div style={{ width: '100%', height: '220px', padding: '25px' }}>
          <HoodieSVG color={colorHex} />
        </div>
      );
    } else if (product.type === 'sweatshirt') {
      return (
        <div style={{ width: '100%', height: '220px', padding: '25px' }}>
          <SweatshirtSVG color={colorHex} />
        </div>
      );
    } else if (product.type === 'polo') {
      return (
        <div style={{ width: '100%', height: '220px', padding: '25px' }}>
          <PoloSVG color={colorHex} />
        </div>
      );
    }
  };

  return (
    <div style={{ padding: '80px 0', position: 'relative' }} id="catalog-section">
      <div className="container">
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--accent-orange)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.85rem',
            marginBottom: '12px',
          }}>
            <SlidersHorizontal size={14} />
            <span>AdrenaX Labs</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            Unleash the <span className="text-gradient">Collections</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '600px', marginInline: 'auto' }}>
            Constructed with athletic specifications and designed for elite daily motion. Customize our templates or select classic drops.
          </p>
        </div>

        {/* Categories Navigation Grid */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '50px',
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: activeCategory === cat.id ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.02)',
                color: activeCategory === cat.id ? '#050608' : 'var(--text-secondary)',
                border: activeCategory === cat.id ? 'none' : '1px solid var(--glass-border)',
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className={activeCategory !== cat.id ? "glow-hover" : ""}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '32px',
        }}>
          {filteredProducts.map((product) => {
            const currentSize = getSelectedSize(product.id, product.sizes);
            const currentColorObj = getSelectedColor(product.id, product.colors);

            return (
              <div
                key={product.id}
                className="glass-panel glow-hover animate-fade-in"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Special customization tag */}
                {product.isCustomizable && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'var(--orange-gradient)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    zIndex: 5,
                    boxShadow: '0 4px 12px rgba(255, 94, 54, 0.3)'
                  }}>
                    <Sparkles size={10} />
                    <span>Customizer template</span>
                  </div>
                )}

                {/* Graphic Visual Representation */}
                <div style={{
                  background: 'rgba(255,255,255,0.01)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  border: '1px solid rgba(255,255,255,0.02)',
                  minHeight: '220px',
                }}>
                  {renderProductGraphic(product, currentColorObj.value)}
                </div>

                {/* Title & Price */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', textAlign: 'left' }}>
                    {product.name}
                  </h3>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--accent-cyan)'
                  }}>
                    ${product.price}
                  </span>
                </div>

                {/* Fabric Description */}
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  textAlign: 'left',
                  marginBottom: '10px'
                }}>
                  {product.fabric}
                </span>

                {/* Main Description */}
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  textAlign: 'left',
                  marginBottom: '20px',
                  flexGrow: 1,
                }}>
                  {product.description}
                </p>

                {/* Product Options Selector Area */}
                <div style={{
                  borderTop: '1px solid var(--glass-border)',
                  paddingTop: '16px',
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                  {/* Colors Swatches */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', minWidth: '45px', textAlign: 'left' }}>Color:</span>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => handleColorChange(product.id, color)}
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: color.value,
                            border: currentColorObj.name === color.name
                              ? '2px solid var(--accent-cyan)'
                              : '1px solid var(--glass-border)',
                            cursor: 'pointer',
                            outline: 'none',
                            padding: 0,
                            boxShadow: currentColorObj.name === color.name
                              ? '0 0 8px rgba(0, 242, 254, 0.5)'
                              : 'none',
                            transition: 'all 0.2s ease',
                          }}
                          title={color.name}
                          aria-label={`Select color ${color.name}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selectors */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', minWidth: '45px', textAlign: 'left' }}>Size:</span>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => handleSizeChange(product.id, sz)}
                          style={{
                            background: currentSize === sz ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                            color: currentSize === sz ? '#fff' : 'var(--text-secondary)',
                            border: currentSize === sz
                              ? '1px solid var(--accent-cyan)'
                              : '1px solid var(--glass-border)',
                            borderRadius: '4px',
                            minWidth: '28px',
                            height: '24px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                          aria-label={`Select size ${sz}`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Purchase Button */}
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
                    Open Lab Designer <ArrowRight size={16} />
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
