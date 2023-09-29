import type { GlobalConfig } from 'payload/types'

const Site: GlobalConfig = {
  slug: 'site',
  label: 'Site',
  access: {
    read: (_) => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [],
    },
  ],
}

export default Site
