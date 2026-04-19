import type { Image } from '#payload-types'

export const useSrcset = (image: Ref<Image | null>) => {
  return computed(() => {
    const srcset: string[] = []

    if (image.value?.sizes) {
      Object.entries(image.value.sizes).forEach(([key, value]) => {
        if (value.url && value.width && key !== 'opengraph') {
          srcset.push(`${value.url} ${value.width}w`)
        }
      })
    }

    return srcset.join(', ')
  })
}
