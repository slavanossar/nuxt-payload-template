import type { Image } from '#payload-types'

export interface SrcsetSizes {
  default: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}

export interface PayloadImageProps {
  image: string | Image
  lazy?: boolean
  sizes?: SrcsetSizes
}
