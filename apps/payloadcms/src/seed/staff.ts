import type { Payload } from 'payload'

export const seedStaff = async (payload: Payload): Promise<void> => {
  const email = process.env.SEED_STAFF_EMAIL?.trim()
  const password = process.env.SEED_STAFF_PASSWORD?.trim()

  if (!email) throw new Error('SEED_STAFF_EMAIL is not set.')
  if (!password) throw new Error('SEED_STAFF_PASSWORD is not set.')

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
