'use client'
import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Center, Text, Float, Sparkles, PresentationControls, RoundedBox } from '@react-three/drei'
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

    const isMobile = window.innerWidth < 768
    const mx = isMobile ? 0.35 : 1
    const my = isMobile ? 0.5 : 1

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainWrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress
          // Pouring is active during section 2 (approx 1/7 to 2/7) exactly like original code
          isPouring.current = self.progress > 0.1 && self.progress < 0.28
        }
      }
    })

    const sec = 1 / 7

    // Phase 1 (0 -> Sec 2): Pouring
    tl.to(outerGroupRef.current.rotation, { x: Math.PI / 2, z: Math.PI / 12, y: Math.PI / 6, duration: sec }, 0)
      .to(outerGroupRef.current.position, { x: 1.5 * mx, y: 0, duration: sec }, "<")
    
    // Animate Hero background away on first scroll
    tl.to(heroBgRef.current.position, { y: 15, duration: sec }, 0)
      .to(heroBgRef.current.scale, { x: 0, y: 0, z: 0, duration: sec * 0.5 }, 0)

    // Phase 2 (Sec 2 -> Sec 3): History
    tl.to(outerGroupRef.current.rotation, { x: 0, z: -Math.PI / 12, y: -Math.PI / 6, duration: sec })
      .to(outerGroupRef.current.position, { x: -2 * mx, y: -0.5 * my, duration: sec }, "<")

    // Phase 3 (Sec 3 -> Sec 4): Varieties
    tl.to(outerGroupRef.current.rotation, { x: 0, z: 0, y: Math.PI * 2, duration: sec })
      .to(outerGroupRef.current.position, { x: 0, y: 1.5 * my, duration: sec }, "<")

    // Phase 4 (Sec 4 -> Sec 5): Brand
    tl.to(outerGroupRef.current.rotation, { x: Math.PI / 16, z: Math.PI / 16, y: -Math.PI / 8, duration: sec })
      .to(outerGroupRef.current.position, { x: 2 * mx, y: 0, duration: sec }, "<")

    // Phase 5 (Sec 5 -> Sec 6): Video Ad
    tl.to(outerGroupRef.current.rotation, { x: 0, y: 0, z: 0, duration: sec })
      .to(outerGroupRef.current.position, { x: 0, y: 0, z: -15, duration: sec }, "<")

    // Phase 6 & 7 (Sec 6 -> End): Stay hidden
    tl.to(outerGroupRef.current.position, { z: -15, duration: sec * 2 })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  // Restored Original Cursor Physics!
  useFrame((state, delta) => {
    if (!innerHoverRef.current) return
    
    if (scrollProgress.current < 0.7) { 
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
        <PresentationControls
          global={true} 
          cursor={true}
          snap={false}
          speed={1.5}
          zoom={1}
          rotation={[0, Math.PI / 1.5, 0]} // Front logo preserved
          polar={[-Math.PI / 4, Math.PI / 4]} 
          azimuth={[-Infinity, Infinity]}
        >
          {/* Inner hover handles exactly as in the original repository */}
          <group ref={innerHoverRef}>
            <GLTFErrorBoundary fallback={<CanFallback />}>
              <CanModel />
            </GLTFErrorBoundary>
          </group>
        </PresentationControls>
        {/* Restored to being INSIDE the group, just like the original code */}
        <LiquidParticles isPouring={isPouring} />
      </group>
    </>
  )
}

function HeroBackground3D() {
  const { size } = useThree()
  const isMobile = size.width < 768

  const cubes = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5 - 3],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.6 + 0.3
    }))
  }, [])

  return (
    <>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 0, -5]}
          fontSize={isMobile ? 3 : 6}
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

      {cubes.map((cube, i) => (
        <Float key={i} speed={1.5 + Math.random()} rotationIntensity={2} floatIntensity={2}>
          <RoundedBox 
            position={cube.position as [number,number,number]} 
            rotation={cube.rotation as [number,number,number]} 
            scale={cube.scale}
            args={[1, 1, 1]} 
            radius={0.12} 
            smoothness={6}
          >
            {/* The highly realistic ice shader preserved! */}
            <meshPhysicalMaterial 
              roughness={0.15}
              metalness={0.05}
              transmission={0.9}
              thickness={1.5}
              ior={1.31}
              color="#e6f5ff"
              clearcoat={1}
              clearcoatRoughness={0.1}
              envMapIntensity={3}
            />
          </RoundedBox>
        </Float>
      ))}

      <Sparkles count={150} scale={12} size={6} speed={0.4} opacity={0.5} color="#ffffff" />
    </>
  )
}

function CanModel() {
  const { scene } = useGLTF('/coke-can.glb')
  const { size } = useThree()
  return (
    <Center>
      <primitive object={scene} scale={size.width < 768 ? 10 : 18} />
    </Center>
  )
}

function CanFallback() {
  return (
    <group scale={0.5}>
      <mesh receiveShadow castShadow>
         <cylinderGeometry args={[1, 1, 3.5, 64]} />
         <meshPhysicalMaterial color="#F40009" metalness={0.6} roughness={0.1} clearcoat={1.0} />
      </mesh>
    </group>
  )
}

// Exactly copied from git show 8d2ecb5 (the initial repository commit)
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
      dummy.scale.setScalar(particle.scale) // No stretching, perfectly round
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
