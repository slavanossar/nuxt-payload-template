import { GetHomePageDocument } from '#graphql-exports'

import type { UseSeoMetaInput } from '@unhead/vue'
import type { DocumentNode } from 'graphql'
import type { Page } from '#payload-types'

interface PageQueryResult {
  Pages: {
    docs: Page[]
  }
}

const pageTemplateQueries: Record<Page['template'], DocumentNode> = {
  Home: GetHomePageDocument,
}

export const usePayloadPage = async (template: Page['template']) => {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  const globalsStore = useGlobalsStore()

  const doc = ref<Page | null>(null)

  const { data } = await useAsyncQuery<PageQueryResult>(
    pageTemplateQueries[template],
  )

  doc.value = data.value?.Pages.docs[0] || null

  if (doc.value) {
    const docMeta = doc.value.meta
    const seoMeta: UseSeoMetaInput = { title: doc.value.template }

    seoMeta.title = docMeta?.title || seoMeta.title

    seoMeta.ogTitle = seoMeta.twitterTitle = `${seoMeta.title} | ${
      globalsStore.siteSettings?.meta?.title || config.public.siteName
    }`

    if (docMeta?.description) {
      seoMeta.description =
        seoMeta.ogDescription =
        seoMeta.twitterDescription =
          docMeta.description
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
