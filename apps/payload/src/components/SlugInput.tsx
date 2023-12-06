import React, { useEffect } from 'react'
import { TextInput, useFormFields, useField } from 'payload/components/forms'
import dashify from 'dashify'
import { TextInputProps } from 'payload/dist/admin/components/forms/field-types/Text/Input'

export default function (fieldName: string) {
  const SlugInput: React.FC<TextInputProps> = ({ admin, name, label, path }) => {
    const titleField = useFormFields(([fields]) => fields[fieldName])

    const { showError, value, setValue } = useField<string>({
      path: path,
    })

    useEffect(() => {
      const charLimit = 40
      const slug = dashify((String(titleField.value)).replace(/[^A-Za-z0-9\s]/g, '') || '', { condense: true })

      if (value === undefined && !slug.length) {
        setValue('')
      } else if (value !== undefined && value !== slug) {
        if (slug.length <= charLimit) {
          setValue(slug)
        } else {
          const trimmedSlugSegments = []

          slug.split('-').forEach((segment) => {
            let trimmedSlugLength = trimmedSlugSegments.join('-').length

            if (trimmedSlugSegments.length > 1) {
              trimmedSlugLength++
            }

            if (segment.length + trimmedSlugLength <= charLimit) {
              trimmedSlugSegments.push(segment)
            }
          })

          setValue(trimmedSlugSegments.join('-'))
        }
      }
    }, [titleField])

    return (
      <TextInput
        path={path}
        name={name}
        value={value || ''}
        label={label}
        description={admin.description}
        readOnly
        showError={showError}
        onChange={() => undefined}
      />
    )
  }

  return SlugInput
}
