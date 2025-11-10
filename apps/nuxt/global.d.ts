import type { DocumentNode } from 'graphql'
import type { Config, Page, Site } from '#payload-types'

declare module '*.gql' {
  const Schema: DocumentNode
  export = Schema
}

declare module '*.graphql' {
  const Schema: DocumentNode
  export = Schema
}

declare global {
  type PayloadCollections = Config['collections']
  type PayloadCollectionSlug = keyof PayloadCollections
  type PayloadCollection = PayloadCollections[PayloadCollectionSlug]
}
