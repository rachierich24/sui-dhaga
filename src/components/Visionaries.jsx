import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import images
import navneetPortrait from '../assets/images/navneet_editorial.png';
import nishikantPortrait from '../assets/images/nishikant_editorial.png';
import camelliaPortrait from '../assets/images/camellia_editorial.png';

const ParallaxPortrait = ({ src, alt, objectPosition = 'center' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Deep Parallax Window Effect
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '4px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
      <motion.img 
        src={src} 
        alt={alt}
        style={{ 
          width: '100%', 
          height: '130%', 
          objectFit: 'cover', 
          objectPosition,
          y,
          scale,
          willChange: 'transform',
          filter: 'brightness(0.9) contrast(1.1)'
        }} 
      />
    </div>
  );
};

const VisionaryBlock = ({ name, role, quotes, src, objectPos, isReversed, watermark }) => {
  const blockRef = useRef(null);
  
  // We use a tight offset so the text reveals as it enters the middle third of the screen
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start 85%", "start 35%"]
  });

  // Scrubbable text reveals
  const textY = useTransform(scrollYProgress, [0, 1], ["60px", "0px"]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Watermark moves continuously across the screen
  const { scrollYProgress: overallProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"]
  });
  const watermarkX = useTransform(overallProgress, [0, 1], isReversed ? ["-10%", "10%"] : ["10%", "-10%"]);

  return (
    <div ref={blockRef} style={{ position: 'relative', width: '100%', minHeight: '80vh', display: 'flex', alignItems: 'center', margin: '15vh 0' }}>
      
      {/* Massive Editorial Watermark */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          top: '5%', 
          left: isReversed ? 'auto' : '-5%', 
          right: isReversed ? '-5%' : 'auto',
          fontSize: 'clamp(8rem, 15vw, 15rem)', 
          fontFamily: 'var(--font-serif)',
          color: 'rgba(255, 255, 255, 0.02)',
          zIndex: 0,
          whiteSpace: 'nowrap',
          x: watermarkX,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        {watermark}
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: isReversed ? 'row-reverse' : 'row', flexWrap: 'wrap', gap: '8vw', alignItems: 'center' }}>
        
        {/* Image Column */}
        <div style={{ flex: '1 1 350px', height: 'clamp(500px, 70vh, 800px)', position: 'relative' }}>
          <ParallaxPortrait src={src} alt={name} objectPosition={objectPos} />
        </div>

        {/* Text Column */}
        <div style={{ flex: '1 1 350px', padding: '5vw 0' }}>
          <motion.div style={{ opacity: textOpacity, y: textY }}>
            <h3 className="display-2" style={{ marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#fff' }}>
              {name}
            </h3>
            <div style={{ height: '1px', width: '40px', backgroundColor: '#D4AF37', marginBottom: '1.5rem' }}></div>
            <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '3rem', fontSize: '0.85rem', fontWeight: 600 }}>
              {role}
            </p>
            
            {quotes.map((quote, i) => (
              <p key={i} className="lead text-muted" style={{ marginBottom: '2rem', lineHeight: 1.8, fontSize: quote.highlight ? '1.2rem' : '1rem', fontWeight: quote.highlight ? 400 : 300, fontStyle: quote.highlight ? 'italic' : 'normal', color: quote.highlight ? '#D4AF37' : 'rgba(255,255,255,0.6)' }}>
                {quote.text}
              </p>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

const Visionaries = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Soft glowing thread tracing behind the visionaries
  const threadDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      id="visionaries" 
      ref={containerRef}
      style={{ 
        position: 'relative', 
        backgroundColor: '#030303', 
        padding: '15vh 0',
        overflow: 'hidden'
      }}
    >
      {/* Background Connecting Thread */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.3 }}>
        <svg viewBox="0 0 1000 3000" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <motion.path
            style={{ pathLength: threadDraw }}
            d="M 500 0 C 800 500, 200 1000, 500 1500 C 800 2000, 200 2500, 500 3000"
            stroke="#D4AF37"
            strokeWidth="1"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="display-2" style={{ textAlign: 'center', marginBottom: '5vh', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
            The Visionaries
          </h2>
        </motion.div>

        <VisionaryBlock 
          name="NavneetJit Kaur"
          role="Founder & Managing Director"
          watermark="NAVNEET"
          src={navneetPortrait}
          objectPos="center"
          isReversed={false}
          quotes={[
            { text: `"Growing up in rural Punjab, I understand the challenges of every woman facing domestic violence and drug abuse by men."` },
            { text: `"I’m passionate about making people feel great about themselves by designing their wardrobes. I welcome you to explore the opportunities and the possibilities!"` },
            { text: `"We make you look great where every stitch is an opportunity!"`, highlight: true }
          ]}
        />

        <VisionaryBlock 
          name="Nishikant Grover"
          role="Global Ecosystems"
          watermark="NISHIKANT"
          src={nishikantPortrait}
          objectPos="center"
          isReversed={true}
          quotes={[
            { text: `Inspired by frameworks like Clare's Law, he builds ecosystems that support women entrepreneurs, ensuring empowerment is enabled by global opportunity.` }
          ]}
        />

        <VisionaryBlock 
          name="Camellia"
          role="Chief Marketing Officer"
          watermark="CAMELLIA"
          src={camelliaPortrait}
          objectPos="center"
          isReversed={false}
          quotes={[
            { text: `Driving the narrative of Sui Dhaga to the world, merging the art of storytelling with the business of empowerment.` }
          ]}
        />

      </div>
    </section>
  );
};

export default Visionaries;
