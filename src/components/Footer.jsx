import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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
        padding: '0 5vw',
        display: 'flex',
        flexDirection: 'column',
        gap: '8vw'
      }}>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '4rem'
        }}>

          {/* Left: Newsletter */}
          <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
            <h3 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.2rem',
              fontWeight: 400,
              marginBottom: '4rem',
              letterSpacing: '-0.02em'
            }}>
              Entra nel mondo
            </h3>

            <p style={{
              fontSize: '0.85rem',
              marginBottom: '2rem',
              fontWeight: 300,
              letterSpacing: '0.01em'
            }}>
              Subscribe and receive a 10% discount on your first bespoke order
            </p>

            <form style={{ marginBottom: '1.5rem' }}>
              <div className="footer-input-wrapper">
                <input
                  type="email"
                  placeholder="Email"
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
                <button type="submit" className="footer-submit-btn">
                  ISCRIVITI
                </button>
              </div>
            </form>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <input
                type="radio"
                id="privacy"
                name="privacy"
                style={{
                  appearance: 'none',
                  width: '12px',
                  height: '12px',
                  border: '1px solid #fff',
                  borderRadius: '50%',
                  marginTop: '0.2rem',
                  cursor: 'pointer'
                }}
              />
              <label htmlFor="privacy" style={{ fontSize: '0.75rem', fontWeight: 300 }}>
                I have read the <a href="#" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '2px', fontWeight: 500 }}>privacy policy</a> provided by Sui Dhaga Global
              </label>
            </div>
          </div>

          {/* Right: Links Columns */}
          <div style={{
            display: 'flex',
            gap: '6vw',
            flexWrap: 'wrap'
          }}>
            {/* Column 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>BRAND</h4>
              <a href="#" className="footer-link-exact">Adv Campaign</a>
              <a href="#" className="footer-link-exact">About</a>
            </div>

            {/* Column 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>SERVIZIO CLIENTI</h4>
              <a href="#" className="footer-link-exact">Contatti</a>
              <a href="#" className="footer-link-exact">Termini e condizioni</a>
              <a href="#" className="footer-link-exact">Spedizione e Resi</a>
            </div>

            {/* Column 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>FOLLOW US</h4>
              <a href="#" className="footer-link-exact">Facebook</a>
              <a href="#" className="footer-link-exact">Instagram</a>
            </div>
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
          marginTop: '4vw'
        }}>
          <div>Copyright © 2026 by Sui Dhaga</div>
          <div>SUI DHAGA GLOBAL - London, UK</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Credits <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>GD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
