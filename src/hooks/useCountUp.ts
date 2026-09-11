import { useEffect, useState } from 'react'

export function useCountUp(target: number, started: boolean, decimals = 2, duration = 1600): string {
  const [value, setValue] = useState('0.00')

  useEffect(() => {
    if (!started) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue((target * eased).toFixed(decimals))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, target, decimals, duration])

  return value
}