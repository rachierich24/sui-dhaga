import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import teamImage from '../assets/images/workspace_team_1777827283644.png';
import creativeImage from '../assets/images/workspace_creative_1777827300802.png';

const VisionStructureGallery = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Left Image Transforms (01 VISION)
  const leftOpacity = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);
  const leftY = useTransform(scrollYProgress, [0.05, 0.45], [150, 0]);
  const leftClip = useTransform(scrollYProgress, [0.05, 0.45], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const leftScale = useTransform(scrollYProgress, [0.05, 0.55], [1.15, 1]);

  // Right Image Transforms (02 STRUCTURE) - staggered
  const rightOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const rightY = useTransform(scrollYProgress, [0.2, 0.6], [150, 0]);
  const rightClip = useTransform(scrollYProgress, [0.2, 0.6], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const rightScale = useTransform(scrollYProgress, [0.2, 0.7], [1.15, 1]);

  // Background Magical Threads Drawing across the gallery
  const threadDraw1 = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const threadDraw2 = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);
  const threadDraw3 = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);
  
  const threadOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 0.6]);

  const needleY = useTransform(scrollYProgress, [0.1, 0.6], [-100, 700]);
  const needleX = useTransform(scrollYProgress, [0.1, 0.6], [0, 300]);
  const needleRotate = useTransform(scrollYProgress, [0.1, 0.6], [-45, 15]);

  return (
    <section ref={containerRef} className="gallery-section" style={{ position: 'relative', overflow: 'hidden', padding: '10rem 0', backgroundColor: '#030303' }}>
      
      {/* Background Scrolling Magical Threads */}
      <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: threadOpacity }}>
        <svg viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          
          {/* Main Core Thread */}
          <motion.path 
            style={{ pathLength: threadDraw1 }} 
            d="M 100 -100 C 200 300, 500 500, 750 350 C 1000 200, 1100 300, 1200 800" 
            stroke="#D4AF37" 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Intricate Secondary Thread */}
          <motion.path 
            style={{ pathLength: threadDraw2 }} 
            d="M 50 -100 C 300 200, 600 600, 800 250 C 1000 -100, 1200 400, 1300 800" 
            stroke="rgba(255, 245, 200, 0.8)" 
            strokeWidth="1" 
            vectorEffect="non-scaling-stroke"
          />

          {/* Third Accent Thread */}
          <motion.path 
            style={{ pathLength: threadDraw3 }} 
            d="M 150 -100 C 100 400, 400 400, 700 450 C 1000 500, 1000 100, 1100 800" 
            stroke="#D4AF37" 
            strokeWidth="0.5" 
            vectorEffect="non-scaling-stroke"
          />

          {/* Glowing Aura Path */}
          <motion.path 
            style={{ pathLength: threadDraw1 }} 
            d="M 100 -100 C 200 300, 500 500, 750 350 C 1000 200, 1100 300, 1200 800" 
            stroke="#D4AF37" 
            strokeWidth="8" 
            vectorEffect="non-scaling-stroke"
            style={{ filter: 'blur(10px)', opacity: 0.5 }}
          />
        </svg>
      </motion.div>

      {/* Needle tracking the thread broadly */}
      <motion.div style={{ position: 'absolute', top: '0', left: '25%', width: '150px', height: '400px', pointerEvents: 'none', zIndex: 1, y: needleY, x: needleX, rotate: needleRotate }}>
         <svg viewBox="0 0 200 400" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
           <motion.path d="M120 20 L115 350 L125 350 Z" stroke="#D4AF37" strokeWidth="0.5" fill="rgba(212, 175, 55, 1)" style={{ opacity: threadOpacity }} />
           <motion.path d="M120 20 C118 40, 122 40, 120 20" stroke="#D4AF37" strokeWidth="0.5" style={{ opacity: threadOpacity }} />
           <motion.path d="M120 40 V60" stroke="#000" strokeWidth="1" style={{ opacity: threadOpacity }} /> 
         </svg>
      </motion.div>

      <div className="container">
        <div className="gallery-grid" style={{ position: 'relative', zIndex: 2 }}>
          
          <div className="gallery-item left">
            <motion.div style={{ opacity: leftOpacity, y: leftY }}>
              <motion.div 
                style={{ 
                  clipPath: leftClip,
                  position: 'relative', 
                  overflow: 'hidden',
                  width: '75%',
                  margin: '0 auto',
                  aspectRatio: '3/4',
                  filter: 'brightness(0.85) contrast(1.15)'
                }}
              >
                <motion.img 
                  src={creativeImage} 
                  alt="Vision" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', scale: leftScale }} 
                />
              </motion.div>
              
              <div className="gallery-caption" style={{ width: '75%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.5rem', marginTop: '1.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>01</span>
                <span style={{ fontSize: '0.9rem', color: '#fff', letterSpacing: '0.2em' }}>VISION</span>
              </div>
            </motion.div>
          </div>

          <div className="gallery-item right">
            <motion.div style={{ opacity: rightOpacity, y: rightY }}>
              <motion.div 
                style={{ 
                  clipPath: rightClip,
                  position: 'relative', 
                  overflow: 'hidden',
                  width: '75%',
                  margin: '0 auto',
                  aspectRatio: '3/4',
                  filter: 'brightness(0.85) contrast(1.15)'
                }}
              >
                <motion.img 
                  src={teamImage} 
                  alt="Structure" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', scale: rightScale }} 
                />
              </motion.div>
              
              <div className="gallery-caption" style={{ width: '75%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.5rem', marginTop: '1.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>02</span>
                <span style={{ fontSize: '0.9rem', color: '#fff', letterSpacing: '0.2em' }}>STRUCTURE</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionStructureGallery;
