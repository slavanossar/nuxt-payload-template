import { seedKeyPages } from './keyPages'
import { seedStaff } from './staff'

import type { Payload } from 'payload'

const seeds = [seedStaff, seedKeyPages]

export const seed = async (payload: Payload): Promise<void> => {
  const { totalDocs: staffCount } = await payload.count({
    collection: 'staff',
  })

  if (staffCount > 0) return

  if (!process.env.SEED_STAFF_EMAIL?.trim()) {
    payload.logger.warn(
      'No staff users found, but SEED_STAFF_EMAIL is not set. Skipping seed.',
    )
    return
  }

  for (const run of seeds) {
    await run(payload)
  }
}
