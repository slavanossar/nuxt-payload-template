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
  interface SrcsetSizes {
    default: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
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
