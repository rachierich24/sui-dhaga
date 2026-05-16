import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { FadeIn } from './MotionHelpers';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const creativeCards = [
  { src: '/creative_2.jpeg', title: 'MOODBOARD 01', top: '14%', left: '12%', progress: 0.15, zIndex: 1, rotation: -2 },
  { src: '/creative_4.jpeg', title: 'THE DRAPE', top: '28%', left: '60%', progress: 0.30, zIndex: 3, rotation: 1.5 },
  { src: '/creative_5.jpeg', title: 'STITCHING DETAILS', top: '44%', left: '15%', progress: 0.45, zIndex: 1, rotation: -1 },
  { src: '/creative_6.jpeg', title: 'FINAL FITTING', top: '58%', left: '58%', progress: 0.60, zIndex: 3, rotation: 2 },
  { src: '/creative_7.jpeg', title: 'THE REFINEMENT', top: '74%', left: '14%', progress: 0.75, zIndex: 1, rotation: -1.5 },
  { src: '/creative_8.jpeg', title: 'EDITORIAL', top: '88%', left: '56%', progress: 0.90, zIndex: 3, rotation: 1 },
];

const svgPathD = "M 50,-50 C 150,200 900,300 900,600 C 900,900 100,1000 100,1200 C 100,1500 900,1600 900,1800 C 900,2100 100,2200 100,2400 C 100,2700 900,2800 900,3000 C 900,3300 100,3400 100,3600 C 100,3850 600,3800 750,3850";

