import { ObjectDirective } from 'nuxt/dist/app/compat/capi'

/**
 * v-scroll
 * Attaches scroll listener on `window` and triggers callback
 * @value callback function, listener removed if `true` returned
 *   @param el
 *   @param scrollTop value
 * @modifier self: attaches listener to `el` instead of `window`
 */

const map = new Map()

function removeEventListener(targetEl, mapKey) {
  targetEl.removeEventListener('scroll', map.get(mapKey))
  map.delete(mapKey)
}

const vScroll = (): ObjectDirective<HTMLElement, Function> => ({
  mounted(el, { modifiers, value }) {
    const targetEl = modifiers?.self ? el : window

    // Check passive event support
    let supportsPassive = false

    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          supportsPassive = true
          return supportsPassive
        },
      })

      window.addEventListener('testPassive', null, opts)
      window.removeEventListener('testPassive', null, opts)
    } catch (e) {
      supportsPassive = false
    }

    // Get scroll position
    const scrollTop = () => {
      return (
        window.pageYOffset ||
        (document.documentElement.clientHeight
          ? document.documentElement.scrollTop
          : document.body.scrollTop) ||
        0
      )
    }

    map.set(el, () => {
      if (value(el, modifiers.self ? el.scrollTop : scrollTop())) {
        removeEventListener(targetEl, el)
      }
    })

    // Bind to scroll
    targetEl.addEventListener(
      'scroll',
      map.get(el),
      supportsPassive ? { passive: true } : false,
    )

    // Trigger callback on bind
    nextTick(map.get(el))
  },
  beforeUnmount(el, { modifiers }) {
    removeEventListener(modifiers?.self ? el : window, el)
  },
})

export default vScroll
