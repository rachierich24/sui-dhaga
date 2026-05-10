import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ThreadLine = ({ offsetSpeed = 1, thickness = 0.08 }) => {
  const meshRef = useRef();
  
  // Create a complex, static 3D wavy curve ONCE.
  // We will simply rotate this static shape to create the illusion of flowing silk.
  const curve = useMemo(() => {
    const p = [];
    for (let i = 0; i <= 80; i++) {
      const x = (i - 40) * 0.4; // Spread across X axis
      const y = Math.sin(i * 0.15) * 2.5 + Math.cos(i * 0.05) * 1.5;
      const z = Math.cos(i * 0.15) * 2.5 + Math.sin(i * 0.08) * 1.5;
      p.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(p);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * offsetSpeed;
    
    // Animate rotation and position instead of recreating geometry.
    // This is infinitely faster and guarantees buttery 60fps.
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
    meshRef.current.rotation.z = Math.cos(time * 0.15) * 0.05;
    
    meshRef.current.position.y = Math.sin(time * 0.3) * 0.8;
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 150, thickness, 8, false]} />
      <meshStandardMaterial 
        color="#D4AF37" 
        metalness={0.9} 
        roughness={0.2}
        emissive="#4a3b00"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
};

const AmbientDust = () => {
  const particlesRef = useRef();
  const particleCount = 150;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 35; 
    }
    return pos;
  }, []);

  useFrame((state) => {
    if(!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
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
        size={0.06} 
        color="#F5D061" 
        transparent 
        opacity={0.4} 
        sizeAttenuation 
      />
    </points>
  );
};

const ThreeThread = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }}>
      <Canvas camera={{ position: [0, 0, 16], fov: 35 }} dpr={[1, 1.5]}>
        
        {/* Luxury Studio Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#D4AF37" />
        <pointLight position={[0, 0, 8]} intensity={3} color="#D4AF37" distance={20} />
        
        {/* Main Thick Thread */}
        <ThreadLine offsetSpeed={0.5} thickness={0.08} />
        
        {/* Intertwining Thinner Thread */}
        <group rotation={[0, 0, Math.PI / 4]} position={[0, -1, -2]}>
          <ThreadLine offsetSpeed={0.8} thickness={0.04} />
        </group>

        <AmbientDust />
      </Canvas>
    </div>
  );
};

export default ThreeThread;
