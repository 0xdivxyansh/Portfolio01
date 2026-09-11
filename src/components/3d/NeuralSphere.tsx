import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import FloatingGeometry from './FloatingGeometry'

function makeCircle(radius: number, segments: number): [number, number, number][] {
  const pts: [number, number, number][] = []
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2
    pts.push([Math.cos(a) * radius, Math.sin(a) * radius, 0])
  }
  return pts
}

export default function NeuralSphere({ low }: { low: boolean }) {
  const group = useRef<THREE.Group>(null)
  const ringGroup = useRef<THREE.Group>(null)

  const nodeCount = low ? 220 : 480
  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodeCount * 3)
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 1.04 + (i % 7) * 0.012
      arr[i * 3] = Math.sin(phi) * Math.cos(theta) * r
      arr[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r
      arr[i * 3 + 2] = Math.cos(phi) * r
    }
    return arr
  }, [nodeCount])

  const ringA = useMemo(() => makeCircle(1.5, 72), [])
  const ringB = useMemo(() => makeCircle(1.82, 72), [])
  const ringC = useMemo(() => makeCircle(2.12, 90), [])

  useFrame((state, delta) => {
    const g = group.current
    const rg = ringGroup.current
    if (!g) return
    g.rotation.y += delta * (low ? 0.16 : 0.24)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.28, 0.05)
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, state.pointer.x * -0.12, 0.05)

    const scroll = window.scrollY ?? 0
    g.position.y = THREE.MathUtils.lerp(g.position.y, -scroll * 0.00035, 0.06)

    if (rg) {
      rg.rotation.x += delta * (low ? 0.05 : 0.08)
      rg.rotation.y += delta * (low ? 0.04 : 0.06)
    }
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.06, 1]} />
        <meshBasicMaterial wireframe color="#3f6bff" transparent opacity={low ? 0.1 : 0.16} />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshBasicMaterial wireframe color="#6b95ff" transparent opacity={low ? 0.05 : 0.08} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color="#bcd4ff"
          emissive="#4d7cff"
          emissiveIntensity={2.4}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.018}
          color="#7faaff"
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group ref={ringGroup}>
        <Line
          points={ringA}
          color="#22d3ee"
          lineWidth={0.8}
          transparent
          opacity={low ? 0.22 : 0.4}
          rotation={[Math.PI / 2.15, 0, 0]}
        />
        <Line
          points={ringB}
          color="#4d7cff"
          lineWidth={0.7}
          transparent
          opacity={low ? 0.16 : 0.32}
          rotation={[Math.PI / 2.5, Math.PI / 5, 0]}
        />
        <Line
          points={ringC}
          color="#8b7cff"
          lineWidth={0.6}
          transparent
          opacity={low ? 0.12 : 0.26}
          rotation={[Math.PI / 1.9, -Math.PI / 6, Math.PI / 4]}
        />
      </group>

      <FloatingGeometry low={low} />
    </group>
  )
}