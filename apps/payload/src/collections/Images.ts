import type { CollectionConfig } from 'payload/types'
import type { ImageSize } from 'payload/types'

const sizes = {
  xs: 320,
  sm: 640,
  md: 960,
  lg: 1200,
  xl: 1600,
  xxl: 2000,
  xxxl: 2400,
}

const Images: CollectionConfig = {
  slug: 'images',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Media',
  },
  upload: {
    staticURL: `${process.env.PAYLOAD_PUBLIC_UPLOAD_ROUTE}/images`,
    staticDir: '../uploads/images',
    adminThumbnail: 'xs',
    imageSizes: [
      ...Object.entries(sizes).map(([name, width]) => {
        return {
          name,
          width,
          formatOptions: {
            format: 'webp' as ImageSize['formatOptions']['format'],
            options: {
              nearLossless: true,
              quality: 75,
              force: true,
            },
          },
        }
      }),
      {
        name: 'opengraph',
        width: 1200,
        height: 630,
      },
    ],
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
  fields: [
    {
      name: 'description',
      type: 'text',
      admin: {
        description:
          'For vision-impaired users with screen readers, this is more descriptive than a caption.',
      },
    },
  ],
}

export default Images
