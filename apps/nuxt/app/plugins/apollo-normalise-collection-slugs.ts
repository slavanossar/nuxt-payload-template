import { ApolloLink } from '@apollo/client/core'

const slugMap: Record<string, PayloadCollectionSlug> = {
  key_pages: 'key-pages',
}

function normalizeRelationTo<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map(normalizeRelationTo) as T
  }

  if (data !== null && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        key === 'relationTo' && typeof value === 'string'
          ? (slugMap[value] ?? value)
          : normalizeRelationTo(value),
      ]),
    ) as T
  }

  return data
}

export default defineNuxtPlugin({
  name: 'apollo-normalise-collection-slugs',
  setup() {
    const { clients } = useApollo()
    const client = clients?.default

    if (!client) return

    const normalizeLink = new ApolloLink((operation, forward) =>
      forward(operation).map((result) => ({
        ...result,
        data: result.data ? normalizeRelationTo(result.data) : result.data,
      })),
    )

    client.setLink(ApolloLink.from([normalizeLink, client.link]))
  },
})
