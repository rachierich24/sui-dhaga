import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = () => {
  const columns = 5;
  
  const container = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const column = {
    initial: { top: 0 },
    animate: { 
      top: "-100vh",
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="animate"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        zIndex: 999999,
        pointerEvents: 'none'
      }}
    >
      {[...Array(columns)].map((_, i) => (
        <motion.div
          key={i}
          variants={column}
          style={{
            position: 'relative',
            height: '100vh',
            width: `${100 / columns}vw`,
            backgroundColor: '#050505',
          }}
        />
      ))}
      
      {/* Brand Text */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#D4AF37',
          fontFamily: 'var(--font-serif)',
          fontSize: '2rem',
          letterSpacing: '0.2em',
          zIndex: 10
        }}
      >
        SUI DHAGA
      </motion.div>
    </motion.div>
  );
};

export default PageTransition;
