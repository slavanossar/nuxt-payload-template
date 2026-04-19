import type { Field } from 'payload'

const Home: Field = {
  name: 'homeTemplateFields',
  type: 'group',
  admin: {
    condition: (data) => data.template === 'Home',
  },
  fields: [
    {
      name: 'myTextField',
      type: 'text',
    },
  ],
}

export default Home
