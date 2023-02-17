import path from 'path'
import { buildConfig } from 'payload/config'

import * as collections from './collections'
import * as globals from './globals'
import { Icon, Logo } from './components'

const isDev = process.env.NODE_ENV !== 'production'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SITE_URL,
  debug: isDev,
  admin: {
    components: {
      graphics: {
        Icon,
        Logo,
      },
    },
    css: path.resolve(__dirname, './styles.css'),
    meta: {
      favicon: '/favicon/safari-pinned-tab.svg',
      titleSuffix: '| {{ SITE_TITLE }}',
    },
    user: collections.Users.slug,
  },
  routes: {
    api: '/_payload',
  },
  typescript: {
    outputFile: path.resolve(__dirname, '../types.d.ts'),
  },
  upload: {
    limits: {
      fileSize: 20000000,
    },
  },
  collections: Object.values(collections),
  globals: Object.values(globals),
})
