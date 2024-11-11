import type { UploadField } from 'payload'

function image({
  name = 'image',
  label = '',
  required = false,
  admin = {},
} = {}): UploadField {
  return {
    name,
    ...(label && { label }),
    type: 'upload',
    relationTo: 'images',
    required,
    admin,
  }
}

export default image
