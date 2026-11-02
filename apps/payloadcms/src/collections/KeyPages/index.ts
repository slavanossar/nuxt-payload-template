import { livePreviewBreakpoints } from '~/utils'
import { isSuperAdmin } from '~/access'
import * as templates from './templates'

import type { CollectionConfig, FieldHook } from 'payload'
import type { KeyPage } from '#payload-types'

const uriMappings: Record<KeyPage['template'], string> = {
  Home: '/',
}

const KeyPages: CollectionConfig = {
  slug: 'key-pages',
  admin: {
    useAsTitle: 'keyPageTitle',
    group: '📄 Content',
    defaultColumns: ['keyPageTitle', 'keyPageUri', 'id'],
    livePreview: {
      url: ({ data }) => {
        const url = new URL(process.env.NEXT_PUBLIC_SITE_URL)
        url.searchParams.append('preview', 'true')

        const template = data.template as KeyPage['template'] | undefined
        const pathname = template ? uriMappings[template] : '/'

        if (pathname && pathname !== '/') url.pathname = pathname

        return url.toString()
      },
      breakpoints: livePreviewBreakpoints,
    },
  },
  defaultSort: 'keyPageTitle',
  access: {
    create: isSuperAdmin,
    read: () => true,
    delete: isSuperAdmin,
  },
  versions: {
    maxPerDoc: 20,
  },
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
      name: 'keyPageTitle',
      label: 'Title',
      type: 'text',
      required: true,
      hooks: {
        beforeValidate: [
          (({ data }) => {
            if (!data?.template) return ''

            return data.template.replace(/([A-Z])/g, ' $1').trim()
          }) as FieldHook<KeyPage>,
        ],
      },
      admin: {
        hidden: true,
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'keyPageUri',
      label: 'URI',
      type: 'text',
      virtual: true,
      hooks: {
        afterRead: [
          (({ data }) => {
            return data?.template ? uriMappings[data?.template] : '/'
          }) as FieldHook<KeyPage>,
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

export default KeyPages
