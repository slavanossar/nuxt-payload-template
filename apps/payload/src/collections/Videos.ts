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
    staticURL: '/media/videos',
    staticDir: '../uploads/videos',
    mimeTypes: ['video/mp4'],
  },
  fields: [],
}

export default Videos
