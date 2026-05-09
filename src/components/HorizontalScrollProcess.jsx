import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollProcess = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useGSAP(() => {
    let sections = gsap.utils.toArray('.horizontal-step');

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + wrapperRef.current.offsetWidth
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="horizontal-process-section" style={{ overflow: 'hidden', backgroundColor: '#050505', color: '#fff', position: 'relative' }}>
      <div 
        ref={wrapperRef} 
        style={{ 
          display: 'flex', 
          width: '300vw',
          height: '100vh',
        }}
      >
        {/* Step 1 */}
        <div className="horizontal-step" style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vw' }}>
          <TextReveal className="display-2" style={{ marginBottom: '2rem' }}>How It Works</TextReveal>
          <div style={{ position: 'relative' }}>
             <span style={{ position: 'absolute', top: '-15vw', left: '-5vw', fontSize: '25vw', opacity: 0.05, zIndex: 0, pointerEvents: 'none', fontFamily: 'var(--font-serif)', lineHeight: 0.8 }}>01</span>
             <TextReveal className="h4" style={{ fontSize: '3rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>Consultation</TextReveal>
             <TextReveal className="lead text-muted" style={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>Connect with our stylists. We discuss your vision, preferred fabrics, and guide you through taking perfect measurements from the comfort of your home.</TextReveal>
          </div>
        </div>

        {/* Step 2 */}
        <div className="horizontal-step" style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vw' }}>
          <div style={{ position: 'relative' }}>
             <span style={{ position: 'absolute', top: '-15vw', left: '-5vw', fontSize: '25vw', opacity: 0.05, zIndex: 0, pointerEvents: 'none', fontFamily: 'var(--font-serif)', lineHeight: 0.8 }}>02</span>
             <TextReveal className="h4" style={{ fontSize: '3rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>The Stitch</TextReveal>
             <TextReveal className="lead text-muted" style={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>Our resilient women artisans take over. Every seam is sewn with precision, transforming premium fabrics into your bespoke garment.</TextReveal>
          </div>
        </div>

        {/* Step 3 */}
        <div className="horizontal-step" style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vw' }}>
          <div style={{ position: 'relative' }}>
             <span style={{ position: 'absolute', top: '-15vw', left: '-5vw', fontSize: '25vw', opacity: 0.05, zIndex: 0, pointerEvents: 'none', fontFamily: 'var(--font-serif)', lineHeight: 0.8 }}>03</span>
             <TextReveal className="h4" style={{ fontSize: '3rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>Delivery</TextReveal>
             <TextReveal className="lead text-muted" style={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>Your custom-stitched clothing arrives at your door. A perfect fit, crafted exclusively for you, carrying a story of empowerment.</TextReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollProcess;
