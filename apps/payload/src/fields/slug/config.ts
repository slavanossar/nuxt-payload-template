import type { Field } from 'payload/types'
import SlugField from './SlugField'

function slug(fieldName: string): Field {
  return {
    name: 'slug',
    label: 'Slug',
    type: 'text',
    required: true,
    unique: true,
    admin: {
      components: {
        Field: SlugField(fieldName),
      },
      position: 'sidebar',
      description: `The slug is set automatically based on the ${fieldName} field.`,
    },
  }
}

export default slug
