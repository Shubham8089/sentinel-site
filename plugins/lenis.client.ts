import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduced) {
    return { provide: { lenis: null as Lenis | null } }
  }

  const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 })

  let frame = 0
  const loop = (time: number) => {
    lenis.raf(time)
    frame = requestAnimationFrame(loop)
  }
  frame = requestAnimationFrame(loop)

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    })
  }

  return { provide: { lenis: lenis as Lenis | null } }
})
