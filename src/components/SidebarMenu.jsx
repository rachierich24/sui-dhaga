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

const SidebarMenu = ({ isOpen, setMenuOpen }) => {
  const [hoveredLink, setHoveredLink] = useState(null);

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
            {hoveredLink && (
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
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', zIndex: 10, paddingTop: '10vh', paddingBottom: '5vh' }}>
            {navLinks.map((link, i) => {
              const isHovered = hoveredLink?.name === link.name;
              const direction = i % 2 === 0 ? 'marquee-left' : 'marquee-right';

              return (
                <div
                  key={link.name}
                  onMouseEnter={() => setHoveredLink(link)}
                  onMouseLeave={() => setHoveredLink(null)}
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
                    {isHovered ? (
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
                          opacity: hoveredLink ? 0.1 : 1, 
                          y: 0 
                        }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(3.5rem, 8vw, 7rem)',
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

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarMenu;
