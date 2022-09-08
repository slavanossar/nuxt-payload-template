export function generatePayloadImageSrcset({ transforms, url, width }) {
  return Object.values({
    ...transforms,
    ...(width <= 2400 && { original: { url, width } }),
  })
    .filter(({ url }) => url)
    .map(({ url, width }) => `${encodeURI(url)} ${width}w`)
    .join()
}
