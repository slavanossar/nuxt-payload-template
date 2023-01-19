import type { Field } from 'payload/types'
import { SlugInput } from '../components'

const slug: Field = {
  name: 'slug',
  label: 'Slug',
  type: 'text',
  admin: {
    components: {
      Field: SlugInput,
    },
    position: 'sidebar',
    description: 'The slug is set automatically based on the Title field.',
  },
}

export default slug
