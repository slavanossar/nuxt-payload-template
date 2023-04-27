import type { GlobalConfig } from 'payload/types'
import { image } from '../fields'

const Seo: GlobalConfig = {
  slug: 'seo',
  label: 'Seo',
  access: {
    read: (_) => true,
  },
  admin: {
    description: 'Global Meta and Opengraph settings, will be overriden by page-level settings.'
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'Meta Fields',
          fields: [
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              maxLength: 70,
              required: true,
            }
          ]
        },
        {
          name: 'opengraph',
          label: 'Opengraph',
          fields: [
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              maxLength: 70,
              required: true,
            },
            image(),
          ]
        }
      ]
    }
  ],
}

export default Seo
