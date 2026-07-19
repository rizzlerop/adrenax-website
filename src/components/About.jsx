import React, { useState } from 'react';
import { Target, Shield, Heart, Send, CheckCircle2, ArrowRight } from 'lucide-react';

const About = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: '60px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(57, 255, 20, 0.06)',
            border: '1px solid rgba(57, 255, 20, 0.15)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            color: 'var(--accent-lime)',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px',
          }}>
            THE ADRENAX PHILOSOPHY
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            ESTABLISHED <span className="text-gradient">2026</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px', maxWidth: '600px', marginInline: 'auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            We started with a simple hypothesis: high-performance activewear should not compromise on custom self-expression.
          </p>
        </div>

        {/* Brand Values Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          marginBottom: '80px',
        }}>
          <div className="glass-panel" style={{ padding: '30px', textAlign: 'left' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(0, 242, 254, 0.05)',
              border: '1px solid rgba(0, 242, 254, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)',
              marginBottom: '20px',
            }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Precision Engineering</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Every seam, fabric weave, and drop-shoulder silhouette is calculated for motion. We use 360gsm heavy cotton structures to retain shapes while allowing total breathability.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '30px', textAlign: 'left' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 94, 54, 0.05)',
              border: '1px solid rgba(255, 94, 54, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-orange)',
              marginBottom: '20px',
            }}>
              <Shield size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Lab Validation</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Our fabrics undergo intensive wear tests, ensuring zero shrink, zero fade, and maximum durability. The prints from our Lab Customizer are engineered to withstand active usage.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '30px', textAlign: 'left' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(57, 255, 20, 0.05)',
              border: '1px solid rgba(57, 255, 20, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-lime)',
              marginBottom: '20px',
            }}>
              <Heart size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Custom-First Philosophy</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              We believe apparel is an extension of identity. By equipping you with our Lab Customizer tools, you build the statement you wish to project to the world.
            </p>
          </div>
        </div>

        {/* Split Info Form Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
          alignItems: 'start',
          textAlign: 'left',
        }} className="about-split">
          
          {/* Brand Spec Sheets */}
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>
              Material & Spec Sheets
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              We develop fabrics from raw organic fibers. Here is what makes our streetwear activewear feel premium:
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderLeft: '3px solid var(--accent-cyan)', paddingLeft: '16px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Double-Stitch Rib Collars</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Prevents sagging and retains the sharp crewneck aesthetic through countless wash cycles.</p>
              </div>
              <div style={{ borderLeft: '3px solid var(--accent-orange)', paddingLeft: '16px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Loopback Fleece Backing</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Utilized in our sweatshirts and hoodies to facilitate temperature regulation during workouts or casual wear.</p>
              </div>
              <div style={{ borderLeft: '3px solid var(--accent-lime)', paddingLeft: '16px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Silicon Wash Coating</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Provides a premium brushed feel that is soft to the touch while repelling light moisture.</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px' }}>
              CONTACT THE LAB
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Have questions about fabric, custom designs, bulk orders, or shipping? Message our support desk.
            </p>

            {submitted ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'var(--accent-lime)',
                background: 'rgba(57, 255, 20, 0.06)',
                border: '1px solid rgba(57, 255, 20, 0.2)',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
              }}>
                <CheckCircle2 size={24} style={{ flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>Transmission Received!</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>We'll reach back to you in our next cycle (within 24 hours).</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '8px',
                      color: '#fff',
                      padding: '10px 14px',
                      outline: 'none',
                    }}
                    className="glow-hover"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '8px',
                      color: '#fff',
                      padding: '10px 14px',
                      outline: 'none',
                    }}
                    className="glow-hover"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '8px',
                      color: '#fff',
                      padding: '10px 14px',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'var(--font-sans)',
                    }}
                    className="glow-hover"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px 0' }}
                  id="contact-submit-btn"
                >
                  <Send size={16} /> Send Message <ArrowRight size={14} />
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-split {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
