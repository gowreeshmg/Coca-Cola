'use client'
import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Center, Text, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { GLTFErrorBoundary } from './GLTFErrorBoundary'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Can() {
  const outerGroupRef = useRef<THREE.Group>(null)
  const innerHoverRef = useRef<THREE.Group>(null)
  const heroBgRef = useRef<THREE.Group>(null)
  const isPouring = useRef(false)
  const scrollProgress = useRef(0)

  useEffect(() => {
    if (!outerGroupRef.current || !heroBgRef.current) return
    const mainWrapper = document.getElementById('main-scroll')
    if (!mainWrapper) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainWrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress
          // Pouring is active during section 2 (approx 1/7 to 2/7)
          isPouring.current = self.progress > 0.1 && self.progress < 0.28
        }
      }
    })

    const sec = 1 / 7

    // Phase 1 (0 -> Sec 2): Pouring 
    // Moves right for the Bento constraints on left
    tl.to(outerGroupRef.current.rotation, { x: Math.PI / 2, z: Math.PI / 12, y: Math.PI / 6, duration: sec }, 0)
      .to(outerGroupRef.current.position, { x: 1.5, y: 0, duration: sec }, "<")
    
    // Animate Hero background away on first scroll
    tl.to(heroBgRef.current.position, { y: 15, duration: sec }, 0)
      .to(heroBgRef.current.scale, { x: 0, y: 0, z: 0, duration: sec * 0.5 }, 0)

    // Phase 2 (Sec 2 -> Sec 3): History 
    // Moving to left side upright (History text is on right)
    tl.to(outerGroupRef.current.rotation, { x: 0, z: -Math.PI / 12, y: -Math.PI / 6, duration: sec })
      .to(outerGroupRef.current.position, { x: -2, y: -0.5, duration: sec }, "<")

    // Phase 3 (Sec 3 -> Sec 4): Varieties
    // Floating center horizontal spinning
    tl.to(outerGroupRef.current.rotation, { x: 0, z: 0, y: Math.PI * 2, duration: sec })
      .to(outerGroupRef.current.position, { x: 0, y: 1.5, duration: sec }, "<")

    // Phase 4 (Sec 4 -> Sec 5): Brand
    // Floating right side (Brand text on left)
    tl.to(outerGroupRef.current.rotation, { x: Math.PI / 16, z: Math.PI / 16, y: -Math.PI / 8, duration: sec })
      .to(outerGroupRef.current.position, { x: 2, y: 0, duration: sec }, "<")

    // Phase 5 (Sec 5 -> Sec 6): Video Ad
    // Shoots way back to not obstruct video
    tl.to(outerGroupRef.current.rotation, { x: 0, y: 0, z: 0, duration: sec })
      .to(outerGroupRef.current.position, { x: 0, y: 0, z: -15, duration: sec }, "<")

    // Phase 6 & 7 (Sec 6 -> End): Stay hidden
    tl.to(outerGroupRef.current.position, { z: -15, duration: sec * 2 })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  // Magnetic Cursor Physics in UseFrame!
  useFrame((state, delta) => {
    if (!innerHoverRef.current) return
    
    // state.pointer holds the normalized device coordinates (-1 to 1)
    if (scrollProgress.current < 0.7) { 
      // The cursor physics: move the can slightly left/up based on mouse pos
      const targetX = (state.pointer.y * Math.PI) / 6 
      const targetY = (state.pointer.x * Math.PI) / 4 
      
      innerHoverRef.current.rotation.x = THREE.MathUtils.damp(innerHoverRef.current.rotation.x, -targetX, 4, delta)
      innerHoverRef.current.rotation.y = THREE.MathUtils.damp(innerHoverRef.current.rotation.y, targetY, 4, delta)
    } else {
      innerHoverRef.current.rotation.x = THREE.MathUtils.damp(innerHoverRef.current.rotation.x, 0, 4, delta)
      innerHoverRef.current.rotation.y = THREE.MathUtils.damp(innerHoverRef.current.rotation.y, 0, 4, delta)
    }
  })

  return (
    <>
      <group ref={heroBgRef}>
         <HeroBackground3D />
      </group>

      <group ref={outerGroupRef} dispose={null}>
        <group ref={innerHoverRef}>
          <GLTFErrorBoundary fallback={<CanFallback />}>
            <CanModel />
          </GLTFErrorBoundary>
        </group>
        <LiquidParticles isPouring={isPouring} />
      </group>
    </>
  )
}

