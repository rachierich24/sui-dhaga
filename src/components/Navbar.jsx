import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import SidebarMenu from './SidebarMenu';
import SizeGuide from './SizeGuide';
import { useMobile } from './MotionHelpers';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const isMobile = useMobile();
  const [showFab, setShowFab] = useState(false);
  const [fabDismissed, setFabDismissed] = useState(false);

  // Smart Reveal State: hides on scroll down, shows on scroll up
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Sewing Thread Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state for background blur
      setScrolled(currentScrollY > 50);

      // Smart header show/hide logic
      if (currentScrollY < 50) {
        // Always show at top of page
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & not at the very top -> hide
        setVisible(false);
      } else {
        // Scrolling up -> show
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock scroll when overlays are open
  useEffect(() => {
    if (menuOpen || sizeOpen) {
      document.body.style.overflow = 'hidden';
      // Make sure navbar is visible when menus are open
      setVisible(true);
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

  useEffect(() => {
    // Elegant luxury popup delay (1.5 seconds)
    const timer = setTimeout(() => {
      setShowFab(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: visible ? 0 : -100
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          padding: isMobile 
            ? (scrolled ? '0.75rem 1rem' : '1rem 1rem')
            : (scrolled ? '1rem var(--section-padding-x)' : '1.5rem var(--section-padding-x)'),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 9999,
          background: menuOpen || sizeOpen
            ? 'rgba(3, 3, 3, 0)'
            : scrolled
              ? 'rgba(3, 3, 3, 0.85)'
              : 'rgba(3, 3, 3, 0)',
          backdropFilter: menuOpen || sizeOpen
            ? 'none'
            : scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: menuOpen || sizeOpen
            ? 'none'
            : scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled && !menuOpen && !sizeOpen
            ? '1px solid rgba(214, 175, 55, 0.15)'
            : '1px solid rgba(255, 255, 255, 0)',
          boxShadow: scrolled && !menuOpen && !sizeOpen
            ? '0 10px 30px rgba(0, 0, 0, 0.4)'
            : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease, padding 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Left Logo with Shimmer/Glow Micro-interaction */}
        <div style={{ display: 'flex', alignItems: 'center', flex: isMobile ? '0 0 auto' : 1, zIndex: 10000 }}>
          <motion.a
            href="#"
            onClick={() => setMenuOpen(false)}
            style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '0.75rem' }}
            whileHover="hover"
          >
            <motion.img
              src="/navbar-logo.png"
              alt="Sui Dhaga Logo"
              style={{ height: isMobile ? '38px' : '48px', objectFit: 'contain' }}
              variants={{
                hover: { scale: 1.06, rotate: [0, -3, 3, 0], transition: { duration: 0.5 } }
              }}
            />
            <motion.span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: isMobile ? '14px' : '18px',
              letterSpacing: isMobile ? '0.18em' : '0.25em',
              textTransform: 'uppercase',
              fontWeight: 400,
              color: '#fff',
              display: 'inline-block',
              whiteSpace: 'nowrap'
            }}
            variants={{
              hover: { color: 'var(--gold)', textShadow: '0 0 8px rgba(212, 175, 55, 0.3)' }
            }}
            >
              Sui Dhaga
            </motion.span>
          </motion.a>
        </div>

        {/* Right Hamburg & CTA Buttons */}
        <div style={{ flex: isMobile ? '0 0 auto' : 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: isMobile ? '1rem' : '2rem', zIndex: 10000 }}>

          {/* Premium "CRAFT MY SUIT" Outline CTA */}
          <motion.button
            onClick={() => { setSizeOpen(true); setMenuOpen(false); }}
            style={{
              background: 'transparent',
              border: '1px solid rgba(214, 175, 55, 0.4)',
              borderRadius: '30px',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.55rem 1.5rem',
              display: isMobile || menuOpen ? 'none' : 'block',
              transition: 'border-color 0.4s ease'
            }}
            whileHover={{
              scale: 1.03,
              borderColor: 'rgba(214, 175, 55, 1)',
              boxShadow: '0 0 15px rgba(214, 175, 55, 0.25)',
              color: 'var(--gold)',
              letterSpacing: '0.24em',
              background: 'rgba(214, 175, 55, 0.03)'
            }}
            whileTap={{ scale: 0.98 }}
            className="craft-my-suit-btn"
          >
            CRAFT MY SUIT
          </motion.button>

          {/* Premium Hamburger Toggle */}
          <button
            onClick={() => { setMenuOpen(!menuOpen); setSizeOpen(false); }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '0rem' : 'var(--hamburger-gap, 1rem)',
              padding: '0.5rem',
              zIndex: 10000
            }}
            className="hamburger-btn"
          >
            <AnimatePresence mode="wait">
              {!isMobile && (
                <motion.span
                  key={menuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: menuOpen ? 'var(--gold)' : '#fff'
                  }}
                >
                  {menuOpen ? "CLOSE" : "MENU"}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Hamburger Icon with brand open animations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: isMobile ? '28px' : '35px' }}>
              <motion.div
                animate={{
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? (isMobile ? 9 : 9) : 0,
                  backgroundColor: menuOpen ? 'var(--gold)' : '#fff'
                }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ width: '100%', height: '1px', originX: 0.5 }}
              />
              <motion.div
                animate={{
                  opacity: menuOpen ? 0 : 1,
                  width: menuOpen ? '100%' : '70%',
                  backgroundColor: menuOpen ? 'var(--gold)' : '#fff'
                }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ height: '1px', marginLeft: 'auto' }}
              />
              <motion.div
                animate={{
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? (isMobile ? -9 : -9) : 0,
                  backgroundColor: menuOpen ? 'var(--gold)' : '#fff'
                }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ width: '100%', height: '1px', originX: 0.5 }}
              />
            </div>
          </button>
        </div>

        {/* Brand Thematic "Sewing Thread" Scroll Progress Indicator */}
        {scrolled && !menuOpen && !sizeOpen && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--gold) 50%, transparent)',
              boxShadow: '0 1px 8px var(--gold), 0 0 2px var(--gold)',
              originX: 0,
              scaleX,
              zIndex: 10
            }}
          />
        )}

      </motion.nav>

      {/* Luxury Glassmorphic FAB for Mobile */}
      <AnimatePresence>
        {isMobile && showFab && !fabDismissed && !menuOpen && !sizeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: 0,
              right: 0,
              margin: '0 auto',
              zIndex: 9999,
              width: 'calc(100% - 3rem)',
              maxWidth: '350px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <motion.div
              style={{
                width: '100%',
                background: 'rgba(3, 3, 3, 0.75)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(214, 175, 55, 0.4)',
                borderRadius: '40px',
                color: '#fff',
                padding: '0.5rem 0.5rem 0.5rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 15px rgba(214, 175, 55, 0.15)',
              }}
              whileHover={{
                borderColor: 'rgba(214, 175, 55, 0.6)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(214, 175, 55, 0.25)',
              }}
            >
              {/* Clickable CTA Area */}
              <div
                onClick={() => setSizeOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  flex: 1,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  userSelect: 'none',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(45deg)' }}>
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
                Craft My Suit
              </div>

              {/* Elegant Divider */}
              <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }}></div>

              {/* Close Button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setFabDismissed(true);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.6)',
                  padding: 0,
                  transition: 'all 0.3s ease'
                }}
                whileHover={{
                  background: 'rgba(214, 175, 55, 0.1)',
                  borderColor: 'var(--gold)',
                  color: 'var(--gold)'
                }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SidebarMenu isOpen={menuOpen} setMenuOpen={setMenuOpen} setSizeOpen={setSizeOpen} />
      <SizeGuide isOpen={sizeOpen} setSizeOpen={setSizeOpen} />
    </>
  );
};

export default Navbar;
