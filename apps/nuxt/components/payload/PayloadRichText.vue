<template>
  <template v-for="(node, i) in richTextContent">
    <template v-if="isTextNode(node)">
      <strong v-if="node.bold" :key="`bold_${i}`" v-text="node.text" />
      <pre v-else-if="node.code" :key="`code_${i}`" v-text="node.text" />
      <em v-else-if="node.italic" :key="`italic_${i}`" v-text="node.text" />
      <template v-else>{{ node.text }}</template>
    </template>
    <template v-else-if="isLinkNode(node)">
      <NuxtLink
        :key="i"
        :to="typeof node.url === 'string' ? node.url : ''"
        :target="node.newTab ? '_blank' : null"
      >
        <PayloadRichText
          v-if="isRichTextNodeArray(node.children)"
          :nested-content="node.children"
        />
      </NuxtLink>
    </template>
    <template v-else-if="isElementNode(node)">
      <Component :is="node.type" v-if="node.type" :key="i">
        <PayloadRichText
          v-if="isRichTextNodeArray(node.children)"
          :nested-content="node.children"
        />
      </Component>
      <p v-else :key="`paragraph_${i}`">
        <PayloadRichText
          v-if="isRichTextNodeArray(node.children)"
          :nested-content="node.children"
        />
      </p>
    </template>
  </template>
</template>

<script setup lang="ts">
interface TextNode {
  bold?: boolean
  code?: boolean
  italic?: boolean
  text: string
}

interface LinkNode {
  children: TextNode[]
  newTab: boolean
  type: 'link'
  url: string
}

interface ElementNode {
  children: (TextNode | ElementNode | LinkNode)[]
  type?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'blockquote'
    | 'ol'
    | 'ul'
    | 'li'
}

interface RootNode {
  children: (TextNode | ElementNode | LinkNode)[]
}

type RichTextNode = TextNode | ElementNode | LinkNode | RootNode

interface PayloadRichTextProps {
  content?: {
    [k: string]: unknown
  }[]
  nestedContent?: RichTextNode[]
}

const props = defineProps<PayloadRichTextProps>()
const richTextContent = computed(() => {
  if (props.nestedContent) {
    return props.nestedContent
  }

  if (props.content && isRichTextNodeArray(props.content)) {
    return props.content
  }

  return []
})

const isTextNode = (node: any): node is TextNode => {
  return typeof node === 'object' && node !== null && 'text' in node
}

const isLinkNode = (node: any): node is LinkNode => {
  return (
    typeof node === 'object' &&
    node !== null &&
    Array.isArray(node.children) &&
    node.type === 'link'
  )
}

const isElementNode = (node: any): node is ElementNode => {
  return (
    typeof node === 'object' && node !== null && Array.isArray(node.children)
  )
}

const isRootNode = (node: any): node is RootNode => {
  return (
    typeof node === 'object' && node !== null && Array.isArray(node.children)
  )
}

const isRichTextNode = (node: any): node is RichTextNode => {
  return (
    isTextNode(node) ||
    isLinkNode(node) ||
    isElementNode(node) ||
    isRootNode(node)
  )
}

const isRichTextNodeArray = (nodes: any): nodes is RichTextNode[] => {
  return Array.isArray(nodes) && nodes.every(isRichTextNode)
}
</script>
