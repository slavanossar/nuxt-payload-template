import { defineStore } from 'pinia'

import type { Settings } from '#payload/types'

interface GlobalQueryResult {
  Settings: Settings
}

export const useGlobalsStore = defineStore('globals', () => {
  const settings = ref<Settings | null>(null)

  const load = () => {}

  return {
    settings,
    load,
  }
})
