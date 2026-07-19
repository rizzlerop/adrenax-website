import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  Boxes,
  FileText,
  LayoutDashboard,
  Mail,
  PackagePlus,
  Pencil,
  Save,
  ShieldAlert,
  ShoppingCart,
  Trash2,
  Users,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import {
  buildProductDraft,
  DEMO_USERS,
  toCategoryLabel,
} from '../data/storeDefaults';

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--glass-border)',
  borderRadius: '12px',
  color: '#fff',
  padding: '12px 14px',
  fontSize: '0.92rem',
  outline: 'none',
};

const labelStyle = {
  display: 'grid',
  gap: '8px',
  color: 'var(--text-secondary)',
  fontSize: '0.85rem',
  fontWeight: 600,
};

const tabButtonStyle = (active) => ({
  background: active ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.02)',
  color: active ? '#050608' : 'var(--text-secondary)',
  border: active ? 'none' : '1px solid var(--glass-border)',
  borderRadius: '999px',
  padding: '10px 16px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: 'var(--font-heading)',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
});

const iconButtonStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--glass-border)',
  borderRadius: '12px',
  padding: '10px 12px',
  color: '#fff',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
};

const formatDate = (value) =>
  new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

const AdminPanel = ({ setCurrentPage }) => {
  const { currentUser, isAdmin } = useAuth();
  const {
    products,
    orders,
    subscribers,
    siteContent,
    upsertProduct,
    deleteProduct,
    updateSiteContent,
  } = useStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [productDraft, setProductDraft] = useState(buildProductDraft());
  const [siteDraft, setSiteDraft] = useState(siteContent);
  const [productMessage, setProductMessage] = useState('');
  const [brandMessage, setBrandMessage] = useState('');

  useEffect(() => {
    setSiteDraft(siteContent);
  }, [siteContent]);

  if (!isAdmin) {
    return (
      <section style={{ padding: '88px 0' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '36px', textAlign: 'left' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent-orange)',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
              }}
            >
              <ShieldAlert size={15} />
              <span>Restricted Panel</span>
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>
              Admin access is required for this area.
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Sign in with the admin demo to manage the brand workspace.
            </p>
            <button onClick={() => setCurrentPage('login')} className="btn btn-primary">
              Open Login
            </button>
          </div>
        </div>
      </section>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const memberCount = DEMO_USERS.filter((user) => user.role === 'member').length;
  const lowStockProducts = products.filter(
    (product) => product.stock < 20 && product.stock !== 999,
  );
  const latestOrder = orders[0];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Boxes },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'audience', label: 'Audience', icon: Users },
    { id: 'brand', label: 'Brand', icon: FileText },
  ];

  const saveProduct = (event) => {
    event.preventDefault();
    const savedProduct = upsertProduct(productDraft);
    setProductDraft(buildProductDraft());
    setProductMessage(`${savedProduct.name} is now live in the storefront.`);
  };

  const editProduct = (product) => {
    setActiveTab('products');
    setProductDraft(buildProductDraft(product));
    setProductMessage(`Editing ${product.name}. Save to publish your changes.`);
  };

  const removeProduct = (product) => {
    const confirmed = window.confirm(`Remove ${product.name} from the storefront?`);

    if (!confirmed) {
      return;
    }

    deleteProduct(product.id);
    setProductMessage(`${product.name} has been removed from the live catalog.`);

    if (productDraft.id === product.id) {
      setProductDraft(buildProductDraft());
    }
  };

  const saveBrandSettings = (event) => {
    event.preventDefault();
    updateSiteContent(siteDraft);
    setBrandMessage('Storefront messaging updated successfully.');
  };

  return (
    <section style={{ padding: '48px 0 88px' }}>
      <div className="container">
        <div
          className="glass-panel"
          style={{
            padding: '28px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent-orange)',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '12px',
              }}
            >
              <LayoutDashboard size={15} />
              <span>Admin Panel</span>
            </div>
            <h1 style={{ fontSize: '2.6rem', marginBottom: '8px' }}>
              Control the AdrenaX storefront
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '680px' }}>
              Logged in as {currentUser?.name}. This dashboard lets you manage products, review
              orders, track subscribers, and rewrite brand copy without leaving the site.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentPage('shop')} className="btn btn-secondary">
              View Storefront
            </button>
            <button onClick={() => setCurrentPage('login')} className="btn btn-primary">
              Account Center
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={tabButtonStyle(activeTab === tab.id)}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'overview' ? (
          <div style={{ display: 'grid', gap: '24px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '18px',
              }}
            >
              {[
                {
                  label: 'Live Products',
                  value: products.length,
                  tone: 'var(--accent-cyan)',
                  icon: Boxes,
                },
                {
                  label: 'Orders Captured',
                  value: orders.length,
                  tone: 'var(--accent-orange)',
                  icon: ShoppingCart,
                },
                {
                  label: 'Revenue Snapshot',
                  value: `$${totalRevenue.toFixed(2)}`,
                  tone: 'var(--accent-lime)',
                  icon: BarChart3,
                },
                {
                  label: 'Subscribers',
                  value: subscribers.length,
                  tone: 'var(--accent-magenta)',
                  icon: Mail,
                },
              ].map((metric) => {
                const Icon = metric.icon;

                return (
                  <div
                    key={metric.label}
                    className="glass-panel"
                    style={{
                      padding: '20px',
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                      }}
                    >
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                        {metric.label}
                      </span>
                      <Icon size={18} style={{ color: metric.tone }} />
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>
                      {metric.value}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '14px' }}>Store health</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: '12px',
                      borderBottom: '1px solid var(--glass-border)',
                    }}
                  >
                    <span style={{ color: 'var(--text-secondary)' }}>Current members</span>
                    <strong>{memberCount}</strong>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: '12px',
                      borderBottom: '1px solid var(--glass-border)',
                    }}
                  >
                    <span style={{ color: 'var(--text-secondary)' }}>Low stock products</span>
                    <strong>{lowStockProducts.length}</strong>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ color: 'var(--text-secondary)' }}>Latest order</span>
                    <strong>{latestOrder ? latestOrder.id : 'No orders yet'}</strong>
                  </div>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '14px' }}>Low stock watchlist</h3>
                {lowStockProducts.length ? (
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {lowStockProducts.map((product) => (
                      <div
                        key={product.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '16px',
                          padding: '12px 14px',
                          borderRadius: '14px',
                          border: '1px solid var(--glass-border)',
                          background: 'rgba(255,255,255,0.02)',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700 }}>{product.name}</div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                            {toCategoryLabel(product.category)}
                          </div>
                        </div>
                        <div style={{ color: 'var(--accent-orange)', fontWeight: 800 }}>
                          {product.stock} left
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-secondary)' }}>
                    No urgent inventory warnings right now.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'products' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(320px, 420px) minmax(0, 1fr)',
              gap: '24px',
            }}
            className="admin-products-grid"
          >
            <form className="glass-panel" onSubmit={saveProduct} style={{ padding: '24px', display: 'grid', gap: '16px' }}>
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '12px',
                  }}
                >
                  <PackagePlus size={15} />
                  <span>{productDraft.id ? 'Edit Product' : 'Add Product'}</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>
                  {productDraft.id ? productDraft.name || 'Current draft' : 'Create a new catalog item'}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  This form publishes directly into the product grid below.
                </p>
              </div>

              {productMessage ? (
                <div
                  style={{
                    borderRadius: '14px',
                    padding: '12px 14px',
                    background: 'rgba(0,242,254,0.08)',
                    border: '1px solid rgba(0,242,254,0.2)',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                >
                  {productMessage}
                </div>
              ) : null}

              <label style={labelStyle}>
                Product name
                <input
                  style={inputStyle}
                  value={productDraft.name}
                  onChange={(event) =>
                    setProductDraft((current) => ({ ...current, name: event.target.value }))
                  }
                  required
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <label style={labelStyle}>
                  Price
                  <input
                    type="number"
                    min="0"
                    step="1"
                    style={inputStyle}
                    value={productDraft.price}
                    onChange={(event) =>
                      setProductDraft((current) => ({ ...current, price: event.target.value }))
                    }
                    required
                  />
                </label>
                <label style={labelStyle}>
                  Stock
                  <input
                    type="number"
                    min="0"
                    step="1"
                    style={inputStyle}
                    value={productDraft.stock}
                    onChange={(event) =>
                      setProductDraft((current) => ({ ...current, stock: event.target.value }))
                    }
                    required
                  />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <label style={labelStyle}>
                  Category
                  <input
                    style={inputStyle}
                    value={productDraft.category}
                    onChange={(event) =>
                      setProductDraft((current) => ({ ...current, category: event.target.value }))
                    }
                  />
                </label>
                <label style={labelStyle}>
                  Product type
                  <select
                    style={inputStyle}
                    value={productDraft.type}
                    onChange={(event) =>
                      setProductDraft((current) => ({ ...current, type: event.target.value }))
                    }
                  >
                    <option value="tshirt">T-Shirt</option>
                    <option value="hoodie">Hoodie</option>
                    <option value="sweatshirt">Sweatshirt</option>
                    <option value="polo">Polo</option>
                  </select>
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <label style={labelStyle}>
                  Badge
                  <input
                    style={inputStyle}
                    value={productDraft.badge}
                    onChange={(event) =>
                      setProductDraft((current) => ({ ...current, badge: event.target.value }))
                    }
                  />
                </label>
                <label style={labelStyle}>
                  Drop label
                  <input
                    style={inputStyle}
                    value={productDraft.dropLabel}
                    onChange={(event) =>
                      setProductDraft((current) => ({ ...current, dropLabel: event.target.value }))
                    }
                  />
                </label>
              </div>

              <label style={labelStyle}>
                Accent color
                <input
                  style={inputStyle}
                  value={productDraft.accentColor}
                  onChange={(event) =>
                    setProductDraft((current) => ({ ...current, accentColor: event.target.value }))
                  }
                />
              </label>

              <label style={labelStyle}>
                Description
                <textarea
                  rows="3"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '92px' }}
                  value={productDraft.description}
                  onChange={(event) =>
                    setProductDraft((current) => ({ ...current, description: event.target.value }))
                  }
                />
              </label>

              <label style={labelStyle}>
                Story line
                <textarea
                  rows="3"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '92px' }}
                  value={productDraft.story}
                  onChange={(event) =>
                    setProductDraft((current) => ({ ...current, story: event.target.value }))
                  }
                />
              </label>

              <label style={labelStyle}>
                Performance note
                <input
                  style={inputStyle}
                  value={productDraft.performanceNote}
                  onChange={(event) =>
                    setProductDraft((current) => ({
                      ...current,
                      performanceNote: event.target.value,
                    }))
                  }
                />
              </label>

              <label style={labelStyle}>
                Fabric
                <input
                  style={inputStyle}
                  value={productDraft.fabric}
                  onChange={(event) =>
                    setProductDraft((current) => ({ ...current, fabric: event.target.value }))
                  }
                />
              </label>

              <label style={labelStyle}>
                Sizes
                <input
                  style={inputStyle}
                  value={productDraft.sizesText}
                  onChange={(event) =>
                    setProductDraft((current) => ({ ...current, sizesText: event.target.value }))
                  }
                  placeholder="S, M, L, XL"
                />
              </label>

              <label style={labelStyle}>
                Colors
                <textarea
                  rows="4"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
                  value={productDraft.colorsText}
                  onChange={(event) =>
                    setProductDraft((current) => ({ ...current, colorsText: event.target.value }))
                  }
                  placeholder={'Core Black|#12151c\nChalk White|#ffffff'}
                />
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#fff',
                  fontWeight: 600,
                }}
              >
                <input
                  type="checkbox"
                  checked={productDraft.isCustomizable}
                  onChange={(event) =>
                    setProductDraft((current) => ({
                      ...current,
                      isCustomizable: event.target.checked,
                    }))
                  }
                />
                Open in customizer instead of Add to Cart
              </label>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Save Product
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProductDraft(buildProductDraft());
                    setProductMessage('');
                  }}
                  className="btn btn-secondary"
                >
                  Clear Draft
                </button>
              </div>
            </form>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Live inventory</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '18px' }}>
                Every product here feeds the customer-facing catalog tiles.
              </p>

              <div style={{ display: 'grid', gap: '16px' }}>
                {products.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      border: '1px solid var(--glass-border)',
                      borderRadius: '18px',
                      padding: '18px',
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '16px',
                        alignItems: 'flex-start',
                        marginBottom: '12px',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                          }}
                        >
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: '999px',
                              background: 'rgba(255,255,255,0.06)',
                              color: 'var(--text-secondary)',
                              fontSize: '0.72rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                            }}
                          >
                            {product.badge}
                          </span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            {product.dropLabel}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>{product.name}</h4>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                          {toCategoryLabel(product.category)} / ${product.price}
                        </div>
                      </div>

                      <div style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>
                        {product.stock === 999 ? 'Made to order' : `${product.stock} in stock`}
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '14px' }}>
                      {product.story || product.description}
                    </p>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button onClick={() => editProduct(product)} style={iconButtonStyle}>
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        onClick={() => removeProduct(product)}
                        style={{ ...iconButtonStyle, color: '#ffb5a5' }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'orders' ? (
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Order queue</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '18px' }}>
              Orders from the cart checkout now land here for admin review.
            </p>
            {orders.length ? (
              <div style={{ display: 'grid', gap: '16px' }}>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      border: '1px solid var(--glass-border)',
                      borderRadius: '18px',
                      padding: '20px',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '18px',
                        flexWrap: 'wrap',
                        marginBottom: '14px',
                      }}
                    >
                      <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{order.id}</h4>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                          {order.customerName} / {order.customerEmail} /{' '}
                          <span style={{ textTransform: 'capitalize' }}>{order.customerRole}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>
                          ${order.totalAmount.toFixed(2)}
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                          {formatDate(order.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gap: '8px' }}>
                      {order.items.map((item, index) => (
                        <div
                          key={`${order.id}-${item.id}-${index}`}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '16px',
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem',
                            borderTop: '1px solid rgba(255,255,255,0.04)',
                            paddingTop: '8px',
                          }}
                        >
                          <span>
                            {item.name} / {item.size} / {item.colorName} / Qty {item.quantity}
                          </span>
                          <span style={{ color: '#fff' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>
                No orders yet. Run a checkout from the storefront to populate this list.
              </p>
            )}
          </div>
        ) : null}

        {activeTab === 'audience' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Newsletter subscribers</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '18px' }}>
                New signups from the footer are saved here.
              </p>
              {subscribers.length ? (
                <div style={{ display: 'grid', gap: '12px' }}>
                  {subscribers.map((subscriber) => (
                    <div
                      key={subscriber.email}
                      style={{
                        border: '1px solid var(--glass-border)',
                        borderRadius: '14px',
                        padding: '14px',
                        background: 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>{subscriber.email}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                        Joined {formatDate(subscriber.subscribedAt)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-secondary)' }}>
                  No subscribers yet. Submit the footer form to test the pipeline.
                </p>
              )}
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Demo accounts</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '18px' }}>
                Helpful for QA when you want to check both member and admin flows.
              </p>
              <div style={{ display: 'grid', gap: '12px' }}>
                {DEMO_USERS.map((user) => (
                  <div
                    key={user.id}
                    style={{
                      border: '1px solid var(--glass-border)',
                      borderRadius: '14px',
                      padding: '14px',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <div style={{ fontWeight: 700 }}>{user.email}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                      {user.role} / password {user.password}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'brand' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(320px, 460px) minmax(0, 1fr)',
              gap: '24px',
            }}
            className="admin-brand-grid"
          >
            <form className="glass-panel" onSubmit={saveBrandSettings} style={{ padding: '24px', display: 'grid', gap: '16px' }}>
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--accent-lime)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '12px',
                  }}
                >
                  <FileText size={15} />
                  <span>Store Messaging</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Edit storefront copy</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  These controls update the announcement bar and hero section.
                </p>
              </div>

              {brandMessage ? (
                <div
                  style={{
                    borderRadius: '14px',
                    padding: '12px 14px',
                    background: 'rgba(57,255,20,0.08)',
                    border: '1px solid rgba(57,255,20,0.2)',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                >
                  {brandMessage}
                </div>
              ) : null}

              <label style={labelStyle}>
                Announcement
                <textarea
                  rows="3"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '92px' }}
                  value={siteDraft.announcement}
                  onChange={(event) =>
                    setSiteDraft((current) => ({ ...current, announcement: event.target.value }))
                  }
                />
              </label>

              <label style={labelStyle}>
                Hero badge
                <input
                  style={inputStyle}
                  value={siteDraft.heroBadge}
                  onChange={(event) =>
                    setSiteDraft((current) => ({ ...current, heroBadge: event.target.value }))
                  }
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <label style={labelStyle}>
                  Hero line one
                  <input
                    style={inputStyle}
                    value={siteDraft.heroLead}
                    onChange={(event) =>
                      setSiteDraft((current) => ({ ...current, heroLead: event.target.value }))
                    }
                  />
                </label>
                <label style={labelStyle}>
                  Highlight one
                  <input
                    style={inputStyle}
                    value={siteDraft.heroHighlight}
                    onChange={(event) =>
                      setSiteDraft((current) => ({
                        ...current,
                        heroHighlight: event.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <label style={labelStyle}>
                  Hero line two
                  <input
                    style={inputStyle}
                    value={siteDraft.heroSubLead}
                    onChange={(event) =>
                      setSiteDraft((current) => ({ ...current, heroSubLead: event.target.value }))
                    }
                  />
                </label>
                <label style={labelStyle}>
                  Highlight two
                  <input
                    style={inputStyle}
                    value={siteDraft.heroAccent}
                    onChange={(event) =>
                      setSiteDraft((current) => ({ ...current, heroAccent: event.target.value }))
                    }
                  />
                </label>
              </div>

              <label style={labelStyle}>
                Hero description
                <textarea
                  rows="4"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  value={siteDraft.heroDescription}
                  onChange={(event) =>
                    setSiteDraft((current) => ({
                      ...current,
                      heroDescription: event.target.value,
                    }))
                  }
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <label style={labelStyle}>
                  Primary CTA
                  <input
                    style={inputStyle}
                    value={siteDraft.heroPrimaryCta}
                    onChange={(event) =>
                      setSiteDraft((current) => ({
                        ...current,
                        heroPrimaryCta: event.target.value,
                      }))
                    }
                  />
                </label>
                <label style={labelStyle}>
                  Secondary CTA
                  <input
                    style={inputStyle}
                    value={siteDraft.heroSecondaryCta}
                    onChange={(event) =>
                      setSiteDraft((current) => ({
                        ...current,
                        heroSecondaryCta: event.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <button type="submit" className="btn btn-primary">
                <Save size={16} /> Save Brand Settings
              </button>
            </form>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Live preview</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '18px' }}>
                This mirrors the customer-facing messaging.
              </p>

              <div
                style={{
                  borderRadius: '24px',
                  padding: '28px',
                  background:
                    'linear-gradient(180deg, rgba(0,242,254,0.08), rgba(255,255,255,0.01))',
                  border: '1px solid rgba(0,242,254,0.16)',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '18px',
                  }}
                >
                  <FileText size={15} />
                  <span>{siteDraft.heroBadge}</span>
                </div>

                <h4 style={{ fontSize: '2.3rem', lineHeight: 1.02, marginBottom: '16px' }}>
                  {siteDraft.heroLead}
                  <br />
                  <span className="text-gradient">{siteDraft.heroHighlight}</span>{' '}
                  {siteDraft.heroSubLead}
                  <span className="text-gradient-orange"> {siteDraft.heroAccent}</span>
                </h4>

                <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', marginBottom: '20px' }}>
                  {siteDraft.heroDescription}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '18px',
                  }}
                >
                  <span className="btn btn-primary" style={{ pointerEvents: 'none' }}>
                    {siteDraft.heroPrimaryCta}
                  </span>
                  <span className="btn btn-secondary" style={{ pointerEvents: 'none' }}>
                    {siteDraft.heroSecondaryCta}
                  </span>
                </div>

                <div
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    borderTop: '1px solid var(--glass-border)',
                    paddingTop: '16px',
                  }}
                >
                  Announcement: {siteDraft.announcement}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <style>{`
        @media (max-width: 980px) {
          .admin-products-grid,
          .admin-brand-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AdminPanel;
