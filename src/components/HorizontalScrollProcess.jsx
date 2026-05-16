import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import generated images
import consultationImg from '../assets/images/luxury_consultation_studio_1778357479386.png';
import stitchingImg from '../assets/images/artisans_stitching_detail_1778357502188.png';
import deliveryImg from '../assets/images/luxury_garment_delivery_1778357531977.png';

const HorizontalScrollProcess = () => {
  const targetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Map x translation smoothly across the entire 300vh scroll
  // This uses percentages so it ignores scrollbar width differences
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6666%"]);

  // Elegant simple thread draw - draws exactly from 0 to 1
  const threadDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // MATHEMATICAL LUXURY FOCUS PACING
  // Step 1: Centered at 0.0. Dims and scales down as we scroll to 0.5 (where Step 2 is centered)
  const step1Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const step1Scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Step 2: Centered at 0.5. Scales/Fades up from 0.0, peaks at 0.5, dims to 1.0
  const step2Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const step2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  // Step 3: Centered at 1.0. Scales/Fades up from 0.5 to peak at 0.9 (so it's fully bright before the very end)
  const step3Opacity = useTransform(scrollYProgress, [0.5, 0.9], [0.6, 1]);
  const step3Scale = useTransform(scrollYProgress, [0.5, 0.9], [0.9, 1]);

  const stepTransforms = [
    { opacity: step1Opacity, scale: step1Scale },
    { opacity: step2Opacity, scale: step2Scale },
    { opacity: step3Opacity, scale: step3Scale }
  ];

  const steps = [
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
  ];

  return (
    <section
      ref={targetRef}
      className="horizontal-process-section"
      style={{
        position: 'relative',
        height: isMobile ? 'auto' : '400vh',
        backgroundColor: '#030303',
        overflow: isMobile ? 'hidden' : 'clip' // Prevent horizontal scrollbar
      }}
    >
      <div
        style={{
          position: isMobile ? 'relative' : 'sticky',
          top: 0,
          height: isMobile ? 'auto' : '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center'
        }}
      >

        <motion.div
          style={{
            x: isMobile ? "0%" : x,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            width: isMobile ? '100%' : '300vw',
            height: isMobile ? 'auto' : '100%',
            position: 'relative',
            zIndex: 1,
            gap: isMobile ? 'var(--section-padding-y)' : '0'
          }}
          className="horizontal-wrapper"
        >
          {/* Elegant Single Scrolling Golden Thread */}
          <div style={{ position: 'absolute', top: '20%', left: 0, width: '300vw', height: '60%', pointerEvents: 'none', zIndex: -1, opacity: 0.6 }}>
            <svg viewBox="0 0 3000 600" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>

              {/* Refined Single Core Thread */}
              <motion.path
                style={{ pathLength: threadDraw }}
                d="M -100 50 C 400 500, 600 100, 1000 300 C 1400 500, 1600 100, 2000 300 C 2400 500, 2600 100, 3100 300"
                stroke="#D4AF37"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />

              {/* Very Subtle Glow Trace */}
              <motion.path
                style={{ pathLength: threadDraw }}
                d="M -100 50 C 400 500, 600 100, 1000 300 C 1400 500, 1600 100, 2000 300 C 2400 500, 2600 100, 3100 300"
                stroke="#D4AF37"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
                style={{ filter: 'blur(3px)' }}
              />
            </svg>
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="horizontal-step"
              style={{
                position: 'relative',
                zIndex: 1,
                width: isMobile ? '100%' : '100vw',
                height: isMobile ? 'auto' : '100%',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? 'calc(var(--section-padding-y) / 2) var(--section-padding-x)' : '0 10vw',
                gap: '5vw'
              }}
            >

              {/* Text Column */}
              <div style={{ flex: 1, width: '100%', minWidth: isMobile ? '100%' : '300px' }}>
                <motion.div style={{ opacity: isMobile ? 1 : stepTransforms[index].opacity }}>
                  {/* Luxury Typography Layout */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                    <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>{step.num}</span>
                    <span style={{ fontSize: '1rem', color: '#fff', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{step.title}</span>
                  </div>

                  <h3 className="display-2" style={{ marginBottom: '1.5rem', color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>{step.title}</h3>
                  <p className="lead text-muted" style={{ maxWidth: '500px', lineHeight: 1.8, fontWeight: 300, fontSize: '0.95rem' }}>
                    {step.desc}
                  </p>
                </motion.div>
              </div>

              {/* Image Column */}
              <div style={{ flex: 1, width: '100%', minWidth: isMobile ? '100%' : '300px' }}>
                <motion.div
                  style={{
                    opacity: isMobile ? 1 : stepTransforms[index].opacity,
                    width: '80%',
                    margin: '0 auto',
                    height: 'clamp(40vh, 60vh, 700px)',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    filter: 'brightness(0.85) contrast(1.15)',
                    aspectRatio: '3/4',
                    scale: isMobile ? 1 : stepTransforms[index].scale
                  }}
                >
                  <motion.img
                    src={step.img}
                    alt={step.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </motion.div>
              </div>

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollProcess;
