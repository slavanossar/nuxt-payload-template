<template>
  <template v-for="(node, i) in richTextContent">
    <template v-if="isTextNode(node)">
      <strong v-if="node.format === 1" :key="`bold_${i}`" v-text="node.text" />
      <em
        v-else-if="node.format === 2"
        :key="`italic_${i}`"
        v-text="node.text"
      />
      <template v-else>{{ node.text }}</template>
    </template>
    <br v-else-if="isLinebreakNode(node)" />
    <template v-else-if="isLinkNode(node)">
      <NuxtLink
        v-if="node.fields.linkType === 'custom'"
        :key="`custom_${i}`"
        :class="props.linkClass"
        :to="node.fields.url"
        :target="node.fields.linkType === 'custom' ? '_blank' : null"
      >
        <PayloadRichText :nested-content="node.children" />
      </NuxtLink>
      <NuxtLink
        v-else-if="node.fields.linkType === 'internal'"
        :key="`internal_${i}`"
        :class="props.linkClass"
        :to="getInternalUrl(node.fields.doc) ?? ''"
      >
        <PayloadRichText :nested-content="node.children" />
      </NuxtLink>
    </template>
    <template v-else-if="isUploadNode(node)">
      <figure v-if="node.type === 'upload'" :key="i">
        <PayloadImage :image="node.value" :sizes="props.sizes" />
        <figcaption v-if="node.fields?.caption">
          <p v-text="node.fields.caption" />
        </figcaption>
      </figure>
    </template>
    <template v-else-if="isElementNode(node)">
      <Component :is="getElementTag(node)" v-if="node.type" :key="i">
        <PayloadRichText :nested-content="node.children" />
      </Component>
    </template>
  </template>
</template>

<script setup lang="ts">
import type {
  SerializedLexicalNode,
  SerializedElementNode,
  SerializedTextNode,
} from 'lexical'
import type { ApplicationsPage, Image, TemplatePage } from '#payload-types'
import type { LexicalRichTextField } from './types'
import type { SrcsetSizes } from '~/components/payload/image/types'

interface LexicalTextNode extends SerializedTextNode {
  type: 'text'
}

interface LexicalLinebreakNode {
  type: 'linebreak'
}

interface LexicalParagraphNode extends SerializedElementNode<LexicalTextNode> {
  type: 'paragraph'
}

interface LexicalHeadingNode extends SerializedElementNode<LexicalTextNode> {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  type: 'heading'
}

interface LexicalListItemNode extends SerializedElementNode<LexicalTextNode> {
  type: 'listitem'
}

interface LexicalListNode extends SerializedElementNode<LexicalListItemNode> {
  tag: 'ol' | 'ul'
  type: 'list'
}

interface LexicalBlockquoteNode extends SerializedElementNode<LexicalTextNode> {
  type: 'quote'
}

type LexicalElementNode =
  | LexicalParagraphNode
  | LexicalHeadingNode
  | LexicalListItemNode
  | LexicalListNode
  | LexicalBlockquoteNode

interface LexicalCustomLinkNode extends SerializedElementNode {
  type: 'autolink' | 'link'
  fields: {
    url: string
    newTab: boolean
    linkType: 'custom'
  }
}

interface LexicalInternalLinkNode extends SerializedElementNode {
  type: 'autolink' | 'link'
  fields: {
    url: string
    doc:
      | {
          relationTo: 'applications-pages'
          value: ApplicationsPage
        }
      | {
          relationTo: 'template-pages'
          value: TemplatePage
        }
    newTab: boolean
    linkType: 'internal'
  }
}

type LexicalLinkNode = LexicalCustomLinkNode | LexicalInternalLinkNode

interface LexicalUploadNode extends SerializedLexicalNode {
  fields?: {
    [key: string]: any
  }
  relationTo: 'images'
  type: 'upload'
  value: Image
}

interface Props {
  content?: LexicalRichTextField
  linkClass?: string
  nestedContent?: SerializedLexicalNode[]
  sizes?: SrcsetSizes
}

const props = defineProps<Props>()

/**
 * Typechecks
 */
const isTextNode = (node: any): node is LexicalTextNode => {
  return typeof node === 'object' && node !== null && node.type === 'text'
}

const isLinebreakNode = (node: any): node is LexicalLinebreakNode => {
  return typeof node === 'object' && node !== null && node.type === 'linebreak'
}

const isElementNode = (node: any): node is LexicalElementNode => {
  return (
    typeof node === 'object' && node !== null && Array.isArray(node.children)
  )
}

const isLinkNode = (node: any): node is LexicalLinkNode => {
  console.log(node)
  return (
    typeof node === 'object' &&
    node !== null &&
    Array.isArray(node.children) &&
    ['autolink', 'link'].includes(node.type) &&
    'fields' in node &&
    typeof node.fields === 'object' &&
    ['custom', 'internal'].includes(node.fields.linkType)
  )
}

const isUploadNode = (node: any): node is LexicalUploadNode => {
  return (
    typeof node === 'object' &&
    node !== null &&
    node.type === 'upload' &&
    'relationTo' in node &&
    'value' in node
  )
}

const getElementTag = (node: LexicalElementNode) => {
  switch (node.type) {
    case 'paragraph':
      return 'p'
    case 'quote':
      return 'blockquote'
    case 'listitem':
      return 'li'
    default:
      return node.tag
  }
}

const richTextContent = computed(() => {
  if (props.nestedContent) {
    return props.nestedContent
  }

  if (props.content) {
    return props.content.root.children
  }

  return []
})

const getInternalUrl = (doc: LexicalInternalLinkNode['fields']['doc']) => {
  switch (doc.relationTo) {
    default:
      return '/'
  }
}
</script>
