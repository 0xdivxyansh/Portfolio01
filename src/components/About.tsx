import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { site } from '../data/site'
import { useCountUp } from '../hooks/useCountUp'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { EASE } from '../utils/motion'

const CODE_LINES: Array<[string, string]> = [
  ['const', ' engineer = {'],
  ['  name', ": 'Divyansh Yadav',"],
  ['  field', ": 'CSE · IoT',"],
  ['  cgpa', ': 9.03,'],
  ['  status', ": 'open_to_work',"],
  ['};', ''],
]

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null)
  const inView = useInView(statsRef, { once: true, margin: '-10% 0px' })
  const reduced = usePrefersReducedMotion()
  const cgpa = useCountUp(9.03, inView && !reduced, 2, 1500)

  return (
    <section id="about" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          label="About"
          title={
            <>
              Who I <span className="text-gradient">am.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — identity panel */}
          <Reveal>
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 left-0 font-display text-[9rem] font-bold leading-none text-white/[0.03] select-none"
              >
                A
              </span>

              <motion.div
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE }}
                className="glass relative overflow-hidden rounded-2xl p-7 sm:p-9"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-electric/15 blur-[70px]" />

                <div className="flex items-center justify-between">
                  <span className="chip">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-dot" />
                    System design
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase">
                    identity.cfg
                  </span>
                </div>

                <p className="mt-8 font-mono text-[12px] leading-[2] text-sub">
                  <span className="text-cyan">root@divyansh</span>
                  <span className="text-dim">:~$</span>{' '}
                  <span className="text-ink">whoami</span>
                  <br />
                  {CODE_LINES.map(([a, b], i) => (
                    <span key={i} className="block">
                      <span className="text-electric">{a}</span>
                      <span className="text-cyan">{b}</span>
                    </span>
                  ))}
                </p>

                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/8 pt-6">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase">
                      Base
                    </p>
                    <p className="mt-1 text-sm text-ink">{site.location}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase">
                      Degree
                    </p>
                    <p className="mt-1 text-sm text-ink">B.Tech CSE (IoT)</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase">
                      Focus
                    </p>
                    <p className="mt-1 text-sm text-ink">AI · Software · Web</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Right — description + stats */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink">
                Results-driven <span className="text-electric">Computer Science undergraduate</span>{' '}
                specializing in IoT with strong foundations in Data Structures, Algorithms, and
                Software Development.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 leading-relaxed text-sub">
                Experienced in building scalable web platforms using Java, Python, and React.js.
                Adept at problem-solving, teamwork, and delivering innovative solutions in
                fast-paced environments.
              </p>
            </Reveal>

            <div ref={statsRef} className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0, ease: EASE }}
                className="glass rounded-xl p-4 sm:p-5"
              >
                <p className="font-display text-2xl font-bold text-gradient tabular-nums sm:text-3xl">
                  {reduced ? '9.03' : cgpa}
                </p>
                <p className="mt-1.5 font-mono text-[10px] tracking-[0.22em] text-sub uppercase">
                  CGPA
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
                className="glass rounded-xl p-4 sm:p-5"
              >
                <p className="font-display text-2xl font-bold text-ink tabular-nums sm:text-3xl">
                  2023
                  <span className="mx-1 text-cyan">—</span>
                  <span className="text-gradient">27</span>
                </p>
                <p className="mt-1.5 font-mono text-[10px] tracking-[0.22em] text-sub uppercase">
                  VIT
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
                className="glass rounded-xl p-4 sm:p-5"
              >
                <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
                  CSE<span className="text-cyan">/</span>IoT
                </p>
                <p className="mt-1.5 font-mono text-[10px] tracking-[0.22em] text-sub uppercase">
                  Bachelor
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}