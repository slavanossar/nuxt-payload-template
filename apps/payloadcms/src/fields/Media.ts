import { default as Image } from './Image'
import { default as Video } from './Video'

import type { BlocksField } from 'payload'

export default {
  name: 'media',
  type: 'blocks',
  maxRows: 1,
  blocks: [
    {
      slug: 'imageBlock',
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      interfaceName: 'ImageBlock',
      fields: [
        {
          ...Image,
          required: true,
        },
      ],
    },
    {
      slug: 'videoBlock',
      labels: {
        singular: 'Video',
        plural: 'Videos',
      },
      interfaceName: 'VideoBlock',
      fields: [
        {
          ...Video,
          required: true,
        },
      ],
    },
  ],
} satisfies BlocksField
