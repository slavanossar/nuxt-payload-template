import { slugField } from 'payload'
import slugify from 'slugify'

import type { RowField } from 'payload'

export default (useAsSlug: string): RowField =>
  slugField({
    name: 'slug',
    useAsSlug,
    required: true,
    position: 'sidebar',
    slugify: ({ valueToSlugify }) =>
      slugify(valueToSlugify ?? '', {
        lower: true,
        remove: /[*+~.()'"!?#\.\/,:@]/g,
      }),
  })
