import type { Block } from 'payload'

const SomeOtherBlock: Block = {
  slug: 'some-other-block',
  labels: {
    singular: 'Some Other Block',
    plural: 'Some Other Blocks',
  },
  interfaceName: 'SomeOtherBlock',
  imageURL: '/payload/block-template.svg',
  fields: [
    {
      name: 'someOtherTextField',
      type: 'text',
    },
  ],
}

export default SomeOtherBlock