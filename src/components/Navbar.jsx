import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SidebarMenu from './SidebarMenu';
import SizeGuide from './SizeGuide';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen || sizeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, sizeOpen]);

  useEffect(() => {
    const handleOpenSize = () => {
      setSizeOpen(true);
      setMenuOpen(false);
    };
    window.addEventListener('open-size-guide', handleOpenSize);
    return () => {
      window.removeEventListener('open-size-guide', handleOpenSize);
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          padding: '1.5rem var(--section-padding-x)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 9999,
          background: scrolled && !menuOpen && !sizeOpen ? 'rgba(3, 3, 3, 0.8)' : 'rgba(3, 3, 3, 0)',
          backdropFilter: scrolled && !menuOpen && !sizeOpen ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled && !menuOpen && !sizeOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled && !menuOpen && !sizeOpen ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(255, 255, 255, 0)',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease',
        }}
      >
        {/* Left Logo */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, zIndex: 10000 }}>
          <a href="#" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/navbar-logo.png" alt="Sui Dhaga Logo" style={{ height: '48px', objectFit: 'contain' }} />
            <span 
              className="logo-text"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '18px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontWeight: 400
              }}
            >
              Sui Dhaga
            </span>
          </a>
        </div>

        {/* Right Hamburger */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '2rem', zIndex: 10000 }}>

          <button
            onClick={() => { setSizeOpen(true); setMenuOpen(false); }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: menuOpen ? 'none' : 'block'
            }}
            className="craft-my-suit-btn desktop-only"
          >
            CRAFT MY SUIT
          </button>

          <button
            onClick={() => { setMenuOpen(!menuOpen); setSizeOpen(false); }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--hamburger-gap, 1rem)',
              padding: '0.5rem',
              zIndex: 10000
            }}
            className="hamburger-btn"
          >
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="desktop-only"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: menuOpen ? 'none' : 'block'
              }}
            >
              MENU
            </motion.span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '35px' }}>
              <motion.div
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 9 : 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ width: '100%', height: '1px', backgroundColor: '#fff', originX: 0.5 }}
              />
              <motion.div
                animate={{ opacity: menuOpen ? 0 : 1, width: menuOpen ? '100%' : '70%' }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ height: '1px', backgroundColor: '#fff', marginLeft: 'auto' }}
              />
              <motion.div
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -9 : 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ width: '100%', height: '1px', backgroundColor: '#fff', originX: 0.5 }}
              />
            </div>
          </button>
        </div>

      </motion.nav>

      <SidebarMenu isOpen={menuOpen} setMenuOpen={setMenuOpen} setSizeOpen={setSizeOpen} />
      <SizeGuide isOpen={sizeOpen} setSizeOpen={setSizeOpen} />
    </>
  );
};

export default Navbar;