const CreativesAtWork = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const pathRef = useRef(null);
  const needleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const path = pathRef.current;
      const length = path.getTotalLength();

      // Prepare SVG path
      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Prepare cards with minimal cinematic emergence
      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 40, // Subtle float instead of deep drop
        scale: 0.98,
        force3D: true
      });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Starts exactly as you enter the section
          end: "bottom bottom", // Stays till end
          scrub: 8, // Much slower and smoother scrubbing
        }
      });

      // Removed cinematicStitchEase as it can cause jitter on reverse scrub
      // 0. Soft Atmospheric Parallax
      masterTl.to(bgRef.current, {
        y: '5%',
        ease: "none",
        duration: 1,
        force3D: true
      }, 0);

      // 1. Draw elegant thread
      masterTl.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 1,
        force3D: true
      }, 0);

      // 2. Move needle smoothly
      masterTl.to(needleRef.current, {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.100], // Pivot perfectly at the new needle eye
          autoRotate: 90
        },
        ease: "none",
        duration: 1,
        force3D: true
      }, 0);

      // 3. Reveal cards editorially
      cardsRef.current.forEach((card, index) => {
        const triggerTime = creativeCards[index].progress;

        masterTl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          force3D: true
        }, triggerTime - 0.25);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="creatives-story-section"
      style={{
        position: 'relative',
        backgroundColor: '#050505', // Matte charcoal black
        color: 'var(--text)',
        minHeight: '600vh',
        overflow: 'hidden',
        paddingTop: '15vh'
      }}
    >
      {/* Deep Cinematic Couture Fabric Backdrop */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute', top: '-5%', left: 0, width: '100%', height: '110%',
          pointerEvents: 'none', zIndex: 0,
          background: `
            radial-gradient(ellipse at 30% 0%, #1c1a19 0%, transparent 50%),
            radial-gradient(ellipse at 70% 50%, #141312 0%, transparent 60%),
            radial-gradient(ellipse at 20% 100%, #171514 0%, transparent 60%),
            linear-gradient(180deg, #0a0908 0%, #050505 100%)
          `,
        }}
      >
        {/* Dense fabric weave pattern */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          opacity: 0.25, pointerEvents: 'none', mixBlendMode: 'color-dodge',
          backgroundImage: `
            repeating-linear-gradient(45deg, #050505 0px, #050505 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px),
            repeating-linear-gradient(-45deg, #050505 0px, #050505 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)
          `,
          backgroundSize: '8px 8px'
        }}></div>
      </div>

      {/* Soft directional lighting */}
      <div style={{ position: 'sticky', top: 0, left: 0, width: '100%', height: '100vh', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          width: '100%', height: '100%',
          background: 'radial-gradient(circle at 20% 50%, rgba(200, 190, 180, 0.03) 0%, transparent 50%)',
          mixBlendMode: 'screen'
        }}></div>
      </div>

      {/* Editorial Header - Integrated into the layout spread */}
      <div style={{ position: 'absolute', top: '6%', left: '55%', zIndex: 10, pointerEvents: 'none', maxWidth: '400px' }}>
        <TextReveal className="display-2" style={{ color: 'var(--text)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Creatives at work.
        </TextReveal>
        <FadeIn delay={0.2}>
          <p className="lead" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '350px' }}>
            SUI DHAGA connects brands with creators through seamless collaboration and elegant workflows.
          </p>
        </FadeIn>
      </div>

      {/* The Thread Container */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        <svg
          viewBox="0 0 1000 4000"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        >
          {/* The main drawing thread (Muted Champagne Metallic) */}
          <path
            ref={pathRef}
            d={svgPathD}
            fill="none"
            stroke="rgba(212, 175, 55, 0.8)" // Bright Metallic Gold
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0px 0px 12px rgba(212, 175, 55, 0.6))' }}
          />
        </svg>

        {/* The Needle Element */}
        <div
          ref={needleRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '32px',
            height: '200px',
            zIndex: 4,
            willChange: 'transform',
            filter: 'drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.7))'
          }}
        >
          {/* Ultra-Realistic Chrome Needle */}
          <svg width="40" height="220" viewBox="-10 -10 32 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            {/* Soft Ambient Glow Behind Needle */}
            <path d="M6 -5 C 2 -5, 0 5, 0 15 V 170 C 0 185, 4 195, 6 200 C 8 195, 12 185, 12 170 V 15 C 12 5, 10 -5, 6 -5 Z" fill="rgba(255, 255, 255, 0.2)" style={{ filter: 'blur(6px)' }} />

            {/* Main Chrome Needle Body */}
            <path d="M6 0 C 4.5 0, 4 3, 4 15 V 170 C 4 185, 5.5 195, 6 200 C 6.5 195, 8 185, 8 170 V 15 C 8 3, 7.5 0, 6 0 Z" fill="url(#needle-grad-chrome)" />

            {/* The Eye (Sharp Oval Slit) */}
            <path d="M6 5 C 5.3 5, 5 7, 5 15 V 35 C 5 43, 5.3 45, 6 45 C 6.7 45, 7 43, 7 35 V 15 C 7 7, 6.7 5, 6 5 Z" fill="#050505" />

            {/* Inner rim highlight for the eye */}
            <path d="M5.5 8 V 42" stroke="rgba(255,255,255,0.9)" strokeWidth="0.5" />

            {/* 3D Chrome Highlights */}
            {/* Left crisp highlight */}
            <path d="M4.5 10 V 180" stroke="rgba(255,255,255,0.9)" strokeWidth="0.6" />
            {/* Right dark shadow core */}
            <path d="M7.5 10 V 180" stroke="rgba(0,0,0,0.7)" strokeWidth="0.8" />
            {/* Right bounce light */}
            <path d="M8 10 V 175" stroke="rgba(255,255,255,0.5)" strokeWidth="0.3" />

            {/* Center intense specular highlight (interrupted by eye) */}
            <path d="M6 48 V 190" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5" />

            {/* Star/Sparkle Lens Flare at the Needle Eye */}
            <g style={{ transform: 'translate(6px, 25px)', filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.9))' }}>
              <path d="M0 -15 L 1 -2 L 15 0 L 1 2 L 0 15 L -1 2 L -15 0 L -1 -2 Z" fill="rgba(255, 255, 255, 0.95)" />
              <circle cx="0" cy="0" r="2.5" fill="#fff" />
            </g>

            {/* Glowing Spark at Needle Tip */}
            <circle cx="6" cy="200" r="1.5" fill="#fff" style={{ filter: 'drop-shadow(0px 0px 8px #fff)' }} />

            {/* Thread going through the eye */}
            <path d="M6 25 Q 20 10, 35 -15" fill="none" stroke="rgba(212, 175, 55, 1)" strokeWidth="2.5" style={{ filter: 'drop-shadow(0px 0px 8px rgba(212, 175, 55, 0.7))' }} />

            <defs>
              {/* Ultra Chrome Gradient */}
              <linearGradient id="needle-grad-chrome" x1="0" y1="100" x2="12" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4A4A4A" />
                <stop offset="15%" stopColor="#E0E0E0" />
                <stop offset="25%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#1A1A1A" />
                <stop offset="55%" stopColor="#4A4A4A" />
                <stop offset="80%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#2D2D2D" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Floating Creative Cards */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
        {creativeCards.map((card, index) => (
          <div
            key={index}
            className="creative-card-container"
            ref={el => cardsRef.current[index] = el}
            style={{
              '--card-rotation': `${card.rotation}deg`,
              position: 'absolute',
              top: card.top,
              left: card.left,
              width: '28vw',
              minWidth: '280px',
              maxWidth: '450px',
              padding: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.02)',
              borderRadius: '8px',
              transformOrigin: 'center center',
              willChange: 'transform, opacity, box-shadow',
              pointerEvents: 'auto',
              zIndex: card.zIndex,
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <div style={{ overflow: 'hidden', position: 'relative', width: '100%', paddingTop: '130%', borderRadius: '4px' }}>
              <img
                src={card.src}
                alt={card.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 1,
                }}
              />

              {/* Sleek Glassmorphism Text Overlay inside image */}
              <div
                className="card-overlay"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '1.5rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                  backdropFilter: 'blur(2px)',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'flex-end'
                }}
              >
                <p className="micro-typography" style={{
                  color: '#fff',
                  letterSpacing: '0.25em',
                  margin: 0,
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                  {card.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default CreativesAtWork;

