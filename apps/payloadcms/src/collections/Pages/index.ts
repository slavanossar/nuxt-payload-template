import { livePreviewBreakpoints } from '@payload/utils'
import { isSuperAdmin } from '@payload/access'
import * as PageTemplates from './templates'

import type { CollectionConfig } from 'payload'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'template',
    group: '📄 Content',
    defaultColumns: ['template', 'id'],
    livePreview: {
      url: ({ data, req }) => {
        const url = new URL(req.payload.config.serverURL)
        url.searchParams.append('preview', 'true')

        switch (data.template) {
          case 'Home':
            break
          default:
            url.pathname = `/${data.template.toLowerCase()}`
            break
        }

        return url.toString()
      },
      breakpoints: livePreviewBreakpoints,
    },
  },
  defaultSort: 'template',
  access: {
    create: isSuperAdmin,
    read: () => true,
    update: ({ req: { user } }) => !!user,
    delete: isSuperAdmin,
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
      name: 'template',
      type: 'select',
      required: true,
      unique: true,
      access: {
        update: ({ req: { user } }) => {
          return user?.role === 'admin'
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
