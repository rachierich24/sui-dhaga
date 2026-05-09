import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import components
import CustomCursor from './CustomCursor';
import CinematicHero from './components/CinematicHero';
import TextReveal from './components/TextReveal';
import ImageReveal from './components/ImageReveal';
import HorizontalScrollProcess from './components/HorizontalScrollProcess';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import images directly for Vite bundling
import navneetPortrait from './assets/images/navneet_portrait_1777827174428.png';
import nishikantPortrait from './assets/images/nishikant_portrait_1777827198758.png';
import craftImage from './assets/images/workspace_craft_1777827220745.png';
import teamImage from './assets/images/workspace_team_1777827283644.png';
import creativeImage from './assets/images/workspace_creative_1777827300802.png';
import logoImg from './assets/images/logo.png';

const FloatContainer = ({ children }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <motion.div ref={ref} style={{ y, width: '100%', position: 'relative' }}>
      {children}
    </motion.div>
  );
};

const MassiveBackgroundText = ({ text }) => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  return (
    <div className="massive-bg-text-container">
      <motion.div className="massive-bg-text" style={{ x }}>
        {text}
      </motion.div>
    </div>
  );
};

const FadeIn = ({ children, delay = 0, y = 50 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay }}
  >
    {children}
  </motion.div>
);

const ParallaxMaskImage = ({ src, alt, className = "" }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div className={`image-container editorial-mask ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="image-cover"
        style={{ y, scale: 1.15 }}
      />
    </div>
  );
};

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main>
      <div className="global-grain"></div>
      <PageTransition />
      <CustomCursor />

      <Navbar />

      {/* Cinematic Hero Section - Fixed to background for transition */}
      <div style={{ height: '100vh', position: 'relative', zIndex: 0 }}>
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh' }}>
          <CinematicHero />
        </div>
      </div>

      {/* Content that slides over the hero */}
      <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'var(--bg)' }}>

      {/* The Redesigned Hook Section */}
      <section className="section" style={{ position: 'relative', padding: '15vw 5vw', overflow: 'hidden' }}>
        <MassiveBackgroundText text="BESPOKE" />

        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '8vw', position: 'relative', zIndex: 1 }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4vw' }}>
            <div style={{ maxWidth: '500px', paddingTop: '5vw' }}>
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

            <FadeIn delay={0.3}>
              <div style={{ width: '40vw', minWidth: '300px', height: '60vh' }}>
                <ParallaxMaskImage src={teamImage} alt="Bespoke Design" className="image-cover" />
              </div>
            </FadeIn>
          </div>

          <div style={{ alignSelf: 'center', maxWidth: '1000px', textAlign: 'center', marginTop: '5vw' }}>
            <TextReveal className="display-1" style={{ lineHeight: 1.1 }}>
              A SINGLE THREAD CAN MEND A TEAR. <br/>
              <span className="italic-text text-gold" style={{ textTransform: 'lowercase', fontSize: '1.2em' }}>but in the right hands,</span> <br/>
              IT CAN WEAVE A FUTURE.
            </TextReveal>
          </div>

        </div>
      </section>

      {/* The Art of Personalization */}
      <section className="section" style={{ padding: '10vw 5vw' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8vw', alignItems: 'center' }}>
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

      {/* Founders */}
      <section className="section" style={{ padding: '15vw 5vw' }}>
        <div className="container">
          <TextReveal className="display-2" style={{ textAlign: 'center', marginBottom: '10vw' }}>
            The Visionaries
          </TextReveal>

          {/* Navneet */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8vw', alignItems: 'center', marginBottom: '15vw' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8vw', alignItems: 'center' }}>
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
        </div>
      </section>

      {/* Book an Order (Conversion Section) */}
      <section id="book" className="section inverted-section" style={{ minHeight: '80vh', textAlign: 'center', justifyContent: 'center', padding: '10vw 5vw', position: 'relative', overflow: 'hidden' }}>
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
