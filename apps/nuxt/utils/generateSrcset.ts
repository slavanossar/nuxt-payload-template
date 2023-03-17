import type { Image } from '@/payload/types'

export default function ({ sizes, url, width }: Image): string {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { opengraph, ...display } = sizes

  return Object.values({
    ...display,
    ...(width && width <= 2400 && { original: { url, width } }),
  })
    .filter(({ url }) => url)
    .map(({ url, width }) => `${encodeURI(url!)} ${width}w`)
    .join()
}
