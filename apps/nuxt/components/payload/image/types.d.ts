import type { Image } from '#payload/types'

export interface PayloadImageProps {
  image: string | Image
  lazy?: boolean
  sizes?: SrcsetSizes
}
