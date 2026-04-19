import { livePreviewBreakpoints } from '~/utils'
import { isSuperAdmin } from '~/access'
import * as templates from './templates'

import type { CollectionConfig, FieldHook } from 'payload'
import type { TemplatePage } from 'payload-types'

const uriMappings: Record<TemplatePage['template'], string> = {
  Home: '/',
}

const TemplatePages: CollectionConfig = {
  slug: 'template-pages',
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
    {
      name: 'templatePageUri',
      label: 'URI',
      type: 'text',
      virtual: true,
      hooks: {
        afterRead: [
          (({ data }) => {
            return data?.template ? uriMappings[data?.template] : '/'
          }) as FieldHook<TemplatePage>,
        ],
      },
      admin: {
        hidden: true,
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
}

export default TemplatePages
