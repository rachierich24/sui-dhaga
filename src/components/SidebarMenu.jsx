import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from './MotionHelpers';

// Import existing assets for hover states
import creativeImage from '../assets/images/workspace_creative_1777827300802.png';
import teamImage from '../assets/images/workspace_team_1777827283644.png';
import craftImage from '../assets/images/workspace_craft_1777827220745.png';
import navneetPortrait from '../assets/images/navneet_portrait_1777827174428.png';

const navLinks = [
  { name: 'Archives', image: '/WhatsApp Image 2026-06-01 at 1.26.05 AM.jpeg' },
  { name: 'Bespoke', image: craftImage },
  { name: 'Visionaries', image: navneetPortrait },
  { name: 'Process', image: teamImage },
];

const romanNumerals = ['I', 'II', 'III', 'IV'];

const SidebarMenu = ({ isOpen, setMenuOpen, setSizeOpen }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeMobileBgIndex, setActiveMobileBgIndex] = useState(0);
  const isMobile = useMobile();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  // Auto-cycle mobile background image when menu is open and nothing is hovered
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setActiveMobileBgIndex((prev) => (prev + 1) % navLinks.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Custom click handler for robust smooth scrolling via App routing
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    
    // Smooth scroll with premium delay to let the sidebar exit animation complete
    setTimeout(() => {
      window.location.hash = `#${targetId}`;
    }, 400); // matches stagger close transition duration
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={overlayVariants}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#030303', // Solid dark background
            zIndex: 9998, // Below Navbar
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Background Hover Image Reveal (Desktop) & Auto-cycling Carousel (Mobile) */}
          <AnimatePresence mode="wait">
            {hoveredLink && !isMobile ? (
              <motion.div
                key={hoveredLink.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                  overflow: 'hidden'
                }}
              >
                <motion.img
                  src={hoveredLink.image}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, transparent 20%, rgba(3,3,3,0.8) 100%)',
                  pointerEvents: 'none'
                }} />
              </motion.div>
            ) : (
              <motion.div
                key={`mobile-bg-${activeMobileBgIndex}`}
                className="mobile-only-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                  overflow: 'hidden'
                }}
              >
                <motion.img
                  src={navLinks[activeMobileBgIndex].image}
                  initial={{ scale: 1.02, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 0.15 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    scale: { duration: 5, ease: 'linear' },
                    opacity: { duration: 1.2 }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, transparent 30%, rgba(3,3,3,0.95) 100%)',
                  pointerEvents: 'none'
                }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Premium Ambient Fades for Scrolling Content */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '12vh',
            background: 'linear-gradient(to bottom, #030303 40%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 20
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '12vh',
            background: 'linear-gradient(to top, #030303 30%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 20
          }} />

          {/* Scrollable Container with Hidden Scrollbars (Mobile-Compatible Layer) */}
          <div 
            className="menu-scroll-container"
            style={{
              position: 'absolute',
              inset: 0,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10,
            }}
          >
            {/* Menu Items Links */}
            <div
              className="menu-links-container"
              style={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: isMobile ? '16vh' : '18vh',
                paddingBottom: isMobile ? '3vh' : '4vh',
                position: 'relative',
                zIndex: 15
              }}
            >
              {navLinks.map((link, i) => {
                const isHovered = hoveredLink?.name === link.name;
                const direction = i % 2 === 0 ? 'marquee-left' : 'marquee-right';

                return (
                  <motion.div
                    key={link.name}
                    variants={itemVariants}
                    onMouseEnter={() => !isMobile && setHoveredLink(link)}
                    onMouseLeave={() => !isMobile && setHoveredLink(null)}
                    className="menu-item-row"
                    style={{
                      position: 'relative',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      height: isMobile ? 'auto' : 'clamp(5.5rem, 12vw, 9.5rem)'
                    }}
                  >
                    {/* Anchor link with custom delayed scroll click handler */}
                    <a 
                      href={`#${link.name.toLowerCase()}`}
                      onClick={(e) => handleLinkClick(e, link.name.toLowerCase())}
                      style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 5 }}
                      aria-label={`Go to ${link.name}`}
                    >
                      <span style={{ display: 'none' }}>{link.name}</span>
                    </a>

                    <AnimatePresence mode="wait">
                      {isHovered && !isMobile ? (
                        <motion.div
                          key="marquee"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="marquee-container desktop-only-marquee"
                          style={{
                            position: 'absolute',
                            width: '100%',
                            pointerEvents: 'none',
                          }}
                        >
                          <div
                            className="marquee-content"
                            style={{
                              animationName: direction,
                              animationDuration: '25s',
                              animationTimingFunction: 'linear',
                              animationIterationCount: 'infinite'
                            }}
                          >
                            {[...Array(10)].map((_, idx) => (
                              <span
                                key={idx}
                                className="marquee-text"
                                style={{
                                  textShadow: '0 0 30px rgba(255,255,255,0.2)'
                                }}
                              >
                                {link.name}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="static"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: hoveredLink && !isMobile ? 0.1 : 1,
                            y: 0
                          }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                          className="menu-item-text-wrapper"
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: isMobile ? '2.4rem' : 'clamp(3.5rem, 8vw, 7rem)',
                            fontWeight: 300,
                            color: '#ffffff',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            textAlign: 'center',
                            zIndex: 2,
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 0.3s ease, text-shadow 0.3s ease, letter-spacing 0.3s ease'
                          }}
                        >
                          {/* Gold Roman Numerals on Mobile */}
                          <span className="mobile-roman-numeral">
                            {romanNumerals[i]}
                          </span>
                          <span>{link.name}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Golden-outlined Premium CTA Button */}
            <motion.div
              variants={itemVariants}
              className="menu-cta-container"
              style={{
                margin: isMobile ? '1.5rem auto 2rem' : '1.5rem auto 2.5rem',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                padding: '0 2rem',
                maxWidth: '420px',
                zIndex: 15,
                position: 'relative'
              }}
            >
              <button
                onClick={() => {
                  setSizeOpen(true);
                  setMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '1.1rem 2rem',
                  background: 'transparent',
                  border: '1px solid var(--gold)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="menu-cta-btn"
              >
                CRAFT YOUR BESPOKE SUIT
              </button>
            </motion.div>

            {/* Premium Interactive Drawer Footer */}
            <motion.div
              variants={itemVariants}
              style={{
                marginTop: '4rem',
                width: '100%',
                padding: isMobile ? '2.5rem 1.5rem 4.5rem' : '3rem 4rem 3.5rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(5, 5, 5, 0.45)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '1.5rem' : '2rem',
                zIndex: 15,
                position: 'relative'
              }}
              className="menu-footer"
            >
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: isMobile ? '2rem' : '2.5rem',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '140px' }}>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 400 }}>
                    Concierge & Studio
                  </span>
                  <a href="https://wa.me/61470270478" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', textTransform: 'none', letterSpacing: '0.05em', color: '#fff', transition: 'color 0.3s ease' }} className="menu-footer-link">
                    WhatsApp: +61 470 270 478
                  </a>
                  <a href="mailto:studio@suidhaga.com" style={{ fontSize: '0.75rem', textTransform: 'none', letterSpacing: '0.05em', color: '#fff', transition: 'color 0.3s ease' }} className="menu-footer-link">
                    studio@suidhaga.com
                  </a>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '140px' }}>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 400 }}>
                    Hours & Location
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    Punjab, India (Worldwide Delivery)
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    Mon — Sat: 10:00 — 19:00 IST
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '100px' }}>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 400 }}>
                    Connect
                  </span>
                  <div style={{ display: 'flex', gap: '1.2rem' }}>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: '#fff', transition: 'color 0.3s ease' }} className="menu-footer-link">
                      Instagram
                    </a>
                    <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: '#fff', transition: 'color 0.3s ease' }} className="menu-footer-link">
                      Pinterest
                    </a>
                  </div>
                </div>
              </div>
              <div style={{
                textAlign: 'center',
                fontSize: '0.55rem',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                marginTop: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.03)',
                paddingTop: '1.5rem'
              }}>
                © {new Date().getFullYear()} Sui Dhaga Global. Bespoke Tailoring.
              </div>
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarMenu;
