import path from 'path'
import { buildConfig } from 'payload/config'
import seo from '@payloadcms/plugin-seo'
import computeBlurhash from 'payload-blurhash-plugin'

import * as collections from './collections'
import * as globals from './globals'
import { Icon, Logo } from './components'

const {
  NODE_ENV,
  PAYLOAD_PUBLIC_API_ROUTE,
  PAYLOAD_PUBLIC_SITE_NAME,
  PAYLOAD_PUBLIC_SITE_URL,
} = process.env

const isDev = NODE_ENV !== 'production'

export default buildConfig({
  serverURL: PAYLOAD_PUBLIC_SITE_URL,
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
      titleSuffix: `| ${PAYLOAD_PUBLIC_SITE_NAME}`,
    },
    user: collections.Users.slug,
  },
  collections: Object.values(collections),
  globals: Object.values(globals),
  routes: {
    api: PAYLOAD_PUBLIC_API_ROUTE,
  },
  typescript: {
    outputFile: path.resolve(__dirname, '../types.d.ts'),
  },
  upload: {
    limits: {
      fileSize: 20000000,
    },
  },
  plugins: [
    seo({
      collections: ['pages'],
      uploadsCollection: 'images',
      // generateTitle: ({ doc }) => `${doc?.title?.value} | ${PAYLOAD_PUBLIC_SITE_NAME}`,
    }),
    computeBlurhash()
  ]
})
