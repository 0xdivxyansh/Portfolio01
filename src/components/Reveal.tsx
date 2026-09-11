import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../utils/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  duration?: number
  once?: boolean
}

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  duration = 0.85,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}