import { breakpointsTailwind } from '@vueuse/core'

import type { Image } from '#payload-types'
import type { SrcsetSizes } from './types'

export const useSrcset = (image: Ref<Image | null>) =>
  computed(() => {
    const srcset: string[] = []

    if (image.value?.sizes) {
      Object.values(image.value.sizes).forEach((value) => {
        if (value.url && value.width) {
          srcset.push(`${value.url} ${value.width}w`)
        }
      })
    }

    return srcset.join(', ')
  })

type BreakpointLabel = keyof typeof breakpointsTailwind

export const srcsetSizesToAttribute = (sizes: SrcsetSizes) => {
  return Object.entries(sizes)
    .sort(
      ([keyA], [keyB]) =>
        (keyB === 'default'
          ? 0
          : breakpointsTailwind[keyB as BreakpointLabel]) -
        (keyA === 'default' ? 0 : breakpointsTailwind[keyA as BreakpointLabel]),
    )
    .map(([key, value]) => {
      return `${key === 'default' ? '' : `(min-width: ${breakpointsTailwind[key as BreakpointLabel]}px) `}${value}`
    })
    .join(', ')
}
