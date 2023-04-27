import type { Field } from 'payload/types'

function image({
  description = '',
  name = 'image',
  label = 'Image',
  required = false,
} = {}): Field {
  return {
    name,
    label,
    type: 'upload',
    relationTo: 'images',
    required,
    ...(description && { admin: { description } }),
  }
}

export default image
