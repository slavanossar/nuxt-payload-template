import { livePreviewBreakpoints } from '~/utils'
import { isSuperAdmin } from '~/access'
import * as templates from './templates'

import type { CollectionConfig } from 'payload'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'template',
    group: '📄 Content',
    defaultColumns: ['template', 'id'],
    livePreview: {
      url: ({ data }) => {
        const url = new URL(process.env.NEXT_PUBLIC_SITE_URL)
        url.searchParams.append('preview', 'true')

        switch (data.template) {
          case 'Home':
            break
          default:
            url.pathname = `/${data.template.toLowerCase()}`
            break
        }

        console.log(url.toString())

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
      options: Object.keys(templates).map((key) => ({
        label: key.replace(/([A-Z])/g, ' $1').trim(),
        value: key,
      })),
      admin: {
        description:
          'A template must be selected to display relevant page fields. Changing the template on existing pages will result in data loss.',
        position: 'sidebar',
      },
    },
  ],
}

export default Pages
