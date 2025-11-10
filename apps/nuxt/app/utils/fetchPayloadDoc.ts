import { ofetch } from 'ofetch'

export async function fetchPayloadDoc<Collection>(
  id: string,
  collectionHandle: string,
) {
  const config = useRuntimeConfig()

  try {
    return await ofetch<Collection>(
      `${config.public.siteUrl}${config.public.payloadApiRoute}/${collectionHandle}/${id}`,
    )
  } catch (error) {
    return undefined
  }
}
