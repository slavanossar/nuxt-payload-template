import type { Block } from 'payload/types'

const DefaultBlock: Block = {
  slug: 'block',
  labels: {
    singular: 'Block',
    plural: 'Block',
  },
  interfaceName: 'DefaultBlock',
  imageURL: '/payload/block-template.svg',
  fields: [],
}

export default DefaultBlock
