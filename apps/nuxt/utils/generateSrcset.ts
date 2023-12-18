import type { Image } from '#payload/types'

export default function ({ webp }: Image): string {
  return webp?.sizes
    ? Object.entries(webp.sizes)
        .filter(([name, { url }]) => url && name !== 'opengraph')
        .map(([_, { url, width }]) => `${encodeURI(url!)} ${width}w`)
        .join()
    : ''
}
