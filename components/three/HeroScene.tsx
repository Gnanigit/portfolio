'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
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
  const elapsed = useRef(0)

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

  useFrame((_, delta) => {
    if (!groupRef.current) return
    elapsed.current += delta
    const t = elapsed.current
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
    { r: 2.9,  tube: 0.007, rot: [Math.PI / 2.8, 0, 0.4],  op: 0.28, speed:  0.04  },
    { r: 3.45, tube: 0.005, rot: [0.4, 0, Math.PI / 3.5],  op: 0.18, speed: -0.03  },
    { r: 2.6,  tube: 0.006, rot: [1.1, 0.2, 0],            op: 0.22, speed:  0.055 },
  ]

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.children.forEach((child, i) => {
      child.rotation.z += configs[i].speed * delta
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
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    if (!ref.current) return
    elapsed.current += delta
    const s = 1 + Math.sin(elapsed.current * 1.8) * 0.12
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
  const elapsed = useRef(0)

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

  useFrame((_, delta) => {
    if (!ref.current) return
    elapsed.current += delta
    ref.current.rotation.y = elapsed.current * 0.025
    ref.current.rotation.x = elapsed.current * 0.012
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
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [setMouse])
  return null
}

/* ── CSS-only fallback for mobile & tablet (no WebGL) ── */
function CSSFallback({ color }: { color: string }) {
  return (
    <>
      <style>{`
        @keyframes css-globe-spin  { to { transform: rotate(360deg); } }
        @keyframes css-globe-spin2 { to { transform: rotate(-360deg); } }
        @keyframes css-globe-spin3 { to { transform: rotate(360deg); } }
        @keyframes css-globe-pulse { 0%,100%{transform:scale(1);opacity:.85} 50%{transform:scale(1.15);opacity:1} }
        @keyframes css-globe-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes css-dot-blink   { 0%,100%{opacity:.3} 50%{opacity:1} }
      `}</style>
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ animation: 'css-globe-float 4s ease-in-out infinite', position: 'relative', width: 260, height: 260 }}>

          {/* Outer ring */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: `1.5px solid ${color}30`,
            animation: 'css-globe-spin 18s linear infinite',
          }}>
            <div style={{ position: 'absolute', top: -4, left: '50%', marginLeft: -4, width: 8, height: 8, borderRadius: '50%', background: color, opacity: 0.9, boxShadow: `0 0 8px 3px ${color}66` }} />
            <div style={{ position: 'absolute', bottom: -4, left: '50%', marginLeft: -4, width: 6, height: 6, borderRadius: '50%', background: color, opacity: 0.5 }} />
          </div>

          {/* Mid ring — tilted */}
          <div style={{
            position: 'absolute', inset: 20, borderRadius: '50%',
            border: `1px dashed ${color}28`,
            transform: 'rotateX(60deg)',
            animation: 'css-globe-spin2 12s linear infinite',
          }}>
            <div style={{ position: 'absolute', top: -4, right: '20%', width: 7, height: 7, borderRadius: '50%', background: color, opacity: 0.7, boxShadow: `0 0 6px 2px ${color}55` }} />
          </div>

          {/* Inner ring */}
          <div style={{
            position: 'absolute', inset: 45, borderRadius: '50%',
            border: `1px solid ${color}22`,
            animation: 'css-globe-spin3 8s linear infinite',
          }}>
            <div style={{ position: 'absolute', bottom: -3, left: '30%', width: 6, height: 6, borderRadius: '50%', background: color, opacity: 0.6 }} />
            <div style={{ position: 'absolute', top: -3, right: '25%', width: 5, height: 5, borderRadius: '50%', background: color, opacity: 0.4 }} />
          </div>

          {/* Scattered dots */}
          {[
            { top: '12%',  left: '72%', s: 5, d: '0s',   f: '2.4s' },
            { top: '75%',  left: '18%', s: 7, d: '0.6s', f: '1.9s' },
            { top: '20%',  left: '15%', s: 4, d: '1.1s', f: '2.8s' },
            { top: '65%',  left: '78%', s: 6, d: '0.3s', f: '2.1s' },
            { top: '45%',  left: '5%',  s: 4, d: '1.5s', f: '3s'   },
            { top: '48%',  left: '90%', s: 5, d: '0.9s', f: '2.6s' },
            { top: '85%',  left: '55%', s: 4, d: '1.8s', f: '2.2s' },
            { top: '8%',   left: '40%', s: 5, d: '0.4s', f: '2.9s' },
          ].map((dot, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: dot.top, left: dot.left,
              width: dot.s, height: dot.s,
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 ${dot.s + 4}px ${dot.s / 2}px ${color}44`,
              animation: `css-dot-blink ${dot.f} ease-in-out ${dot.d} infinite`,
            }} />
          ))}

          {/* Central core */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: 32, height: 32,
            marginTop: -16, marginLeft: -16,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color} 0%, ${color}88 60%, transparent 100%)`,
            boxShadow: `0 0 24px 8px ${color}44`,
            animation: 'css-globe-pulse 2.5s ease-in-out infinite',
          }} />
        </div>
      </div>
    </>
  )
}

/* ── exported scene ── */
export function HeroScene() {
  const [mouse, setMouse]             = useState({ x: 0, y: 0 })
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const primaryColor                  = usePrimaryColor()

  /* suppress r3f's internal THREE.Clock deprecation warning —
     r3f 9.x still uses Clock internally; fix pending upstream */
  useEffect(() => {
    const original = console.warn
    console.warn = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return
      original(...args)
    }
    return () => { console.warn = original }
  }, [])

  useEffect(() => {
    const check = () => setIsSmallScreen(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* Pure CSS fallback for mobile & tablet — no WebGL loaded at all */
  if (isSmallScreen) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <CSSFallback color={primaryColor} />
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <MouseTracker setMouse={setMouse} />
      <Canvas
        camera={{ position: [0, 0.6, 7], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <PulsingCore   color={primaryColor} />
        <NodeNetwork   mouse={mouse} color={primaryColor} />
        <OrbitRings    color={primaryColor} />
        <DataParticles color={primaryColor} />
      </Canvas>
    </div>
  )
}
