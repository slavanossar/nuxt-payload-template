import type { GlobalConfig } from 'payload/types'

const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Settings',
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
