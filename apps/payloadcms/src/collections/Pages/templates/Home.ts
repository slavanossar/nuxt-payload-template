import { DefaultBlock, SomeOtherBlock, SpecialBlock } from '~/blocks'

import type { Field } from 'payload'

const Home: Field = {
  name: 'homeTemplateFields',
  type: 'group',
  admin: {
    condition: (data) => data.template === 'Home',
  },
  fields: [
    {
      name: 'myTextField',
      type: 'text',
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        DefaultBlock,
        SomeOtherBlock,
        SpecialBlock,
      ],
    }
  ],
}

export default Home
