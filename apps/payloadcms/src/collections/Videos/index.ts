import { hashFilename } from '@payload/hooks'
import {
  cleanUpVideoThumbnail,
  deleteVideoThumbnail,
  generateVideoThumbnail,
} from './hooks'

import type { CollectionConfig } from 'payload'
import { uploadTitle } from '@payload/fields'

const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    read: () => true,
  },
  admin: {
    group: '📷 Media',
    useAsTitle: 'title',
    defaultColumns: ['filename', 'title', 'updatedAt'],
    enableRichTextRelationship: false,
  },
  upload: {
    staticDir: 'uploads/videos',
    mimeTypes: ['video/mp4'],
    adminThumbnail: ({ doc }) => (doc.adminThumbnailURL as string) || null,
  },
  hooks: {
    beforeOperation: [generateVideoThumbnail, hashFilename],
    afterChange: [cleanUpVideoThumbnail],
    afterDelete: [deleteVideoThumbnail],
  },
  fields: [
    uploadTitle,
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'videoThumbnails',
      required: true,
      admin: { hidden: true },
    },
    {
      name: 'adminThumbnailURL',
      type: 'text',
      required: true,
      admin: { hidden: true },
    },
  ],
}

export default Videos
