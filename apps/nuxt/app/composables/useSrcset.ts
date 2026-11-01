import type { ImageFragment } from '#graphql/exports'

export const useSrcset = (image: MaybeRef<ImageFragment | null | undefined>) => {
  return computed(() => {
    const srcset: string[] = []
    const current = toValue(image)

    if (current?.sizes) {
      Object.entries(current.sizes).forEach(([key, value]) => {
        if (value.url && value.width && key !== 'opengraph') {
          srcset.push(`${value.url} ${value.width}w`)
        }
      })
    }

    return srcset.join(', ')
  })
}
