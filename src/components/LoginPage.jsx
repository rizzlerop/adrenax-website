import React, { useState } from 'react';
import {
  ArrowRight,
  LayoutDashboard,
  LockKeyhole,
  LogIn,
  LogOut,
  ShieldCheck,
  ShoppingBag,
  UserRound,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_USERS } from '../data/storeDefaults';

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--glass-border)',
  borderRadius: '12px',
  color: '#fff',
  padding: '14px 16px',
  fontSize: '0.95rem',
  outline: 'none',
};

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  color: 'var(--text-secondary)',
  fontSize: '0.9rem',
  fontWeight: 600,
};

const LoginPage = ({ setCurrentPage, requiredRole = null }) => {
  const { currentUser, login, logout } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [feedback, setFeedback] = useState('');

  const isAuthorized =
    currentUser && (!requiredRole || currentUser.role === requiredRole);

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(credentials.email, credentials.password);

    if (!result.ok) {
      setFeedback(result.message);
      return;
    }

    if (requiredRole && result.user.role !== requiredRole) {
      setFeedback('That account signed in successfully, but it does not have admin access.');
      setCurrentPage('login');
      return;
    }

    setFeedback('');
    setCurrentPage(result.user.role === 'admin' ? 'admin' : 'shop');
  };

  const fillDemoCredentials = (user) => {
    setCredentials({
      email: user.email,
      password: user.password,
    });
    setFeedback('');
  };

  const handleLogout = () => {
    logout();
    setFeedback('You have been signed out of the current session.');
    setCurrentPage('login');
  };

  const roleCopy =
    currentUser?.role === 'admin'
      ? 'Admin access is live for catalog, orders, and storefront controls.'
      : 'Your member session is active for browsing, shopping, and future account flows.';

  return (
    <section style={{ padding: '88px 0' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            alignItems: 'stretch',
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: '32px',
              position: 'relative',
              overflow: 'hidden',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,242,254,0.16), transparent 65%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent-cyan)',
                fontSize: '0.82rem',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '18px',
              }}
            >
              <ShieldCheck size={15} />
              <span>AdrenaX Access Layer</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
                marginBottom: '18px',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              LOGIN FOR
              <br />
              <span className="text-gradient">MEMBERSHIP</span> OR
              <br />
              <span className="text-gradient-orange">CONTROL.</span>
            </h1>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                maxWidth: '540px',
                marginBottom: '28px',
              }}
            >
              The storefront now supports member and admin sessions. Sign in as a shopper to
              browse the brand, or use the admin demo to run inventory, content, and order
              operations from one panel.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '14px',
                marginBottom: '28px',
              }}
            >
              <div
                style={{
                  border: '1px solid var(--glass-border)',
                  borderRadius: '16px',
                  padding: '16px',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <LayoutDashboard size={18} style={{ color: 'var(--accent-orange)', marginBottom: '10px' }} />
                <h3 style={{ fontSize: '1rem', marginBottom: '6px' }}>Admin Controls</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Manage products, monitor new orders, and update the hero messaging without
                  touching code.
                </p>
              </div>
              <div
                style={{
                  border: '1px solid var(--glass-border)',
                  borderRadius: '16px',
                  padding: '16px',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <ShoppingBag size={18} style={{ color: 'var(--accent-lime)', marginBottom: '10px' }} />
                <h3 style={{ fontSize: '1rem', marginBottom: '6px' }}>Member Flow</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Keep a visible account state and a clean logout path like a real performance
                  commerce site.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px',
              }}
            >
              {DEMO_USERS.map((user) => (
                <button
                  key={user.id}
                  onClick={() => fillDemoCredentials(user)}
                  className="glow-hover"
                  style={{
                    textAlign: 'left',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    color: 'inherit',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.78rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: user.role === 'admin' ? 'var(--accent-orange)' : 'var(--accent-cyan)',
                        fontWeight: 700,
                      }}
                    >
                      {user.role}
                    </span>
                    <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <div style={{ fontWeight: 700, marginBottom: '6px' }}>{user.email}</div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    Password: {user.password}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {currentUser && isAuthorized ? (
              <>
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
                      marginBottom: '14px',
                    }}
                  >
                    <UserRound size={15} />
                    <span>Session Active</span>
                  </div>
                  <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{currentUser.name}</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '18px' }}>
                    {roleCopy}
                  </p>
                </div>

                <div
                  style={{
                    border: '1px solid var(--glass-border)',
                    borderRadius: '18px',
                    padding: '18px',
                    display: 'grid',
                    gap: '10px',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Email</span>
                    <span>{currentUser.email}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Role</span>
                    <span style={{ textTransform: 'capitalize' }}>{currentUser.role}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Last login</span>
                    <span>{new Date(currentUser.lastLoginAt).toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <button
                    onClick={() => setCurrentPage(currentUser.role === 'admin' ? 'admin' : 'shop')}
                    className="btn btn-primary"
                  >
                    {currentUser.role === 'admin' ? (
                      <>
                        <LayoutDashboard size={16} /> Open Admin Panel
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} /> Continue Shopping
                      </>
                    )}
                  </button>
                  <button onClick={handleLogout} className="btn btn-secondary">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </>
            ) : currentUser && requiredRole === 'admin' ? (
              <>
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
                      marginBottom: '14px',
                    }}
                  >
                    <LockKeyhole size={15} />
                    <span>Admin Access Required</span>
                  </div>
                  <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>
                    {currentUser.name} is signed in
                  </h2>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    This account can browse the store, but the admin workspace is restricted to the
                    admin demo login.
                  </p>
                </div>

                <div
                  style={{
                    border: '1px solid rgba(255,94,54,0.22)',
                    borderRadius: '18px',
                    padding: '18px',
                    background: 'rgba(255,94,54,0.08)',
                    color: '#fff',
                  }}
                >
                  Use `admin@adrenax.com` with password `admin123` to enter the dashboard.
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <button onClick={() => setCurrentPage('home')} className="btn btn-primary">
                    Back to Home
                  </button>
                  <button onClick={handleLogout} className="btn btn-secondary">
                    <LogOut size={16} /> Switch Account
                  </button>
                </div>
              </>
            ) : (
              <>
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
                      marginBottom: '14px',
                    }}
                  >
                    <LogIn size={15} />
                    <span>{requiredRole === 'admin' ? 'Admin Login' : 'Member Login'}</span>
                  </div>
                  <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>
                    {requiredRole === 'admin'
                      ? 'Enter the control room'
                      : 'Sign in to the AdrenaX site'}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {requiredRole === 'admin'
                      ? 'Use the admin demo credentials to manage products, orders, and brand copy.'
                      : 'This login/logout flow is now connected to the storefront navigation and account state.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
                  <label style={labelStyle}>
                    Email
                    <input
                      type="email"
                      value={credentials.email}
                      onChange={(event) =>
                        setCredentials((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      placeholder="you@adrenax.com"
                      style={inputStyle}
                      required
                    />
                  </label>

                  <label style={labelStyle}>
                    Password
                    <input
                      type="password"
                      value={credentials.password}
                      onChange={(event) =>
                        setCredentials((current) => ({
                          ...current,
                          password: event.target.value,
                        }))
                      }
                      placeholder="Enter your password"
                      style={inputStyle}
                      required
                    />
                  </label>

                  {feedback ? (
                    <div
                      style={{
                        borderRadius: '14px',
                        padding: '12px 14px',
                        background: 'rgba(255,94,54,0.08)',
                        border: '1px solid rgba(255,94,54,0.24)',
                        color: '#fff',
                        fontSize: '0.9rem',
                      }}
                    >
                      {feedback}
                    </div>
                  ) : null}

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <LogIn size={16} /> Sign In
                  </button>
                </form>

                <div
                  style={{
                    borderTop: '1px solid var(--glass-border)',
                    paddingTop: '18px',
                    color: 'var(--text-muted)',
                    fontSize: '0.88rem',
                  }}
                >
                  Logout is available both here and from the navbar, so the auth flow stays visible
                  across the whole storefront.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
