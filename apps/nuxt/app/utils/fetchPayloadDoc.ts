import { payloadEndpoint } from '~/utils/payloadEndpoint'

export function fetchPayloadDoc(
  id: string,
  collectionSlug: PayloadCollectionSlug,
) {
  const config = useRuntimeConfig()
  const base = config.payloadcmsUrl || config.public.siteUrl

  try {
    return $fetch<PayloadCollections[PayloadCollectionSlug]>(
      payloadEndpoint(
        base,
        config.public.payloadApiRoute,
        `${collectionSlug}/${id}`,
      ),
    )
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: 'Document not found.',
    })
  }
}
