import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { buildConfig } from 'payload'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { seoPlugin } from '@payloadcms/plugin-seo'
import { muxPlugin } from '@pro-laico/payload-mux'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import * as collections from './collections'
import * as globals from './globals'

import type { FieldHook } from 'payload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const blobStorageCollections = ['images', 'svgs'] as const

type MuxVideoDoc = {
  title?: string | null
  maxWidth?: number | null
  maxHeight?: number | null
  duration?: number | null
  playbackOptions?: { playbackId?: string | null }[] | null
}

const formatDuration = (seconds: number) => {
  const total = Math.max(0, Math.round(seconds))

  if (total <= 60) return `${total}s`

  const minutes = Math.floor(total / 60)
  const remaining = total % 60

  return `${minutes}m${remaining}s`
}

const readVideo =
  (
    read: (video: MuxVideoDoc) => number | string | null | undefined,
  ): FieldHook =>
  ({ data }) =>
    read(data as MuxVideoDoc) ?? null

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
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
    url: process.env.DATABASE_MONGODB_URI,
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
    muxPlugin({
      enabled: true,
      collections: {
        muxVideo: {
          overrides: {
            admin: {
              group: '🖼️ Media',
            },
            upload: {
              staticDir: 'uploads/videos',
              mimeTypes: ['video/*'],
              adminThumbnail: ({ doc }) => {
                const playbackOption = (doc as unknown as MuxVideoDoc)
                  .playbackOptions?.[0]

                if (!playbackOption) return null

                return new URL(
                  `https://image.mux.com/${playbackOption.playbackId}/animated.gif`,
                ).toString()
              },
            },
            fields: [
              {
                name: 'filename',
                type: 'text',
                virtual: true,
                hooks: {
                  afterRead: [readVideo((video) => video.title)],
                },
              },
              {
                name: 'width',
                type: 'number',
                virtual: true,
                hooks: {
                  afterRead: [readVideo((video) => video.maxWidth)],
                },
              },
              {
                name: 'height',
                type: 'number',
                virtual: true,
                hooks: {
                  afterRead: [readVideo((video) => video.maxHeight)],
                },
              },
              {
                name: 'mimeType',
                type: 'text',
                virtual: true,
                hooks: {
                  afterRead: [
                    readVideo((video) =>
                      video.duration == null
                        ? null
                        : formatDuration(video.duration),
                    ),
                  ],
                },
              },
            ],
          },
        },
      },
      options: {
        uploadSettings: {
          new_asset_settings: {
            video_quality: 'premium',
            max_resolution_tier: '2160p',
          },
        },
      },
    }),
    vercelBlobStorage({
      enabled: true,
      addRandomSuffix: true,
      collections: blobStorageCollections.reduce(
        (acc, collection) => {
          acc[collection] = {
            prefix: collection,
          }
          return acc
        },
        {} as Record<string, { prefix: string }>,
      ),
      token: process.env.BLOB_READ_WRITE_TOKEN,
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
