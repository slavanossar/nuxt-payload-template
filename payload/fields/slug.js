import { SlugInput } from '../components'

export default {
  name: 'slug',
  label: 'Slug',
  type: 'text',
  admin: {
    components: {
      Field: SlugInput,
    },
    position: 'sidebar',
    description: 'The slug is set automatically based on the Title field.',
  },
}
