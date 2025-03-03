import type { GlobalConfig } from 'payload'

const Settings: GlobalConfig = {
  slug: 'settings',
  graphQL: {
    name: 'Settings',
  },
  typescript: {
    interface: 'Settings',
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

export default Settings
