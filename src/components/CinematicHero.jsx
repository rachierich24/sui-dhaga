import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import '../index.css';

const CinematicHero = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const tiltX = useTransform(smoothMouseY, [0, 1], [3, -3]);
  const tiltY = useTransform(smoothMouseX, [0, 1], [-3, 3]);

  const bgX = useTransform(smoothMouseX, [0, 1], ["-1%", "1%"]);
  const bgY = useTransform(smoothMouseY, [0, 1], ["-1%", "1%"]);

  const textX = useTransform(smoothMouseX, [0, 1], ["-3%", "3%"]);
  const textY = useTransform(smoothMouseY, [0, 1], ["-3%", "3%"]);

  const handleMouseMove = (e) => {
    // Disable on touch devices to save battery/performance
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
  };

  return (
    <section ref={containerRef} className="cinematic-hero-section" onMouseMove={handleMouseMove} style={{ perspective: 1200, position: 'relative' }}>

      {/* Immersive Background */}
      <motion.div
        className="cinematic-bg-container"
        style={{ y: yBg }}
      >
        <motion.img
          src="/woman.png"
          alt="Luxury Cinematic Fashion"
          className="cinematic-bg-image"
          style={{ x: bgX, y: bgY, scale: 1.05, willChange: 'transform' }}
          decoding="async"
          loading="eager"
        />
        <div className="vignette-overlay"></div>
        <div className="grain-overlay"></div>
      </motion.div>

      {/* Massive Centered Text Layered OVER Background but Blended */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 5
        }}
      >
        <motion.h1
          className="massive-center-text"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1], delay: 1 }}
          style={{ transform: "translateZ(80px)" }}
        >
          SUI DHAGA
        </motion.h1>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ position: 'absolute', bottom: '3vw', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      >
        <div className="scroll-line" style={{ height: '60px' }}></div>
      </motion.div>

    </section>
  );
};

export default CinematicHero;
