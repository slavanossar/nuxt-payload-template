import type { Image } from '#payload-types'

export type AspectRatio = 'auto' | 'square' | 'landscape' | 'portrait'

export interface SrcsetSizes {
  default: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}

export interface PayloadImageProps {
  aspectRatio?: AspectRatio
  image: string | Image
  lazy?: boolean
  sizes?: SrcsetSizes
}
