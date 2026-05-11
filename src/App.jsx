import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import components
import CustomCursor from './CustomCursor';
import CinematicHero from './components/CinematicHero';
import TextReveal from './components/TextReveal';
import ImageReveal from './components/ImageReveal';
import HorizontalScrollProcess from './components/HorizontalScrollProcess';
import HowWeWork from './components/HowWeWork';
import CreativesAtWork from './components/CreativesAtWork';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';


// Import images directly for Vite bundling
import navneetPortrait from './assets/images/navneet_portrait_1777827174428.png';
import nishikantPortrait from './assets/images/nishikant_portrait_1777827198758.png';
import craftImage from './assets/images/workspace_craft_1777827220745.png';
import teamImage from './assets/images/workspace_team_1777827283644.png';
import creativeImage from './assets/images/workspace_creative_1777827300802.png';
import logoImg from './assets/images/logo.png';

import { FadeIn, FloatContainer, MassiveBackgroundText } from './components/MotionHelpers';

const ParallaxMaskImage = ({ src, alt, className = "" }) => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={containerRef} className={`image-container editorial-mask ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="image-cover"
        style={{ y, scale: 1.1, willChange: 'transform' }}
        decoding="async"
        loading="lazy"
      />
    </div>
  );
};

export default function App() {
  useEffect(() => {
    // Initialize Lenis with optimal settings
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 1.5,
      syncTouch: true,
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <div className="global-grain"></div>
      <PageTransition />
      <CustomCursor />

      <Navbar />

      {/* Cinematic Hero Section - Optimized for performance */}
      <div style={{ height: '100vh', position: 'relative', zIndex: 0, overflow: 'hidden' }}>
        <CinematicHero />
      </div>

      {/* Content that slides over the hero */}
      <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'var(--bg)' }}>

        {/* The Redesigned Hook Section */}
        <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
          <MassiveBackgroundText text="BESPOKE" />

          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-responsive)', position: 'relative', zIndex: 1 }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'calc(var(--gap-responsive) / 2)' }}>
              <div style={{ maxWidth: '500px', flex: '1 1 300px' }}>
                <FadeIn delay={0.1}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)' }}></div>
                    <p className="micro-typography" style={{ color: 'var(--gold)', letterSpacing: '0.2em', margin: 0 }}>01 — THE PHILOSOPHY</p>
                  </div>
                  <h2 className="display-2" style={{ marginBottom: '2rem', lineHeight: 1.1 }}>The Architecture of the Individual Form</h2>
                  <p className="lead text-muted">
                    We do not believe in standard sizing. We believe in your size. Every garment is constructed from the ground up to amplify your presence and tell your story.
                  </p>
                </FadeIn>
              </div>

              <FadeIn delay={0.3} style={{ flex: '1 1 300px', width: '100%' }}>
                <div style={{ width: '100%', minWidth: '300px', height: '60vh' }}>
                  <ParallaxMaskImage src={teamImage} alt="Bespoke Design" className="image-cover" />
                </div>
              </FadeIn>
            </div>

            <div style={{ alignSelf: 'center', maxWidth: '1000px', textAlign: 'center', marginTop: '5vw' }}>
              <TextReveal className="display-1" style={{ lineHeight: 1.1 }} split={true}>
                A SINGLE THREAD CAN MEND A TEAR. <br />
                <span className="italic-text text-gold" style={{ textTransform: 'lowercase', fontSize: '1.2em' }}>but in the right hands,</span> <br />
                IT CAN WEAVE A FUTURE.
              </TextReveal>
            </div>

          </div>
        </section>

        {/* The Art of Personalization */}
        <section className="section">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--gap-responsive)', alignItems: 'center' }}>
            <div>
              <TextReveal className="display-2" style={{ marginBottom: '3vw' }}>
                The Art of Personalization
              </TextReveal>
              <FadeIn delay={0.1}>
                <p className="lead text-muted" style={{ marginBottom: '2vw' }}>
                  True luxury is clothing that understands your body. We do not believe in standard sizing; we believe in your size.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  From the curvature of the neckline to the drape of the fabric, every garment is meticulously tailored to your specific measurements and style preferences. This is personalized fashion that celebrates you.
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <div style={{ height: '70vh' }}>
                <ParallaxMaskImage src={craftImage} alt="Craftsmanship" className="image-cover" />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* High-Contrast Portrait Gallery */}
        <section className="gallery-section">
          <div className="container">
            <div className="gallery-grid">
              <div className="gallery-item left">
                <FloatContainer>
                  <div className="portrait-mask">
                    <ImageReveal src={creativeImage} alt="Editorial Fashion 1" />
                  </div>
                  <div className="gallery-caption">
                    <span className="text-muted">01</span>
                    <span>VISION</span>
                  </div>
                </FloatContainer>
              </div>
              <div className="gallery-item right">
                <FloatContainer>
                  <div className="portrait-mask">
                    <ImageReveal src={teamImage} alt="Editorial Fashion 2" delay={0.2} />
                  </div>
                  <div className="gallery-caption">
                    <span className="text-muted">02</span>
                    <span>STRUCTURE</span>
                  </div>
                </FloatContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal GSAP Process Section */}
        <HorizontalScrollProcess />

        {/* New: How We Work Section */}
        <HowWeWork />

        {/* Creatives at Work Gallery */}
        <CreativesAtWork />

        {/* Founders & Visionaries */}
        <section className="section">
          <div className="container">
            <TextReveal className="display-2" style={{ textAlign: 'center', marginBottom: 'var(--gap-responsive)' }}>
              The Visionaries
            </TextReveal>

            {/* Navneet */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--gap-responsive)', alignItems: 'center', marginBottom: 'var(--gap-responsive)' }}>
              <FadeIn delay={0.2}>
                <div style={{ height: '60vh' }}>
                  <ParallaxMaskImage src={navneetPortrait} alt="NavneetJit Kaur" className="image-cover" />
                </div>
              </FadeIn>
              <div>
                <FadeIn>
                  <h3 className="display-2" style={{ marginBottom: '2vw' }}>NavneetJit Kaur</h3>
                  <p className="text-gold" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3vw' }}>Founder & Managing Director</p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className="lead text-muted" style={{ marginBottom: '1.5vw' }}>
                    "Growing up in rural Punjab, I understand the challenges of every woman facing domestic violence and drug abuse by men."
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="lead text-muted" style={{ marginBottom: '1.5vw' }}>
                    "I’m passionate about making people feel great about themselves by designing their wardrobes. I welcome you to explore the opportunities and the possibilities!"
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p style={{ fontStyle: 'italic', color: 'var(--gold)', fontSize: '1.2rem', marginTop: '2vw' }}>
                    "We make you look great where every stitch is an opportunity!"
                  </p>
                </FadeIn>
              </div>
            </div>

            {/* Nishikant */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--gap-responsive)', alignItems: 'center', marginBottom: 'var(--gap-responsive)' }}>
              <div style={{ order: 2 }}>
                <FadeIn>
                  <h3 className="display-2" style={{ marginBottom: '2vw' }}>Nishikant Grover</h3>
                  <p className="text-gold" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3vw' }}>Global Ecosystems</p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className="lead text-muted" style={{ marginBottom: '2vw' }}>
                    Inspired by frameworks like Clare's Law, he builds ecosystems that support women entrepreneurs, ensuring empowerment is enabled by global opportunity.
                  </p>
                </FadeIn>
              </div>
              <FadeIn delay={0.2} style={{ order: 1 }}>
                <div style={{ height: '60vh' }}>
                  <ParallaxMaskImage src={nishikantPortrait} alt="Nishikant" className="image-cover" />
                </div>
              </FadeIn>
            </div>

            {/* Camellia (CMO) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--gap-responsive)', alignItems: 'center' }}>
              <FadeIn delay={0.2}>
                <div style={{ height: '60vh' }}>
                  <ParallaxMaskImage src="/cmo_camellia.jpeg" alt="Camellia" className="image-cover" />
                </div>
              </FadeIn>
              <div>
                <FadeIn>
                  <h3 className="display-2" style={{ marginBottom: '2vw' }}>Camellia</h3>
                  <p className="text-gold" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3vw' }}>Chief Marketing Officer</p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className="lead text-muted" style={{ marginBottom: '1.5vw' }}>
                    Driving the narrative of Sui Dhaga to the world, merging the art of storytelling with the business of empowerment.
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Book an Order (Conversion Section) */}
        <section id="book" className="section inverted-section" style={{ minHeight: '80vh', textAlign: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <MassiveBackgroundText text="SUI DHAGA" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <TextReveal className="display-1" style={{ marginBottom: '2vw' }}>
              Begin Your Journey
            </TextReveal>
            <FadeIn delay={0.2}>
              <p className="lead text-muted" style={{ margin: '0 auto 4vw', maxWidth: '600px' }}>
                Ready for a wardrobe that truly fits? Book a consultation via WhatsApp to start the personalization process.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <a
                href="https://wa.me/"
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
