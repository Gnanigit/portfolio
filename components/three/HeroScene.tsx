'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* ── reads --primary CSS variable and updates on theme change ── */
function usePrimaryColor() {
  const [color, setColor] = useState('#a0e548')
  useEffect(() => {
    const read = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary')
        .trim()
      if (v) setColor(v)
    }
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])
  return color
}

/* ── evenly distributes N points on a sphere using Fibonacci lattice ── */
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = phi * i
    points.push(
      new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius)
    )
  }
  return points
}

/* ── neural-network node sphere with connection lines ── */
function NodeNetwork({
  mouse,
  color,
}: {
  mouse: { x: number; y: number }
  color: string
}) {
  const groupRef = useRef<THREE.Group>(null)
  const targetRotX = useRef(0)
  const targetRotY = useRef(0)

  const NODE_COUNT = 65
  const RADIUS = 2.1
  const CONNECT_DIST = 1.35

  const nodes = useMemo(() => fibonacciSphere(NODE_COUNT, RADIUS), [])

  const linePositions = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECT_DIST) {
          arr.push(nodes[i].x, nodes[i].y, nodes[i].z)
          arr.push(nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }
    return new Float32Array(arr)
  }, [nodes])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    targetRotX.current += (mouse.y * 0.28 - targetRotX.current) * 0.04
    targetRotY.current += (mouse.x * 0.28 - targetRotY.current) * 0.04
    groupRef.current.rotation.y = targetRotY.current + t * 0.07
    groupRef.current.rotation.x = targetRotX.current + Math.sin(t * 0.04) * 0.08
  })

  const threeColor = useMemo(() => new THREE.Color(color), [color])

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={threeColor} transparent opacity={0.14} />
      </lineSegments>

      {/* Nodes — every 7th is a larger "hub" node */}
      {nodes.map((pos, i) => {
        const isHub = i % 7 === 0
        return (
          <mesh key={i} position={[pos.x, pos.y, pos.z]}>
            <sphereGeometry args={[isHub ? 0.065 : 0.032, 8, 8]} />
            <meshBasicMaterial color={threeColor} transparent opacity={isHub ? 0.95 : 0.5} />
          </mesh>
        )
      })}

      {/* Transparent inner shell for depth/glow */}
      <mesh>
        <sphereGeometry args={[1.75, 32, 32]} />
        <meshBasicMaterial
          color={threeColor}
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

/* ── three tilted orbit rings — representing cloud/infra layers ── */
function OrbitRings({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null)
  const threeColor = useMemo(() => new THREE.Color(color), [color])

  const configs: { r: number; tube: number; rot: [number, number, number]; op: number; speed: number }[] = [
    { r: 2.9, tube: 0.007, rot: [Math.PI / 2.8, 0, 0.4],  op: 0.28, speed: 0.04  },
    { r: 3.45, tube: 0.005, rot: [0.4, 0, Math.PI / 3.5], op: 0.18, speed: -0.03 },
    { r: 2.6, tube: 0.006, rot: [1.1, 0.2, 0],            op: 0.22, speed: 0.055 },
  ]

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.children.forEach((child, i) => {
      child.rotation.z += configs[i].speed * 0.016
    })
  })

  return (
    <group ref={ref}>
      {configs.map((cfg, i) => (
        <mesh key={i} rotation={cfg.rot}>
          <torusGeometry args={[cfg.r, cfg.tube, 16, 160]} />
          <meshBasicMaterial color={threeColor} transparent opacity={cfg.op} />
        </mesh>
      ))}
    </group>
  )
}

/* ── central pulsing core ── */
function PulsingCore({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  const threeColor = useMemo(() => new THREE.Color(color), [color])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const s = 1 + Math.sin(clock.getElapsedTime() * 1.8) * 0.12
    ref.current.scale.setScalar(s)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.28, 24, 24]} />
      <meshBasicMaterial color={threeColor} transparent opacity={0.7} />
    </mesh>
  )
}

/* ── outer data-particle shell ── */
function DataParticles({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null)
  const threeColor = useMemo(() => new THREE.Color(color), [color])

  const positions = useMemo(() => {
    const COUNT = 90
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const r = 3.0 + Math.random() * 1.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.025
    ref.current.rotation.x = t * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color={threeColor} transparent opacity={0.45} sizeAttenuation />
    </points>
  )
}

/* ── mouse position tracker (outside canvas) ── */
function MouseTracker({ setMouse }: { setMouse: (v: { x: number; y: number }) => void }) {
  useEffect(() => {
    const handle = (e: MouseEvent) =>
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [setMouse])
  return null
}

/* ── mobile fallback: simple wireframe icosahedron ── */
function MobileFallback({ color }: { color: string }) {
  const threeColor = useMemo(() => new THREE.Color(color), [color])
  return (
    <Float speed={1} floatIntensity={0.35}>
      <group>
        <mesh>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshBasicMaterial color={threeColor} wireframe transparent opacity={0.55} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshBasicMaterial color={threeColor} transparent opacity={0.75} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── exported scene ── */
export function HeroScene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const primaryColor = usePrimaryColor()

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
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />

        {isMobile ? (
          <MobileFallback color={primaryColor} />
        ) : (
          <>
            <PulsingCore color={primaryColor} />
            <NodeNetwork mouse={mouse} color={primaryColor} />
            <OrbitRings color={primaryColor} />
            <DataParticles color={primaryColor} />
          </>
        )}
      </Canvas>
    </div>
  )
}
