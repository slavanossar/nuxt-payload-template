import { seedHomePage } from './homePage'

import type { Payload } from 'payload'

export const seedKeyPages = async (payload: Payload): Promise<void> => {
  await Promise.all([seedHomePage(payload)])
}
