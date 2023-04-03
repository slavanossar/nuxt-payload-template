import type { Image } from '#payload/types'

export default function ({ sizes, url, width }: Image): string {
  return Object.values({
    ...sizes,
    ...(width && width <= 2400 && { original: { url, width } }),
  })
    .filter(({ url }) => url)
    .map(({ url, width }) => `${encodeURI(url!)} ${width}w`)
    .join()
}
