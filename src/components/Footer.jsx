import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Refined spring for a very tight, smooth, non-rubbery transition
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90, mass: 0.1 });

  // Parallax translation
  const yText = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]);

  // Form states
  const [email, setEmail] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!email) {
      setStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!privacyAccepted) {
      setStatus({ type: 'error', message: 'Please accept the Privacy Policy to proceed.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Subscribing into the world of luxury...' });

    setTimeout(() => {
      setStatus({
        type: 'success',
        message: 'Welcome! A 10% discount code has been sent to your email.'
      });
      setEmail('');
      setPrivacyAccepted(false);
    }, 1500);
  };

  const handleOpenSizeGuide = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-size-guide'));
  };

  return (
    <footer ref={footerRef} style={{
      position: 'relative',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 10,
      backgroundColor: '#000000', // Base background is black
      color: '#ffffff'
    }}>

      {/* 
        This is the boundary trick! 
        We create a container that looks like it belongs half to the section above (white) 
        and half to the footer (black). We use a linear gradient background.
      */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(250px, 40vw, 500px)',
        background: 'linear-gradient(to bottom, #ffffff 50%, #000000 50%)',
        overflow: 'hidden', // Keep text contained within this specific parallax block
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none'
      }}>
        {/* 
          Because the background is half white / half black, 
          using mix-blend-mode: difference with white text 
          will make the text black on the white half, and white on the black half!
          This creates the perfect seamless inversion.
        */}
        <motion.h1 style={{
          position: 'absolute',
          width: '100%',
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(6rem, 20vw, 25rem)', // Scaled down slightly so it's fully visible
          fontWeight: 900,
          margin: 0,
          color: '#ffffff',
          letterSpacing: '-0.05em',
          textTransform: 'uppercase',
          textAlign: 'center',
          lineHeight: 0.85,
          userSelect: 'none',
          mixBlendMode: 'difference',
          y: yText
        }}>
          SUI <br /> DHAGA
        </motion.h1>
      </div>

      {/* Main Footer Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '0 var(--section-padding-x)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--gap-responsive)'
      }}>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '4rem'
        }}>

          {/* Left: Newsletter */}
          <div style={{ flex: '1 1 250px', maxWidth: '500px' }}>
            <h3 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.2rem',
              fontWeight: 400,
              marginBottom: '4rem',
              letterSpacing: '-0.02em'
            }}>
              Enter the world of Sui Dhaga
            </h3>

            <p style={{
              fontSize: '0.85rem',
              marginBottom: '2rem',
              fontWeight: 300,
              letterSpacing: '0.01em',
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              Subscribe and receive a 10% discount on your first bespoke order
            </p>

            <form onSubmit={handleSubscribe} style={{ marginBottom: '1.5rem' }}>
              <div className="footer-input-wrapper">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    outline: 'none',
                    width: '100%',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                    fontWeight: 300
                  }}
                />
                <button type="submit" className="footer-submit-btn" disabled={status.type === 'loading'}>
                  {status.type === 'loading' ? '...' : 'SUBSCRIBE'}
                </button>
              </div>
            </form>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
              <input
                type="checkbox"
                id="privacy"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                style={{
                  width: '14px',
                  height: '14px',
                  accentColor: '#D4AF37',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  marginTop: '0.15rem'
                }}
              />
              <label htmlFor="privacy" style={{ fontSize: '0.75rem', fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                I have read the <a href="#" onClick={(e) => { e.preventDefault(); setPrivacyModalOpen(true); }} style={{ color: '#D4AF37', textDecoration: 'underline', textUnderlineOffset: '2px', fontWeight: 500 }}>Privacy Policy</a> provided by Sui Dhaga Global.
              </label>
            </div>

            <AnimatePresence>
              {status.message && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  style={{
                    fontSize: '0.75rem',
                    color: status.type === 'error' ? '#ff4d4d' : (status.type === 'success' ? '#D4AF37' : '#aaaaaa'),
                    fontWeight: 300,
                    marginTop: '0.5rem',
                    letterSpacing: '0.02em'
                  }}
                >
                  {status.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Links Columns */}
          <div className="footer-links-grid">
            {/* Column 1: Brand navigation */}
            <nav aria-label="Footer Brand Navigation" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.05em', color: '#D4AF37' }}>BRAND</h4>
              <a href="#how-we-work" className="footer-link-exact" aria-label="Read about our empowerment and fair trade studio">About Us</a>
              <a href="#collection" className="footer-link-exact" aria-label="View our bespoke luxury garments collection">The Collection</a>
              <a href="#process" className="footer-link-exact" aria-label="Explore our three-step custom crafting process">Our Process</a>
              <a href="#visionaries" className="footer-link-exact" aria-label="Meet the founders of Sui Dhaga Global">The Visionaries</a>
            </nav>

            {/* Column 2: Customer Service */}
            <nav aria-label="Footer Customer Service Navigation" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.05em', color: '#D4AF37' }}>CUSTOMER SERVICE</h4>
              <a href="#book" className="footer-link-exact" aria-label="Book a bespoke tailoring consultation">Book Consultation</a>
              <a href="#" onClick={handleOpenSizeGuide} className="footer-link-exact" aria-label="Open our size guide and tailoring details">Size Guide & Crafting</a>
              <a href="https://wa.me/61470270478" target="_blank" rel="noopener noreferrer" className="footer-link-exact" aria-label="Contact our customer service directly via WhatsApp">Contact via WhatsApp</a>
            </nav>

            {/* Column 3: Follow Us */}
            <nav aria-label="Footer Social Connections" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.05em', color: '#D4AF37' }}>FOLLOW US</h4>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link-exact" aria-label="Follow Sui Dhaga Global on Facebook">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link-exact" aria-label="Follow Sui Dhaga Global on Instagram">Instagram</a>
              <a href="https://wa.me/61470270478" target="_blank" rel="noopener noreferrer" className="footer-link-exact" aria-label="Chat with our master designers on WhatsApp">WhatsApp Chat</a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.7rem',
          fontWeight: 300,
          marginTop: '4vw',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '2rem'
        }}>
          <div>Copyright © 2026 by Sui Dhaga</div>
          <div>SUI DHAGA GLOBAL - London, UK</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Credits <span style={{ fontWeight: 600, fontSize: '0.8rem', color: '#D4AF37' }}>GD</span>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {privacyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setPrivacyModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                backgroundColor: '#050505',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '8px',
                padding: '3rem',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setPrivacyModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
              >
                &times;
              </button>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                color: '#D4AF37',
                fontSize: '2rem',
                fontWeight: 300,
                marginBottom: '1.5rem',
                letterSpacing: '0.02em',
                borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
                paddingBottom: '1rem'
              }}>
                Privacy Policy
              </h2>

              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.8,
                fontWeight: 300,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem'
              }}>
                <p style={{ color: '#D4AF37', fontStyle: 'italic' }}>
                  Effective Date: May 20, 2026
                </p>

                <p>
                  At Sui Dhaga Global, we are committed to safeguarding the personal data of our bespoke clients and community.
                </p>

                <h4 style={{ color: '#ffffff', fontWeight: 500, fontSize: '0.95rem', margin: '0.5rem 0 0' }}>1. Data We Collect</h4>
                <p style={{ margin: 0 }}>
                  We collect information provided directly by you when you subscribe to our newsletter, book a tailored consultation, or message us via WhatsApp. This may include your name, contact details, measurement data, and email address.
                </p>

                <h4 style={{ color: '#ffffff', fontWeight: 500, fontSize: '0.95rem', margin: '0.5rem 0 0' }}>2. How We Use Your Data</h4>
                <p style={{ margin: 0 }}>
                  We use your data strictly to curate your bespoke garments, schedule consultations, send updates on your order progress, and share brand news and promotions (with your explicit consent).
                </p>

                <h4 style={{ color: '#ffffff', fontWeight: 500, fontSize: '0.95rem', margin: '0.5rem 0 0' }}>3. Safety & Sharing</h4>
                <p style={{ margin: 0 }}>
                  We do not share, sell, or disclose your information to third-party marketing networks. All communication and styling details are kept fully confidential.
                </p>

                <h4 style={{ color: '#ffffff', fontWeight: 500, fontSize: '0.95rem', margin: '0.5rem 0 0' }}>4. Your Choices</h4>
                <p style={{ margin: 0 }}>
                  You have the right to request access to the data we hold, correct any inaccuracies, or opt out of newsletter subscriptions at any time.
                </p>
              </div>

              <div style={{ marginTop: '2.5rem', textAlign: 'right' }}>
                <button
                  onClick={() => setPrivacyModalOpen(false)}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #D4AF37',
                    color: '#D4AF37',
                    padding: '0.75rem 2rem',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#D4AF37';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#D4AF37';
                  }}
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
