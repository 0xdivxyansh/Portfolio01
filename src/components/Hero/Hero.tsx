import { lazy, Suspense, useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import Magnetic from '../Magnetic'
import { site } from '../../data/site'
import { scrollToId } from '../../utils/smoothScroll'
import { EASE } from '../../utils/motion'

const HeroScene = lazy(() => import('../3d/HeroScene'))

const containerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
}

const itemUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
}

function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemUp}>
      {children}
    </motion.div>
  )
}

const HUD_CHIPS = [
  { label: 'AI', position: 'left-[6%] top-[12%]', delay: '0s' },
  { label: 'VISION', position: 'left-[-4%] top-[46%] sm:left-[-2%]', delay: '1.2s' },
  { label: 'WEB', position: 'left-[14%] bottom-[10%]', delay: '2.4s' },
  { label: 'IoT', position: 'right-[4%] top-[18%]', delay: '0.8s' },
  { label: 'SYSTEMS', position: 'right-[10%] bottom-[16%]', delay: '1.9s' },
]

export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const goToWork = () => scrollToId('projects')
  const goToContact = () => scrollToId('contact')

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20 lg:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="grid-lines absolute inset-0 opacity-70" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-4">
        {/* Scene — on top for mobile, right for desktop */}
        <motion.div
          className="relative order-1 h-[46vh] min-h-[320px] lg:order-2 lg:h-[74vh] lg:min-h-[560px]"
          style={{ y: sceneY, scale: sceneScale, opacity: sceneOpacity }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0 lg:inset-y-[6%] lg:right-0 lg:left-[4%]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
          >
            <div className="absolute inset-0 lg:hidden opacity-50">
              <Suspense fallback={null}>
                <HeroScene />
              </Suspense>
            </div>
            <div className="absolute inset-0 hidden lg:block">
              <Suspense fallback={null}>
                <HeroScene />
              </Suspense>
            </div>
          </motion.div>

          {HUD_CHIPS.map((chip) => (
            <motion.span
              key={chip.label}
              className={`hud-chip animate-floaty ${chip.position} hidden sm:inline-flex`}
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              style={{ animationDelay: chip.delay }}
            >
              <b>◆</b> {chip.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Copy */}
        <motion.div
          className="order-2 lg:order-1"
          style={{ y: textY, opacity: textOpacity }}
          variants={containerStagger}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
        >
          <RevealItem>
            <p className="font-mono text-[11px] tracking-[0.3em] text-sub uppercase">
              VIT · VELLORE, INDIA — <span className="text-cyan">B.TECH CSE (IoT)</span>
            </p>
          </RevealItem>

          <RevealItem className="mt-6">
            <h1 className="font-display text-[clamp(2.6rem,7.5vw,5.2rem)] font-bold leading-[0.98] tracking-tight text-ink">
              DIVYANSH
              <br />
              <span className="text-gradient">YADAV</span>
            </h1>
          </RevealItem>

          <RevealItem className="mt-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[12px] tracking-[0.22em] text-sub uppercase">
              <span className="text-ink">Computer Science (IoT) Student</span>
              <span className="text-dim">/</span>
              <span>Developer</span>
              <span className="text-dim">•</span>
              <span>AI Enthusiast</span>
              <span className="text-dim">•</span>
              <span>Problem Solver</span>
            </div>
          </RevealItem>

          <RevealItem className="mt-6">
            <h2 className="font-display text-[clamp(1.5rem,3.6vw,2.6rem)] font-semibold leading-[1.1]">
              Building <span className="text-gradient">intelligent</span>
              <br />
              digital experiences.
            </h2>
          </RevealItem>

          <RevealItem className="mt-6 max-w-xl">
            <p className="text-[15px] leading-relaxed text-sub">
              Computer Science undergraduate at VIT building software, AI-powered systems and
              interactive digital experiences.
            </p>
          </RevealItem>

          <RevealItem className="mt-9">
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic>
                <button onClick={goToWork} className="btn btn-primary">
                  <span className="btn-shine" aria-hidden="true" />
                  View my work
                  <span aria-hidden="true">→</span>
                </button>
              </Magnetic>
              <Magnetic>
                <button onClick={goToContact} className="btn btn-ghost">
                  Contact me
                  <span aria-hidden="true">↗</span>
                </button>
              </Magnetic>
            </div>
          </RevealItem>

          <RevealItem className="mt-9">
            <div className="flex items-center gap-5">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="group font-mono text-[12px] tracking-[0.18em] text-sub uppercase transition-colors hover:text-ink"
              >
                GitHub
                <span className="ml-1 inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group font-mono text-[12px] tracking-[0.18em] text-sub uppercase transition-colors hover:text-ink"
              >
                LinkedIn
                <span className="ml-1 inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
              <a
                href={site.mailto}
                className="group font-mono text-[12px] tracking-[0.18em] text-sub uppercase transition-colors hover:text-ink"
              >
                Email
                <span className="ml-1 inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </div>
          </RevealItem>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <button
          onClick={goToWork}
          className="flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-sub uppercase transition-colors hover:text-ink"
          aria-label="Scroll to explore"
        >
          <span>Scroll to explore</span>
          <span className="relative h-9 w-px overflow-hidden bg-white/10">
            <motion.span
              className="absolute top-0 h-4 w-px bg-cyan"
              animate={{ y: [0, 36] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </button>
      </motion.div>
    </section>
  )
}