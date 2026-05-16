import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { FadeIn, useMobile } from './MotionHelpers';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const CreativesAtWork = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const pathRef = useRef(null);
  const needleRef = useRef(null);
  const cardsRef = useRef([]);
  const isMobile = useMobile();

  const creativeCards = [
    { src: '/creative_2.jpeg', title: 'MOODBOARD 01', top: isMobile ? '15%' : '12%', left: isMobile ? '5%' : '8%', progress: 0.15, rotation: -3 },
    { src: '/creative_4.jpeg', title: 'THE DRAPE', top: isMobile ? '30%' : '20%', left: isMobile ? '45%' : '55%', progress: 0.30, rotation: 2 },
    { src: '/creative_5.jpeg', title: 'STITCHING DETAILS', top: isMobile ? '45%' : '38%', left: isMobile ? '8%' : '12%', progress: 0.45, rotation: -1.5 },
    { src: '/creative_6.jpeg', title: 'FINAL FITTING', top: isMobile ? '60%' : '52%', left: isMobile ? '50%' : '60%', progress: 0.60, rotation: 3 },
    { src: '/creative_7.jpeg', title: 'THE REFINEMENT', top: isMobile ? '75%' : '72%', left: isMobile ? '5%' : '10%', progress: 0.75, rotation: -2.5 },
    { src: '/creative_8.jpeg', title: 'EDITORIAL', top: isMobile ? '90%' : '82%', left: isMobile ? '45%' : '52%', progress: 0.90, rotation: 1.5 },
  ];

  const svgPathD = isMobile 
    ? "M 50,-50 C 150,150 450,250 450,500 C 450,750 50,850 50,1100 C 50,1350 450,1450 450,1700 C 450,1950 50,2050 50,2300 C 50,2550 450,2650 450,2900 C 450,3150 250,3250 300,3400"
    : "M 100,-50 C 200,300 850,400 850,800 C 850,1200 150,1300 150,1700 C 150,2100 850,2200 850,2600 C 850,3000 150,3100 150,3500 C 150,3800 600,3850 800,3950";

  useEffect(() => {
    let ctx = gsap.context(() => {
      const path = pathRef.current;
      const length = path.getTotalLength();

      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(cardsRef.current, { opacity: 0, y: 30, scale: 0.98, force3D: true });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: isMobile ? 1 : 2.5,
        }
      });

      masterTl.to(bgRef.current, { y: '8%', ease: "none", duration: 1, force3D: true }, 0);
      masterTl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1, force3D: true }, 0);

      masterTl.to(needleRef.current, {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.1],
          autoRotate: 90
        },
        ease: "none",
        duration: 1,
        force3D: true
      }, 0);

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const triggerTime = creativeCards[index].progress;
        masterTl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          force3D: true
        }, triggerTime - 0.15);
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      className="creatives-story-section"
      style={{
        position: 'relative',
        backgroundColor: '#050505',
        color: 'var(--text)',
        minHeight: isMobile ? '300vh' : '380vh',
        overflow: 'hidden',
        paddingTop: isMobile ? '10vh' : '15vh'
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%',
          pointerEvents: 'none', zIndex: 0,
          background: `
            radial-gradient(ellipse at 30% 0%, #1a1817 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, #121110 0%, transparent 60%),
            linear-gradient(180deg, #0a0908 0%, #050505 100%)
          `,
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          opacity: 0.15, pointerEvents: 'none', mixBlendMode: 'soft-light',
          backgroundImage: `
            repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 2px),
            repeating-linear-gradient(-45deg, #000 0px, #000 1px, transparent 1px, transparent 2px)
          `,
          backgroundSize: '4px 4px'
        }}></div>
      </div>

      <div style={{ position: 'sticky', top: 0, left: 0, width: '100%', height: '100vh', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          width: '100%', height: '100%',
          background: 'radial-gradient(circle at 15% 40%, rgba(212, 175, 55, 0.04) 0%, transparent 50%)',
          mixBlendMode: 'screen'
        }}></div>
      </div>

      <div style={{ 
        position: isMobile ? 'relative' : 'absolute', 
        top: isMobile ? '0' : '8%', 
        left: isMobile ? '0' : '55%', 
        zIndex: 20, 
        pointerEvents: 'none', 
        maxWidth: isMobile ? '100%' : '450px',
        padding: isMobile ? '0 1.5rem 5vh' : '0'
      }}>
        <TextReveal className="display-2" style={{ color: '#fff', marginBottom: '1.5rem', lineHeight: 1.1, fontSize: isMobile ? '2.5rem' : '3.5rem' }}>
          Creatives at work.
        </TextReveal>
        <FadeIn delay={0.2}>
          <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '380px', fontSize: '1rem', lineHeight: 1.8, fontWeight: 300 }}>
            The SUI DHAGA atelier is where technical precision meets high-fashion artistry, crafting stories that endure.
          </p>
        </FadeIn>
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
        <svg
          viewBox={isMobile ? "0 0 500 3500" : "0 0 1000 4000"}
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        >
          <path
            ref={pathRef}
            d={svgPathD}
            fill="none"
            stroke="rgba(212, 175, 55, 0.7)"
            strokeWidth={isMobile ? "1.5" : "2"}
            strokeLinecap="round"
          />
        </svg>

        <div
          ref={needleRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: isMobile ? '12px' : '32px',
            height: isMobile ? '80px' : '180px',
            zIndex: 10,
            willChange: 'transform'
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 20 200" fill="none" style={{ overflow: 'visible' }}>
            <path d="M10 0 C 8.5 0, 8 3, 8 15 V 170 C 8 185, 9.5 195, 10 200 C 10.5 195, 12 185, 12 170 V 15 C 12 3, 11.5 0, 10 0 Z" fill="url(#needle-grad-luxury)" />
            <path d="M10 10 C 9.5 10, 9.2 12, 9.2 20 V 40 C 9.2 48, 9.5 50, 10 50 C 10.5 50, 10.8 48, 10.8 40 V 20 C 10.8 12, 10.5 10, 10 10 Z" fill="#050505" />
            <path d="M9 15 V 175" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
            <path d="M11 15 V 175" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
            <circle cx="10" cy="200" r="1.2" fill="#fff" style={{ filter: 'drop-shadow(0 0 4px #fff)' }} />
            <defs>
              <linearGradient id="needle-grad-luxury" x1="0" y1="0" x2="20" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2A2A2A" />
                <stop offset="30%" stopColor="#D0D0D0" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#A0A0A0" />
                <stop offset="100%" stopColor="#1A1A1A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 15 }}>
        {creativeCards.map((card, index) => (
          <div
            key={index}
            className="creative-card-container"
            ref={el => cardsRef.current[index] = el}
            style={{
              position: 'absolute',
              top: card.top,
              left: card.left,
              width: isMobile ? '42vw' : '25vw',
              minWidth: isMobile ? '160px' : '280px',
              maxWidth: '420px',
              padding: isMobile ? '0.5rem' : '0.8rem',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '4px',
              transform: `rotate(${card.rotation}deg)`,
              transformOrigin: 'center center',
              pointerEvents: 'auto',
              cursor: 'pointer',
              zIndex: 10 + index
            }}
          >
            <div style={{ overflow: 'hidden', position: 'relative', width: '100%', paddingTop: '140%', borderRadius: '2px' }}>
              <img src={card.src} alt={card.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: isMobile ? '1rem' : '1.5rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                display: 'flex',
                alignItems: 'flex-end'
              }}>
                <p style={{ color: '#fff', letterSpacing: '0.2em', margin: 0, fontSize: isMobile ? '0.65rem' : '0.75rem', fontWeight: '500', textTransform: 'uppercase' }}>
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
