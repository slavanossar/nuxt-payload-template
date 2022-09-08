export default {
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
    staticDir: 'payload/uploads/videos',
    mimeTypes: ['video/mp4'],
  },
}
