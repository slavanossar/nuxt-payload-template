import { randomBytes } from 'node:crypto'

import type { Payload } from 'payload'

export const seedStaff = async (payload: Payload): Promise<void> => {
  const email = process.env.SEED_STAFF_EMAIL?.trim()

  if (!email) throw new Error('SEED_STAFF_EMAIL is not set.')

  const password = randomBytes(3).toString('hex')

  await payload.create({
    collection: 'staff',
    data: {
      email,
      password,
      firstName: 'Admin',
      lastName: 'User',
      role: 'super_admin',
    },
    overrideAccess: true,
  })

  payload.logger.info(`Seeded Staff user ${email} with password ${password}`)
}
