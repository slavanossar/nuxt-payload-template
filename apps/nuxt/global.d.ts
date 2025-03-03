import type { DocumentNode } from 'graphql'
import type { Site, Page } from '#payload-types'

declare module '*.gql' {
  const Schema: DocumentNode
  export = Schema
}

declare module '*.graphql' {
  const Schema: DocumentNode
  export = Schema
}
