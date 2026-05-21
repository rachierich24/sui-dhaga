import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import artisanStudio from '../assets/images/modern_artisan_studio_1778357555845.png';

const HowWeWork = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Text Animations
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);

  // Card 1
  const card1Opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const card1Y = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);

  // Card 2
  const card2Opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const card2Y = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);

  // Image Reveal
  const imageOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const imageClip = useTransform(scrollYProgress, [0.2, 0.6], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const imageScale = useTransform(scrollYProgress, [0.2, 0.7], [1.15, 1]);

  // Badge Reveal
  const badgeOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const badgeScale = useTransform(scrollYProgress, [0.4, 0.7], [0.5, 1]);

  return (
    <section id="how-we-work" ref={containerRef} className="how-we-work-section" style={{ padding: '10rem 5vw', backgroundColor: '#050505', position: 'relative', zIndex: 10 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8vw', alignItems: 'center' }}>
          
          {/* Text Content */}
          <motion.div style={{ opacity: textOpacity, y: textY }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)' }}></div>
              <p className="micro-typography" style={{ color: 'var(--gold)', letterSpacing: '0.2em', margin: 0 }}>THE COLLECTIVE</p>
            </div>
            
            <h2 className="display-2" style={{ marginBottom: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#fff' }}>How We Work</h2>
            
            <p className="lead text-muted" style={{ marginBottom: '3rem', lineHeight: 1.8, fontSize: '1.1rem', fontWeight: 300 }}>
              Our work is more than tailoring; it is a movement. Every garment is crafted by women who have reclaimed their independence. We provide a safe, empowering environment where skill meets dignity.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              <motion.div className="glass-card" style={{ padding: '2rem', opacity: card1Opacity, y: card1Y, border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <h4 className="text-gold" style={{ fontSize: '1rem', marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Fair Trade</h4>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontWeight: 300 }}>Ensuring every artisan receives more than a living wage, with complete financial autonomy.</p>
              </motion.div>
              
              <motion.div className="glass-card" style={{ padding: '2rem', opacity: card2Opacity, y: card2Y, border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <h4 className="text-gold" style={{ fontSize: '1rem', marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Education</h4>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontWeight: 300 }}>Continuous skill-building and leadership workshops to empower the next generation.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Content */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '700px', justifySelf: 'center' }}>
            <motion.div
              style={{ 
                opacity: imageOpacity,
                clipPath: imageClip,
                borderRadius: '4px', 
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                filter: 'brightness(0.9) contrast(1.1)'
              }}
            >
              <motion.img 
                src={artisanStudio} 
                alt="Sui Dhaga Artisan Tailoring Studio - Fair Trade Custom Couture" 
                loading="lazy"
                decoding="async"
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block',
                  scale: imageScale,
                  transformOrigin: 'bottom center'
                }} 
              />
            </motion.div>
            
            {/* Floating Detail Badge */}
            <motion.div
              style={{
                opacity: badgeOpacity,
                scale: badgeScale,
                position: 'absolute',
                bottom: 'clamp(-30px, -5vw, -20px)',
                right: 'clamp(-30px, -5vw, -20px)',
                backgroundColor: '#050505',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: 'var(--gold)',
                padding: '1.5rem',
                borderRadius: '50%',
                width: 'clamp(100px, 15vw, 150px)',
                height: 'clamp(100px, 15vw, 150px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: 'clamp(0.6rem, 1vw, 0.8rem)',
                fontWeight: '400',
                letterSpacing: '0.1em',
                zIndex: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                100%<br/>HANDMADE
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
