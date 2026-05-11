import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FadeIn = ({ children, delay = 0, y = 50 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "100px" }}
    transition={{
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1], // Even smoother custom cubic bezier
      delay
    }}
    style={{}}
  >
    {children}
  </motion.div>
);

export const FloatContainer = ({ children }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  return (
    <motion.div ref={ref} style={{ y, width: '100%', position: 'relative' }}>
      {children}
    </motion.div>
  );
};
export const MassiveBackgroundText = ({ text }) => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  return (
    <div ref={containerRef} className="massive-bg-text-container">
      <motion.div
        className="massive-bg-text"
        style={{ x }}
      >
        {text}
      </motion.div>
    </div>
  );
};
