import { useEffect, useRef } from 'react'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface Satellite {
  position: [number, number, number]
  color: string
  size: number
  tilt: THREE.Euler
}

const SATELLITES: Satellite[] = [
  {
    position: [1.9, 0.55, 0.4],
    color: '#22d3ee',
    size: 0.055,
    tilt: new THREE.Euler(0.4, 0.8, 0.2),
  },
  {
    position: [-1.7, -0.7, 0.9],
    color: '#8b7cff',
    size: 0.075,
    tilt: new THREE.Euler(1.1, 0.4, 0.6),
  },
  {
    position: [0.6, 1.7, -0.5],
    color: '#4d7cff',
    size: 0.045,
    tilt: new THREE.Euler(0.2, 0.2, 0.9),
  },
  {
    position: [-0.9, 1.05, 1.5],
    color: '#5eead4',
    size: 0.035,
    tilt: new THREE.Euler(0.7, 0.1, 0.3),
  },
]

export default function FloatingGeometry({ low }: { low: boolean }) {
  const group = useRef<THREE.Group>(null)

  useEffect(() => {
    return () => {
      group.current?.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          const mat = child.material
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
          else mat.dispose()
        }
      })
    }
  }, [])

  return (
    <group ref={group}>
      {SATELLITES.map((s, i) => (
        <Float key={i} speed={1.6} rotationIntensity={0.7} floatIntensity={1.4}>
          <mesh position={s.position} rotation={s.tilt}>
            <octahedronGeometry args={[s.size * (low ? 1 : 1.2), 0]} />
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={1.4}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}