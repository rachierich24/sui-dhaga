import React from 'react';
import { motion } from 'framer-motion';

const ImageReveal = ({ src, alt, className = "", delay = 0 }) => {
  return (
    <div className={`image-container ${className}`} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay }}
        style={{ width: '100%', height: '100%' }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="image-cover"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
    </div>
  );
};

export default ImageReveal;
