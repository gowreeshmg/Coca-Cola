'use client'
import { Canvas } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import { Suspense } from 'react'
import { Can } from './Can'

export function CanvasContainer() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        // Set event listener on the window to allow useFrame pointer physics to grab cursor from the background
        eventSource={typeof window !== 'undefined' ? document.body : undefined}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Environment preset="studio" />
        
        <Suspense fallback={null}>
          <Can />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
