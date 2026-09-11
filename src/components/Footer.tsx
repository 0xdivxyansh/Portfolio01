import { socials } from '../data/site'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-white/4 font-display text-xs font-bold">
            <span className="text-gradient">DY</span>
          </span>
          <span className="font-display text-lg font-semibold text-ink">Divyansh Yadav</span>
        </div>

        <p className="font-mono text-[11px] tracking-[0.22em] text-sub uppercase">
          Computer Science (IoT) — Developer • AI Enthusiast • Problem Solver
        </p>

        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
              className="group font-mono text-[12px] tracking-[0.18em] text-sub uppercase transition-colors hover:text-ink"
            >
              {s.label}
              <span className="ml-1 inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ))}
        </div>

        <div className="flex w-full items-center justify-between border-t border-white/6 pt-6 font-mono text-[10px] tracking-[0.2em] text-dim uppercase">
          <span>© 2026 Divyansh Yadav</span>
          <span className="hidden sm:inline">Designed & built with React Three Fiber</span>
          <span className="hidden sm:inline">
            <span className="text-cyan">●</span> Open to work
          </span>
        </div>
      </div>
    </footer>
  )
}