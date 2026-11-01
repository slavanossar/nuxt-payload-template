import { GetHomePageDocument } from '#graphql/exports'

import type { UseSeoMetaInput } from '@unhead/vue'
import type { DocumentNode } from 'graphql'
import type { KeyPage } from '#payload-types'
import type { GetHomePageQuery, GetHomePageQueryVariables } from '#graphql/exports'

type KeyPageQueryByTemplate = {
  Home: GetHomePageQuery
}

type KeyPageQueryVariablesByTemplate = {
  Home: GetHomePageQueryVariables
}

type KeyPageDoc<T extends KeyPage['template']> = NonNullable<
  NonNullable<KeyPageQueryByTemplate[T]['KeyPages']>['docs'][number]
>

const keyPageQueries: Record<KeyPage['template'], DocumentNode> = {
  Home: GetHomePageDocument,
}

export const usePayloadKeyPage = async <T extends KeyPage['template']>(
  template: T,
): Promise<Ref<KeyPageDoc<T>>> => {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  const globalsStore = useGlobalsStore()

  const { data } = await useAsyncQuery<
    KeyPageQueryByTemplate[T],
    KeyPageQueryVariablesByTemplate[T]
  >(keyPageQueries[template])

  const result = data.value as KeyPageQueryByTemplate[T] | null
  const page = result?.KeyPages?.docs[0] as KeyPageDoc<T> | undefined

  if (!page) {
    throw createError({
      statusCode: 404,
      message: 'Page not found.',
      fatal: true,
    })
  }

  const docMeta = page.meta
  const seoMeta: UseSeoMetaInput = { title: page.keyPageTitle }

  seoMeta.title = docMeta?.title || seoMeta.title

  seoMeta.ogTitle = `${seoMeta.title} | ${
    globalsStore.siteSettings?.meta?.title || config.public.siteName
  }`

  if (docMeta?.description) {
    seoMeta.description = seoMeta.ogDescription = docMeta.description
  }

  if (docMeta?.image) {
    seoMeta.ogImage = docMeta.image.sizes?.opengraph?.url || ''
  }

  nuxtApp.runWithContext(() => useSeoMeta(seoMeta))

  return ref(page)
}
