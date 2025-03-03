import { TextField } from 'payload'

const uploadTitle: TextField = {
  name: 'title',
  type: 'text',
  required: true,
  admin: {
    position: 'sidebar',
    readOnly: true,
  },
}

export default uploadTitle
