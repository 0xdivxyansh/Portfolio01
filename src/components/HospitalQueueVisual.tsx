import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '../utils/motion'

type Kind = 'EMERGENCY' | 'GENERAL'
type Status = 'SERVING' | 'IN QUEUE' | 'WAITING'

interface Patient {
  id: number
  kind: Kind
}

const STATUSES: Status[] = ['SERVING', 'IN QUEUE', 'WAITING']

function makeInitial(): Patient[] {
  return [
    { id: 1, kind: 'EMERGENCY' },
    { id: 2, kind: 'GENERAL' },
    { id: 3, kind: 'GENERAL' },
  ]
}

const statusStyle: Record<Status, { color: string; bg: string; dot: string }> = {
  SERVING: { color: '#22d3ee', bg: 'rgba(34,211,238,0.1)', dot: '#22d3ee' },
  'IN QUEUE': { color: '#8b7cff', bg: 'rgba(139,124,255,0.1)', dot: '#8b7cff' },
  WAITING: { color: '#a0a9c0', bg: 'rgba(160,169,192,0.08)', dot: '#a0a9c0' },
}

export default function HospitalQueueVisual() {
  const [queue, setQueue] = useState<Patient[]>(makeInitial)

  useEffect(() => {
    const tick = () =>
      setQueue((q) => {
        const next = [...q]
        next.shift()
        const last = next[next.length - 1]
        next.push({ id: last.id + 1, kind: (last.id + 1) % 3 === 0 ? 'EMERGENCY' : 'GENERAL' })
        return next
      })
    const t = setInterval(tick, 3600)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="relative w-full select-none overflow-hidden rounded-2xl border border-line bg-[#04070c]"
      data-cursor-label="QUEUE"
      role="img"
      aria-label="Interactive hospital patient queue dashboard visualization using FCFS and priority scheduling"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(14,28,58,0.9) 0%, rgba(4,7,12,0.96) 70%)',
        }}
      />
      <div className="absolute inset-0 grid-lines opacity-50" />

      {/* header */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-7">
        <div>
          <p className="font-mono text-[10px] tracking-[0.28em] text-cyan uppercase">
            Patient queue
          </p>
          <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-dim uppercase">
            FCFS · Priority Scheduling
          </p>
        </div>
        <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-sub uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-dot" />
          Live
        </span>
      </div>

      {/* rows */}
      <div className="relative z-10 space-y-2.5 px-5 pb-5 sm:px-7">
        {queue.map((p, i) => {
          const status = STATUSES[i]
          const st = statusStyle[status]
          return (
            <motion.div
              key={p.id}
              layout
              transition={{ layout: { duration: 0.65, ease: EASE } }}
              className="flex items-center gap-4"
            >
              <div className="w-20 shrink-0 sm:w-24">
                <p
                  className="font-mono text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: st.color }}
                >
                  {status}
                </p>
                <p className="mt-0.5 font-mono text-[8px] tracking-[0.15em] text-dim">
                  {i === 0 ? 'ON DECK' : i === 1 ? 'NEXT' : 'STAND BY'}
                </p>
              </div>

              <div
                className="glass flex flex-1 items-center gap-3 rounded-xl px-4 py-3"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <span className="font-display text-lg font-bold text-gradient tabular-nums">
                  {String(p.id).padStart(2, '0')}
                </span>
                <span className="h-8 w-px bg-white/8" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">
                    {p.kind} <span className="text-dim">Patient</span>
                  </p>
                  <p className="font-mono text-[9px] tracking-[0.16em] text-sub uppercase">
                    {p.kind === 'EMERGENCY' ? 'Priority' : 'General'} ·{' '}
                    {p.kind === 'EMERGENCY' ? 'Priority Queue' : 'FCFS'}
                  </p>
                </div>
                <span
                  className="rounded-full px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] uppercase"
                  style={{ backgroundColor: st.bg, color: st.color }}
                >
                  {p.kind === 'EMERGENCY' ? 'PRIORITY' : 'FCFS'}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* pipeline */}
      <div className="relative z-10 border-t border-white/6 px-5 py-4 sm:px-7">
        <div className="flex items-center justify-between">
          {['WAITING', 'QUEUE', 'SERVING'].map((step, i) => (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: i === 2 ? '#22d3ee' : i === 1 ? '#8b7cff' : '#5d667f',
                    boxShadow: i === 2 ? '0 0 10px rgba(34,211,238,0.8)' : 'none',
                  }}
                />
                <span className="font-mono text-[8px] tracking-[0.25em] text-sub">{step}</span>
              </div>
              {i < 2 && <span className="mx-2 flex-1 border-t border-dashed border-white/10" />}
            </div>
          ))}
        </div>
        <div className="relative mt-3 h-[3px] overflow-hidden rounded-full bg-white/6">
          <motion.span
            className="absolute top-0 h-full w-1/4 rounded-full bg-gradient-to-r from-cyan/80 to-violet/80"
            animate={{ left: ['-10%', '88%'] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
    </div>
  )
}