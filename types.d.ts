import type { Opengraph, Page } from '@/payload/types'

export type PayloadQuery = {
  Opengraph?: Opengraph
  Pages?: {
    docs: Page[]
  }
}

export type RichTextNode = {
  bold: boolean
  children: RichTextNode[]
  code: boolean
  italic: boolean
  text: string
  type: string
  url: string
}
