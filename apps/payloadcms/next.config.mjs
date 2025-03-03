import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['ffmpeg-static'],
}

export default withPayload(nextConfig)
