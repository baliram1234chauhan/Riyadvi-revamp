"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function DistortedGoldSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.25}>
      <MeshDistortMaterial
        color="#f59e0b"
        emissive="#b45309"
        emissiveIntensity={0.5}
        attach="material"
        distort={0.35}
        speed={1.8}
        roughness={0.15}
        metalness={0.85}
      />
    </Sphere>
  );
}

function FuturisticRing() {
  const ringRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    ringRef.current.rotation.z += delta * 0.3;
    ringRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
  });

  return (
    <group ref={ringRef}>
      {/* Outer Wireframe Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.6} />
      </mesh>
      
      {/* Secondary Accent Ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.1, 0.008, 16, 100]} />
        <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function HeroGlobe() {
  return (
    <div className="w-full h-[260px] md:h-[300px] relative flex justify-center items-center">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        {/* Abstract Studio Lighting preset (City reflections replaced) */}
        <Environment preset="studio" />
        
        <ambientLight intensity={1.2} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color="#fbbf24" />
        <directionalLight position={[-5, 5, 5]} intensity={1.5} color="#ffffff" />

        {/* Floating Particles/Sparkles Effect */}
        <Sparkles count={40} scale={4} size={2.5} speed={0.4} color="#fbbf24" />

        {/* 3D Elements */}
        <DistortedGoldSphere />
        <FuturisticRing />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}