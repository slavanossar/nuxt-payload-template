import type { Payload } from 'payload'

export const seedHomePage = async (payload: Payload): Promise<void> => {
  await payload.create({
    collection: 'key-pages',
    data: {
      template: 'Home',
      keyPageTitle: 'Home',
    },
    overrideAccess: true,
  })

  payload.logger.info('Seeded Home page')
}
