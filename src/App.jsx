import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import components
import CustomCursor from './CustomCursor';
import CinematicHero from './components/CinematicHero';
import TextReveal from './components/TextReveal';
import HorizontalScrollProcess from './components/HorizontalScrollProcess';
import HowWeWork from './components/HowWeWork';
import CreativesAtWork from './components/CreativesAtWork';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Visionaries from './components/Visionaries';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';


import { FadeIn, MassiveBackgroundText } from './components/MotionHelpers';

export default function App() {
  const lenisRef = React.useRef(null);

  useEffect(() => {
    // Initialize Lenis with optimal settings
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1.2,
        smoothTouch: true,
        touchMultiplier: 2,
        syncTouch: true,
      });

      function raf(time) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return (
    <main className="main-wrapper">
      <PageTransition />
      <CustomCursor />

      <Navbar />

      {/* Cinematic Hero Section - Optimized for performance */}
      <div style={{ height: '100vh', position: 'relative', zIndex: 0, overflow: 'hidden' }}>
        <CinematicHero />
      </div>

      {/* Content that slides over the hero */}
      <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'var(--bg)' }}>

        {/* Horizontal GSAP Process Section */}
        <div id="process">
          <HorizontalScrollProcess />
        </div>

        {/* New: How We Work Section */}
        <HowWeWork />

        {/* Creatives at Work Gallery */}
        <div id="collection">
          <CreativesAtWork />
        </div>

        {/* Founders & Visionaries - Upgraded to Cinematic Luxury Component */}
        <Visionaries />

        {/* Book an Order (Conversion Section) */}
        <section id="book" className="section inverted-section" style={{ minHeight: '80vh', textAlign: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <MassiveBackgroundText text="SUI DHAGA" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <TextReveal className="display-1" style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: '2vw' }}>
              Begin Your Journey
            </TextReveal>
            <FadeIn delay={0.2}>
              <p className="lead text-muted" style={{ margin: '0 auto 4vw', maxWidth: '600px' }}>
                Ready for a wardrobe that truly fits? Book a consultation via WhatsApp to start the personalization process.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <a
                href="https://wa.me/61470270478"
                target="_blank"
                rel="noopener noreferrer"
                className="book-btn"
                style={{
                  display: 'inline-block',
                  padding: '1.5rem 4rem',
                  border: '1px solid',
                  fontSize: '1rem',
                  letterSpacing: '0.2em'
                }}
              >
                BOOK CONSULTATION
              </a>
            </FadeIn>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}
