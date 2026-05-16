import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Text3DFlip = ({ 
  children, 
  className = "", 
  textClassName = "", 
  flipTextClassName = "", 
  rotateDirection = "top" 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const textStr = typeof children === 'string' ? children : String(children);
  const chars = textStr.split('');

  // 'top' -> the original text rotates UP (-90deg), new text comes from DOWN (90deg)
  const rotation = rotateDirection === "top" ? 90 : -90;

  return (
    <div 
      className={className} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        display: 'inline-block', 
        position: 'relative', 
        perspective: '1000px', 
        cursor: 'pointer',
        fontWeight: 'inherit',
        fontStyle: 'inherit',
        color: 'inherit'
      }}
    >
      <div style={{ display: 'flex', position: 'relative' }}>
        {chars.map((char, i) => (
          <motion.span
            key={`orig-${i}`}
            className={textClassName}
            animate={{ rotateX: isHovered ? -rotation : 0, opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
            style={{ 
              display: 'inline-block', 
              transformOrigin: '50% 50% -10px', 
              whiteSpace: char === ' ' ? 'pre' : 'normal',
              transformStyle: 'preserve-3d'
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
      <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, width: '100%' }}>
        {chars.map((char, i) => (
          <motion.span
            key={`flip-${i}`}
            className={flipTextClassName}
            initial={{ rotateX: rotation, opacity: 0 }}
            animate={{ rotateX: isHovered ? 0 : rotation, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
            style={{ 
              display: 'inline-block', 
              transformOrigin: '50% 50% -10px', 
              whiteSpace: char === ' ' ? 'pre' : 'normal', 
              color: 'var(--gold)',
              transformStyle: 'preserve-3d'
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default Text3DFlip;
