import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from './MotionHelpers';

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

const SidebarMenu = ({ isOpen, setMenuOpen }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const isMobile = useMobile();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      opacity: 1,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
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
          {/* Background Hover Image Reveal */}
          <AnimatePresence mode="wait">
            {hoveredLink && !isMobile && (
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
            )}
          </AnimatePresence>

          {/* Menu Items */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            zIndex: 10, 
            paddingTop: isMobile ? '12vh' : '10vh', 
            paddingBottom: isMobile ? '2vh' : '5vh' 
          }}>
            {navLinks.map((link, i) => {
              const isHovered = hoveredLink?.name === link.name;
              const direction = i % 2 === 0 ? 'marquee-left' : 'marquee-right';

              return (
                <div
                  key={link.name}
                  onMouseEnter={() => !isMobile && setHoveredLink(link)}
                  onMouseLeave={() => !isMobile && setHoveredLink(null)}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    flex: 1,
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
                    {isHovered && !isMobile ? (
                      <motion.div
                        key="marquee"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="marquee-container"
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
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: isMobile ? '2.5rem' : 'clamp(3.5rem, 8vw, 7rem)',
                          fontWeight: 300,
                          color: '#ffffff',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          textAlign: 'center',
                          zIndex: 2,
                          pointerEvents: 'none',
                        }}
                      >
                        {link.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Premium Mobile Menu Footer */}
          {isMobile && (
            <div style={{
              padding: '1.5rem 1.5rem 3rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              zIndex: 20,
              background: '#030303'
            }}>
              {/* Premium "CRAFT MY SUIT" CTA inside drawer */}
              <motion.button
                onClick={() => {
                  setMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-size-guide'));
                }}
                style={{
                  width: '100%',
                  maxWidth: '320px',
                  background: 'transparent',
                  border: '1px solid var(--gold)',
                  borderRadius: '30px',
                  color: 'var(--gold)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  padding: '0.85rem 2rem',
                  textAlign: 'center',
                  boxShadow: '0 0 15px rgba(214, 175, 55, 0.1)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Craft My Suit
              </motion.button>

              {/* Luxury Contact and Social Row */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                width: '100%',
                alignItems: 'center'
              }}>
                <a
                  href="https://wa.me/61470270478"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textTransform: 'uppercase',
                  }}
                >
                  WhatsApp
                </a>
                <span style={{ color: 'rgba(255, 255, 255, 0.15)', fontSize: '0.7rem' }}>|</span>
                <a
                  href="#"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textTransform: 'uppercase',
                  }}
                >
                  Instagram
                </a>
                <span style={{ color: 'rgba(255, 255, 255, 0.15)', fontSize: '0.7rem' }}>|</span>
                <a
                  href="mailto:contact@suidhaga.com"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textTransform: 'uppercase',
                  }}
                >
                  Email
                </a>
              </div>
            </div>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarMenu;

