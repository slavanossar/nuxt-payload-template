import { defineStore } from 'pinia'

import type { Settings } from '#payload/types'
import { GetGlobalsDocument } from '@/graphql'

interface GlobalQueryResult {
  Settings: Settings
}

export const useGlobalsStore = defineStore('globals', () => {
  const settings = ref<Settings | null>(null)

  function load() {
    return useAsyncQuery<GlobalQueryResult>(GetGlobalsDocument).then(
      ({ data }) => {
        settings.value = data.value?.Settings || null
      },
    )
  }

  return {
    settings,
    load,
  }
})
