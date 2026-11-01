import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { mapAssetFiles } from './assets'

import type { Payload } from 'payload'

const directory = path.dirname(fileURLToPath(import.meta.url))
const imagesDirectory = path.resolve(directory, 'assets/images')
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

export const saveSeededImageIds = (images: string[]): void => {
  const assets = readAssets()

  writeFileSync(
    manifestPath,
    `${JSON.stringify(
      {
        images,
        ...(assets.videos ? { videos: assets.videos } : {}),
      },
      null,
      2,
    )}\n`,
  )
}

export const seedImages = async (payload: Payload): Promise<void> => {
  const images = await mapAssetFiles(imagesDirectory, async ({ filePath }) => {
    const image = await payload.create({
      collection: 'images',
      data: {},
      filePath,
      overrideAccess: true,
    })

    return String(image.id)
  })

  if (images.length === 0) {
    payload.logger.info(
      'No files in seed/assets/images. Skipping placeholder images.',
    )
    return
  }

  saveSeededImageIds(images)

  payload.logger.info(`Seeded ${images.length} placeholder images`)
}
