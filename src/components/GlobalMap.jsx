import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './MotionHelpers';
import worldMapImage from '../assets/world_map.png';

const markers = [
  { 
    name: "Panchkula", 
    role: "Flagship Atelier", 
    left: "67.5%", 
    top: "40.5%" 
  },
  { 
    name: "Delhi", 
    role: "Bespoke Studio", 
    left: "67.7%", 
    top: "42.5%" 
  }
];

export default function GlobalMap() {
  const containerRef = React.useRef(null);
  
  // Parallax effect on scroll for luxury depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const mapY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.6, 0.6, 0.3]);

  return (
    <section 
      ref={containerRef}
      id="global-map" 
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#030303',
        padding: '10rem 0'
      }}
    >
      {/* Top Blend Gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '20%',
        background: 'linear-gradient(to bottom, #030303 0%, transparent 100%)',
        zIndex: 3,
        pointerEvents: 'none'
      }} />

      {/* Bottom Blend Gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '20%',
        background: 'linear-gradient(to top, #030303 0%, transparent 100%)',
        zIndex: 3,
        pointerEvents: 'none'
      }} />

      {/* Dynamic Background gold glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.04) 0%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 4, textAlign: 'center', marginBottom: '3rem' }}>
        <FadeIn>
          <p className="micro-typography" style={{ color: 'var(--gold)', marginBottom: '1rem', letterSpacing: '0.45em' }}>
            GLOBAL FOOTPRINT
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h2 className="display-2" style={{ color: '#ffffff', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.02em' }}>
            Sui Dhaga <span className="italic-text">Globally</span>
          </h2>
        </FadeIn>
      </div>

      {/* Map parallax wrapper */}
      <motion.div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '1100px', 
          padding: '0 2rem',
          margin: '0 auto',
          zIndex: 2,
          y: mapY,
          opacity: opacity
        }}
      >
        <div style={{ 
          position: 'relative', 
          width: '100%',
          background: 'transparent',
        }}>
          {/* World Map Image seamlessly blending */}
          <img 
            src={worldMapImage} 
            alt="Sui Dhaga World Map" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block', 
              mixBlendMode: 'screen',
              filter: 'brightness(0.8) contrast(1.15)',
              transition: 'filter 0.5s ease'
            }} 
          />

          {/* Glowing Office Markers */}
          {markers.map((marker, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: marker.left,
                top: marker.top,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              {/* Radar Ping Animation */}
              <motion.div
                animate={{
                  scale: [1, 2.5, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.7
                }}
                style={{
                  position: 'absolute',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.4)',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1
                }}
              />

              {/* Pin Icon */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {/* Custom Premium Pin SVG */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" 
                    fill="var(--gold)" 
                    stroke="#000" 
                    strokeWidth="1"
                    style={{ filter: 'drop-shadow(0px 3px 6px rgba(0,0,0,0.6))' }}
                  />
                </svg>

                {/* Marker Name Label */}
                <span style={{
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: '500',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                  backgroundColor: 'rgba(3, 3, 3, 0.85)',
                  padding: '2px 8px',
                  borderRadius: '3px',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
                  pointerEvents: 'none'
                }}>
                  {marker.name}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
