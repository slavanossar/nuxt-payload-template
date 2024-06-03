import type { Image } from '#payload/types'

export interface PayloadImageProps {
  aspectRatio?: AspectRatio
  image: string | Image
  lazy?: boolean
  sizes?: SrcsetSizes
}
