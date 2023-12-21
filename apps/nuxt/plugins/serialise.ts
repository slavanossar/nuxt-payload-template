import escapeHTML from 'escape-html'
import { Text } from 'slate'

export default defineNuxtPlugin(() => {
  const serialise = (children: RichTextNode[]) => {
    const nodes = children.map((node): string => {
      let text = ''

      if (node.children) {
        const content = serialise(node.children)

        switch (node.type) {
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
          case 'quote':
          case 'ul':
          case 'ol':
          case 'li':
            text = `<${node.type}>${content}</${node.type}>`
            break
          case 'link':
            text = `<a href="${escapeHTML(
              node.url,
            )}" target="_blank">${content}</a>`
            break
          default:
            text = content.length ? `<p>${content}</p>` : ''
            break
        }
      } else if (Text.isText(node)) {
        text = escapeHTML(node.text).replace('\n', '<br />')

        if (node.bold) {
          text = `<strong>${text}</strong>`
        }

        if (node.code) {
          text = `<code>${text}</code>`
        }

        if (node.italic) {
          text = `<em>${text}</em>`
        }
      }

      return text
    })

    return nodes.join('')
  }

  return { provide: { serialise } }
})
