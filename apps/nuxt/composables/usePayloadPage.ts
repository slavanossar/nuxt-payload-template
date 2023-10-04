import type { DocumentNode } from 'graphql'
import type { UseSeoMetaInput } from '@unhead/vue'
import type { Image, Page } from '#payload/types'
import { useGlobalsStore } from '@/stores/globals'

export default async function (query: DocumentNode) {
  const config = useRuntimeConfig()
  const globalsStore = useGlobalsStore()

  const doc = ref<Page | null>(null)

  watch(doc, (newDocValue) => {
    if (newDocValue) {
      const docMeta = newDocValue.meta
      const seoMeta: UseSeoMetaInput = { title: newDocValue.template }

      seoMeta.title = docMeta?.title || seoMeta.title

      seoMeta.ogTitle = seoMeta.twitterTitle = `${seoMeta.title} | ${
        globalsStore.site?.meta?.title || config.public.siteName
      }`

      if (docMeta?.description) {
        seoMeta.description =
          seoMeta.ogDescription =
          seoMeta.twitterDescription =
            docMeta.description
      }

      if (docMeta?.image) {
        seoMeta.ogImage =
          checkRelation<Image>(docMeta?.image)?.sizes?.opengraph?.url || ''
      }

      useSeoMeta(seoMeta)
    }
  })

  const { data } = await useAsyncQuery<PayloadQuery>(query)

  if (data.value?.Pages?.docs.length) {
    doc.value = data.value.Pages?.docs[0]
  } else {
    throw createError({
      statusCode: 404,
      message: 'Page data missing.',
    })
  }

  return doc
}