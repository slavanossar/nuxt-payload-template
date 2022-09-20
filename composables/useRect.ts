interface Rect {
  width: number
  height: number
  top: number
  left: number
  right: number
  bottom: number
  midX: number
  midY: number
  isVisible: boolean
  normalised: {
    width: number
    height: number
    top: number
    left: number
    right: number
    bottom: number
    midX: number
    midY: number
    visible: number
  }
}

export default function (el: HTMLElement): Rect {
  const r = el.getBoundingClientRect()
  const visible =
    Math.min(
      window.innerHeight,
      Math.max(0, Math.min(window.innerHeight, r.bottom) - Math.max(0, r.top)),
    ) / r.height

  const midX = r.left + r.width / 2
  const midY = r.top + r.height / 2

  const rect = {
    width: r.width,
    height: r.height,
    top: r.top,
    left: r.left,
    right: r.right,
    bottom: r.bottom,
    midX,
    midY,
    isVisible: !!visible,
    normalised: {
      width: r.width / window.innerWidth,
      height: r.height / window.innerHeight,
      top: r.top / window.innerHeight,
      left: r.left / window.innerWidth,
      right: r.right / window.innerWidth,
      bottom: r.bottom / window.innerHeight,
      midX: midX / window.innerWidth,
      midY: midY / window.innerHeight,
      visible,
    },
  }

  return rect
}
