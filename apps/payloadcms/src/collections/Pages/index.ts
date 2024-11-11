import type { CollectionConfig } from 'payload'
import * as templates from './templates'
// import { livePreviewBreakpoints } from '@/utils'

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'template',
    defaultColumns: ['template', 'id'],
    // livePreview: {
    //   url: ({ data }) => {
    //     if (data.template === 'Home') {
    //       return process.env.PAYLOAD_PUBLIC_SITE_URL
    //     } else {
    //       return `${process.env.PAYLOAD_PUBLIC_SITE_URL}/${data.template.toLowerCase()}`
    //     }
    //   },
    //   breakpoints: livePreviewBreakpoints,
    // },
  },
  access: {
    create: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
    read: () => true,
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  versions: true,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page',
          fields: Object.values(templates),
        },
      ],
    },
    {
      name: 'template',
      type: 'select',
      required: true,
      unique: true,
      access: {
        update: ({ req: { user } }) => {
          return user?.role === 'admin'
        },
      },
      options: Object.keys(templates),
      admin: {
        description:
          'A template must be selected to display relevant page fields. Changing the template on existing pages will result in data loss.',
        position: 'sidebar',
      },
    },
  ],
}

export default Pages
