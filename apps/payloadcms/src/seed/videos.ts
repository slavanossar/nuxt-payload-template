import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { mapAssetFiles } from './assets'

import type { Payload } from 'payload'

const directory = path.dirname(fileURLToPath(import.meta.url))
const videosDirectory = path.resolve(directory, 'assets/videos')
const manifestPath = path.resolve(directory, 'assets/manifest.json')

type SeedAssets = {
  images?: string[]
  videos?: string[]
}

const readAssets = (): SeedAssets => {
  if (!existsSync(manifestPath)) return {}

  const raw = readFileSync(manifestPath, 'utf8').trim()

  if (!raw) return {}

  return JSON.parse(raw) as SeedAssets
}

export const saveSeededVideoIds = (videos: string[]): void => {
  const assets = readAssets()

  writeFileSync(
    manifestPath,
    `${JSON.stringify(
      {
        ...(assets.images ? { images: assets.images } : {}),
        videos,
      },
      null,
      2,
    )}\n`,
  )
}

export const seedVideos = async (payload: Payload): Promise<void> => {
  const videos = await mapAssetFiles(
    videosDirectory,
    async ({ filename, filePath }) => {
      const video = await payload.create({
        collection: 'mux-video',
        data: {
          title: path.parse(filename).name,
          source: {
            file: filePath,
          },
        },
        filePath,
        overrideAccess: true,
      })

      return String(video.id)
    },
  )

  if (videos.length === 0) {
    payload.logger.info(
      'No files in seed/assets/videos. Skipping placeholder videos.',
    )
    return
  }

  saveSeededVideoIds(videos)

  payload.logger.info(`Seeded ${videos.length} placeholder videos`)
}
