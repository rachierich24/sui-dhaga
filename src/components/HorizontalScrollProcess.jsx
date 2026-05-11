import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import { FadeIn } from './MotionHelpers';
import ThreeThread from './ThreeThread';

// Import generated images
import consultationImg from '../assets/images/luxury_consultation_studio_1778357479386.png';
import stitchingImg from '../assets/images/artisans_stitching_detail_1778357502188.png';
import deliveryImg from '../assets/images/luxury_garment_delivery_1778357531977.png';

const HorizontalScrollProcess = () => {
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
    <section className="vertical-process-section" style={{ backgroundColor: '#030303', color: '#fff', position: 'relative', overflow: 'hidden', padding: 'var(--section-padding-y) 0' }}>
      
      {/* Scoped CSS for the new rock-solid layout */}
      <style>{`
        .process-row {
          display: flex;
          align-items: center;
          gap: var(--gap-responsive);
        }
        .process-row.reverse {
          flex-direction: row-reverse;
        }
        .process-col {
          flex: 1;
          min-width: 300px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .process-row, .process-row.reverse {
            flex-direction: column-reverse; /* Text on bottom, image on top */
          }
        }
      `}</style>

      {/* 3D Background */}
      <div className="desktop-only" style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4 }}>
        <ThreeThread />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'var(--section-padding-y)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)' }}></div>
              <p className="micro-typography" style={{ color: 'var(--gold)', letterSpacing: '0.2em', margin: 0 }}>THE JOURNEY</p>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)' }}></div>
            </div>
            <TextReveal className="display-2">
              The Process
            </TextReveal>
          </div>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--section-padding-y)' }}>
          {steps.map((step, index) => {
            const isReverse = index % 2 === 1;

            return (
              <div key={index} className={`process-row ${isReverse ? 'reverse' : ''}`}>
                
                {/* Text Column */}
                <div className="process-col">
                  <FadeIn delay={0.2}>
                    <span style={{ 
                      fontSize: 'clamp(4rem, 10vw, 8rem)', 
                      fontFamily: 'var(--font-serif)', 
                      color: 'transparent',
                      WebkitTextStroke: '1px rgba(212, 175, 55, 0.3)',
                      lineHeight: 0.8,
                      display: 'block',
                      marginBottom: '1rem'
                    }}>
                      {step.num}
                    </span>
                    <h3 className="display-2" style={{ marginBottom: '1.5rem' }}>{step.title}</h3>
                    <p className="lead text-muted" style={{ maxWidth: '500px', lineHeight: 1.8 }}>
                      {step.desc}
                    </p>
                  </FadeIn>
                </div>

                {/* Image Column */}
                <div className="process-col">
                  <motion.div 
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ 
                      width: '100%', 
                      height: 'clamp(40vh, 60vh, 700px)', 
                      overflow: 'hidden', 
                      borderRadius: '8px', 
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                    }}
                  >
                    <motion.img 
                      src={step.img} 
                      alt={step.alt} 
                      initial={{ scale: 1.2 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true, margin: "100px" }}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                      }} 
                    />
                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollProcess;
