import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'
import { EASE } from '../utils/motion'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[400] flex items-end justify-center sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — case study`}
    >
      <div
        className="absolute inset-0 bg-base/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 m-3 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-panel/95 shadow-card sm:m-6"
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-panel/90 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold text-cyan">#{project.index}</span>
            <span className="font-mono text-[10px] tracking-[0.25em] text-sub uppercase">
              Case study
            </span>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/4 text-sub transition-colors hover:text-ink"
            aria-label="Close case study"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 sm:px-8 sm:py-8">
          <h3 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            {project.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 space-y-6">
            <section>
              <h4 className="font-mono text-[10px] tracking-[0.28em] text-cyan uppercase">
                Problem
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-sub">{project.problem}</p>
            </section>

            <section>
              <h4 className="font-mono text-[10px] tracking-[0.28em] text-cyan uppercase">
                Solution
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-sub">{project.solution}</p>
            </section>

            <section>
              <h4 className="font-mono text-[10px] tracking-[0.28em] text-cyan uppercase">
                Key features
              </h4>
              <ul className="mt-3 space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-sub">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="font-mono text-[10px] tracking-[0.28em] text-cyan uppercase">
                Implementation
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-sub">{project.implementation}</p>
            </section>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/8 pt-6">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <span className="btn-shine" aria-hidden="true" />
                View on GitHub <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            <button onClick={onClose} className="btn btn-ghost">
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}