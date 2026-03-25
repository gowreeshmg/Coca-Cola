'use client'
import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SplashingBubbles() {
  const count = 300
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
       temp.push({
         position: new THREE.Vector3((Math.random() - 0.5) * 0.5, 2, (Math.random() - 0.5) * 0.5),
         velocity: new THREE.Vector3((Math.random() - 0.5) * 4, Math.random() * 6 + 2, Math.random() * 2 + 1),
         life: Math.random() * 2,
         maxLife: Math.random() * 1.5 + 0.5,
         scale: Math.random() * 0.08 + 0.02
       })
    }
    return temp
  }, [])

  const activity = useRef(0)

  useEffect(() => {
    const handlePour = (e: any) => {
      activity.current = e.detail.progress > 0.4 ? e.detail.progress : 0
    }
    window.addEventListener('scroll-pour', handlePour)
    return () => window.removeEventListener('scroll-pour', handlePour)
  }, [])

  useFrame((_, delta) => {
    if (!mesh.current || activity.current === 0) {
      if (mesh.current) mesh.current.visible = false;
      return
    }
    mesh.current.visible = true

    particles.forEach((particle, i) => {
      particle.life += delta
      if (particle.life >= particle.maxLife) {
        particle.life = 0
        particle.position.set((Math.random() - 0.5) * 0.5, 1.8, (Math.random() - 0.5) * 0.5)
        particle.velocity.set((Math.random() - 0.5) * 4, Math.random() * 6 + 2, Math.random() * 4 + 2)
      }

      particle.velocity.y -= 9.8 * delta // Gravity
      particle.position.addScaledVector(particle.velocity, delta)

      dummy.position.copy(particle.position)
      dummy.scale.setScalar(particle.scale * activity.current) // Scale by pour intensity
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} visible={false}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhysicalMaterial 
        color="#c88b3a" // Golden/brown Cola color
        metalness={0.1}
        roughness={0.05}
        transparent
        opacity={0.9}
        transmission={0.95} 
        ior={1.4}
      />
    </instancedMesh>
  )
}
