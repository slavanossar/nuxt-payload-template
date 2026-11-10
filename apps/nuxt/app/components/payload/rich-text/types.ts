import type {
  SerializedElementNode,
  SerializedLexicalNode,
  SerializedTextNode,
} from 'lexical'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { ImageFragment, KeyPageFragment } from '#graphql/exports'

export type LexicalRichTextField = DefaultTypedEditorState

export interface LexicalTextNode extends SerializedTextNode {
  type: 'text'
}

export interface LexicalLinebreakNode {
  type: 'linebreak'
}

export interface LexicalParagraphNode extends SerializedElementNode<LexicalTextNode> {
  type: 'paragraph'
}

export interface LexicalHeadingNode extends SerializedElementNode<LexicalTextNode> {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  type: 'heading'
}

export interface LexicalListItemNode extends SerializedElementNode<LexicalTextNode> {
  type: 'listitem'
}

export interface LexicalListNode extends SerializedElementNode<LexicalListItemNode> {
  tag: 'ol' | 'ul'
  type: 'list'
}

export interface LexicalBlockquoteNode extends SerializedElementNode<LexicalTextNode> {
  type: 'quote'
}

export type LexicalElementNode =
  | LexicalParagraphNode
  | LexicalHeadingNode
  | LexicalListItemNode
  | LexicalListNode
  | LexicalBlockquoteNode

export interface LexicalCustomLinkNode extends SerializedElementNode {
  type: 'autolink' | 'link'
  fields: {
    url: string
    newTab: boolean
    linkType: 'custom'
  }
}

export interface LexicalInternalLinkNode extends SerializedElementNode {
  type: 'autolink' | 'link'
  fields: {
    url: string
    doc: {
      relationTo: 'key-pages'
      value: KeyPageFragment
    }
    newTab: boolean
    linkType: 'internal'
  }
}

export type LexicalLinkNode = LexicalCustomLinkNode | LexicalInternalLinkNode

export interface LexicalUploadNode extends SerializedLexicalNode {
  fields?: {
    [key: string]: any
  }
  relationTo: 'images'
  type: 'upload'
  value: ImageFragment
}

export interface PayloadRichTextProps {
  content?: unknown
  linkClass?: string
  nestedContent?: SerializedLexicalNode[]
  imageSizes?: string
}

export function isLexicalRichTextField(
  value: unknown,
): value is LexicalRichTextField {
  if (typeof value !== 'object' || value === null || !('root' in value)) {
    return false
  }

  const { root } = value

  return (
    typeof root === 'object' &&
    root !== null &&
    'type' in root &&
    root.type === 'root' &&
    'children' in root &&
    Array.isArray(root.children)
  )
}

export const isTextNode = (node: any): node is LexicalTextNode =>
  typeof node === 'object' && node !== null && node.type === 'text'

export const isLinebreakNode = (node: any): node is LexicalLinebreakNode =>
  typeof node === 'object' && node !== null && node.type === 'linebreak'

export const isElementNode = (node: any): node is LexicalElementNode =>
  typeof node === 'object' && node !== null && Array.isArray(node.children)

export const isLinkNode = (node: any): node is LexicalLinkNode =>
  typeof node === 'object' &&
  node !== null &&
  Array.isArray(node.children) &&
  ['autolink', 'link'].includes(node.type) &&
  'fields' in node &&
  typeof node.fields === 'object' &&
  ['custom', 'internal'].includes(node.fields.linkType)

export const isUploadNode = (node: any): node is LexicalUploadNode =>
  typeof node === 'object' &&
  node !== null &&
  node.type === 'upload' &&
  'relationTo' in node &&
  'value' in node
