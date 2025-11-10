import { defineStore } from 'pinia'
import { GetGlobalsDocument } from '#graphql-exports'

import type { SiteSettings } from '#payload-types'

export interface GlobalQueryResult {
  SiteSettings: SiteSettings
}

export const useGlobalsStore = defineStore('globals', () => {
  const siteSettings = ref<SiteSettings | null>(null)

  const load = () => {
    return useAsyncQuery<GlobalQueryResult>(GetGlobalsDocument).then(
      ({ data }) => {
        siteSettings.value = data.value?.SiteSettings || null
      },
    )
  }

  return {
    siteSettings,
    load,
  }
})
