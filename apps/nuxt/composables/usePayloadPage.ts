import type { UseSeoMetaInput } from '@unhead/vue'
import type { Page } from '#payload/types'
import { GetPageDocument } from '@/graphql'
import { useGlobalsStore } from '@/stores/globals'

interface PageQueryResult {
  Pages: {
    docs: Page[]
  }
}

export default async function (template: Page['template']) {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  const globalsStore = useGlobalsStore()

  const doc = ref<Page | null>(null)

  const { data } = await useAsyncQuery<PageQueryResult>(GetPageDocument, {
    template,
  })

  if (data.value?.Pages?.docs.length) {
    doc.value = data.value.Pages?.docs[0]

    const docMeta = doc.value.meta
    const seoMeta: UseSeoMetaInput = { title: doc.value.template }

    seoMeta.title = docMeta?.title || seoMeta.title

    seoMeta.ogTitle = seoMeta.twitterTitle = `${seoMeta.title} | ${
      globalsStore.settings?.meta?.title || config.public.siteName
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
