import React from 'react';
import { motion } from 'framer-motion';

const TextReveal = ({ children, delay = 0, className = "", style = {} }) => {
  // Simple check to handle strings vs other React nodes
  if (typeof children !== 'string') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    );
  }

  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * 0.5 }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        ease: [0.76, 0, 0.24, 1],
        duration: 1
      }
    },
    hidden: {
      opacity: 0,
      y: 50,
      rotate: 2,
    }
  };

  return (
    <motion.div
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em', ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {words.map((word, index) => (
        <span style={{ overflow: 'hidden', paddingBottom: '4px', marginTop: '-4px' }} key={index}>
          <motion.span style={{ display: 'inline-block' }} variants={child}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default TextReveal;
