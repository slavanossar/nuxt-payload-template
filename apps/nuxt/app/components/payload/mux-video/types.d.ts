export type MuxResolution =
  '360p' | '540p' | '720p' | '1080p' | '1440p' | '2160p'

export interface MuxVideoProps {
  minResolution?: MuxResolution
  maxResolution?: MuxResolution
  video: MuxVideoFragment
}
