import { uploadTitle } from '~/fields'
import { hashFilename } from '~/hooks'
import { normaliseSvg } from './hooks'

import type { CollectionConfig } from 'payload'

const Svgs: CollectionConfig = {
  slug: 'svgs',
  labels: {
    singular: 'SVG',
    plural: 'SVGs',
  },
  graphQL: {
    singularName: 'SVG',
    pluralName: 'SVGs',
  },
  typescript: {
    interface: 'SVG',
  },
  access: {
    read: (_) => true,
  },
  admin: {
    group: '📷 Media',
    useAsTitle: 'title',
    defaultColumns: ['filename', 'title', 'updatedAt'],
    enableRichTextRelationship: false,
  },
  upload: {
    staticDir: 'uploads/svgs',
    mimeTypes: ['image/svg+xml'],
  },
  hooks: {
    beforeOperation: [hashFilename, normaliseSvg],
  },
  fields: [uploadTitle],
}

export default Svgs
