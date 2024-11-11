import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { seoPlugin } from '@payloadcms/plugin-seo'
import blurhash from 'payload-blurhash-plugin'

import * as collections from './collections'
import * as globals from './globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SITE_URL,
  secret: process.env.PAYLOAD_SECRET,
  debug: process.env.NODE_ENV !== 'production',
  admin: {
    components: {
      graphics: {
        Icon: {
          path: 'src/graphics/Icon.tsx',
        },
        Logo: {
          path: 'src/graphics/Logo.tsx',
        },
      },
    },
    // css: path.resolve(__dirname, './styles.css'),
    meta: {
      // favicon: '/favicon/safari-pinned-tab.svg',
      titleSuffix: `| ${process.env.PAYLOAD_PUBLIC_SITE_NAME}`,
    },
    user: collections.Users.slug,
  },
  db: mongooseAdapter({
    url: `mongodb://0.0.0.0/${process.env.DATABASE_NAME}`,
  }),
  editor: lexicalEditor({}),
  collections: Object.values(collections),
  globals: Object.values(globals),
  graphQL: {
    disable: true,
  },
  // routes: {
  //   api: process.env.PAYLOAD_PUBLIC_API_ROUTE,
  // },
  sharp,
  typescript: {
    outputFile: path.resolve(__dirname, '../payload-types.d.ts'),
  },
  // rateLimit: {
  //   trustProxy: true,
  //   skip(req) {
  //     return req.user
  //   },
  // },
  upload: {
    limits: {
      fileSize: 20000000,
    },
  },
  plugins: [
    seoPlugin({
      collections: ['pages'],
      globals: ['settings'],
      uploadsCollection: 'images',
      // generateTitle: ({ doc }) => `${doc?.title?.value} | ${process.env.PAYLOAD_PUBLIC_SITE_NAME}`,
      tabbedUI: true,
    }),
    blurhash(),
  ],
})
