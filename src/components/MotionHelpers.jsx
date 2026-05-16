import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};

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


export const MassiveBackgroundText = ({ text }) => {
  const containerRef = useRef(null);
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
