import { hashFilename } from '@payload/hooks'

import type { CollectionConfig } from 'payload'

const VideoThumbnails: CollectionConfig = {
  slug: 'videoThumbnails',
  access: {
    read: () => true,
  },
  admin: {
    group: '📷 Media',
    hidden: true,
  },
  upload: {
    staticDir: 'uploads/video-thumbnails',
    mimeTypes: ['image/jpeg'],
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 320,
        height: 320,
        formatOptions: {
          format: 'jpeg',
          options: {
            quality: 90,
            force: true,
          },
        },
      },
    ],
  },
  hooks: {
    beforeOperation: [hashFilename],
  },
  fields: [],
}

export default VideoThumbnails
