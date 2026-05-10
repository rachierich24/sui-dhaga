import React from 'react';
import { motion } from 'framer-motion';

const ImageReveal = ({ src, alt, className = "", delay = 0 }) => {
  return (
    <div className={`image-container ${className}`} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay }}
        style={{ width: '100%', height: '100%' }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="image-cover"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
    </div>
  );
};

export default ImageReveal;
