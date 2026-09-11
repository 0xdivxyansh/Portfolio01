import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard from './TiltCard'
import Magnetic from './Magnetic'
import ThreatDetectionVisual from './ThreatDetectionVisual'
import HospitalQueueVisual from './HospitalQueueVisual'
import ProjectModal from './ProjectModal'
import { projects, type Project } from '../data/projects'
import { EASE } from '../utils/motion'

function ProjectVisual({ type }: { type: Project['visual'] }) {
  if (type === 'threat') return <ThreatDetectionVisual />
  return <HospitalQueueVisual />
}

function ProjectBlock({ project, flip }: { project: Project; flip: boolean }) {
  const [open, setOpen] = useState(false)
  const visual = (
    <button
      onClick={() => setOpen(true)}
      className="group block w-full text-left"
      data-cursor-label="OPEN"
      aria-label={`Open case study for ${project.title}`}
    >
      <div className="relative">
        <TiltCard className="w-full">
          <div className="relative rounded-2xl transition-shadow duration-500 group-hover:shadow-[0_30px_90px_-30px_rgba(77,124,255,0.5)]">
            <ProjectVisual type={project.visual} />
            <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
                <span className="glass rounded-full px-5 py-2.5 font-mono text-[11px] tracking-[0.25em] text-cyan uppercase">
                  ◉ Open case study
                </span>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </button>
  )

  const copy = (
    <div className="flex flex-col justify-center">
      <p className="font-mono text-[11px] tracking-[0.3em] text-cyan uppercase">
        Project {project.index}
      </p>
      <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {project.title}
      </h3>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <p className="mt-5 leading-relaxed text-sub">{project.description}</p>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Magnetic>
          <button onClick={() => setOpen(true)} className="btn btn-primary">
            <span className="btn-shine" aria-hidden="true" />
            Case study <span aria-hidden="true">→</span>
          </button>
        </Magnetic>
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="group font-mono text-[12px] tracking-[0.18em] text-sub uppercase transition-colors hover:text-ink"
          >
            GitHub
            <span className="ml-1 inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        ) : null}
      </div>
    </div>
  )

  return (
    <>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {flip ? (
          <>
            <Reveal className="order-2 lg:order-1">{visual}</Reveal>
            <Reveal className="order-1 lg:order-2" delay={0.08}>
              {copy}
            </Reveal>
          </>
        ) : (
          <>
            <Reveal>{copy}</Reveal>
            <Reveal delay={0.08}>{visual}</Reveal>
          </>
        )}
      </div>
      <AnimatePresence>
        {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          label="Projects"
          title={
            <>
              Selected
              <br />
              <span className="text-gradient">work.</span>
            </>
          }
        />

        <div className="mt-6">
          <Reveal>
            <p className="max-w-xl text-sub">
              Systems I have designed and built — from computer vision to scheduling
              infrastructure. Each project opens as a full case study.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-28 lg:space-y-40">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <ProjectBlock project={project} flip={i % 2 === 1} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}