import type Lenis from 'lenis'

let _lenis: Lenis | null = null

export function setLenis(instance: Lenis | null): void {
  _lenis = instance
}

export function getLenis(): Lenis | null {
  return _lenis
}

export function scrollToId(target: string | HTMLElement, offset = -78): void {
  const el = typeof target === 'string' ? document.getElementById(target.replace(/^#/, '')) : target
  if (!el) return

  if (_lenis) {
    _lenis.scrollTo(el, { offset, duration: 1.25 })
    return
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}