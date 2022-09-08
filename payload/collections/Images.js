export default {
  slug: 'images',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  access: {
    read: (_) => true,
  },
  upload: {
    staticURL: '/media/images',
    staticDir: 'payload/uploads/images',
    imageSizes: [
      {
        name: 'xs',
        width: 320,
      },
      {
        name: 'sm',
        width: 640,
      },
      {
        name: 'md',
        width: 960,
      },
      {
        name: 'lg',
        width: 1200,
      },
      {
        name: 'xl',
        width: 1600,
      },
      {
        name: 'xxl',
        width: 2000,
      },
      {
        name: 'xxxl',
        width: 2400,
      },
    ],
    adminThumbnail: 'xs',
    mimeTypes: ['image/jpeg', 'image/png'],
  },
  fields: [
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      admin: {
        description:
          'For vision-impaired users with screen readers, this is more descriptive than a caption.',
      },
    },
  ],
}
