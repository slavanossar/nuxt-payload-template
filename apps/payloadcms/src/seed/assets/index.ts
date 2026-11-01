import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const manifestPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  'manifest.json',
)

type SeedAssets = {
  images?: string[]
  videos?: string[]
}

const listFiles = (directoryPath: string): string[] => {
  if (!existsSync(directoryPath)) return []

  return readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))
}

export const mapAssetFiles = async <Result>(
  directoryPath: string,
  upload: (file: { filename: string; filePath: string }) => Promise<Result>,
): Promise<Result[]> => {
  const filenames = listFiles(directoryPath)
  const results: Result[] = []

  for (const filename of filenames) {
    results.push(
      await upload({
        filename,
        filePath: path.resolve(directoryPath, filename),
      }),
    )
  }

  return results
}

const readManifest = (): SeedAssets => {
  if (!existsSync(manifestPath)) {
    throw new Error('Seed asset manifest is missing at assets/manifest.json.')
  }

  let manifest: unknown

  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  } catch {
    throw new Error(
      'Seed asset manifest at assets/manifest.json is invalid JSON.',
    )
  }

  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    throw new Error('Seed asset manifest at assets/manifest.json is invalid.')
  }

  return manifest as SeedAssets
}

const requireIds = (value: unknown, label: string): string[] => {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((id) => typeof id !== 'string' || !id.trim())
  ) {
    throw new Error(
      `Placeholder ${label} ids are missing from assets/manifest.json.`,
    )
  }

  return value
}

const shuffle = <T>(items: readonly T[]): T[] => {
  const result = [...items]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const current = result[index]
    result[index] = result[swapIndex]
    result[swapIndex] = current
  }

  return result
}

const takeShuffled = (
  ids: string[],
  count: number,
  label: string,
): string[] => {
  if (!Number.isInteger(count) || count < 1) {
    throw new Error(`Placeholder ${label} count must be a positive integer.`)
  }

  if (count > ids.length) {
    throw new Error(
      `Requested ${count} placeholder ${label}, but assets/manifest.json only has ${ids.length}.`,
    )
  }

  return shuffle(ids).slice(0, count)
}

export const getPlaceholderImages = (count: number): string[] =>
  takeShuffled(requireIds(readManifest().images, 'image'), count, 'images')

export const getPlaceholderImage = () => getPlaceholderImages(1)[0]

export const getPlaceholderVideos = (count: number): string[] =>
  takeShuffled(requireIds(readManifest().videos, 'video'), count, 'videos')

export const getPlaceholderVideo = () => getPlaceholderVideos(1)[0]
