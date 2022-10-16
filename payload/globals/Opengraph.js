import { image } from '../fields'

const Opengraph = {
  slug: 'opengraph',
  label: 'Opengraph',
  access: {
    read: (_) => true,
  },
  fields: [
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      maxLength: 70,
      required: true,
    },
    image(),
  ],
}

export default Opengraph
