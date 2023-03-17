import type { Field } from 'payload/types'
import { SlugInput } from '../components'

function slug(fieldName = 'title'): Field {
  return {
    name: 'slug',
    label: 'Slug',
    type: 'text',
    admin: {
      components: {
        Field: SlugInput(fieldName),
      },
      position: 'sidebar',
      description: 'The slug is set automatically based on the Title field.',
    },
  }
}

export default slug
