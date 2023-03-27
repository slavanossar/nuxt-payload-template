import type { CollectionConfig } from 'payload/types'

const Videos: CollectionConfig = {
  slug: 'videos',
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  access: {
    read: (_) => true,
  },
  admin: {
    enableRichTextRelationship: false,
  },
  upload: {
    staticURL: `${process.env.PAYLOAD_PUBLIC_UPLOAD_ROUTE}/videos`,
    staticDir: '../uploads/videos',
    mimeTypes: ['video/mp4'],
  },
  fields: [],
}

export default Videos
