export function applySvgPop(svg: SVGElement | null) {
  if (!svg) return

  let n = 0
  const mark = (el: Element) => {
    if (el.classList.contains('pop')) return
    el.classList.add('pop')
    const target = el as HTMLElement
    const ownOpacity = el.getAttribute('opacity')
    if (ownOpacity != null) {
      target.style.setProperty('--pop-opacity', ownOpacity)
    }
    target.style.transitionDelay = `${120 + n++ * 45}ms`
  }

  svg.querySelectorAll('g').forEach((g) => {
    if (g.closest('defs')) return
    if (g.children.length < 3 || g.children.length > 30) return
    Array.from(g.children).forEach(mark)
  })
}
