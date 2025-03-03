import type { UploadField } from 'payload'

const image: UploadField = {
  name: 'image',
  type: 'upload',
  relationTo: 'images',
}

export default image
