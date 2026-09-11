import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const TERMINAL_LINES = [
  '[ OK ] mounting system core',
  '[ OK ] loading modules .. ai/vision/web/iot',
  '[ OK ] calibrating neural interface',
  '[ OK ] establishing secure channel',
]

const PROGRESS_STEPS = [22, 41, 66, 84]

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    const dur = 1900
    const t0 = performance.now()
    let raf = 0
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      setProgress(100)
      window.setTimeout(() => doneRef.current(), 300)
    }

    const fallback = window.setTimeout(finish, 2800)

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else finish()
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fallback)
      finished = true
    }
  }, [])

  const visibleLines = PROGRESS_STEPS.filter((s) => progress >= s).length

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-base"
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="absolute left-1/2 top-[-20%] h-[60vh] w-[70vw] -translate-x-1/2 rounded-full bg-electric/10 blur-[130px]" />

      <div className="relative z-10 w-[min(92vw,540px)] px-2">
        <div className="flex items-end justify-between">
          <p className="font-mono text-xs tracking-[0.35em] text-sub uppercase">
            DIVYANSH YADAV
          </p>
          <p className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase">v1.0</p>
        </div>

        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          <span className="text-gradient">SYSTEM INITIALIZATION</span>
        </h1>

        <div className="mt-8 space-y-1.5 h-[64px]">
          {TERMINAL_LINES.slice(0, visibleLines).map((line) => (
            <motion.p
              key={line}
              className="font-mono text-[11px] tracking-wide text-dim"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-cyan">{line.split(' ').slice(0, 2).join(' ')}</span>{' '}
              {line.split(' ').slice(2).join(' ')}
            </motion.p>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-sub uppercase">
            <span className="terminal-msg">LOADING</span>
            <span className="tabular-nums text-cyan">{String(progress).padStart(3, '0')}%</span>
          </div>
          <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/6">
            <div
              className="h-full rounded-full bg-gradient-to-r from-electric via-cyan to-violet transition-[width] duration-100 ease-out"
              style={{ width: `${progress}%`, boxShadow: '0 0 14px rgba(77,124,255,0.7)' }}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-dim uppercase">
          <span>NEURAL CORE</span>
          <span>EST. 2026</span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-5 sm:px-8">
        <span className="hidden h-10 w-10 border-l border-t border-white/10 sm:block" />
        <span className="hidden h-10 w-10 border-r border-t border-white/10 sm:block" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-end justify-between px-5 pb-5 sm:px-8 sm:pb-8">
        <span className="hidden h-10 w-10 border-b border-l border-white/10 sm:block" />
        <span className="hidden h-10 w-10 border-b border-r border-white/10 sm:block" />
      </div>
    </motion.div>
  )
}