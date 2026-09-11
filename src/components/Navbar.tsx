import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { navLinks, site } from '../data/site'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { scrollToId } from '../utils/smoothScroll'

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'journey', 'contact']

export default function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(SECTION_IDS)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const goTo = (href: string) => {
    setOpen(false)
    const id = href.startsWith('#') ? href.slice(1) : href
    window.setTimeout(() => scrollToId(id), open ? 350 : 0)
  }

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled ? 'bg-base/70 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-xl' : ''
        } ${scrolled ? 'border-b border-white/8' : 'border-b border-transparent'}`}
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <button
            onClick={() => goTo('home')}
            className="group flex items-center gap-3"
            aria-label="Go to home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/4 font-display text-sm font-bold text-ink">
              <span className="text-gradient">DY</span>
            </span>
            <span className="hidden font-mono text-[11px] tracking-[0.3em] text-sub uppercase sm:inline">
              Divyansh
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link, i) => {
              const isActive = active === link.href.slice(1)
              return (
                <button
                  key={link.href}
                  onClick={() => goTo(link.href)}
                  className={`group relative rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                    isActive ? 'text-ink' : 'text-sub hover:text-ink'
                  }`}
                >
                  <span className="mr-1 text-[9px] text-dim">0{i + 1}</span>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-white/4"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="chip hidden md:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-dot" />
              Open to opportunities
            </span>

            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white/4 lg:hidden"
              aria-label="Open menu"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="h-px w-5 bg-ink" />
                <span className="h-px w-5 bg-ink" />
                <span className="h-px w-5 bg-ink" />
              </span>
            </button>
          </div>
        </nav>

        <motion.div
          className="h-px w-full origin-left bg-gradient-to-r from-electric via-cyan to-violet"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex flex-col bg-base/90 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <span className="font-mono text-[11px] tracking-[0.3em] text-sub uppercase">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white/4 text-ink"
                aria-label="Close menu"
              >
                <span className="text-lg leading-none">✕</span>
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-1 px-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => goTo(link.href)}
                  className="group flex items-baseline gap-4 py-3 text-left"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                  <span className="font-display text-4xl font-semibold tracking-tight text-ink transition-colors group-hover:text-electric">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.div
              className="border-t border-white/8 px-6 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <span className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-dot" />
                  Open to opportunities
                </span>
              </div>
              <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
                {site.email}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}