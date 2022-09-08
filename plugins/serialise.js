import escapeHTML from 'escape-html'
import { Text } from 'slate'

export default defineNuxtPlugin(() => {
  const serialise = (children) => {
    const nodes = children.map((node) => {
      if (Text.isText(node)) {
        let text = escapeHTML(node.text)

        if (node.bold) {
          text = `<strong>${text}</strong>`
        }

        if (node.code) {
          text = `<code>${text}</code>`
        }

        if (node.italic) {
          text = `<em>${text}</em>`
        }

        return text
      }

      if (!node) {
        return null
      }

      const content = serialise(node.children)

      switch (node.type) {
        case 'h1':
          return `<h1>${content}</h1>`
        case 'h2':
          return `<h2>${content}</h2>`
        case 'h3':
          return `<h3>${content}</h3>`
        case 'h4':
          return `<h4>${content}</h4>`
        case 'h5':
          return `<h5>${content}</h5>`
        case 'h6':
          return `<h6>${content}</h6>`
        case 'quote':
          return `<blockquote>${content}</blockquote>`
        case 'ul':
          return `<ul>${content}</ul>`
        case 'ol':
          return `<ol>${content}</ol>`
        case 'li':
          return `<li>${content}</li>`
        case 'link':
          return `<a href="${escapeHTML(node.url)}">${content}</a>`
        default:
          return content.length ? `<p>${content}</p>` : ''
      }
    })

    return nodes.join('')
  }

  return {
    provide: { serialise },
  }
})
