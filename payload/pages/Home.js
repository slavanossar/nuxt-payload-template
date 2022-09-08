export default {
  name: 'homeFields',
  label: 'Home Fields',
  type: 'group',
  admin: {
    condition: (data) => data.template === 'Home',
  },
  fields: [],
}
