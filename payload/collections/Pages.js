import { slug } from '../fields'
import { Home } from '../pages'

export default {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'id', 'template'],
  },
  access: {
    create: ({ req: { user } }) => {
      return user.role === 'admin'
    },
    read: () => true,
    update: ({ req: { user } }) => {
      return user
    },
    delete: ({ req: { user } }) => {
      return user.role === 'admin'
    },
  },
  versions: true,
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
      access: {
        update: ({ req: { user } }) => {
          return user.role === 'admin'
        },
      },
    },
    {
      name: 'template',
      label: 'Template',
      type: 'select',
      required: true,
      access: {
        update: ({ req: { user } }) => {
          return user.role === 'admin'
        },
      },
      options: ['Home'],
      admin: {
        description:
          'A template must be selected to display relevant page fields. Changing the template on existing pages will result in data loss.',
        position: 'sidebar',
      },
    },
    slug,
    Home,
  ],
}
