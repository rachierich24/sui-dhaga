import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import existing assets for hover states
import creativeImage from '../assets/images/workspace_creative_1777827300802.png';
import teamImage from '../assets/images/workspace_team_1777827283644.png';
import craftImage from '../assets/images/workspace_craft_1777827220745.png';
import navneetPortrait from '../assets/images/navneet_portrait_1777827174428.png';

const navLinks = [
  { name: 'Collection', image: creativeImage },
  { name: 'Bespoke', image: craftImage },
  { name: 'Visionaries', image: navneetPortrait },
  { name: 'Process', image: teamImage },
];

const romanNumerals = ['I', 'II', 'III', 'IV'];

const SidebarMenu = ({ isOpen, setMenuOpen, setSizeOpen }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeMobileBgIndex, setActiveMobileBgIndex] = useState(0);

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
            {hoveredLink ? (
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
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 4.5, ease: 'linear' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.2,
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

          {/* Menu Items Links */}
          <div 
            className="menu-links-container"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              zIndex: 10,
              paddingTop: '12vh',
              paddingBottom: '1vh',
            }}
          >
            {navLinks.map((link, i) => {
              const isHovered = hoveredLink?.name === link.name;
              const direction = i % 2 === 0 ? 'marquee-left' : 'marquee-right';

              return (
                <motion.div
                  key={link.name}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredLink(link)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => setMenuOpen(false)}
                  className="menu-item-row"
                  style={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <a href={`#${link.name.toLowerCase()}`} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 5 }}>
                    <span style={{ display: 'none' }}>{link.name}</span>
                  </a>
                  
                  <AnimatePresence mode="wait">
                    {isHovered ? (
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
                          opacity: hoveredLink ? 0.1 : 1, 
                          y: 0 
                        }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        className="menu-item-text-wrapper"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
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
              margin: '1.5rem auto 1rem',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              padding: '0 2rem',
              maxWidth: '420px',
              zIndex: 10
            }}
          >
            <button
              onClick={() => {
                setSizeOpen(true);
                setMenuOpen(false);
              }}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                background: 'transparent',
                border: '1px solid var(--gold)',
                color: '#ffffff',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
              }}
              className="menu-cta-btn"
            >
              CRAFT YOUR BESPOKE SUIT
            </button>
          </motion.div>

          {/* Luxury Concierge & Studio Details Footer */}
          <motion.div
            variants={itemVariants}
            style={{
              marginTop: 'auto',
              width: '100%',
              padding: '1.5rem var(--section-padding-x)',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(5, 5, 5, 0.4)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              zIndex: 10
            }}
            className="menu-footer"
          >
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}>
              {/* Contact column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: '150px' }}>
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                  Concierge & Studio
                </span>
                <a href="https://wa.me/61470270478" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', textTransform: 'none', letterSpacing: '0.05em' }}>
                  WhatsApp: +61 470 270 478
                </a>
                <a href="mailto:studio@suidhaga.com" style={{ fontSize: '0.7rem', textTransform: 'none', letterSpacing: '0.05em' }}>
                  studio@suidhaga.com
                </a>
              </div>

              {/* Location/Hours Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: '150px' }}>
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                  Hours & Location
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  Punjab, India (Worldwide Delivery)
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  Mon — Sat: 10:00 — 19:00 IST
                </span>
              </div>

              {/* Social Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: '100px' }}>
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                  Connect
                </span>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                    Instagram
                  </a>
                  <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                    Pinterest
                  </a>
                </div>
              </div>
            </div>

            {/* Fine print signature line */}
            <div style={{
              textAlign: 'center',
              fontSize: '0.55rem',
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginTop: '0.5rem'
            }}>
              © {new Date().getFullYear()} Sui Dhaga Global. Bespoke Tailoring.
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarMenu;
