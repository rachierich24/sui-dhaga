import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from './MotionHelpers';

const SizeGuide = ({ isOpen, setSizeOpen }) => {
  const [activeTab, setActiveTab] = useState('kameez');
  const [activeId, setActiveId] = useState(null);
  const [sizes, setSizes] = useState({});
  const isMobile = useMobile();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSizeChange = (id, value) => {
    setSizes(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmitToWhatsApp = () => {
    let message = "Hello SUI DHAGA,\n\nI would like to submit my bespoke suit measurements:\n\n";

    message += "*KAMEEZ MEASUREMENTS:*\n";
    measurements.kameez.forEach(item => {
      const val = sizes[item.num] ? `${sizes[item.num]} inches` : 'Not provided';
      message += `- ${item.title}: ${val}\n`;
    });

    message += "\n*SALWAR MEASUREMENTS:*\n";
    measurements.salwar.forEach(item => {
      const val = sizes[item.num] ? `${sizes[item.num]} inches` : 'Not provided';
      message += `- ${item.title}: ${val}\n`;
    });

    message += "\nThank you!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/910000000000?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      y: '100%',
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      opacity: 1,
      y: '0%',
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const measurements = {
    kameez: [
      { num: '01', title: 'Shoulder', desc: 'Measure horizontally across the back from tip to tip.', svgPath: 'M 80, 150 Q 200, 130 320, 150' },
      { num: '02', title: 'Chest', desc: 'Measure around the fullest part, keeping the tape level.', svgPath: 'M 115, 230 Q 200, 260 285, 230' },
      { num: '03', title: 'Waist', desc: 'Measure around the natural waistline, the narrowest part.', svgPath: 'M 130, 320 Q 200, 350 270, 320' },
      { num: '04', title: 'Hips', desc: 'Measure around the fullest part of your hips.', svgPath: 'M 110, 450 Q 200, 480 290, 450' },
      { num: '05', title: 'Sleeve', desc: 'From the top of the shoulder to the desired sleeve end.', svgPath: 'M 80, 150 Q 50, 250 60, 400' },
      { num: '06', title: 'Armhole', desc: 'Measure around the shoulder joint, under the armpit.', svgPath: 'M 80, 150 C 120, 180 120, 220 115, 230' },
      { num: '07', title: 'Kameez Length', desc: 'From the top of the shoulder down to the desired hem.', svgPath: 'M 150, 130 L 150, 720' },
    ],
    salwar: [
      { num: '08', title: 'Waist', desc: 'Measure where you normally wear the salwar/trouser.', svgPath: 'M 130 200 Q 200 220 270 200' },
      { num: '09', title: 'Salwar Length', desc: 'From the waist down to the desired ankle length.', svgPath: 'M 270 200 L 320 700' },
      { num: '10', title: 'Bottom', desc: 'Measure the circumference around the ankle or desired opening.', svgPath: 'M 260 700 Q 290 720 320 700' },
    ]
  };

  const baseSvgPaths = {
    kameez: "M 150, 100 C 100, 100 80, 130 60, 200 C 50, 300 60, 400 60, 400 C 80, 400 90, 380 90, 350 C 100, 280 110, 250 115, 230 C 110, 300 130, 400 110, 500 C 90, 600 70, 700 60, 750 L 340, 750 C 330, 700 310, 600 290, 500 C 270, 400 290, 300 285, 230 C 290, 250 300, 280 310, 350 C 310, 380 320, 400 340, 400 C 340, 400 350, 300 340, 200 C 320, 130 300, 100 250, 100 C 200, 120 150, 100 150, 100 Z",
    salwar: "M 130 200 Q 200 220 270 200 L 320 700 L 260 700 Q 250 400 200 350 Q 150 400 140 700 L 80 700 Z"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={overlayVariants}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#050505',
            zIndex: 10001,
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <style>{`
            .size-guide-scroll::-webkit-scrollbar { width: 4px; }
            .size-guide-scroll::-webkit-scrollbar-track { background: transparent; }
            .size-guide-scroll::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.4); border-radius: 4px; }
          `}</style>

          {/* Close Button Overlay */}
          <div style={{ position: 'fixed', top: isMobile ? '1rem' : '2rem', right: 'var(--section-padding-x)', zIndex: 10002 }}>
            <button
              onClick={() => setSizeOpen(false)}
              style={{
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8rem 1.2rem',
                borderRadius: '30px'
              }}
            >
              CLOSE
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div
            data-lenis-prevent="true"
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              flex: 1,
              overflowY: 'hidden',
              outline: 'none'
            }}
          >

            {/* Left/Top Side: SVG Animation */}
            <div style={{
              flex: isMobile ? 'none' : 1,
              height: isMobile ? '45vh' : 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.05)',
              position: 'relative',
              backgroundColor: '#020202',
              zIndex: 10,
              overflow: 'hidden'
            }}>

              {/* Radial gradient glow behind silhouette */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                height: '80%',
                background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }}></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{ width: '100%', height: '85%', maxWidth: '400px', position: 'relative', zIndex: 1 }}
                >
                  <svg viewBox="0 0 400 800" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))', transform: isMobile ? 'scale(1.35)' : 'none', transformOrigin: 'center center', transition: 'transform 0.4s ease' }}>

                    {/* Base Silhouette */}
                    <path
                      d={baseSvgPaths[activeTab]}
                      fill="rgba(255, 255, 255, 0.01)"
                      stroke="rgba(212, 175, 55, 0.3)"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />

                    {/* Animated Golden Threads */}
                    {measurements[activeTab].map((item) => {
                      const isHovered = activeId === item.num;
                      return (
                        <motion.g key={item.num}>
                          {/* Faint guide line (always visible) */}
                          <path
                            d={item.svgPath}
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray="4 4"
                          />

                          {/* Animated Golden Thread */}
                          <motion.path
                            d={item.svgPath}
                            stroke="#D4AF37"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                              pathLength: isHovered ? 1 : 0,
                              opacity: isHovered ? 1 : 0
                            }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            style={{ filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))' }}
                          />
                        </motion.g>
                      )
                    })}
                  </svg>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right/Bottom Side: The List & Inputs */}
            <div
              className="size-guide-scroll"
              data-lenis-prevent="true"
              tabIndex={0}
              style={{
                flex: 1,
                minHeight: 0,
                position: 'relative',
                zIndex: 20,
                overflowY: 'auto',
                outline: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <div style={{
                padding: isMobile ? '3rem 1.5rem 10vh' : '10vh 5vw',
                borderTopLeftRadius: isMobile ? '30px' : '0',
                borderTopRightRadius: isMobile ? '30px' : '0',
                boxShadow: isMobile ? '0 -20px 50px rgba(0,0,0,1)' : 'none',
                backgroundColor: isMobile ? '#050505' : 'transparent',
                marginTop: isMobile ? '-5vh' : '0',
                position: 'relative',
                zIndex: 25
              }}>

                <div style={{ marginBottom: isMobile ? '2rem' : '6vh' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, marginBottom: '1rem', lineHeight: 1.1 }}>
                    Craft My Suit
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '400px', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300 }}>
                    Select a measurement below to view the guide, and carefully enter your size.
                  </p>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '3rem', marginBottom: '4vh', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {['kameez', 'salwar'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => { setActiveTab(tab); setActiveId(null); }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: activeTab === tab ? '#D4AF37' : 'rgba(255,255,255,0.4)',
                        padding: '1rem 0',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          style={{
                            position: 'absolute',
                            bottom: '-1px',
                            left: 0,
                            right: 0,
                            height: '1px',
                            backgroundColor: '#D4AF37'
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Measurement List & Form */}
                <div style={{ width: '100%', paddingBottom: '15vh' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                      {measurements[activeTab].map((item) => {
                        const isActive = activeId === item.num;
                        return (
                          <div
                            key={item.num}
                            onClick={() => setActiveId(isActive ? null : item.num)}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: isMobile ? '1.5rem' : '2rem',
                              padding: '1.5rem',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.4s ease',
                              backgroundColor: isActive ? 'rgba(255,255,255,0.03)' : 'transparent',
                              borderLeft: isActive ? '2px solid #D4AF37' : '2px solid transparent',
                              boxShadow: isActive ? '0 10px 30px rgba(0,0,0,0.2)' : 'none'
                            }}
                          >
                            <div style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: '1.5rem',
                              color: isActive ? '#D4AF37' : 'rgba(212, 175, 55, 0.4)',
                              fontWeight: 300,
                              transition: 'color 0.4s ease',
                              marginTop: '0.2rem'
                            }}>
                              {item.num}
                            </div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '1.2rem',
                                fontWeight: 400,
                                marginBottom: '0.2rem',
                                letterSpacing: '0.05em',
                                color: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
                                transition: 'color 0.4s ease'
                              }}>
                                {item.title}
                              </h4>
                              <motion.p
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                  height: isActive ? 'auto' : 0,
                                  opacity: isActive ? 1 : 0,
                                  marginTop: isActive ? '0.5rem' : 0,
                                  marginBottom: isActive ? '1rem' : 0
                                }}
                                style={{
                                  color: 'rgba(255,255,255,0.5)',
                                  fontSize: '0.85rem',
                                  lineHeight: 1.6,
                                  fontWeight: 300,
                                  overflow: 'hidden'
                                }}
                              >
                                {item.desc}
                              </motion.p>

                              {/* Input Field */}
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                  height: isActive ? 'auto' : 0,
                                  opacity: isActive ? 1 : 0
                                }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                                  <input
                                    type="number"
                                    placeholder="0.0"
                                    value={sizes[item.num] || ''}
                                    onChange={(e) => handleSizeChange(item.num, e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                      background: 'transparent',
                                      border: 'none',
                                      borderBottom: '1px solid rgba(212, 175, 55, 0.5)',
                                      color: '#D4AF37',
                                      fontFamily: 'var(--font-sans)',
                                      fontSize: '1.2rem',
                                      width: '80px',
                                      padding: '0.5rem 0',
                                      outline: 'none',
                                      textAlign: 'center',
                                      transition: 'border-color 0.3s ease'
                                    }}
                                  />
                                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', fontFamily: 'var(--font-sans)', paddingBottom: '0.5rem' }}>
                                    inches
                                  </span>
                                </div>
                              </motion.div>

                            </div>
                          </div>
                        )
                      })}
                    </motion.div>
                  </AnimatePresence>

                  {/* Submit Button */}
                  <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
                    {activeTab === 'kameez' ? (
                      <button
                        onClick={() => { setActiveTab('salwar'); setActiveId(null); }}
                        style={{
                          background: 'transparent',
                          color: '#D4AF37',
                          border: '1px solid rgba(212, 175, 55, 0.5)',
                          padding: '1rem 3rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.8rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          borderRadius: '2px',
                          transition: 'background 0.3s ease'
                        }}
                      >
                        Next: Salwar Measurements →
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitToWhatsApp}
                        style={{
                          background: '#D4AF37',
                          color: '#000',
                          border: 'none',
                          padding: '1rem 3rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.8rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          borderRadius: '2px',
                          fontWeight: 600,
                          boxShadow: '0 10px 30px rgba(212, 175, 55, 0.2)'
                        }}
                      >
                        Submit to WhatsApp
                      </button>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SizeGuide;
