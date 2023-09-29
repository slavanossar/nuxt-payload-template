import path from 'path'
import { buildConfig } from 'payload/config'
import seo from '@payloadcms/plugin-seo'
import computeBlurhash from 'payload-blurhash-plugin'

import * as collections from './collections'
import * as globals from './globals'
import { Icon, Logo } from './components'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SITE_URL,
  debug: process.env.NODE_ENV !== 'production',
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
      titleSuffix: `| ${process.env.PAYLOAD_PUBLIC_SITE_NAME}`,
    },
    user: collections.Users.slug,
  },
  collections: Object.values(collections),
  globals: Object.values(globals),
  routes: {
    api: process.env.PAYLOAD_PUBLIC_API_ROUTE,
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
      globals: ['site'],
      uploadsCollection: 'images',
      // generateTitle: ({ doc }) => `${doc?.title?.value} | ${process.env.PAYLOAD_PUBLIC_SITE_NAME}`,
      tabbedUI: true,
    }),
    computeBlurhash(),
  ],
})
