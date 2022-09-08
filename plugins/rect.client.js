export default defineNuxtPlugin(() => {
  const rect = (el) => {
    const r = el.getBoundingClientRect()
    const visible =
      Math.min(
        window.innerHeight,
        Math.max(
          0,
          Math.min(window.innerHeight, r.bottom) - Math.max(0, r.top),
        ),
      ) / r.height

    const rect = {
      width: r.width,
      height: r.height,
      top: r.top,
      left: r.left,
      right: r.right,
      bottom: r.bottom,
      midX: r.left + r.width / 2,
      midY: r.top + r.height / 2,
      isVisible: !!visible,
    }

    rect.normalised = {
      width: rect.width / window.innerWidth,
      height: rect.height / window.innerHeight,
      top: rect.top / window.innerHeight,
      left: rect.left / window.innerWidth,
      right: rect.right / window.innerWidth,
      bottom: rect.bottom / window.innerHeight,
      midX: rect.midX / window.innerWidth,
      midY: rect.midY / window.innerHeight,
      visible,
    }

    return rect
  }

  return {
    provide: { rect },
  }
})
