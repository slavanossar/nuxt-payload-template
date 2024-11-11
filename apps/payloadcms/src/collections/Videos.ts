import type { CollectionConfig } from 'payload'

const Videos: CollectionConfig = {
  slug: 'videos',
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  access: {
    read: () => true,
  },
  admin: {
    enableRichTextRelationship: false,
    group: 'Media',
  },
  upload: {
    staticDir: '../uploads/videos',
    mimeTypes: ['video/mp4'],
  },
  fields: [],
}

export default Videos
