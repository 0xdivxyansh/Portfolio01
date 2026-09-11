import { motion, useScroll, useTransform } from 'framer-motion'

export default function Background() {
  const { scrollYProgress } = useScroll()
  const glowTop = useTransform(scrollYProgress, [0, 1], [0, 340])
  const glowMid = useTransform(scrollYProgress, [0, 1], [0, -280])
  const beamY = useTransform(scrollYProgress, [0, 1], ['10%', '55%'])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_-10%,#10162a_0%,#05060a_55%)]" />

      <motion.div
        className="absolute inset-0"
        style={{ y: glowTop }}
      >
        <div
          className="absolute -top-40 left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(77,124,255,0.16), transparent 65%)' }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ y: glowMid }}
      >
        <div
          className="absolute bottom-[-10vh] left-[-10vw] h-[55vh] w-[55vw] rounded-full opacity-50 blur-[130px]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(139,124,255,0.14), transparent 65%)' }}
        />
        <div
          className="absolute right-[-12vw] top-[30vh] h-[50vh] w-[45vw] rounded-full opacity-40 blur-[130px]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.10), transparent 65%)' }}
        />
      </motion.div>

      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          y: beamY,
          background:
            'linear-gradient(90deg, transparent, rgba(34,211,238,0.18), transparent)',
          boxShadow: '0 0 40px 2px rgba(34,211,238,0.12)',
        }}
      />

      <div className="grid-lines absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_55%,rgba(5,6,10,0.7)_100%)]" />
    </div>
  )
}