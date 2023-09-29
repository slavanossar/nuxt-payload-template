import { defineStore } from 'pinia'

import type { Site } from '#payload/types'
import { GetGlobalsDocument } from '@/graphql'

export const useGlobalsStore = defineStore('globals', () => {
  const site = ref<Site | undefined>()

  function load() {
    return useAsyncQuery<PayloadQuery>(GetGlobalsDocument).then(({ data }) => {
      site.value = data.value.Site
    })
  }

  return {
    site,
    load,
  }
})
