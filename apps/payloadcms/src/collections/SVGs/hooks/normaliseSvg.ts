import { parse } from 'node-html-parser'

import type { CollectionBeforeOperationHook } from 'payload'

type ParsedHTML = ReturnType<typeof parse>

const updateAttributes = (el: ParsedHTML) => {
  if (el.tagName === 'SVG') {
    const width = el.getAttribute('width')
    const height = el.getAttribute('height')
    const viewBox = el.getAttribute('viewBox')

    if (width && height && !viewBox) {
      el.setAttribute('viewBox', [0, 0, width, height].join(' '))
    } else if (viewBox && !width && !height) {
      const [_x0, _y0, x1, y1] = viewBox.split(' ')

      if (x1) {
        el.setAttribute('width', x1)
      }

      if (y1) {
        el.setAttribute('height', y1)
      }
    }
  }

  if (el.hasAttribute('fill') && el.getAttribute('fill') !== 'none') {
    el.setAttribute('fill', 'currentColor')
  }

  if (el.hasAttribute('stroke') && el.getAttribute('stroke') !== 'none') {
    el.setAttribute('stroke', 'currentColor')
  }

  el.childNodes.forEach((child) => {
    if (child.nodeType === 1) {
      updateAttributes(child as ParsedHTML)
    }
  })
}

const normaliseSvg: CollectionBeforeOperationHook = async ({ args, req }) => {
  if (req.file) {
    const svgText = req.file.data.toString('utf8')
    const root = parse(svgText)
    const svg = root.querySelector('svg')

    if (svg) {
      updateAttributes(svg)
      args.req.file.data = Buffer.from(svg.toString(), 'utf8')
    }
  }

  return args
}

export default normaliseSvg
