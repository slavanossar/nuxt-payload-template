import { uploadTitle } from '~/fields'
import { hashFilename } from '~/hooks'

import type { CollectionConfig, ImageSize } from 'payload'
import type { Image } from 'payload-types'

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
  access: {
    read: (_) => true,
  },
  admin: {
    group: '📷 Media',
    useAsTitle: 'title',
    defaultColumns: ['filename', 'title', 'updatedAt'],
  },
  upload: {
    staticDir: 'uploads/images',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    adminThumbnail: ({ doc }) =>
      (doc as unknown as Image).sizes?.xs?.url || null,
    imageSizes: [
      ...Object.entries(sizes).map<ImageSize>(([name, width]) => {
        return {
          name,
          width,
          formatOptions: {
            format: 'jpeg',
          },
        }
      }),
      {
        name: 'opengraph',
        width: 1200,
        height: 630,
        withoutEnlargement: false,
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
  fields: [
    uploadTitle,
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
