import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useMobile } from './MotionHelpers';

// Import generated images
import consultationImg from '../assets/images/luxury_consultation_studio_1778357479386.png';
import stitchingImg from '../assets/images/artisans_stitching_detail_1778357502188.png';
import deliveryImg from '../assets/images/luxury_garment_delivery_1778357531977.png';

const HorizontalScrollProcess = () => {
  const targetRef = useRef(null);
  const isMobile = useMobile();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // CINEMATIC MOTION SMOOTHING
  // Adds weight and fluid inertia to the scroll-linked animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  // LAYERED DEPTH HIERARCHY
  // Background (Thread) moves slowest, cards move faster, typography has its own pace
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-66.666%"]);
  const threadX = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]); // Subtle background drift
  const threadDraw = useTransform(smoothProgress, [0, 0.9], [0, 1]);

  const steps = useMemo(() => [
    {
      num: "01",
      title: "Consultation",
      desc: "Your journey begins in our private digital salon. We blend your vision with our heritage, guiding you through a curated selection of premium silks and velvets.",
      img: consultationImg,
      alt: "Luxury Consultation"
    },
    {
      num: "02",
      title: "The Stitch",
      desc: "Where soul meets silk. Our artisans execute every seam with obsessive precision, ensuring the drape is as flawless as the individual it is built for.",
      img: stitchingImg,
      alt: "Artisan Stitching"
    },
    {
      num: "03",
      title: "The Reveal",
      desc: "Your bespoke creation arrives in signature black and gold. More than a garment, it is a story of Punjab, empowerment, and your own unique presence.",
      img: deliveryImg,
      alt: "Luxury Reveal"
    }
  ], []);

  return (
    <section
      ref={targetRef}
      className="horizontal-process-section"
      style={{
        position: 'relative',
        height: isMobile ? 'auto' : '300vh', // Reduced height for better pacing
        backgroundColor: '#030303',
        overflow: isMobile ? 'visible' : 'clip'
      }}
    >
      <div
        style={{
          position: isMobile ? 'relative' : 'sticky',
          top: 0,
          height: isMobile ? 'auto' : '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* ASYMMETRICAL ORGANIC THREAD */}
        {!isMobile && (
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '150vw',
              height: '100vh',
              pointerEvents: 'none',
              zIndex: 0,
              opacity: 0.4,
              x: threadX
            }}
          >
            <svg viewBox="0 0 1500 800" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <motion.path
                style={{
                  pathLength: threadDraw,
                  filter: 'url(#goldGlow)'
                }}
                d="M -100 600 C 200 500, 400 100, 600 300 C 800 500, 1000 200, 1200 400 C 1400 600, 1600 100, 1800 300"
                stroke="#D4AF37"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </motion.div>
        )}

        <motion.div
          style={{
            x: isMobile ? "0%" : x,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            width: isMobile ? '100%' : '300vw',
            height: isMobile ? 'auto' : '100%',
            position: 'relative',
            zIndex: 1,
            gap: isMobile ? '2rem' : '0'
          }}
        >
          {steps.map((step, index) => {
            const isEven = index % 2 !== 0;

            return (
              <div
                key={index}
                className="horizontal-step"
                style={{
                  width: isMobile ? '100%' : '100vw',
                  height: isMobile ? 'auto' : '100%',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : (isEven ? 'row-reverse' : 'row'), // Alternating Layout
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: isMobile ? '4rem 1.5rem' : '0 12vw',
                  gap: isMobile ? '2.5rem' : '8vw'
                }}
              >
                {/* Text Column - Premium Alignment */}
                <div style={{ flex: 1, textAlign: 'left', maxWidth: '500px' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '1.5rem',
                      marginBottom: '2.5rem',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      paddingBottom: '1rem'
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '0.8rem',
                        color: 'var(--gold)',
                        letterSpacing: '0.3em'
                      }}>
                        STEP {step.num}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase'
                      }}>
                        Process
                      </span>
                    </div>

                    <h3 className="display-2" style={{
                      marginBottom: '2rem',
                      color: '#fff',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 300,
                      lineHeight: 1.1,
                      fontSize: isMobile ? '2.5rem' : '4rem'
                    }}>
                      {step.title}
                    </h3>
                    <p className="text-muted" style={{
                      lineHeight: 1.9,
                      fontWeight: 300,
                      fontSize: '1rem',
                      letterSpacing: '0.01em',
                      opacity: 0.8
                    }}>
                      {step.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Image Column - Editorial Proportions */}
                <div style={{
                  flex: 1.2,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  perspective: '1000px'
                }}>
                  <motion.div
                    initial={isMobile ? { opacity: 0, scale: 0.95 } : false}
                    whileInView={isMobile ? { opacity: 1, scale: 1 } : false}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    style={{
                      width: '100%',
                      maxWidth: isMobile ? '100%' : '550px',
                      height: isMobile ? '50vh' : 'clamp(350px, 60vh, 750px)',
                      overflow: 'hidden',
                      borderRadius: '2px',
                      boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                      position: 'relative'
                    }}
                  >
                    <motion.img
                      src={step.img}
                      alt={step.alt}
                      style={{
                        width: '100%',
                        height: '115%', // Extra height for internal parallax
                        objectFit: 'cover',
                        filter: 'brightness(0.9) contrast(1.05)'
                      }}
                      // Subtle internal image parallax
                      animate={isMobile ? {} : {
                        y: ["-5%", "5%"]
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3) 100%)',
                      pointerEvents: 'none'
                    }} />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollProcess;
