/** GSAP + plugin Flip, dimuat lazy sekali saja (dipakai gate dan pergantian mode). */
let lib: Promise<{ gsap: typeof import('gsap').gsap, Flip: typeof import('gsap/Flip').Flip }> | null = null

export function loadGsap() {
  lib ??= Promise.all([import('gsap'), import('gsap/Flip')]).then(([g, f]) => {
    g.gsap.registerPlugin(f.Flip)
    return { gsap: g.gsap, Flip: f.Flip }
  })
  return lib
}
