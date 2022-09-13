// import type { ImageFragment } from '@/payload-types'

// export function useGeneratePayloadImageSrcset({
//   transforms,
//   url,
//   width,
// }: ImageFragment): string {
//   return Object.values({
//     ...transforms,
//     ...(width <= 2400 && { original: { url, width } }),
//   })
//     .filter(({ url }) => url)
//     .map(({ url, width }) => `${encodeURI(url)} ${width}w`)
//     .join()
// }
