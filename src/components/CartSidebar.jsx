import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

const CartSidebar = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalAmount
  } = useCart();
  const { currentUser } = useAuth();
  const { placeOrder } = useStore();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, success
  const [orderNumber, setOrderNumber] = useState('');

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    const order = placeOrder({
      items: cartItems,
      totalAmount,
      customer: currentUser,
    });

    setOrderNumber(order.id);
    setCheckoutStep('success');
  };

  const handleCloseSuccess = () => {
    clearCart();
    setCheckoutStep('cart');
    setIsCartOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      animation: 'fadeIn 0.2s ease forwards',
    }}>
      {/* Backdrop overlay */}
      <div 
        onClick={() => checkoutStep !== 'success' && setIsCartOpen(false)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(5, 6, 8, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1,
        }}
      />

      {/* Sidebar Panel */}
      <div className="glass-panel" style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
        height: '100%',
        zIndex: 2,
        borderRadius: 0,
        borderTop: 'none',
        borderBottom: 'none',
        borderRight: 'none',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={22} className="text-gradient" /> YOUR GEAR BAG
          </h3>
          {checkoutStep !== 'success' && (
            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
              }}
              aria-label="Close Cart"
              id="cart-close-btn"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Content Area */}
        {checkoutStep === 'success' ? (
          /* SUCCESS MODAL FLOW */
          <div style={{
            flex: 1,
            padding: '40px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '24px',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(57, 255, 20, 0.08)',
              border: '2px solid rgba(57, 255, 20, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-lime)',
              animation: 'pulseGlow 2s infinite',
            }}>
              <CheckCircle2 size={44} />
            </div>

            <div>
              <h4 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>
                Order Placed!
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Your AdrenaX order has been captured and sent into the admin queue.
              </p>
            </div>

            {/* Order specs block */}
            <div className="glass-panel" style={{
              width: '100%',
              padding: '20px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: 'rgba(0,0,0,0.15)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Order Number:</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '0.9rem' }}>{orderNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Fulfillment:</span>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Standard Shipping</span>
              </div>
              <div style={{ display: 'flex', justifySelf: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Amount Charged:</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: '800', fontSize: '0.95rem' }}>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '300px' }}>
              We estimated our brand launch in 2026. A mock shipping confirmation has been simulated.
            </p>

            <button
              onClick={handleCloseSuccess}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '12px' }}
              id="cart-success-confirm-btn"
            >
              Continue Shopping
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          /* EMPTY CART FLOW */
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
            gap: '16px',
          }}>
            <ShoppingBag size={48} style={{ color: 'var(--text-muted)' }} />
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>Your bag is empty</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '280px' }}>
                You haven't added any gear yet. Check out our catalog or the Lab Designer to create custom designs.
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="btn btn-secondary"
              style={{ marginTop: '8px' }}
            >
              Close Bag
            </button>
          </div>
        ) : (
          /* CART ITEMS LIST FLOW */
          <>
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              {cartItems.map((item, index) => {
                // Generate a key that includes details to avoid clashes
                const itemKey = `${item.id}-${item.size}-${item.color}-${item.isCustom ? 'custom' : 'standard'}-${index}`;
                
                return (
                  <div
                    key={itemKey}
                    className="glass-panel"
                    style={{
                      padding: '16px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'start',
                      backgroundColor: 'rgba(255,255,255,0.01)',
                      borderColor: item.isCustom ? 'rgba(0, 242, 254, 0.15)' : 'var(--glass-border)',
                    }}
                  >
                    {/* Small Vector color box for item visual preview */}
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      backgroundColor: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--glass-border)',
                      position: 'relative',
                      flexShrink: 0,
                    }}>
                      {item.isCustom ? (
                        <Sparkles size={18} style={{
                          color: item.color === '#ffffff' ? '#000' : '#fff',
                        }} />
                      ) : (
                        <ShoppingBag size={18} style={{
                          color: item.color === '#ffffff' ? '#000' : '#fff',
                        }} />
                      )}
                    </div>

                    {/* Details Column */}
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                        {item.name}
                      </h4>

                      {/* Custom Tags */}
                      {item.isCustom && (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: 'var(--accent-cyan)',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          marginBottom: '4px',
                        }}>
                          <Sparkles size={10} />
                          <span>Customized Decal</span>
                        </div>
                      )}

                      {/* Specs */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '10px',
                      }}>
                        <span>Size: <strong style={{ color: '#fff' }}>{item.size}</strong></span>
                        <span>Color: <strong style={{ color: '#fff' }}>{item.colorName}</strong></span>
                        {item.isCustom && (
                          <>
                            {item.customText && <span>Text: <strong style={{ color: 'var(--accent-cyan)' }}>"{item.customText}"</strong> ({item.customFont})</span>}
                            {item.customLogoName && <span>Logo: <strong style={{ color: 'var(--accent-cyan)' }}>{item.customLogoName}</strong></span>}
                          </>
                        )}
                      </div>

                      {/* Controls Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Qty changer */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px',
                          background: 'var(--bg-tertiary)',
                          padding: '2px',
                          borderRadius: '6px',
                          border: '1px solid var(--glass-border)',
                        }}>
                          <button
                            onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-secondary)',
                              width: '24px',
                              height: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ width: '20px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-secondary)',
                              width: '24px',
                              height: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontWeight: 'bold', color: 'var(--accent-cyan)' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(itemKey)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '4px',
                              transition: 'color 0.2s ease',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-orange)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Lower Panel */}
            <div style={{
              padding: '24px',
              borderTop: '1px solid var(--glass-border)',
              background: 'rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              {/* Order pricing */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span>Subtotal:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span>Shipping:</span>
                  <span style={{ color: 'var(--accent-lime)' }}>FREE</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  color: '#fff',
                  borderTop: '1px solid var(--glass-border)',
                  paddingTop: '12px',
                  marginTop: '4px',
                }}>
                  <span>Total Amount:</span>
                  <span className="text-gradient">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={handleCheckout}
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px 0', fontSize: '1.05rem' }}
                id="cart-checkout-btn"
              >
                <CreditCard size={18} /> Checkout Securely <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CartSidebar;
