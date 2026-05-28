import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from './MotionHelpers';

const SizeGuide = ({ isOpen, setSizeOpen }) => {
  const [activeTab, setActiveTab] = useState('kameez');
  const [activeId, setActiveId] = useState(null);
  const [sizes, setSizes] = useState({});
  const [clientName, setClientName] = useState('');
  const [orderRef, setOrderRef] = useState('');
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
    const today = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

    let message = `✂️ *SUI DHAGA — Bespoke Order Request*\n`;
    if (clientName) message += `👤 Client: *${clientName}*\n`;
    if (orderRef) message += `🔢 Ref: *${orderRef}*\n`;
    message += `📅 Date: ${today}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `Hello Sui Dhaga Team,\n\nI would like to place a bespoke order. Please find my measurements below:\n\n`;

    message += `👗 *KAMEEZ MEASUREMENTS:*\n`;
    measurements.kameez.forEach(item => {
      const val = sizes[item.num] ? `${sizes[item.num]} inches` : '—';
      message += `  • ${item.title}: *${val}*\n`;
    });

    message += `\n👖 *SALWAR MEASUREMENTS:*\n`;
    measurements.salwar.forEach(item => {
      const val = sizes[item.num] ? `${sizes[item.num]} inches` : '—';
      message += `  • ${item.title}: *${val}*\n`;
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    message += `I look forward to hearing from you regarding fabric options, timeline, and pricing.\n\nWarm regards 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/61470270478?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const handlePrintLabel = () => {
    window.print();
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
            
            @media print {
              html, body, #root {
                background-color: #ffffff !important;
                color: #000000 !important;
                width: 100% !important;
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: visible !important;
              }
              
              /* Hide everything */
              body > *, #root > *, .main-wrapper, div[style*="position: fixed"] {
                display: none !important;
                visibility: hidden !important;
              }

              /* Show only the printable suit label */
              #printable-suit-label {
                display: flex !important;
                visibility: visible !important;
                position: fixed !important;
                left: 0 !important;
                top: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                background-color: #ffffff !important;
                z-index: 9999999 !important;
                margin: 0 !important;
                padding: 0 !important;
                align-items: center !important;
                justify-content: center !important;
              }
            }
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

                <div style={{ marginBottom: isMobile ? '2rem' : '4vh' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, marginBottom: '1rem', lineHeight: 1.1 }}>
                    Craft My Suit
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '400px', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300 }}>
                    Select a measurement below to view the guide, and carefully enter your size.
                  </p>
                </div>

                {/* Order Information Inputs */}
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: '1.5rem',
                  marginBottom: '4vh',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                      Client Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.95rem',
                        padding: '0.4rem 0',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={(e) => e.target.style.borderBottomColor = 'var(--gold)'}
                      onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                      Order Reference
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SD-8942"
                      value={orderRef}
                      onChange={(e) => setOrderRef(e.target.value)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.95rem',
                        padding: '0.4rem 0',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={(e) => e.target.style.borderBottomColor = 'var(--gold)'}
                      onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
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
                      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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
                        <button
                          onClick={handlePrintLabel}
                          style={{
                            background: 'transparent',
                            color: '#fff',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '1rem 3rem',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.8rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            borderRadius: '2px',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.borderColor = 'var(--gold)';
                            e.target.style.color = 'var(--gold)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                            e.target.style.color = '#fff';
                          }}
                        >
                          Print Suit Label
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Print-Only Suit Label Template */}
          <div id="printable-suit-label" style={{ display: 'none' }}>
            <div style={{
              width: '4.5in',
              height: '7in',
              border: '4px double #000',
              padding: '2rem',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              fontFamily: 'Georgia, serif',
              textAlign: 'center',
              backgroundColor: '#fff',
              color: '#000',
              margin: 'auto'
            }}>
              <div>
                <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', letterSpacing: '0.15em', fontWeight: 'bold', margin: '0 0 0.2rem 0', textTransform: 'uppercase' }}>
                  SUI DHAGA
                </h1>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 1.5rem 0', borderBottom: '1px solid #000', paddingBottom: '0.8rem' }}>
                  Bespoke Luxury Atelier
                </p>
                
                <table style={{ width: '100%', fontSize: '0.75rem', textAlign: 'left', marginBottom: '1.5rem', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 'bold', padding: '0.2rem 0', width: '35%', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.1em' }}>Client Name:</td>
                      <td style={{ borderBottom: '1px solid #000', padding: '0.2rem 0' }}>{clientName || '__________________'}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold', padding: '0.2rem 0', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.1em' }}>Date:</td>
                      <td style={{ borderBottom: '1px solid #000', padding: '0.2rem 0' }}>{new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold', padding: '0.2rem 0', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.1em' }}>Order Ref:</td>
                      <td style={{ borderBottom: '1px solid #000', padding: '0.2rem 0' }}>{orderRef || '__________________'}</td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  <h5 style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.5rem 0', borderBottom: '1px solid #ccc', paddingBottom: '0.2rem', fontWeight: 'bold' }}>
                    Kameez Details
                  </h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem 1rem', fontSize: '0.75rem' }}>
                    {measurements.kameez.map(item => (
                      <div key={item.num} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #ccc' }}>
                        <span>{item.title}:</span>
                        <span style={{ fontWeight: 'bold' }}>{sizes[item.num] ? `${sizes[item.num]}"` : '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                  <h5 style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.5rem 0', borderBottom: '1px solid #ccc', paddingBottom: '0.2rem', fontWeight: 'bold' }}>
                    Salwar Details
                  </h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem 1rem', fontSize: '0.75rem' }}>
                    {measurements.salwar.map(item => (
                      <div key={item.num} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #ccc' }}>
                        <span>{item.title}:</span>
                        <span style={{ fontWeight: 'bold' }}>{sizes[item.num] ? `${sizes[item.num]}"` : '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p style={{ fontStyle: 'italic', fontSize: '0.7rem', color: '#555', margin: '0 0 1rem 0' }}>
                  "Every stitch is an opportunity"
                </p>
                <div style={{ borderTop: '1px solid #000', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>MD Signature</span>
                  <span style={{ fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 'bold' }}>HAND-CRAFTED</span>
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
