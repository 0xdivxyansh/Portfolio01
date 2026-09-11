import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import { certifications } from '../data/certifications'

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="06"
          label="Certifications"
          title={
            <>
              Verified
              <br />
              <span className="text-gradient">credentials.</span>
            </>
          }
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {certifications.map((cert, i) => (
            <TiltCard
              key={cert.id}
              className="w-full"
              max={5}
              scale={1.01}
            >
              <article
                className="glass group relative h-full overflow-hidden rounded-2xl p-7"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-white/4 font-display text-sm font-bold text-gradient"
                    aria-hidden="true"
                  >
                    {cert.glyph}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-dim">
                    [{String(i + 1).padStart(2, '0')}]
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold leading-snug text-ink">
                  {cert.title}
                </h3>
                <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">
                  {cert.provider}
                </p>

                <div className="mt-6 flex items-center gap-2 border-t border-white/8 pt-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  <span className="font-mono text-[9px] tracking-[0.2em] text-sub uppercase">
                    Certificate earned
                  </span>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}