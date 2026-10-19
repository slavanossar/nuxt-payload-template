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
    read: () => true,
  },
  admin: {
    group: '📷 Media',
    defaultColumns: ['filename', 'title', 'updatedAt'],
    enableRichTextRelationship: false,
  },
  upload: {
    staticDir: 'uploads/svgs',
    mimeTypes: ['image/svg+xml'],
  },
  hooks: {
    beforeOperation: [normaliseSvg],
  },
  fields: [],
}

export default Svgs
