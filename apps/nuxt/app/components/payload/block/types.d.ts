import type { ImageBlock, VideoBlock } from '#payload-types'
import type { MuxResolution } from '~/components/payload/mux-video/types'

export interface PayloadBlockProps {
  block: ImageBlock | VideoBlock
  sizes?: string
  minResolution?: MuxResolution
  maxResolution?: MuxResolution
}
