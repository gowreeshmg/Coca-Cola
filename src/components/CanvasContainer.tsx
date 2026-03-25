'use client'
import { Canvas } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import { Can } from './Can'

export function CanvasContainer() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
        eventSource={typeof window !== 'undefined' ? document.body : undefined}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={3} castShadow />
        {/* Neutral rim lights for clear glass/liquid reflections without coloring the liquid */}
        <pointLight position={[-4, 2, 3]} intensity={6} color="#ffe5cc" />
        <pointLight position={[4, -1, 2]} intensity={5} color="#ffffff" />
        <pointLight position={[0, 4, -3]} intensity={4} color="#ccddff" />
        <Environment preset="city" />
        
        <Suspense fallback={null}>
          <Can />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
