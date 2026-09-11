import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { skills, categories, categoryMeta, coursework, type Skill, type SkillCategory } from '../data/skills'
import { EASE } from '../utils/motion'

const HUB_LABEL = 'SKILL MATRIX'

function usePositions() {
  return useMemo(() => {
    const map = new Map<string, { x: number; y: number }>()
    let i = 0
    for (const s of skills) {
      const angle = i * 137.5 * (Math.PI / 180)
      const band = (i % 4) / 4
      const r = 0.28 + band * 0.18
      map.set(s.name, {
        x: 50 + Math.cos(angle) * r * 100,
        y: 50 + Math.sin(angle) * r * 90,
      })
      i++
    }
    return map
  }, [])
}

export default function Skills() {
  const positions = usePositions()
  const [hovered, setHovered] = useState<string | null>(null)
  const [category, setCategory] = useState<SkillCategory | 'ALL'>('ALL')

  const hoveredSkill = skills.find((s) => s.name === hovered) ?? null
  const hoveredCategory = hoveredSkill?.category ?? null

  const isDim = (s: Skill) => {
    if (hoveredCategory && s.category !== hoveredCategory) return true
    if (category !== 'ALL' && s.category !== category) return true
    return false
  }
  const isActive = (s: Skill) => {
    if (hovered && s.name === hovered) return true
    if (hoveredCategory && s.category === hoveredCategory) return false
    return false
  }

  return (
    <section id="skills" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          label="Skills"
          title={
            <>
              Digital skill
              <br />
              <span className="text-gradient">constellation.</span>
            </>
          }
        />

        <div className="mt-14 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          {/* Category panel */}
          <Reveal className="w-full lg:w-64 lg:shrink-0">
            <div className="glass rounded-2xl p-5">
              <button
                onClick={() => setCategory('ALL')}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left font-mono text-[11px] tracking-[0.2em] uppercase transition-colors ${
                  category === 'ALL'
                    ? 'bg-white/6 text-ink'
                    : 'text-sub hover:bg-white/4 hover:text-ink'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                All systems
              </button>

              {categories.map((cat) => {
                const meta = categoryMeta[cat]
                const active = category === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(active ? 'ALL' : cat)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      active ? 'bg-white/6' : 'hover:bg-white/4'
                    }`}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: meta.color,
                        boxShadow: active ? `0 0 10px ${meta.glow}` : 'none',
                      }}
                    />
                    <span className="flex-1">
                      <span
                        className={`block font-mono text-[11px] tracking-[0.2em] uppercase ${
                          active ? 'text-ink' : 'text-sub'
                        }`}
                      >
                        {cat}
                      </span>
                      <span className="mt-0.5 block font-mono text-[9px] tracking-wide text-dim normal-case">
                        {meta.desc}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-6">
              <p className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase">
                Coursework
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {coursework.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Constellation */}
          <Reveal delay={0.12} className="flex-1">
            <div
              className="relative aspect-[4/3.4] overflow-hidden rounded-2xl border border-white/6 bg-[#060810] sm:aspect-[4/3]"
              style={{
                background:
                  'radial-gradient(ellipse 60% 55% at 50% 48%, rgba(77,124,255,0.09), transparent 70%)',
              }}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="pointer-events-none absolute inset-0 grid-lines opacity-50" />

              {/* concentric rings */}
              <>
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[95%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/4"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[30%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan/15 animate-spin-slow"
                  aria-hidden="true"
                />
              </>

              {/* connection lines */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {skills.map((s) => {
                  const p = positions.get(s.name)!
                  const dim = isDim(s)
                  const on = isActive(s)
                  const meta = categoryMeta[s.category]
                  return (
                    <line
                      key={s.name}
                      x1="50"
                      y1="50"
                      x2={p.x}
                      y2={p.y}
                      stroke={on ? meta.color : dim ? 'rgba(148,163,195,0.05)' : meta.color}
                      strokeOpacity={on ? 0.95 : dim ? 0.3 : 0.32}
                      strokeWidth={hovered ? (on ? 0.5 : 0.18) : 0.18}
                      style={{ transition: 'stroke-opacity 0.3s ease, stroke-width 0.3s ease' }}
                    />
                  )
                })}
              </svg>

              {/* hub */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative grid h-24 w-24 place-items-center rounded-full border border-white/10 bg-base/80">
                  <div className="absolute inset-0 rounded-full bg-cyan/10 blur-xl animate-core-pulse" />
                  <p className="relative px-3 text-center font-mono text-[9px] leading-relaxed tracking-[0.2em] text-cyan">
                    {HUB_LABEL}
                  </p>
                </div>
              </div>

              {/* nodes */}
              {skills.map((s, i) => {
                const p = positions.get(s.name)!
                const meta = categoryMeta[s.category]
                const dim = isDim(s)
                const active = isActive(s)
                return (
                  <motion.button
                    key={s.name}
                    onMouseEnter={() => setHovered(s.name)}
                    className="absolute"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      translateX: '-50%',
                      translateY: '-50%',
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: dim ? 0.4 : 1, scale: dim ? 0.92 : 1 }}
                    transition={{ duration: 0.5, delay: 0.03 * (i % 7), ease: EASE }}
                    whileHover={{ scale: 1.14, rotate: 2 }}
                  >
                    <span
                      className="flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase"
                      style={{
                        borderColor: active ? meta.color : 'rgba(255,255,255,0.12)',
                        background: active
                          ? 'rgba(255,255,255,0.06)'
                          : 'rgba(8,11,18,0.82)',
                        color: active ? '#fff' : '#a0a9c0',
                        boxShadow: active ? `0 0 22px -4px ${meta.glow}` : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background: meta.color,
                          boxShadow: active ? `0 0 8px ${meta.glow}` : 'none',
                        }}
                      />
                      {s.name}
                    </span>
                  </motion.button>
                )
              })}

              {hoveredSkill && (
                <motion.div
                  className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-mono text-[10px] tracking-[0.22em] text-cyan uppercase">
                    {hoveredSkill.name} :: {hoveredSkill.category}
                  </span>
                </motion.div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}