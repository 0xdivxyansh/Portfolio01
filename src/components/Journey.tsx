import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { EASE } from '../utils/motion'

const MILESTONES = [
  {
    period: '2020 — 2021',
    school: 'B.D Public School',
    degree: 'Secondary Education',
    metric: '89.0%',
    note: 'Schooling foundations',
  },
  {
    period: '2021 — 2023',
    school: 'St. Paul High School',
    degree: 'Senior Secondary',
    metric: '88.8%',
    note: 'Senior secondary',
  },
  {
    period: '2023 — 2027',
    school: 'Vellore Institute of Technology',
    degree: 'B.Tech Computer Science (IoT)',
    metric: 'CGPA 9.03',
    note: 'Undergraduate current',
  },
]

export default function Journey() {
  const lineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 78%', 'end 55%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="journey" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          label="Journey"
          title={
            <>
              The path
              <br />
              <span className="text-gradient">so far.</span>
            </>
          }
        />

        <div ref={lineRef} className="relative mt-20">
          {/* track */}
          <div className="absolute left-5 top-0 h-full w-px bg-white/8 sm:left-1/2 sm:-translate-x-1/2" />
          {/* draw */}
          <motion.div
            className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-electric via-cyan to-violet sm:left-1/2 sm:-translate-x-1/2"
            style={{ scaleY, boxShadow: '0 0 18px rgba(34,211,238,0.5)' }}
            aria-hidden="true"
          />

          <div className="space-y-16 sm:space-y-24">
            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={m.period}
                  className={`relative grid gap-6 pl-14 sm:grid-cols-2 sm:gap-10 sm:pl-0`}
                >
                  {/* node */}
                  <motion.span
                    className="absolute left-5 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-full border border-cyan bg-base sm:left-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{ boxShadow: '0 0 14px rgba(34,211,238,0.8)' }}
                    aria-hidden="true"
                  />

                  <div
                    className={isLeft ? 'sm:col-start-1 sm:text-right' : 'sm:col-start-2'}
                  >
                    <motion.article
                      className="glass inline-block w-full rounded-2xl p-6 sm:w-auto sm:max-w-md"
                      initial={{ opacity: 0, y: 40, x: isLeft ? -16 : 16 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: EASE }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="chip">0{i + 1}</span>
                        <span className="font-mono text-[11px] tracking-[0.22em] text-cyan">
                          {m.period}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                        {m.school}
                      </h3>
                      <p className="mt-1 text-sm text-sub">{m.degree}</p>
                      <p className="mt-1 text-sm text-dim">{m.note}</p>
                      <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-gradient uppercase">
                        {m.metric}
                      </p>
                    </motion.article>
                  </div>

                  <div
                    className={`hidden sm:block ${
                      isLeft ? 'sm:col-start-2' : 'sm:col-start-1'
                    }`}
                    aria-hidden="true"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}