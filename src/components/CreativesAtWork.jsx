import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { FadeIn } from './MotionHelpers';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

// Ultra-lightweight Three.js Background Particle effect
const DustParticles = () => {
  const particlesRef = useRef();
  const particleCount = 100;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 40; 
    }
    return pos;
  }, []);

  useFrame((state) => {
    if(!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particleCount} 
          array={positions} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        color="#D4AF37" 
        transparent 
        opacity={0.3} 
        sizeAttenuation 
      />
    </points>
  );
};

const CreativesAtWork = () => {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);

  // Array of the enhanced images we just created
  const creativeImages = [
    '/creative_2.jpeg',
    '/creative_3.jpeg',
    '/creative_4.jpeg',
    '/creative_5.jpeg',
    '/creative_6.jpeg',
    '/creative_7.jpeg'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for gallery items
      const items = gsap.utils.toArray('.creative-item');
      
      items.forEach((item, i) => {
        gsap.fromTo(item, 
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
      
      // Slight parallax on images
      const images = gsap.utils.toArray('.creative-img');
      images.forEach(img => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="creatives-section" style={{ position: 'relative', backgroundColor: '#050505', padding: 'var(--section-padding-y) 0', overflow: 'hidden' }}>
      
      {/* 3D Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 1]}>
          <DustParticles />
        </Canvas>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'var(--gap-responsive)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)' }}></div>
              <p className="micro-typography" style={{ color: 'var(--gold)', letterSpacing: '0.2em', margin: 0 }}>BEHIND THE SCENES</p>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)' }}></div>
            </div>
            <TextReveal className="display-2" style={{ marginBottom: '1rem' }}>
              Creatives at Work
            </TextReveal>
            <p className="lead text-muted" style={{ margin: '0 auto', maxWidth: '600px' }}>
              A glimpse into the daily rhythm of our studio, where raw materials are transformed into bespoke armor.
            </p>
          </div>
        </FadeIn>

        {/* Masonry-style Grid */}
        <div ref={galleryRef} style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          padding: '0 var(--section-padding-x)'
        }}>
          {creativeImages.map((src, idx) => (
            <div 
              key={idx} 
              className="creative-item" 
              style={{ 
                height: idx % 2 === 0 ? '500px' : '400px', 
                marginTop: idx % 2 !== 0 && window.innerWidth > 768 ? '50px' : '0',
                overflow: 'hidden',
                borderRadius: '8px',
                position: 'relative'
              }}
            >
              <img 
                src={src} 
                alt={`Creative Process ${idx + 1}`} 
                className="creative-img"
                style={{
                  width: '100%',
                  height: '130%', // Extra height for parallax
                  objectFit: 'cover',
                  position: 'absolute',
                  top: '-15%',
                  left: 0
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativesAtWork;
