import type { ImageFragment } from '#graphql/exports'

export const usePayloadSeo = (
  doc: MaybeRefOrGetter<{
    meta?: {
      title?: string
      description?: string
      image?: ImageFragment
    }
  }>,
  fallbackTitle: MaybeRefOrGetter<string>,
) => {
  const config = useRuntimeConfig()
  const globalsStore = useGlobalsStore()

  const meta = computed(() => toValue(doc).meta)
  const title = computed(() => meta.value?.title || toValue(fallbackTitle))

  useSeoMeta({
    title: () => title.value,
    ogTitle: () => {
      const siteName =
        globalsStore.siteSettings?.meta?.title || config.public.siteName
      return `${title.value} | ${siteName}`
    },
    description: () => meta.value?.description || undefined,
    ogDescription: () => meta.value?.description || undefined,
    ogImage: () => meta.value?.image?.sizes?.opengraph?.url || undefined,
  })
}
