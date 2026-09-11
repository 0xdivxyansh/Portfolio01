import { Sparkles } from '@react-three/drei'

export default function Particles({ low }: { low: boolean }) {
  if (low) {
    return (
      <Sparkles
        count={42}
        scale={[5.5, 4, 5]}
        size={1.6}
        speed={0.25}
        color="#7dd3fc"
        opacity={0.4}
      />
    )
  }
  return (
    <>
      <Sparkles
        count={110}
        scale={[6.5, 4.5, 6]}
        size={2.1}
        speed={0.3}
        color="#7dd3fc"
        opacity={0.55}
      />
      <Sparkles count={34} scale={[3.5, 2.5, 3]} size={3.2} speed={0.18} color="#8b7cff" opacity={0.4} />
    </>
  )
}