<script lang="ts">
import { NuxtLink } from '#components'
import PayloadImage from '~/components/payload/image/PayloadImage.vue'
import {
  isElementNode,
  isLexicalRichTextField,
  isLinebreakNode,
  isLinkNode,
  isTextNode,
  isUploadNode,
} from './types'

import type { SerializedLexicalNode } from 'lexical'
import type { VNodeChild } from 'vue'
import type { SrcsetSizes } from '~/components/payload/image/types'
import type { LexicalElementNode, LexicalInternalLinkNode } from './types'

export default defineComponent({
  name: 'PayloadRichText',
  props: {
    content: {
      type: null as unknown as PropType<unknown>,
    },
    linkClass: {
      type: String,
      default: undefined,
    },
    nestedContent: {
      type: Array as PropType<SerializedLexicalNode[]>,
      default: undefined,
    },
    imageSizes: {
      type: Object as PropType<SrcsetSizes>,
      default: undefined,
    },
  },
  setup(props) {
    function renderNodes(nodes: readonly unknown[]): VNodeChild[] {
      return nodes.flatMap((node, index) => {
        const rendered = renderNode(node, index)
        return rendered == null ? [] : [rendered]
      })
    }

    function renderNode(node: unknown, index: number): VNodeChild | null {
      if (isTextNode(node)) {
        if (node.format === 1) return h('strong', { key: index }, node.text)
        if (node.format === 2) return h('em', { key: index }, node.text)
        return node.text
      }

      if (isLinebreakNode(node)) return h('br', { key: index })

      if (isLinkNode(node)) {
        const children = () => renderNodes(node.children)

        if (node.fields.linkType === 'custom') {
          return h(
            NuxtLink,
            {
              key: index,
              class: props.linkClass,
              to: node.fields.url,
              target: '_blank',
            },
            children,
          )
        }

        return h(
          NuxtLink,
          {
            key: index,
            class: props.linkClass,
            to: getInternalUrl(node.fields.doc) ?? '',
          },
          children,
        )
      }

      if (isUploadNode(node)) {
        const children: VNodeChild[] = [
          h(PayloadImage, {
            image: node.value,
            sizes: props.imageSizes,
          }),
        ]

        if (node.fields?.caption) {
          children.push(h('figcaption', [h('p', node.fields.caption)]))
        }

        return h('figure', { key: index }, children)
      }

      if (isElementNode(node) && node.type) {
        const tag = getElementTag(node)
        if (!tag) return null
        return h(tag, { key: index }, renderNodes(node.children))
      }

      return null
    }

    function getElementTag(node: LexicalElementNode) {
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

    function getInternalUrl(doc: LexicalInternalLinkNode['fields']['doc']) {
      switch (doc.relationTo) {
        case 'key-pages':
          return doc.value.keyPageUri
        default:
          return '/'
      }
    }

    return () => {
      if (props.nestedContent) return renderNodes(props.nestedContent)
      if (isLexicalRichTextField(props.content)) {
        return renderNodes(props.content.root.children)
      }
      return []
    }
  },
})
</script>
