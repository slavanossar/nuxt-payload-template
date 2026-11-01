import { saveSeededImageIds, seedImages } from './images'
import { seedStaff } from './staff'
import { saveSeededVideoIds, seedVideos } from './videos'

import type { Payload } from 'payload'

type SeedOptions = {
  /**
   * Re-run content seeds when a staff user already exists.
   * `pnpm seed` passes this so an existing admin does not block page seeds.
   */
  resume?: boolean
}

export const seed = async (
  payload: Payload,
  options?: SeedOptions,
): Promise<void> => {
  const { totalDocs: staffCount } = await payload.count({
    collection: 'staff',
  })

  if (staffCount > 0 && !options?.resume) return

  if (staffCount === 0) {
    if (!process.env.SEED_STAFF_EMAIL?.trim()) {
      payload.logger.warn(
        'No staff users found, but SEED_STAFF_EMAIL is not set. Skipping seed.',
      )
      return
    }

    await seedStaff(payload)
  }

  const { totalDocs: keyPageCount } = await payload.count({
    collection: 'key-pages',
  })

  if (keyPageCount > 0) return

  const { totalDocs: imageCount } = await payload.count({
    collection: 'images',
  })

  if (imageCount === 0) {
    await seedImages(payload)
  } else {
    const existingImages = await payload.find({
      collection: 'images',
      depth: 0,
      pagination: false,
    })

    saveSeededImageIds(existingImages.docs.map((image) => String(image.id)))
  }

  const { totalDocs: videoCount } = await payload.count({
    collection: 'mux-video',
  })

  if (videoCount === 0) {
    await seedVideos(payload)
  } else {
    const existingVideos = await payload.find({
      collection: 'mux-video',
      depth: 0,
      pagination: false,
    })

    saveSeededVideoIds(existingVideos.docs.map((video) => String(video.id)))
  }

  // Imported after asset ids are written so these seeds can read them from assets/.
  const { seedKeyPages } = await import('./keyPages')

  await seedKeyPages(payload)
}
