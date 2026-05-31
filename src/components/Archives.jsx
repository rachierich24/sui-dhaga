import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMobile, FadeIn } from './MotionHelpers';
import TextReveal from './TextReveal';

const archiveData = [
  {
    src: '/WhatsApp Image 2026-06-01 at 1.26.01 AM.jpeg',
    description: 'A Proud Milestone. Recognition at the highest levels fuels our passion. It is a testament to our unwavering commitment to inclusion and empowering true craftsmanship.'
  },
  {
    src: '/WhatsApp Image 2026-06-01 at 1.26.02 AM (3).jpeg',
    description: 'Celebrating Heritage. Wherever we go, we carry the vibrant colors and profound traditions of our roots, proudly representing Indian culture on the global stage.'
  },
  {
    src: '/WhatsApp Image 2026-06-01 at 1.26.03 AM (1).jpeg',
    description: 'Built on Inclusion. Our foundation is strengthened by purposeful partnerships. We believe that true luxury lies in empowering communities and creating sustainable opportunities for all.'
  },
  {
    src: '/WhatsApp Image 2026-06-01 at 1.26.03 AM (3).jpeg',
    description: 'The Path Less Traveled. Navigating the journey of building a global brand requires vision. Every step forward illuminates the way for future innovations in bespoke luxury.'
  },
  {
    src: '/WhatsApp Image 2026-06-01 at 1.26.04 AM (1).jpeg',
    description: 'A Vision Beyond Horizons. From our humble beginnings, looking towards vast opportunities as Sui Dhaga Global expands its international footprint.'
  },
  {
    src: '/WhatsApp Image 2026-06-01 at 1.26.04 AM (2).jpeg',
    description: 'Scaling New Heights. Just like conquering formidable peaks, building Sui Dhaga Global has been a journey of resilience, determination, and unwavering focus.'
  },
  {
    src: '/WhatsApp Image 2026-06-01 at 1.26.05 AM (2).jpeg',
    description: 'Brewing Connections. Our core philosophy goes beyond business; it is about inclusive growth, celebrating everyday heroes, and creating real societal impact.'
  },
  {
    src: '/WhatsApp Image 2026-06-01 at 1.26.05 AM.jpeg',
    description: 'Embracing Global Cultures. Weaving the rich tapestry of Indian heritage into the vibrant and diverse markets of the world, creating a truly seamless fusion.'
  },
  {
    src: '/WhatsApp Image 2026-06-01 at 1.26.06 AM (3).jpeg',
    description: 'Honoring Our Roots. The foundation of Sui Dhaga Global rests securely on the timeless values, traditions, and wisdom passed down through generations.'
  },
  {
    src: '/WhatsApp Image 2026-06-01 at 1.26.07 AM (1).jpeg',
    description: 'Taking Flight on the Global Stage. Bridging borders and bringing the finest Indian craftsmanship to every corner of the world, one journey at a time.'
  },
  {
    src: '/WhatsApp Image 2026-06-01 at 1.26.07 AM (2).jpeg',
    description: 'Making Headlines with Impact. Our commitment to sustainable and inclusive practices continues to resonate globally, proving that purpose drives progress.'
  },
  {
    src: '/WhatsApp Image 2026-06-01 at 1.26.07 AM (3).jpeg',
    description: 'Welcoming the World. As we open new doors globally, our journey continues—inviting you to experience the unparalleled artistry of Sui Dhaga Global.'
  }
];

const Archives = () => {
  const isMobile = useMobile();

  return (
    <div style={{ backgroundColor: '#030303', minHeight: '100vh', color: '#fff', paddingTop: '15vh' }} id="archives">
      
      {/* Hero Header */}
      <section style={{ padding: isMobile ? '0 1.5rem 10vh' : '0 10vw 15vh', textAlign: 'center' }}>
        <FadeIn delay={0.2} y={30}>
          <p style={{ 
            fontSize: '0.75rem', 
            letterSpacing: '0.3em', 
            textTransform: 'uppercase', 
            color: 'var(--gold)', 
            marginBottom: '2rem' 
          }}>
            Building A Legacy
          </p>
          <h1 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: isMobile ? '3rem' : 'clamp(4rem, 8vw, 8rem)', 
            fontWeight: 300, 
            lineHeight: 1, 
            marginBottom: '2rem',
            letterSpacing: '-0.02em'
          }}>
            The Archives
          </h1>
          <p style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: isMobile ? '1rem' : '1.2rem', 
            lineHeight: 1.8, 
            color: 'rgba(255,255,255,0.6)', 
            maxWidth: '600px', 
            margin: '0 auto',
            fontWeight: 300
          }}>
            A visual documentation of our journey. From the first stitch in Punjab to shaping the wardrobes of global visionaries. Witness the growth, the craft, and the building of Sui Dhaga Global.
          </p>
        </FadeIn>
      </section>

      {/* Minimal Staggered Gallery */}
      <section style={{ padding: isMobile ? '0 1.5rem 15vh' : '0 5vw 20vh' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', 
          gap: isMobile ? '4rem' : '0',
          alignItems: 'start'
        }}>
          {archiveData.map((item, index) => (
            <GalleryItem 
              key={index} 
              data={item} 
              index={index} 
              isMobile={isMobile} 
            />
          ))}
        </div>
      </section>

    </div>
  );
};

const GalleryItem = ({ data, index, isMobile }) => {
  const itemRef = useRef(null);
  
  // Create a subtle parallax effect based on scroll position
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Determine grid positioning for desktop to create an asymmetrical, artistic layout
  let gridColumn = 'span 12';
  let marginTop = '0';
  let padding = '0';
  
  if (!isMobile) {
    // Alternate sides and widths
    if (index % 3 === 0) {
      // Large left
      gridColumn = '1 / 8';
      marginTop = index === 0 ? '0' : '-10vw';
      padding = '0 4vw 10vw 0';
    } else if (index % 3 === 1) {
      // Medium right, pushed down
      gridColumn = '7 / 13';
      marginTop = '10vw';
      padding = '0 0 10vw 4vw';
    } else {
      // Center tall
      gridColumn = '4 / 10';
      marginTop = '5vw';
      padding = '0 0 15vw 0';
    }
  }

  return (
    <div 
      ref={itemRef}
      style={{ 
        gridColumn: isMobile ? 'span 1' : gridColumn,
        marginTop: isMobile ? '0' : marginTop,
        padding: isMobile ? '0' : padding,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <FadeIn y={40} delay={0.1} style={{ width: '100%' }}>
        <div style={{ overflow: 'hidden', position: 'relative', width: '100%', aspectRatio: isMobile ? '4/5' : '3/4', backgroundColor: '#111' }}>
          <motion.img 
            src={data.src} 
            alt={`Archive image ${index + 1}`}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              objectPosition: 'center 15%',
              scale: imageScale,
              filter: 'grayscale(20%) contrast(1.1) brightness(0.9)',
              y: isMobile ? 0 : yParallax
            }}
          />
        </div>
      </FadeIn>

      <div style={{ 
        marginTop: '1.5rem', 
        display: 'flex', 
        justifyContent: 'center',
        width: '100%'
      }}>
        <FadeIn y={20} delay={0.2} style={{ width: '100%', maxWidth: isMobile ? '100%' : '80%' }}>
          <p style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            lineHeight: 1.8, 
            color: 'rgba(255,255,255,0.85)', 
            fontWeight: 300,
            textAlign: 'left'
          }}>
            {data.description}
          </p>
        </FadeIn>
      </div>
    </div>
  );
};

export default Archives;


