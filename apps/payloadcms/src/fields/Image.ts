import type { UploadField } from 'payload'

const Image: UploadField = {
  name: 'image',
  type: 'upload',
  relationTo: 'images',
}

export default Image
