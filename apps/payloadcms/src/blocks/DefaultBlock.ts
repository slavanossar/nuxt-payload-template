import type { Block } from 'payload'

const DefaultBlock: Block = {
  slug: 'default-block',
  labels: {
    singular: 'Default Block',
    plural: 'Default Blocks',
  },
  interfaceName: 'DefaultBlock',
  imageURL: '/payload/block-template.svg',
  fields: [
    {
      name: 'test',
      type: 'text',
    },
  ],
}

export default DefaultBlock
