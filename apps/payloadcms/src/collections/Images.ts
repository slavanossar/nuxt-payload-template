import type { CollectionConfig, ImageSize } from 'payload'

const thumbnailSize: ImageSize = {
  name: 'thumbnail',
  width: 320,
  withoutEnlargement: false,
  formatOptions: {
    format: 'webp',
    options: {
      quality: 80,
    },
  },
  admin: {
    disableListColumn: true,
    disableListFilter: true,
  },
}

const opengraphSize: ImageSize = {
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
  admin: {
    disableListColumn: true,
    disableListFilter: true,
  },
}

const Images: CollectionConfig = {
  slug: 'images',
  access: {
    read: () => true,
  },
  admin: {
    group: '🖼️ Media',
    defaultColumns: ['filename', 'title', 'updatedAt'],
  },
  upload: {
    staticDir: 'uploads/images',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    crop: true,
    focalPoint: true,
    adminThumbnail: 'thumbnail',
    imageSizes: [thumbnailSize, opengraphSize],
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
