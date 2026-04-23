import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, Points, PointMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'

/* ─── Particle ring around the orb ─── */
function ParticleRing() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 2000
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r     = Math.random() * 7 + 3
      const theta = 2 * Math.PI * Math.random()
      const z     = (Math.random() - 0.5) * 5
      pos[i * 3]     = r * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(theta)
      pos[i * 3 + 2] = z
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z -= delta * 0.06
      ref.current.rotation.x  = Math.sin(Date.now() * 0.0003) * 0.25
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4f8dff"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        fog={false}
        opacity={0.7}
      />
    </Points>
  )
}

/* ─── Orbiting ring geometry ─── */
function OrbitRing({ radius, rotX = 0, rotZ = 0, color = '#4f8dff', speed = 0.3 }: {
  radius: number; rotX?: number; rotZ?: number; color?: string; speed?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed
  })
  return (
    <mesh ref={ref} rotation={[rotX, 0, rotZ]}>
      <torusGeometry args={[radius, 0.012, 16, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  )
}

/* ─── Core glowing sphere ─── */
function CoreOrb() {
  const ref      = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ref.current) {
      ref.current.rotation.y = t * 0.15
      ref.current.rotation.x = Math.sin(t * 0.2) * 0.1
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.25
    }
  })

  return (
    <group>
      {/* Outer wireframe sphere */}
      <mesh ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial
          color={hovered ? '#a855f7' : '#4f8dff'}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Inner solid orb */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshPhysicalMaterial
          color="#050520"
          roughness={0.05}
          metalness={0.9}
          emissive={hovered ? '#a855f7' : '#1a3a8f'}
          emissiveIntensity={hovered ? 2.5 : 1.8}
          transmission={0.2}
          thickness={0.5}
        />
      </mesh>

      {/* Core light glow */}
      <pointLight color={hovered ? '#a855f7' : '#4f8dff'} intensity={4} distance={5} />
    </group>
  )
}

/* ─── Main scene ─── */
function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (state.pointer.x * Math.PI) / 8,
        0.04
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (state.pointer.y * Math.PI) / 12,
        0.04
      )
    }
  })

  return (
    <group ref={groupRef}>
      <ParticleRing />
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.6}>
        <CoreOrb />
        {/* Orbiting rings at different angles */}
        <OrbitRing radius={2.4} rotX={Math.PI / 2} color="#4f8dff" speed={0.35} />
        <OrbitRing radius={2.8} rotX={Math.PI / 4} rotZ={Math.PI / 6} color="#a855f7" speed={-0.22} />
        <OrbitRing radius={3.2} rotX={-Math.PI / 6} rotZ={Math.PI / 3} color="#06b6d4" speed={0.18} />
      </Float>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      className="w-full h-full"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#4f8dff" />
      <directionalLight position={[-5, -5, 3]} intensity={0.4} color="#a855f7" />
      <Environment preset="night" />
      <Scene />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          mipmapBlur
          intensity={1.8}
          radius={0.7}
        />
      </EffectComposer>
    </Canvas>
  )
}
