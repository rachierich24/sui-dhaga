import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import '../index.css';
import { FadeIn } from './MotionHelpers';
import TextReveal from './TextReveal';
import Text3DFlip from './ui/text-3d-flip';

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

      {/* Foreground Typography & Accents */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8vw',
          zIndex: 5,
          pointerEvents: 'none' /* Let mouse events pass through to the background */
        }}
      >
        {/* Left: Headline and CTA */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            pointerEvents: 'auto',
            position: 'relative'
          }}
        >
          {/* Creative Continuous Animation: The Magical Threads of Sui Dhaga */}
          <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '150%', height: '140%', pointerEvents: 'none', zIndex: -1 }}>
            <svg viewBox="0 0 800 600" style={{ width: '100%', height: '100%' }}>
              {/* Golden Thread */}
              <motion.path
                d="M -100 300 C 200 100, 400 500, 900 200"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0.15, pathOffset: 0 }}
                animate={{ pathOffset: [0, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ filter: 'drop-shadow(0px 0px 8px var(--gold))', opacity: 0.7 }}
              />
              {/* Ethereal Silver/White Thread */}
              <motion.path
                d="M -100 400 C 300 600, 300 100, 900 300"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ pathLength: 0.1, pathOffset: 1 }}
                animate={{ pathOffset: [1, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{ filter: 'drop-shadow(0px 0px 4px rgba(255,255,255,0.8))', opacity: 0.4 }}
              />
              {/* Ambient Glow Orb */}
              <motion.circle
                cx="400" cy="300" r="150"
                fill="var(--gold)"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.1, 0.05]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: 'blur(60px)' }}
              />
            </svg>
          </div>

          <div className="massive-center-text" style={{ fontSize: 'clamp(4rem, 8vw, 9rem)', lineHeight: 1, mixBlendMode: 'normal', color: '#fff', textTransform: 'none', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <Text3DFlip rotateDirection="top">Bespoke</Text3DFlip>
            </div>
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--text-muted)' }}>
                <Text3DFlip rotateDirection="top">is our</Text3DFlip>
              </span>
            </div>
            <div style={{ display: 'block', overflow: 'hidden', marginBottom: '2rem', paddingBottom: '1.5rem' }}>
              <Text3DFlip rotateDirection="top">Language</Text3DFlip>
            </div>
          </div>

          <FadeIn delay={0.8}>
            <p className="lead" style={{ marginTop: '2rem', marginBottom: '3rem', maxWidth: '500px', color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }}>
              We craft Bespoke Armor—garments that honor your story, your form, your legacy.
            </p>
            <a href="#bespoke" className="arrow-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Discover Our World
              <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '10px' }}>
                <path d="M10 1L14 5M14 5L10 9M14 5L0 5" stroke="currentColor" strokeWidth="1" />
              </svg>
            </a>
          </FadeIn>
        </div>

      </motion.div>

      {/* Floating vertical numbering (right side accent) */}
      {/* <motion.div
        className="desktop-only"
        style={{ position: 'absolute', right: '4vw', top: '50%', transform: 'translateY(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 1.2 } }
        }}
      >
        <motion.span variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>01</motion.span>
        <motion.div variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { duration: 1 } } }} style={{ height: '40px', width: '1px', backgroundColor: 'rgba(255,255,255,0.1)', transformOrigin: 'top' }}></motion.div>
        <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>02</motion.span>
        <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>03</motion.span>
      </motion.div> */}

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
