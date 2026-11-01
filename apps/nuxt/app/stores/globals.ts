import { defineStore } from 'pinia'
import { GetGlobalsDocument } from '#graphql/exports'

import type { GetGlobalsQuery } from '#graphql/exports'

export const useGlobalsStore = defineStore('globals', () => {
  const siteSettings = ref<GetGlobalsQuery['SiteSettings'] | null>(null)

  const load = () => {
    return useAsyncQuery<GetGlobalsQuery>(GetGlobalsDocument).then(
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
