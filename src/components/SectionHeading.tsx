import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '../utils/motion'

interface SectionHeadingProps {
  index: string
  label: string
  title?: ReactNode
  className?: string
}

export default function SectionHeading({ index, label, title, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className="text-dim">{index}</span> / {label}
      </motion.p>
      {title ? (
        <motion.h2
          className="mt-5 text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
        >
          {title}
        </motion.h2>
      ) : null}
    </div>
  )
}