import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { education } from '../data/education'

export default function Education() {
  const [featured, ...rest] = education

  return (
    <section id="education" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          label="Education"
          title={
            <>
              Academic
              <br />
              <span className="text-gradient">foundation.</span>
            </>
          }
        />

        <div className="mt-16">
          {/* Featured */}
          <Reveal>
            <TiltCard className="w-full" max={3.5}>
              <article className="glass relative overflow-hidden rounded-2xl p-8 sm:p-12">
                <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-electric/15 blur-[80px]" />
                <div className="absolute right-5 top-5 hidden sm:block">
                  <span className="chip">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-dot" />
                    Current
                  </span>
                </div>

                <div className="grid gap-8 sm:grid-cols-[1.6fr_1fr] sm:items-center">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.28em] text-cyan uppercase">
                      Primary education
                    </span>
                    <h3 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                      {featured.institution}
                    </h3>
                    <p className="mt-2 text-lg text-sub">{featured.degree}</p>
                    <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
                      {featured.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-8 sm:flex-col sm:items-end sm:gap-3">
                    <div className="text-left sm:text-right">
                      <p className="font-display text-4xl font-bold text-gradient sm:text-5xl">
                        {featured.metric}
                      </p>
                      <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-sub uppercase">
                        {featured.metricLabel}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-mono text-lg tracking-[0.12em] text-ink">
                        {featured.period}
                      </p>
                      <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-dim uppercase">
                        Duration
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </TiltCard>
          </Reveal>

          {/* Others */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {rest.map((edu, i) => (
              <Reveal key={edu.id} delay={0.1 + i * 0.08}>
                <TiltCard className="h-full w-full" max={4}>
                  <article className="glass flex h-full flex-col justify-between gap-6 rounded-2xl p-7 sm:p-8">
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.28em] text-cyan uppercase">
                        {i === 0 ? 'Secondary' : 'School'} education
                      </span>
                      <h4 className="mt-3 font-display text-2xl font-semibold text-ink">
                        {edu.institution}
                      </h4>
                      <p className="mt-1 text-sub">{edu.degree}</p>
                    </div>
                    <div className="flex items-end justify-between border-t border-white/8 pt-5">
                      <div>
                        <p className="font-display text-2xl font-bold text-gradient">
                          {edu.metric}
                        </p>
                        <p className="mt-0.5 font-mono text-[9px] tracking-[0.2em] text-sub uppercase">
                          {edu.metricLabel}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-[12px] tracking-[0.15em] text-ink">
                          {edu.period}
                        </p>
                        <p className="mt-0.5 font-mono text-[9px] tracking-[0.2em] text-dim uppercase">
                          {edu.location}
                        </p>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}