function HeroBackground3D() {
  const cubes = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5 - 3],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.6 + 0.3
    }))
  }, [])

  return (
    <>
      {/* Massive 3D Background Text */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 0, -5]}
          fontSize={6}
          letterSpacing={-0.05}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
          material-transparent={true}
          material-opacity={0.8}
        >
          {`REAL\nMAGIC`}
        </Text>
      </Float>

      {/* Floating Ice Cubes */}
      {cubes.map((cube, i) => (
        <Float key={i} speed={1.5 + Math.random()} rotationIntensity={2} floatIntensity={2}>
          <mesh position={cube.position as [number,number,number]} rotation={cube.rotation as [number,number,number]} scale={cube.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial 
              roughness={0.1}
              transmission={1}
              thickness={1.5}
              ior={1.33}
              color="#e0f7fa"
            />
          </mesh>
        </Float>
      ))}

      {/* Bubbles everywhere */}
      <Sparkles count={150} scale={12} size={6} speed={0.4} opacity={0.5} color="#ffffff" />
    </>
  )
}

function CanModel() {
  const { scene } = useGLTF('/coke-can.glb')
  return (
    <Center>
      {/* Scale is 18 to make the model massive and majestic */}
      <primitive object={scene} scale={18} />
    </Center>
  )
}

function CanFallback() {
  return (
    <group scale={0.5}>
      <mesh receiveShadow castShadow>
         <cylinderGeometry args={[1, 1, 3.5, 64]} />
         <meshPhysicalMaterial 
            color="#F40009" 
            metalness={0.6} 
            roughness={0.1} 
            clearcoat={1.0}
            clearcoatRoughness={0.1}
         />
      </mesh>
      <mesh receiveShadow castShadow position={[0, 1.8, 0]}>
         <cylinderGeometry args={[0.96, 1, 0.2, 64]} />
         <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh receiveShadow castShadow position={[0, -1.8, 0]}>
         <cylinderGeometry args={[0.96, 1, 0.2, 64]} />
         <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  )
}

function LiquidParticles({ isPouring }: { isPouring: React.MutableRefObject<boolean> }) {
  const count = 300
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
         position: new THREE.Vector3(0, 1.0, 0),
         velocity: new THREE.Vector3(),
         life: Math.random() * 2,
         maxLife: Math.random() * 1.5 + 0.5,
         scale: Math.random() * 0.05 + 0.02
       }))
  }, [count])

  useFrame((_, delta) => {
    if (!mesh.current) return
    
    if (!isPouring.current) {
      mesh.current.count = 0
      return
    }
    
    mesh.current.count = count

    particles.forEach((particle, i) => {
      particle.life += delta
      if (particle.life >= particle.maxLife) {
        particle.life = 0
        particle.position.set(0, 1.0, 0) 
        particle.velocity.set(
          (Math.random() - 0.5) * 2, 
          Math.random() * 2 + 1, 
          Math.random() * 3 - 1   
        )
      }

      particle.velocity.y -= 9.8 * delta * 0.3
      particle.position.addScaledVector(particle.velocity, delta)

      dummy.position.copy(particle.position)
      dummy.scale.setScalar(particle.scale)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhysicalMaterial 
        color="#c88b3a" 
        metalness={0.1}
        roughness={0.1}
        transparent
        opacity={0.8}
        transmission={0.9} 
      />
    </instancedMesh>
  )
}
