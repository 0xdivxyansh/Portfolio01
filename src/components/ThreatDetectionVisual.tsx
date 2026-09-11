import { motion } from 'framer-motion'

const RISERS = [
  { left: '16%', delay: 0, dur: 7 },
  { left: '28%', delay: 2.2, dur: 8.5 },
  { left: '55%', delay: 1.1, dur: 7.6 },
  { left: '64%', delay: 3.6, dur: 9 },
  { left: '78%', delay: 0.6, dur: 8 },
  { left: '86%', delay: 2.8, dur: 7.2 },
]

const FEED_BARS = [52, 78, 40, 66, 88]

function Bar({ value, index, color }: { value: number; index: number; color: string }) {
  return (
    <div className="relative h-24 w-[3px] overflow-hidden rounded-full bg-white/6">
      <motion.span
        className="absolute bottom-0 w-full rounded-full"
        style={{ background: color }}
        initial={{ height: '30%' }}
        animate={{ height: [`${Math.max(25, value * 0.35)}%`, `${value}%`, `${Math.max(25, value * 0.35)}%`] }}
        transition={{ duration: 2.6 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export default function ThreatDetectionVisual() {
  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-[#04070c] select-none"
      data-cursor-label="VISION"
      role="img"
      aria-label="Futuristic camera viewport visualization of the facial recognition and threat detection system"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 50% 32%, rgba(18,32,66,0.9) 0%, rgba(4,7,12,0.95) 68%)',
        }}
      />
      <div className="absolute inset-0 grid-lines opacity-60" />

      {/* scanning line */}
      <div className="scan-line animate-scan" aria-hidden="true" />

      {/* face detection area */}
      <div className="absolute inset-x-[16%] top-[18%] h-[50%] sm:inset-x-[24%]">
        <div className="face-rect absolute inset-0" aria-hidden="true" />

        <div
          className="absolute left-1/2 top-1/2 h-[78%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(77,124,255,0.5) 0%, rgba(77,124,255,0.16) 32%, transparent 62%)',
          }}
          aria-hidden="true"
        />

        <span
          className="absolute -top-3 left-0 rounded bg-electric/20 px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] text-cyan uppercase"
          style={{ boxShadow: '0 0 18px rgba(77,124,255,0.35)' }}
        >
          Face detected
        </span>
        <span className="absolute -bottom-3 right-0 font-mono text-[9px] tracking-[0.2em] text-sub uppercase">
          ID: <span className="text-cyan animate-blink">VERIFYING</span>
        </span>
      </div>

      {/* corner brackets */}
      {[
        'top-3 left-3 border-l border-t',
        'top-3 right-3 border-r border-t',
        'bottom-3 left-3 border-b border-l',
        'bottom-3 right-3 border-b border-r',
      ].map((c, i) => (
        <span key={i} className={`absolute h-5 w-5 border-cyan/40 ${c}`} aria-hidden="true" />
      ))}

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-3 font-mono text-[9px] tracking-[0.2em] text-sub uppercase">
        <span>
          CAM-01 <span className="text-cyan">●</span>
        </span>
        <span className="hidden sm:inline">CV-SYS · THREAT DETECTION</span>
        <span className="text-dim">REC</span>
      </div>

      {/* left biometric bars */}
      <div
        className="absolute left-5 top-1/2 hidden -translate-y-1/2 sm:block"
        aria-hidden="true"
      >
        <p className="mb-2 font-mono text-[8px] tracking-[0.25em] text-dim uppercase">Signal</p>
        <div className="flex items-end gap-1.5">
          {FEED_BARS.map((v, i) => (
            <Bar key={i} value={v} index={i} color="#22d3ee" />
          ))}
        </div>
      </div>

      {/* right hud */}
      <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 sm:block" aria-hidden="true">
        <p className="mb-2 font-mono text-[8px] tracking-[0.25em] text-dim uppercase">HUD</p>
        <div className="space-y-2.5">
          {[
            { label: 'ID MATCH', value: 66, c: '#22d3ee' },
            { label: 'THREAT', value: 38, c: '#8b7cff' },
            { label: 'FEED', value: 84, c: '#4d7cff' },
          ].map((h) => (
            <div key={h.label} className="flex items-center gap-2">
              <span className="w-10 font-mono text-[8px] tracking-[0.18em] text-dim">
                {h.label}
              </span>
              <Bar value={h.value} index={1} color={h.c} />
            </div>
          ))}
        </div>
      </div>

      {/* rising particles */}
      {RISERS.map((r, i) => (
        <span
          key={i}
          className="absolute bottom-0 h-[3px] w-[3px] rounded-full bg-cyan/70 animate-rise"
          style={{ left: r.left, animationDelay: `${r.delay}s`, animationDuration: `${r.dur}s` }}
          aria-hidden="true"
        />
      ))}

      {/* bottom status */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-3">
        <span className="chip">
          <span className="h-1 w-1 rounded-full bg-cyan animate-pulse-dot" />
          Status: monitoring
        </span>
        <span className="chip">Scan active</span>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
    </div>
  )
}