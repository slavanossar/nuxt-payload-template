import type { Image } from '#payload/types'

export const useSrcset = (image: Ref<Image | null>) => {
  return computed(() => {
    const srcset: string[] = []

    if (image.value?.sizes) {
      Object.values(image.value.sizes).forEach((value) => {
        if (value.url) {
          srcset.push(`${value.url} ${value.width}w`)
        }
      })
    }

    return srcset.join(', ')
  })
}
