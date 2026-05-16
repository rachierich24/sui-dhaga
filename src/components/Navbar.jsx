import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/images/logo.png';
import SidebarMenu from './SidebarMenu';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          background: scrolled && !menuOpen ? 'rgba(3, 3, 3, 0.8)' : 'rgba(3, 3, 3, 0)',
          backdropFilter: scrolled && !menuOpen ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled && !menuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled && !menuOpen ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(255, 255, 255, 0)',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease',
        }}
      >
        {/* Left Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.5rem',
              zIndex: 10000
            }}
            className="hamburger-btn"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '35px' }}>
              <motion.div
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 9 : 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ width: '100%', height: '1px', backgroundColor: '#fff', originX: 0.5 }}
              />
              <motion.div
                animate={{ opacity: menuOpen ? 0 : 1, width: menuOpen ? '100%' : '70%' }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ height: '1px', backgroundColor: '#fff' }}
              />
              <motion.div
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -9 : 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ width: '100%', height: '1px', backgroundColor: '#fff', originX: 0.5 }}
              />
            </div>
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: menuOpen ? 'none' : 'block' // hide completely when open so X is centered-ish
              }}
            >
              MENU
            </motion.span>
          </button>
        </div>

        {/* right Logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'right', zIndex: 10000 }}>
          <a href="#" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={logoImg} alt="Sui Dhaga Logo" style={{ height: '30px', objectFit: 'contain' }} />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 400
            }}>
              Sui Dhaga
            </span>
          </a>
        </div>

      </motion.nav>

      <SidebarMenu isOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default Navbar;
