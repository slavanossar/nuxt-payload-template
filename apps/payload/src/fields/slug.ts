import type { Field } from 'payload/types'
import { SlugInput } from '../components'

function slug(fieldName: string): Field {
  return {
    name: 'slug',
    label: 'Slug',
    type: 'text',
    required: true,
    unique: true,
    admin: {
      components: {
        Field: SlugInput(fieldName),
      },
      position: 'sidebar',
      description: `The slug is set automatically based on the ${fieldName} field.`,
    },
  }
}

export default slug
