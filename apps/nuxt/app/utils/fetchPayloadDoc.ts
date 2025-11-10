export function fetchPayloadDoc(
  id: string,
  collectionSlug: PayloadCollectionSlug,
) {
  const config = useRuntimeConfig()

  try {
    return $fetch<PayloadCollections[PayloadCollectionSlug]>(
      `${config.public.siteUrl}${config.public.payloadApiRoute}/${collectionSlug}/${id}`,
    )
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: 'Document not found.',
    })
  }
}
