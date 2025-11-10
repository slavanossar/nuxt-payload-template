import type { GlobalConfig } from 'payload'

const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  graphQL: {
    name: 'SiteSettings',
  },
  typescript: {
    interface: 'SiteSettings',
  },
  admin: {
    group: '🌏 Globals',
  },
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

export default SiteSettings
