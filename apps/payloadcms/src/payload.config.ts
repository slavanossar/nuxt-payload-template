import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { muxPlugin } from '@pro-laico/payload-mux'

import * as collections from './collections'
import * as globals from './globals'
import { seed } from './seed'

import { generateFileURL } from './utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  secret: process.env.PAYLOAD_SECRET,
  debug: process.env.NODE_ENV !== 'production',
  admin: {
    avatar: 'default',
    components: {
      graphics: {
        Icon: {
          path: '~/graphics/Icon.tsx',
        },
        Logo: {
          path: '~/graphics/Logo.tsx',
        },
      },
    },
    meta: {
      // favicon: '/favicon/safari-pinned-tab.svg',
      titleSuffix: `| ${process.env.SITE_NAME}`,
    },
    user: collections.Staff.slug,
  },
  db: mongooseAdapter({
    url: `mongodb://0.0.0.0/${process.env.DATABASE_NAME}`,
  }),
  editor: lexicalEditor({}),
  collections: Object.values(collections),
  globals: Object.values(globals),
  onInit: async (payload) => {
    await seed(payload)
  },
  routes: {
    api: process.env.NEXT_PUBLIC_PAYLOAD_API_ROUTE,
  },
  sharp,
  typescript: {
    outputFile: path.resolve(__dirname, '../payload-types.d.ts'),
  },
  upload: {
    limits: {
      fileSize: 50000000,
    },
  },
  plugins: [
    muxPlugin({
      enabled: false,
      options: {
        uploadSettings: {
          new_asset_settings: {
            video_quality: 'premium',
            max_resolution_tier: '2160p',
          },
        },
      },
    }),
    s3Storage({
      enabled: false,
      collections: {
        images: {
          disablePayloadAccessControl: true,
          prefix: 'images',
          generateFileURL,
        },
        svgs: {
          disablePayloadAccessControl: true,
          prefix: 'svgs',
          generateFileURL,
        },
      },
      bucket: process.env.R2_BUCKET,
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
        region: process.env.R2_REGION,
        endpoint: process.env.R2_ENDPOINT,
      },
    }),
    seoPlugin({
      collections: ['key-pages'],
      globals: ['site-settings'],
      uploadsCollection: 'images',
      // generateTitle: ({ doc }) => `${doc?.title?.value} | ${process.env.SITE_NAME}`,
      tabbedUI: true,
    }),
  ],
})
