import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo'

import * as collections from './collections'
import * as globals from './globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: ['https://', process.env.DOMAIN].join(''),
  secret: process.env.PAYLOAD_SECRET,
  debug: process.env.NODE_ENV !== 'production',
  admin: {
    avatar: 'default',
    components: {
      graphics: {
        Icon: {
          path: '@payload/graphics/Icon.tsx',
        },
        Logo: {
          path: '@payload/graphics/Logo.tsx',
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
    url: `mongodb://mongo:27017/${process.env.DATABASE_NAME}`,
  }),
  editor: lexicalEditor({}),
  collections: Object.values(collections),
  globals: Object.values(globals),
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
    s3Storage({
      enabled: false,
      collections: {
        images: {
          disablePayloadAccessControl: true,
          prefix: 'images',
          generateFileURL: ({ filename, prefix }) => {
            return `https://${process.env.CLOUDFRONT_DOMAIN}/${prefix}/${filename}`
          },
        },
        svgs: {
          disablePayloadAccessControl: true,
          prefix: 'svgs',
          generateFileURL: ({ filename, prefix }) => {
            return `https://${process.env.CLOUDFRONT_DOMAIN}/${prefix}/${filename}`
          },
        },
        videos: {
          disablePayloadAccessControl: true,
          prefix: 'videos',
          generateFileURL: ({ filename, prefix }) => {
            return `https://${process.env.CLOUDFRONT_DOMAIN}/${prefix}/${filename}`
          },
        },
        videoThumbnails: {
          disablePayloadAccessControl: true,
          prefix: 'video-thumbnails',
          generateFileURL: ({ filename, prefix }) => {
            return `https://${process.env.CLOUDFRONT_DOMAIN}/${prefix}/${filename}`
          },
        },
      },
      bucket: process.env.S3_BUCKET,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
        region: process.env.S3_REGION,
      },
    }),
    seoPlugin({
      collections: ['pages'],
      globals: ['settings'],
      uploadsCollection: 'images',
      // generateTitle: ({ doc }) => `${doc?.title?.value} | ${process.env.SITE_NAME}`,
      tabbedUI: true,
    }),
  ],
})
