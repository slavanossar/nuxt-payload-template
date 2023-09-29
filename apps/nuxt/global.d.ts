import type { DocumentNode } from 'graphql'
import type { Site, Page } from '#payload/types'

declare module '*.gql' {
  const Schema: DocumentNode
  export = Schema
}

declare module '*.graphql' {
  const Schema: DocumentNode
  export = Schema
}

declare global {
  interface PayloadQuery {
    Site?: Site
    Pages?: {
      docs: Page[]
    }
  }

  interface RichTextNode {
    bold: boolean
    children: RichTextNode[]
    code: boolean
    italic: boolean
    text: string
    type: string
    url: string
  }
}
