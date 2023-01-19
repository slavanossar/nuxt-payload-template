import type { Field } from 'payload/types'

const Home: Field = {
  name: 'homeFields',
  label: 'Home Fields',
  type: 'group',
  admin: {
    condition: (data) => data.template === 'Home',
  },
  fields: [],
}

export default Home
