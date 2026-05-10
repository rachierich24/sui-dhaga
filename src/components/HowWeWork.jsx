import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import { FadeIn } from './MotionHelpers';
import artisanStudio from '../assets/images/modern_artisan_studio_1778357555845.png';

const HowWeWork = () => {
  return (
    <section className="how-we-work-section" style={{ padding: 'var(--section-padding-y) var(--section-padding-x)', backgroundColor: '#0a0a0a', position: 'relative', zIndex: 10 }}>
      <div className="container">
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--gap-responsive)', alignItems: 'center' }}>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)' }}></div>
                <p className="micro-typography" style={{ color: 'var(--gold)', letterSpacing: '0.2em', margin: 0 }}>THE COLLECTIVE</p>
              </div>
              <h2 className="display-2" style={{ marginBottom: '2rem' }}>How We Work</h2>
              <p className="lead text-muted" style={{ marginBottom: '2rem' }}>
                Our work is more than tailoring; it is a movement. Every garment is crafted by women who have reclaimed their independence. We provide a safe, empowering environment where skill meets dignity.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: 'var(--gap-responsive)' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <h4 className="text-gold" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Fair Trade</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Ensuring every artisan receives more than a living wage, with complete financial autonomy.</p>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <h4 className="text-gold" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Education</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Continuous skill-building and leadership workshops to empower the next generation.</p>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: '600px', justifySelf: 'center' }}>
              <motion.div
                initial={{ scale: 1.05, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}
              >
                <img src={artisanStudio} alt="Our Studio" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </motion.div>
              
              {/* Floating Detail Badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  position: 'absolute',
                  bottom: 'clamp(-30px, -5vw, -10px)',
                  right: 'clamp(-30px, -5vw, -10px)',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(212, 175, 55, 0.5)',
                  color: 'var(--gold)',
                  padding: '1.5rem',
                  borderRadius: '50%',
                  width: 'clamp(100px, 15vw, 140px)',
                  height: 'clamp(100px, 15vw, 140px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontSize: 'clamp(0.6rem, 1vw, 0.8rem)',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  zIndex: 2,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}
              >
                100%<br/>HANDMADE
              </motion.div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default HowWeWork;
