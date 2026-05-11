import React from 'react';
import { motion } from 'framer-motion';

const TextReveal = ({ children, delay = 0, className = "", style = {}, split = false }) => {
  const isLongText = typeof children === 'string' && children.length > 100;

  // If it's a block or long text or not requested to split, just do a simple block reveal
  if (!split || isLongText || typeof children !== 'string') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay }}
        className={className}
        style={{ ...style }}
      >
        {children}
      </motion.div>
    );
  }

  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.16, 1, 0.3, 1],
        duration: 1.4
      }
    },
    hidden: {
      opacity: 0,
      y: 30,
    }
  };

  return (
    <motion.div
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em', ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      className={className}
    >
      {words.map((word, index) => (
        <span style={{ overflow: 'hidden' }} key={index}>
          <motion.span style={{ display: 'inline-block' }} variants={child}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default TextReveal;
