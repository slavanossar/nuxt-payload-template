import type { ImageFragment } from '#graphql/exports'

export interface SrcsetSizes {
  default: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}

export interface PayloadImageProps {
  image: ImageFragment
  lazy?: boolean
  sizes?: SrcsetSizes
}
