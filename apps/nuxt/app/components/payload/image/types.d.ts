import type { ImageFragment } from '#graphql/exports'

export interface PayloadImageProps {
  image: ImageFragment | null
  lazy?: boolean
  priority?: boolean
  /**
   * @nuxt/image `sizes` value, for example `100vw md:50vw xl:400px`.
   */
  sizes: string
}
