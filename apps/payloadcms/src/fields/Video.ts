import type { UploadField } from 'payload'

export default {
  name: 'video',
  type: 'upload',
  relationTo: 'mux-video',
} satisfies UploadField
