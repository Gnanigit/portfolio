'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

function MouseTracker({
  setMouse,
}: {
  setMouse: (v: { x: number; y: number }) => void
}) {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [setMouse])
  return null
}

function TorusKnotMesh({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const targetRotX = useRef(0)
  const targetRotY = useRef(0)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()

    targetRotX.current += (mouse.y * 0.4 - targetRotX.current) * 0.05
    targetRotY.current += (mouse.x * 0.4 - targetRotY.current) * 0.05

    meshRef.current.rotation.x = targetRotX.current + time * 0.1
    meshRef.current.rotation.y = targetRotY.current + time * 0.15
    meshRef.current.rotation.z = time * 0.05
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow>
        <torusKnotGeometry args={[1.2, 0.4, 128, 16]} />
        <MeshDistortMaterial
          color="var(--primary, #a0e548)"
          wireframe
          distort={0.2}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  )
}

function RingsMesh() {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.rotation.y = clock.getElapsedTime() * 0.08
    group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.2
  })

  return (
    <group ref={group}>
      {[2.2, 2.8, 3.5].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, i * 0.5, 0]}>
          <torusGeometry args={[r, 0.015, 16, 100]} />
          <meshBasicMaterial color="var(--primary, #a0e548)" transparent opacity={0.2 - i * 0.05} />
        </mesh>
      ))}
    </group>
  )
}

function ParticleField() {
  const points = useRef<THREE.Points>(null)
  const count = 120

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8
  }

  useFrame(({ clock }) => {
    if (!points.current) return
    points.current.rotation.y = clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="var(--primary, #a0e548)" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export function HeroScene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <MouseTracker setMouse={setMouse} />
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#a0e548" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#7c5cbf" />

        {isMobile ? (
          <Float speed={1} floatIntensity={0.3}>
            <mesh>
              <icosahedronGeometry args={[1.5, 1]} />
              <meshBasicMaterial color="var(--primary, #a0e548)" wireframe />
            </mesh>
          </Float>
        ) : (
          <>
            <TorusKnotMesh mouse={mouse} />
            <RingsMesh />
            <ParticleField />
            <Stars radius={30} depth={50} count={200} factor={2} saturation={0} fade speed={0.5} />
          </>
        )}
      </Canvas>
    </div>
  )
}
