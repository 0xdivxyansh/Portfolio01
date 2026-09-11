import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Grid } from '@react-three/drei'
import NeuralSphere from './NeuralSphere'
import Particles from './Particles'
import { useIsMobile, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

export default function HeroScene() {
  const isMobile = useIsMobile()
  const reduced = usePrefersReducedMotion()
  const low = isMobile || reduced

  return (
    <Canvas
      dpr={isMobile ? [0.7, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="!pointer-events-auto"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 2, 4]} intensity={60} color="#4d7cff" />
      <pointLight position={[-3, -1, 2.5]} intensity={40} color="#8b7cff" />
      <pointLight position={[0, 3, -2]} intensity={22} color="#22d3ee" />

      <Suspense fallback={null}>
        <NeuralSphere low={low} />
        <Particles low={low} />
        {!isMobile && (
          <Grid
            position={[0, -1.9, 0]}
            args={[12, 12]}
            cellSize={0.55}
            cellThickness={0.55}
            cellColor="#1d2b4d"
            sectionSize={2.75}
            sectionThickness={1}
            sectionColor="#2a4b8a"
            fadeDistance={24}
            fadeStrength={1.4}
          />
        )}
      </Suspense>
    </Canvas>
  )
}