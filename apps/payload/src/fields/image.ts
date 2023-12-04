import type { Field } from 'payload/types'

function image({
  name = 'image',
  label = 'Image',
  required = false,
  admin = {},
} = {}): Field {
  return {
    name,
    label,
    type: 'upload',
    relationTo: 'images',
    required,
    admin,
  }
}

export default image
