import type { CollectionConfig } from 'payload/types'

import { slug } from '../fields'
import * as PageTemplates from '../pages'

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'id', 'template'],
  },
  access: {
    create: ({ req: { user } }) => {
      return user.role === 'admin'
    },
    read: () => true,
    update: ({ req: { user } }) => {
      return user
    },
    delete: ({ req: { user } }) => {
      return user.role === 'admin'
    },
  },
  versions: true,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page',
          fields: Object.values(PageTemplates),
        },
      ],
    },
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
      access: {
        update: ({ req: { user } }) => {
          return user.role === 'admin'
        },
      },
      admin: { position: 'sidebar' },
    },
    slug('title'),
    {
      name: 'template',
      label: 'Template',
      type: 'select',
      required: true,
      access: {
        update: ({ req: { user } }) => {
          return user.role === 'admin'
        },
      },
      options: Object.keys(PageTemplates),
      admin: {
        description:
          'A template must be selected to display relevant page fields. Changing the template on existing pages will result in data loss.',
        position: 'sidebar',
      },
    },
  ],
}

export default Pages
