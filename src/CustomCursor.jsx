import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // High-performance Motion Values (bypasses React state/re-renders)
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Buttery smooth physics springs for the needle
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  const NUM_POINTS = 80;
  const points = useRef(Array.from({ length: NUM_POINTS }, () => ({ x: -1000, y: -1000 })));

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Prevent snapping from top-left on initial entrance
      if (mouseX.get() === -1000) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientX);
        smoothX.jump(e.clientX);
        smoothY.jump(e.clientY);
        
        // Initialize all thread points instantly to prevent spaghetti snapping
        const eyeX = e.clientX + 17;
        const eyeY = e.clientY - 17;
        for (let i = 0; i < NUM_POINTS; i++) {
          points.current[i] = { x: eyeX, y: eyeY + (i * 0.5) };
        }
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      try {
        const isInteractive = 
          target.tagName.toLowerCase() === 'a' ||
          target.tagName.toLowerCase() === 'button' ||
          target.tagName.toLowerCase() === 'input' ||
          target.tagName.toLowerCase() === 'select' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[role="button"]') ||
          window.getComputedStyle(target).cursor === 'pointer';
          
        setIsHovering(isInteractive);
      } catch (err) {
        // Fallback for isolated SVG or shadow DOM elements
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    let animationFrameId;

    const render = () => {
      const currentX = smoothX.get();
      const currentY = smoothY.get();

      if (currentX !== -1000) {
        // Tie the thread's origin exactly to the Spring-animated needle eye!
        const eyeX = currentX + 17;
        const eyeY = currentY - 17;

        points.current[0] = { x: eyeX, y: eyeY };

        // Process thread physics
        for (let i = 1; i < NUM_POINTS; i++) {
          const prev = points.current[i - 1];
          const curr = points.current[i];
          
          const dx = prev.x - curr.x;
          const dy = prev.y - curr.y;
          
          curr.x += dx * 0.55;
          curr.y += dy * 0.55 + 0.5; 
        }

        // Draw perfect Bezier curve
        if (pathRef.current) {
          let pathString = `M ${points.current[0].x} ${points.current[0].y}`;
          
          for (let i = 1; i < NUM_POINTS - 1; i++) {
            const xc = (points.current[i].x + points.current[i + 1].x) / 2;
            const yc = (points.current[i].y + points.current[i + 1].y) / 2;
            pathString += ` Q ${points.current[i].x} ${points.current[i].y}, ${xc} ${yc}`;
          }
          
          const last = points.current[NUM_POINTS - 1];
          pathString += ` T ${last.x} ${last.y}`;
          
          pathRef.current.setAttribute('d', pathString);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, smoothX, smoothY]);

  return (
    <>
      <svg
        ref={svgRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 99998,
        }}
      >
        <defs>
          <filter id="goldenGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path
          ref={pathRef}
          fill="none"
          stroke="#D4AF37" 
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'url(#goldenGlow)', opacity: 0.85 }}
        />
      </svg>

      <motion.div
        style={{
          position: 'fixed',
          top: -21, 
          left: -3, 
          pointerEvents: 'none',
          zIndex: 99999,
          width: '24px',
          height: '24px',
          transformOrigin: '3px 21px',
          filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.4))',
          // Map to Spring values directly (Bypasses React Re-renders!)
          x: smoothX,
          y: smoothY
        }}
        animate={{
          rotate: isHovering ? -25 : 0,
          scale: isHovering ? 1.15 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="needleGradient" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5F5F5" />
              <stop offset="0.5" stopColor="#B0B0B0" />
              <stop offset="1" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          <path d="M3 21L21 3" stroke="url(#needleGradient)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3 21L21 3" stroke="#FFFFFF" strokeWidth="0.5" strokeLinecap="round" opacity="0.6"/>
          <ellipse cx="20" cy="4" rx="1.5" ry="3" transform="rotate(45 20 4)" stroke="#E0E0E0" strokeWidth="1" fill="rgba(0,0,0,0.2)"/>
        </svg>
      </motion.div>
    </>
  );
}
