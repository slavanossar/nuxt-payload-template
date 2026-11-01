import type { ImageBlock, VideoBlock } from '#payload-types'
import type { SrcsetSizes } from '~/components/payload/image/types'
import type { MuxResolution } from '~/components/payload/mux-video/types'

export interface PayloadBlockProps {
  block: ImageBlock | VideoBlock
  sizes?: SrcsetSizes
  minResolution?: MuxResolution
  maxResolution?: MuxResolution
}
