import type { Image } from '#payload/types'

export default function ({ sizes }: Image): string {
  return sizes
    ? Object.entries(sizes)
        .filter(([name, { url }]) => url && name !== 'opengraph')
        .map(([_, { url, width }]) => `${encodeURI(url!)} ${width}w`)
        .join()
    : ''
}
