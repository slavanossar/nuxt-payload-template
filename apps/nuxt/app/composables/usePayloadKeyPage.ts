import { GetHomePageDocument } from '#graphql-exports'

import type { UseSeoMetaInput } from '@unhead/vue'
import type { DocumentNode } from 'graphql'
import type { PaginatedDocs } from 'payload'
import type { KeyPage } from '#payload-types'

interface KeyPageQueryResult {
  KeyPages: PaginatedDocs<KeyPage>
}

const keyPageQueries: Record<KeyPage['template'], DocumentNode> = {
  Home: GetHomePageDocument,
}

export const usePayloadKeyPage = async (template: KeyPage['template']) => {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  const globalsStore = useGlobalsStore()

  const doc = ref<KeyPage | null>(null)

  const { data } = await useAsyncQuery<KeyPageQueryResult>(
    keyPageQueries[template],
  )

  doc.value = data.value?.KeyPages.docs[0] || null

  if (doc.value) {
    const docMeta = doc.value.meta
    const seoMeta: UseSeoMetaInput = { title: doc.value.template }

    seoMeta.title = docMeta?.title || seoMeta.title

    seoMeta.ogTitle = `${seoMeta.title} | ${
      globalsStore.siteSettings?.meta?.title || config.public.siteName
    }`

    if (docMeta?.description) {
      seoMeta.description = seoMeta.ogDescription = docMeta.description
    }

    if (docMeta?.image) {
      const opengraphImage = useRelationshipField(docMeta?.image)
      seoMeta.ogImage = opengraphImage.value?.sizes?.opengraph?.url || ''
    }

    nuxtApp.runWithContext(() => useSeoMeta(seoMeta))
  } else {
    throw createError({
      statusCode: 404,
      message: 'Page data missing.',
    })
  }

  return doc
}
