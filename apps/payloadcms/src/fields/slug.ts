import slugify from 'slugify'

import type { FieldHook, TextField } from 'payload'

const slug = (field: string): TextField => {
  return {
    name: 'slug',
    type: 'text',
    unique: true,
    admin: { position: 'sidebar', readOnly: true },
    hooks: {
      beforeValidate: [
        (({ data }) => {
          return data?.[field]
            ? slugify(data[field], {
                lower: true,
                remove: /[*+~\/\\.()'"!?#\.,:@]/g,
              })
            : ''
        }) as FieldHook<any, string>,
      ],
    },
  }
}

export default slug
