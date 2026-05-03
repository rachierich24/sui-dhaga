import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import images directly for Vite bundling
import heroBg from './assets/images/hero_bg_1777827156134.png';
import navneetPortrait from './assets/images/navneet_portrait_1777827174428.png';
import nishikantPortrait from './assets/images/nishikant_portrait_1777827198758.png';
import craftImage from './assets/images/workspace_craft_1777827220745.png';
import teamImage from './assets/images/workspace_team_1777827283644.png';

const FadeIn = ({ children, delay = 0, y = 30 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay }}
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
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '2vw 5vw', display: 'flex', justifyContent: 'space-between', zIndex: 100, mixBlendMode: 'difference' }}>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
          style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', letterSpacing: '0.1em' }}
        >
          SUI DHAGA
        </motion.div>
        <motion.a 
          href="#book"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.2 }}
        >
          BOOK CONSULTATION
        </motion.a>
      </nav>

      {/* 1. Static Hero Banner */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', padding: 0, zIndex: 1 }}>
        {/* Static Image Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: -2 }}>
           <img 
             src={heroBg} 
             alt="Luxury Fabric" 
             className="image-cover"
           />
        </div>
        {/* Dark overlay for text readability */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(5, 5, 5, 0.4)', zIndex: -1 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, height: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '10vw 5vw' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <h1 className="display-1" style={{ marginBottom: '2rem' }}>
              Bespoke.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Personalised.</span><br />
              Empowering.
            </h1>
            <p className="lead text-muted" style={{ margin: '0 auto', maxWidth: '500px' }}>
              We craft exquisite, custom-fitted women's clothing—where every thread honors your unique silhouette and our artisans' resilience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Hook Section with Image Background */}
      <section className="section" style={{ position: 'relative', textAlign: 'center', padding: '15vw 5vw', overflow: 'hidden', zIndex: 1 }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -2 }}>
          <ParallaxMaskImage src={teamImage} alt="Our Team" className="image-cover" />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: -1 }} />
        
        <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <h2 className="display-2" style={{ lineHeight: 1.3 }}>
              A single thread can mend a tear.<br/>
              But in the right hands, it can weave a future. 
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* The Art of Personalization */}
      <section className="section" style={{ padding: '10vw 5vw' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8vw', alignItems: 'center' }}>
          <div>
            <FadeIn>
              <h3 className="display-2" style={{ marginBottom: '3vw' }}>The Art of Personalization</h3>
            </FadeIn>
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

      {/* The Process */}
      <section className="section" style={{ backgroundColor: '#050505', padding: '15vw 5vw' }}>
        <div className="container">
          <FadeIn>
            <h2 className="display-2" style={{ textAlign: 'center', marginBottom: '10vw' }}>How It Works</h2>
          </FadeIn>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4vw' }}>
            <FadeIn delay={0.1}>
              <span className="process-number">01</span>
              <h4 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Consultation</h4>
              <p className="text-muted">Connect with our stylists. We discuss your vision, preferred fabrics, and guide you through taking perfect measurements from the comfort of your home.</p>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <span className="process-number">02</span>
              <h4 style={{ fontSize: '2rem', marginBottom: '1rem' }}>The Stitch</h4>
              <p className="text-muted">Our resilient women artisans take over. Every seam is sewn with precision, transforming premium fabrics into your bespoke garment.</p>
            </FadeIn>
            
            <FadeIn delay={0.5}>
              <span className="process-number">03</span>
              <h4 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Delivery</h4>
              <p className="text-muted">Your custom-stitched clothing arrives at your door. A perfect fit, crafted exclusively for you, carrying a story of empowerment.</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="section" style={{ padding: '15vw 5vw' }}>
        <div className="container">
          <FadeIn>
            <h2 className="display-2" style={{ textAlign: 'center', marginBottom: '10vw' }}>The Visionaries</h2>
          </FadeIn>
          
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
      <section id="book" className="section fluid-bg" style={{ minHeight: '80vh', textAlign: 'center', justifyContent: 'center', padding: '10vw 5vw' }}>
        <FadeIn>
          <h2 className="display-1" style={{ marginBottom: '2vw' }}>Begin Your<br/>Journey</h2>
        </FadeIn>
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
            style={{ 
              display: 'inline-block',
              padding: '1.5rem 4rem',
              border: '1px solid var(--gold)',
              color: 'var(--gold)',
              fontSize: '1rem',
              letterSpacing: '0.2em'
            }}
          >
            BOOK CONSULTATION
          </a>
        </FadeIn>
      </section>
    </main>
  );
}
