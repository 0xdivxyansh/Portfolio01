import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { site } from '../data/site'
import { EASE } from '../utils/motion'

const EMAILJS_SERVICE_ID = 'service_9ed3jls'
const EMAILJS_TEMPLATE_ID = 'template_349ndmd'
const EMAILJS_PUBLIC_KEY = 'pSi3z8U5GzmNAh0kT'

const CHANNELS = [
  { label: 'Email', value: site.email, href: site.mailto },
  { label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/divyansh-yadav', href: site.linkedin },
  { label: 'GitHub', value: 'github.com/0xdivxyansh', href: site.github },
]

interface Errors {
  name?: string
  email?: string
  message?: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'

function ContactForm() {
  const form = useRef<HTMLFormElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const validate = (): Errors => {
    const errs: Errors = {}
    if (name.trim().length < 2) errs.name = 'Please enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Enter a valid email address'
    if (message.trim().length < 10) errs.message = 'Message should be at least 10 characters'
    return errs
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setMessage('')
    form.current?.reset()
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('sending')
    const formEl = form.current
    if (!formEl) {
      setStatus('error')
      return
    }
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formEl, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      setStatus('success')
      resetForm()
    } catch (error) {
      console.error('EmailJS send failed:', error)
      setStatus('error')
    }
  }

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white/3 px-4 py-3.5 text-sm text-ink placeholder-dim outline-none transition-colors duration-300 focus:bg-white/5 ${
      hasError
        ? 'border-red-400/50 focus:border-red-400/70'
        : 'border-white/10 focus:border-cyan/50'
    }`

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="space-y-5">
      <input
        type="hidden"
        name="subject"
        value={`Portfolio contact from ${name}`}
        aria-hidden="true"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-sub uppercase">
            Name
          </label>
          <input
            id="cf-name"
            name="user_name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={fieldClass(!!errors.name)}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-sub uppercase">
            Email
          </label>
          <input
            id="cf-email"
            name="user_email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={fieldClass(!!errors.email)}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-sub uppercase">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Tell me about your project or opportunity..."
          className={`${fieldClass(!!errors.message)} resize-none`}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
      </div>

      {status !== 'idle' && (
        <p
          aria-live="polite"
          className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
            status === 'success'
              ? 'text-emerald-400'
              : status === 'error'
                ? 'text-red-400'
                : 'text-dim'
          }`}
        >
          {status === 'sending'
            ? 'Sending your message...'
            : status === 'success'
              ? "Message sent successfully! I'll get back to you soon."
              : 'Something went wrong. Please try again.'}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
        disabled={status === 'sending'}
      >
        <span className="btn-shine" aria-hidden="true" />
        {status === 'sending' ? (
          'Sending...'
        ) : (
          <>
            Send message <span aria-hidden="true">→</span>
          </>
        )}
      </button>
      <p className="font-mono text-[10px] tracking-[0.2em] text-dim uppercase">
        Frontend only — delivered via EmailJS. No data is stored.
      </p>
    </form>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 lg:py-40">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(77,124,255,0.12), transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="07" label="Contact" />

        <div className="mt-12">
          <motion.h2
            className="font-display text-[clamp(2.4rem,7vw,4.8rem)] font-bold leading-[1.02] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            Let's build
            <br />
            <span className="text-gradient">something great.</span>
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <div className="space-y-2">
                {CHANNELS.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="group flex items-center justify-between rounded-xl border border-white/8 bg-white/2 px-5 py-4 transition-all duration-300 hover:border-cyan/40 hover:bg-cyan/4"
                  >
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase">
                        {c.label}
                      </p>
                      <p className="mt-1 text-sm text-ink group-hover:text-cyan sm:text-base">
                        {c.value}
                      </p>
                    </div>
                    <span className="text-dim transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 glass rounded-xl p-5">
                <p className="font-mono text-[11px] leading-relaxed tracking-wide text-sub">
                  <span className="text-cyan">//</span> Based in {site.location}. Currently open to
                  internships, collaborations and interesting engineering problems.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}