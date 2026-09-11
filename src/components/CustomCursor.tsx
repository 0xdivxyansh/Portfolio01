import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouch, usePrefersReducedMotion } from '../hooks/useMediaQuery'

export default function CustomCursor() {
  const isTouch = useIsTouch()
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [label, setLabel] = useState<string | null>(null)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.55 })
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.55 })

  useEffect(() => {
    if (isTouch || reduced) {
      setEnabled(false)
      return
    }
    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target || !(target instanceof Element)) return
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]',
      )
      setActive(!!interactive)
      const labelled = target.closest('[data-cursor-label]') as HTMLElement | null
      setLabel(labelled ? labelled.getAttribute('data-cursor-label') : null)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [isTouch, reduced, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className={`cursor-ring${active ? ' active' : ''}`}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%', scale: active ? 1.8 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {label ? <span className="cursor-label">{label}</span> : null}
      </motion.div>
    </>
  )
}