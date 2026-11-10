import { GetHomePageDocument } from '#graphql/exports'

import type { ResultOf } from '@graphql-typed-document-node/core'
import type { DocumentNode } from 'graphql'
import type { KeyPage } from '#payload-types'

const keyPageQueries = {
  Home: GetHomePageDocument,
} satisfies Record<KeyPage['template'], DocumentNode>

type KeyPageQuery<T extends KeyPage['template']> = ResultOf<
  (typeof keyPageQueries)[T]
>

type KeyPageDoc<T extends KeyPage['template']> = NonNullable<
  NonNullable<KeyPageQuery<T>['KeyPages']>['docs'][number]
>

export const usePayloadKeyPage = async <T extends KeyPage['template']>(
  template: T,
  options: { livePreview?: { depth?: number } } = {},
): Promise<ComputedRef<KeyPageDoc<T>>> => {
  const nuxtApp = useNuxtApp()
  const { data, error } = await useAsyncQuery<KeyPageQuery<T>>(
    keyPageQueries[template],
  )

  if (error.value) {
    throw createError({
      statusCode: 502,
      message: 'Unable to load page.',
      cause: error.value,
      fatal: true,
    })
  }

  const readDocument = () => {
    // Preserve the generic template/result correlation
    const result = data.value as KeyPageQuery<T> | null
    return result?.KeyPages?.docs[0] as KeyPageDoc<T> | undefined
  }
  const initialDocument = readDocument()

  if (!initialDocument) {
    throw createError({
      statusCode: 404,
      message: 'Page not found.',
      fatal: true,
    })
  }

  // Nuxt clears query data on unmount; keep the last document for remaining consumers
  const doc = computed<NonNullable<typeof initialDocument>>(
    (previous) => readDocument() ?? previous ?? initialDocument,
  )

  return nuxtApp.runWithContext(() => {
    const page = options.livePreview
      ? useLivePreview({ initialData: doc, ...options.livePreview }).data
      : doc

    usePayloadSeo(page, () => page.value.keyPageTitle)
    return computed(() => page.value)
  })
}
