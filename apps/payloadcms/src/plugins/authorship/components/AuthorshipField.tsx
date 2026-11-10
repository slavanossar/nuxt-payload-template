import type { RelationshipFieldServerProps } from 'payload'

import './styles.css'

export default async function AuthorshipField({
  field,
  path,
  value,
  payload,
  req,
}: RelationshipFieldServerProps) {
  const collection = field.relationTo
  let name = '—'

  if (typeof collection === 'string' && value) {
    const id = typeof value === 'object' && 'id' in value ? value.id : value

    if (typeof id === 'string' || typeof id === 'number') {
      const author = await payload.findByID({
        collection,
        id,
        depth: 0,
        overrideAccess: false,
        disableErrors: true,
        req,
      })
      const titleField = payload.collections[collection].config.admin.useAsTitle
      const title = author?.[titleField as keyof typeof author]

      if (typeof title === 'string' || typeof title === 'number') {
        name = String(title)
      }
    }
  }

  const label = field.name === 'createdBy' ? 'Created By' : 'Updated By'
  const labelID = `${path}-label`

  return (
    <div className="field-type authorship-field">
      <div className="field-label" id={labelID}>
        {label}
      </div>
      <div className="authorship-field__tag" aria-labelledby={labelID}>
        {name}
      </div>
    </div>
  )
}
