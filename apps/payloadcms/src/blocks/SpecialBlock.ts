import type { Block } from 'payload'

const SpecialBlock: Block = {
  slug: 'special-block',
  labels: {
    singular: 'Special Block',
    plural: 'Special Blocks',
  },
  interfaceName: 'SpecialBlock',
  imageURL: '/payload/block-template.svg',
  fields: [
    {
      name: 'superSpecialTextArea',
      type: 'textarea',
      admin: {
        description: 'This is a super special text area',
      },
    }
  ]
}

export default SpecialBlock