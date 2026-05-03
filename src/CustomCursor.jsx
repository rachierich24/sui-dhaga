import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  
  const NUM_POINTS = 60;
  const points = useRef(Array.from({ length: NUM_POINTS }, () => ({ x: -1000, y: -1000 })));
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;

    const render = () => {
      // Offset to match the needle's eye in the new SVG cursor
      const targetX = mouse.current.x + 22;
      const targetY = mouse.current.y + 22;

      // Update head point instantly to mouse
      points.current[0] = { x: targetX, y: targetY };

      // Physics loop for the thread
      for (let i = 1; i < NUM_POINTS; i++) {
        const prev = points.current[i - 1];
        const curr = points.current[i];
        
        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        
        // Spring follow + subtle gravity to make it hang gracefully
        curr.x += dx * 0.4;
        curr.y += dy * 0.4 + 0.8; 
      }

      // Draw path
      if (pathRef.current && points.current[0].x !== -1000) {
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

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    >
      <path
        ref={pathRef}
        fill="none"
        stroke="#d4af37" 
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 3px rgba(212,175,55,0.4))' }}
      />
    </svg>
  );
}
