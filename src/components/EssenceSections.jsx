import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './MotionHelpers';
import TextReveal from './TextReveal';

import embroideryImg from '../assets/images/embroidery_hands.png';
import mannequinImg from '../assets/images/atelier_mannequin.png';

const EssenceSections = () => {
  const wrapperRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"]
  });

  const needleDraw = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const needleFill = useTransform(scrollYProgress, [0.15, 0.3], [0, 0.1]);
  const threadDraw = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const bottomThreadDraw = useTransform(scrollYProgress, [0.6, 0.95], [0, 1]);

  // Physical motion for the needle
  const needleY = useTransform(scrollYProgress, [0.05, 0.4], [-50, 150]);
  const needleRotate = useTransform(scrollYProgress, [0.05, 0.4], [0, -15]);

  // Image reveal matching needle timing
  const imageOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const imageClip = useTransform(scrollYProgress, [0.05, 0.25], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const imageScale = useTransform(scrollYProgress, [0.05, 0.3], [1.1, 1]);

  // Second image reveal
  const image2Opacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const image2Clip = useTransform(scrollYProgress, [0.45, 0.65], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const image2Scale = useTransform(scrollYProgress, [0.45, 0.7], [1.1, 1]);

  return (
    <div ref={wrapperRef} className="essence-wrapper" id="bespoke" style={{ backgroundColor: '#050505', color: '#fff', position: 'relative', overflow: 'hidden' }}>

      {/* 1. THE ESSENCE SECTION */}
      <section className="section" style={{ position: 'relative', minHeight: '90vh' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8vw', alignItems: 'center' }}>

          <motion.div
            style={{
              opacity: imageOpacity,
              clipPath: imageClip,
              position: 'relative',
              height: '70vh',
              overflow: 'hidden',
              filter: 'brightness(0.8) contrast(1.1)'
            }}
          >
            <motion.img
              src={embroideryImg}
              alt="Crafted by hand"
              className="image-cover"
              style={{ objectPosition: 'center', scale: imageScale }}
            />
          </motion.div>

          <div style={{ position: 'relative' }}>
            {/* Background Needle Graphic - Draws and Moves on Scroll */}
            <motion.div style={{ position: 'absolute', top: '-20%', right: '-15%', width: '300px', pointerEvents: 'none', zIndex: 0, y: needleY, rotate: needleRotate }}>
              <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Needle */}
                <motion.path
                  style={{ pathLength: needleDraw, fillOpacity: needleFill, opacity: needleDraw }}
                  d="M120 20 L115 350 L125 350 Z"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                  fill="rgba(212, 175, 55, 1)"
                />
                <motion.path style={{ pathLength: needleDraw, opacity: needleDraw }} d="M120 20 C118 40, 122 40, 120 20" stroke="#D4AF37" strokeWidth="0.5" />
                <motion.path style={{ pathLength: needleDraw, opacity: needleDraw }} d="M120 40 V60" stroke="#000" strokeWidth="1" /> {/* Eye */}
                {/* Thread */}
                <motion.path
                  style={{ pathLength: threadDraw, opacity: threadDraw }}
                  d="M120 50 C 180 80, 200 150, 150 200 C 100 250, 50 150, 80 100 C 110 50, 160 50, 180 120 C 190 150, 180 200, 150 220"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                  fill="none"
                />
              </svg>
            </motion.div>

            <FadeIn delay={0.2} style={{ position: 'relative', zIndex: 1 }}>
              <p className="micro-typography" style={{ color: 'var(--gold)', marginBottom: '2rem' }}>THE ESSENCE</p>
              <TextReveal className="display-2" style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: '2rem', lineHeight: 1.1, fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}>
                Crafted by hand.<br />Rooted in purpose.
              </TextReveal>
              <p className="text-muted" style={{ marginBottom: '3rem', fontSize: '0.9rem', maxWidth: '400px', lineHeight: 1.8, fontWeight: 300 }}>
                We blend traditional craftsmanship with contemporary design to create timeless pieces. Every stitch empowers.
              </p>
              <a href="#" className="arrow-link" style={{ display: 'inline-flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem', transition: 'border-color 0.3s' }}>
                OUR PHILOSOPHY <span style={{ marginLeft: '1.5rem', fontWeight: 300, transition: 'transform 0.3s' }}>&rarr;</span>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. FEATURE GRID SECTION */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '6rem 0',
        backgroundColor: '#070707'
      }}>
        <div className="container" style={{ padding: '0 2vw' }}>
          <div className="essence-grid">

            {/* Item 1 */}
            <div className="essence-grid-item">
              <FadeIn delay={0.1} y={20}>
                <div className="essence-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 12l10 10 10-10L12 2z" />
                    <path d="M12 12l-6-6" />
                    <path d="M12 12l6-6" />
                    <path d="M12 12v10" />
                  </svg>
                </div>
                <h4 className="essence-item-title">BESPOKE ARMOR</h4>
                <p className="essence-item-desc">Garments that fit you.<br />Perfectly. Personally.</p>
                <a href="#" className="essence-item-link">EXPLORE</a>
              </FadeIn>
            </div>

            {/* Item 2 */}
            <div className="essence-grid-item">
              <FadeIn delay={0.2} y={20}>
                <div className="essence-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h4 className="essence-item-title">ARTISAN EMPOWERMENT</h4>
                <p className="essence-item-desc">Empowering women artisans<br />from Punjab.</p>
                <a href="#" className="essence-item-link">OUR IMPACT</a>
              </FadeIn>
            </div>

            {/* Item 3 */}
            <div className="essence-grid-item">
              <FadeIn delay={0.3} y={20}>
                <div className="essence-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h4 className="essence-item-title">HERITAGE & CRAFT</h4>
                <p className="essence-item-desc">Preserving centuries-old<br />techniques.</p>
                <a href="#" className="essence-item-link">OUR HERITAGE</a>
              </FadeIn>
            </div>

            {/* Item 4 */}
            <div className="essence-grid-item border-none">
              <FadeIn delay={0.4} y={20}>
                <div className="essence-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 2v20M2 12h20" />
                    <path d="M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                  </svg>
                </div>
                <h4 className="essence-item-title">MODERN AESTHETIC</h4>
                <p className="essence-item-desc">A contemporary vision<br />with timeless soul.</p>
                <a href="#" className="essence-item-link">OUR DESIGNS</a>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MADE FOR YOU SECTION */}
      <section className="section" style={{ position: 'relative', minHeight: '100vh', paddingBottom: '15vh' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '8vw', alignItems: 'center' }}>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <FadeIn>
              <p className="micro-typography" style={{ color: 'var(--gold)', marginBottom: '2rem' }}>MADE FOR YOU</p>
              <TextReveal className="display-1" style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: '2rem', lineHeight: 1.1, fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}>
                Not made.<br />Sculpted.<br />For you.
              </TextReveal>
              <p className="text-muted" style={{ marginBottom: '4rem', fontSize: '0.9rem', maxWidth: '300px', lineHeight: 1.8, fontWeight: 300 }}>
                Every piece is a dialogue between our atelier and your individuality.
              </p>
            </FadeIn>
          </div>

          <motion.div
            style={{
              opacity: image2Opacity,
              clipPath: image2Clip,
              position: 'relative',
              height: '85vh',
              width: '100%',
              filter: 'brightness(0.8) contrast(1.15)',
              zIndex: 1
            }}
            className="blob-mask-image"
          >
            <motion.img
              src={mannequinImg}
              alt="Sculpted for you"
              style={{ width: '100%', height: '100%', objectFit: 'cover', scale: image2Scale }}
            />
          </motion.div>

        </div>

        {/* Sweeping Golden Thread SVG across the bottom */}
        <div style={{ position: 'absolute', bottom: '10%', left: 0, width: '100%', height: '200px', pointerEvents: 'none', opacity: 1, zIndex: 0 }}>
          <svg viewBox="0 0 1440 200" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <motion.path style={{ pathLength: bottomThreadDraw, opacity: bottomThreadDraw }} d="M0,100 C300,200 500,0 800,100 C1100,200 1300,50 1440,150" stroke="#D4AF37" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <motion.path style={{ pathLength: bottomThreadDraw, opacity: bottomThreadDraw }} d="M0,100 C300,200 500,0 800,100 C1100,200 1300,50 1440,150" stroke="#D4AF37" strokeWidth="0.3" vectorEffect="non-scaling-stroke" style={{ filter: 'blur(4px)' }} />
          </svg>
        </div>
      </section>

    </div>
  );
};

export default EssenceSections;
