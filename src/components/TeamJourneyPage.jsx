import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './MotionHelpers';
import TextReveal from './TextReveal';

const travelLogs = [
  {
    id: 1,
    tag: "FABRIC EXPEDITION",
    location: "Milan, Italy",
    title: "Sourcing Mulberry Silks",
    date: "OCTOBER 2025",
    desc: "Sifting through the finest heritage silk ateliers of Lombardy, hand-selecting rich mulberry weaves that form the inner lining of our custom couture. A dialogue between classic European luxury and traditional Indian craft.",
    extendedDesc: "Our journey to Milan led us to small, family-run ateliers in Como and Lombardy, renowned for weaving silk for generations. Here, our creative directors worked directly with weavers to create a lightweight, high-tensile silk structure. Every thread in these silk linings is custom-dyed in gold hues to match the royal velvets of Sui Dhaga. These silk components ensure comfort, absolute structural stability, and a breath of European heritage inside our bespoke Indian silhouettes.",
    image: "/raw_photo_3.jpeg"
  },
  {
    id: 2,
    tag: "COMMUNITY ENGAGEMENT",
    location: "Punjab, India",
    title: "Atelier Empowerment Visits",
    date: "NOVEMBER 2025",
    desc: "Sitting beside our master women artisans in the heart of Punjab. Witnessing the patient, precision-stitching that transforms raw handloom threads into structural masterpieces. A true journey of hope and self-reliance.",
    extendedDesc: "Sui Dhaga's heartbeat is in rural Punjab. On this journey, our team visited the fair-trade ateliers we constructed to provide clean, safe, and empowering workspaces for rural women. We sat with our master artisans, sharing stories over tea, and audited the craftsmanship. Here, local traditional embroidery—such as Phulkari and hand-stitching—is elevated to luxury couture standards, providing sustainable livelihoods and empowering women to lead with dignity and confidence.",
    image: "/raw_photo_1.jpeg"
  },
  {
    id: 3,
    tag: "BESPOKE DESIGNING",
    location: "Delhi, India",
    title: "Crafting the Inaugural Line",
    date: "DECEMBER 2025",
    desc: "Deep in the creative process at our Bespoke Delhi Studio, sketching silhouettes, aligning gold borders, and tailoring precision cuts for our global discerning clientele. Weaving luxury directly into every tailored seam.",
    extendedDesc: "At the New Delhi design headquarters, our travel experiences converge into creative structure. This session focused on sketching the premium winter range, overlaying the Italian silk linings onto heavily embroidered velvets. Our master pattern makers worked late into the night, aligning each motif by hand and hand-finishing the seams. This is where technical digital precision meets raw artistic craftsmanship to cater to our global community.",
    image: "/raw_photo_5.jpeg"
  },
  {
    id: 4,
    tag: "HERITAGE TEXTILE EXPEDITION",
    location: "Varanasi, India",
    title: "Diving into Banarasi Brocades",
    date: "JANUARY 2026",
    desc: "Exploring the ghats and ancient looms of Banaras, diving deep into hand-woven brocades and heavy gold threads to weave absolute authenticity into every bespoke Sui Dhaga order.",
    extendedDesc: "Varanasi (Banaras) is a city where time is suspended. Our sourcing expedition explored the winding alleyways near the Ganges to find heritage master weavers operating authentic handlooms. We selected premium silk brocades embedded with real silver and gold metallic threads (Zari). Integrating these rare heritage materials into the collar details and cuffs of our suits ensures that every Sui Dhaga creation is an authentic piece of living art, preserving traditional skills for the global future.",
    image: "/raw_photo_7.jpeg"
  }
];

export default function TeamJourneyPage() {
  const [activeLog, setActiveLog] = useState(null);

  useEffect(() => {
    // Ensure page scrolls to top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#030303', minHeight: '100vh', color: '#fff', paddingBottom: '10vh' }}>
      
      {/* Decorative background grid and flows */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.05, backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div style={{ position: 'fixed', top: '20%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}></div>

      <header style={{ width: '100%', padding: '3rem var(--section-padding-x)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <a 
          href="#"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--gold)',
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            fontFamily: 'var(--font-sans)',
            textTransform: 'uppercase',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            padding: '0.6rem 1.5rem',
            borderRadius: '30px',
            backgroundColor: 'rgba(3,3,3,0.5)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(180deg)' }}>
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
          BACK TO HOME
        </a>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
          SUI DHAGA JOURNAL
        </span>
      </header>

      <main className="container" style={{ position: 'relative', zIndex: 5, padding: '5vh var(--section-padding-x) 0' }}>
        
        {/* Intro */}
        <div style={{ maxWidth: '750px', marginBottom: '10vh' }}>
          <FadeIn>
            <p className="micro-typography" style={{ color: 'var(--gold)', marginBottom: '1rem', letterSpacing: '0.5em' }}>
              CHRONICLES OF TRAVEL
            </p>
          </FadeIn>
          <h1 className="display-1" style={{ marginBottom: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Sourcing <span className="italic-text">Journeys</span>
          </h1>
          <FadeIn delay={0.25}>
            <p className="lead text-muted" style={{ lineHeight: 1.8, fontSize: '1.2rem' }}>
              Explore the dedicated sourcing trips, textile expeditions, and community milestones behind every Sui Dhaga order. Our team travels thousands of miles to weave true luxury, empowerment, and authenticity into every single stitch.
            </p>
          </FadeIn>
        </div>

        {/* Detailed Diary Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15vh' }}>
          {travelLogs.map((log, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div 
                key={log.id} 
                style={{ 
                  display: 'flex', 
                  flexDirection: isReversed ? 'row-reverse' : 'row', 
                  flexWrap: 'wrap',
                  gap: '5vw',
                  alignItems: 'center' 
                }}
              >
                {/* Photo Card */}
                <div style={{ flex: '1 1 400px', position: 'relative', height: '60vh', minHeight: '400px', overflow: 'hidden', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <img 
                    src={log.image} 
                    alt={log.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,3,3,0.8) 0%, transparent 40%)' }}></div>
                  <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                      {log.location}
                    </span>
                    <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
                      {log.date}
                    </span>
                  </div>
                </div>

                {/* Narrative Details */}
                <div style={{ flex: '1 1 400px', padding: '2rem 0' }}>
                  <FadeIn delay={0.1}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>
                      {log.tag}
                    </span>
                  </FadeIn>
                  
                  <h2 className="display-2" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', color: '#fff' }}>
                    {log.title}
                  </h2>
                  
                  <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)', marginBottom: '2rem' }}></div>
                  
                  <FadeIn delay={0.2}>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem', fontWeight: 300 }}>
                      {log.desc}
                    </p>
                  </FadeIn>
                  
                  <FadeIn delay={0.3}>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300, borderLeft: '2px solid rgba(212,175,55,0.3)', paddingLeft: '1.5rem' }}>
                      {log.extendedDesc}
                    </p>
                  </FadeIn>
                </div>
              </div>
            );
          })}
        </div>

        {/* Narrative Quote Section */}
        <section style={{ margin: '15vh auto 5vh', maxWidth: '800px', textAlign: 'center', padding: '6rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
          <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'rgba(212, 175, 55, 0.1)', lineHeight: 0.1, position: 'absolute', top: '3rem', left: '50%', transform: 'translateX(-50%)' }}>
            “
          </div>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.8rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 300 }}>
            Every silk strand sourced, every artisan supported, and every custom seam aligned is a conscious step toward a borderless, ethical luxury future.
          </p>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase' }}>
            THE SUI DHAGA PHILOSOPHY
          </p>
        </section>

      </main>
    </div>
  );
}
