import type { ImageFragment } from '@/payload-types'

export default function ({ transforms, url, width }: ImageFragment): string {
  const { opengraph, ...display } = transforms

  return Object.values({
    ...display,
    ...(width && width <= 2400 && { original: { url, width } }),
  })
    .filter(({ url }) => url)
    .map(({ url, width }) => `${encodeURI(url)} ${width}w`)
    .join()
}
