import type { UseSeoMetaInput } from '@unhead/vue'
import type { Page } from '#payload/payload-types'

export default async function (template: Page['template']) {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  const globalsStore = useGlobalsStore()

  const doc = ref<Page | null>(null)

  doc.value = await $fetch(`/api-nuxt/payload/pages/${template}`)

  if (doc.value) {
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
