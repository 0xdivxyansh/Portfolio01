import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useIsTouch } from '../hooks/useMediaQuery'

interface TiltCardProps {
  children: ReactNode
  className?: string
  max?: number
  scale?: number
}

export default function TiltCard({ children, className, max = 6, scale = 1.015 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const isTouch = useIsTouch()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 140, damping: 16 })
  const sry = useSpring(ry, { stiffness: 140, damping: 16 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || isTouch || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(px * max * 2)
    rx.set(-py * max * 2)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      whileHover={reduced || isTouch ? undefined : { scale }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
    >
      {children}
    </motion.div>
  )
}