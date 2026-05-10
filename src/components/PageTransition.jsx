import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          onAnimationComplete={() => setIsVisible(false)}
          initial={{ y: 0 }}
          animate={{ y: "-100vh" }}
          exit={{ display: "none" }}
          transition={{ 
            duration: 1.4, 
            ease: [0.76, 0, 0.24, 1], // Luxury snap curve
            delay: 1.2 
          }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#020202',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform'
          }}
        >
          {/* Aesthetic Minimal Text Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              animate={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
              style={{
                color: '#D4AF37',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                letterSpacing: '0.4em',
                fontWeight: 300,
                textTransform: 'uppercase',
                textShadow: '0 0 20px rgba(212, 175, 55, 0.2)'
              }}
            >
              Sui Dhaga
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
